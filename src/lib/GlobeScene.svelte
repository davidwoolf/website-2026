<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';
	import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
	import { Line2 } from 'three/examples/jsm/lines/Line2.js';
	import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
	import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
	import { untrack } from 'svelte';
	import { get } from 'svelte/store';

	let {
		cameraPosition = [0, 0, 3.5] as [number, number, number],
		fov = 36,
		rotationSpeed = 0.09,
		latStepDeg = 4,
		dotRadius = 0.02,
		initialLat = 45,
		initialLon = -70,
		tiltDeg = 20
	} = $props();

	const OUTLINE_RADIUS = 1.045;
	const OUTLINE_LINE_WIDTH = 0.5;

	let prefersDark = $state(
		true
		// typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const meshColor = $derived(prefersDark ? '#141414' : '#F4F2F1');
	const dotColorHex = $derived(prefersDark ? 0xf2f0e8 : 0x141414);
	const redColorHex = $derived(prefersDark ? 0xff6044 : 0xcc2c00);

	const RADIUS = 1;
	const DEG2RAD = Math.PI / 180;

	const spinGroup = new THREE.Group();
	untrack(() => {
		const phi = (90 - initialLat) * DEG2RAD;
		const theta = (initialLon + 180) * DEG2RAD;
		const target = new THREE.Vector3(
			-Math.sin(phi) * Math.cos(theta),
			Math.cos(phi),
			Math.sin(phi) * Math.sin(theta)
		);
		const naQuat = new THREE.Quaternion().setFromUnitVectors(target, new THREE.Vector3(0, 0, 1));
		const tiltQuat = new THREE.Quaternion().setFromAxisAngle(
			new THREE.Vector3(1, 0, 0),
			-tiltDeg * DEG2RAD
		);
		spinGroup.quaternion.multiplyQuaternions(tiltQuat, naQuat);
	});

	const bgGeom = new THREE.SphereGeometry(0.985, 48, 48);
	const bgMat = new THREE.MeshBasicMaterial({
		toneMapped: false,
		polygonOffset: true,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1
	});
	const bgMesh = new THREE.Mesh(bgGeom, bgMat);
	spinGroup.add(bgMesh);

	const dotMat = new THREE.MeshBasicMaterial({ toneMapped: false, side: THREE.DoubleSide });
	let dotMesh: THREE.Mesh | null = null;

	const SD_LAT = 32.715736;
	const SD_LON = -117.161087;
	const sdPhi = (90 - SD_LAT) * DEG2RAD;
	const sdTheta = (SD_LON + 180) * DEG2RAD;
	const sdPos = new THREE.Vector3(
		-RADIUS * Math.sin(sdPhi) * Math.cos(sdTheta),
		RADIUS * Math.cos(sdPhi),
		RADIUS * Math.sin(sdPhi) * Math.sin(sdTheta)
	);

	const markerRadius = untrack(() => dotRadius * 1.3);
	const FRONT = new THREE.Vector3(0, 0, 1);

	function orientToward(mesh: THREE.Mesh, position: THREE.Vector3) {
		mesh.position.copy(position);
		mesh.quaternion.setFromUnitVectors(FRONT, position.clone().normalize());
	}

	const sdDotMat = new THREE.MeshBasicMaterial({ toneMapped: false, side: THREE.DoubleSide });
	const sdDotMesh = new THREE.Mesh(new THREE.CircleGeometry(markerRadius, 16), sdDotMat);
	orientToward(sdDotMesh, sdPos);
	sdDotMesh.renderOrder = 2;
	spinGroup.add(sdDotMesh);

	const pulseMat = new THREE.MeshBasicMaterial({
		toneMapped: false,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0,
		depthWrite: false
	});
	const pulseMesh = new THREE.Mesh(new THREE.CircleGeometry(markerRadius, 24), pulseMat);
	orientToward(pulseMesh, sdPos);
	pulseMesh.renderOrder = 1;
	spinGroup.add(pulseMesh);

	const PULSE_DURATION = 1.6;
	let pulseT = 0;

	const OUTLINE_SAMPLES = 192;
	const outlinePositions: number[] = [];
	for (let i = 0; i <= OUTLINE_SAMPLES; i++) {
		const t = (i / OUTLINE_SAMPLES) * Math.PI * 2;
		outlinePositions.push(Math.cos(t) * OUTLINE_RADIUS, Math.sin(t) * OUTLINE_RADIUS, 0);
	}
	const outlineGeom = new LineGeometry();
	outlineGeom.setPositions(outlinePositions);
	const outlineMat = new LineMaterial({
		linewidth: OUTLINE_LINE_WIDTH,
		toneMapped: false,
		depthTest: false
	});
	const outlineMesh = new Line2(outlineGeom, outlineMat);
	outlineMesh.renderOrder = 999;

	const { size, camera } = useThrelte();
	$effect(() => {
		outlineMat.resolution.set($size.width, $size.height);
	});

	function pointInRing(lon: number, lat: number, ring: number[][]): boolean {
		let inside = false;
		for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
			const xi = ring[i][0];
			const yi = ring[i][1];
			const xj = ring[j][0];
			const yj = ring[j][1];
			if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
				inside = !inside;
			}
		}
		return inside;
	}

	type Bbox = { minX: number; minY: number; maxX: number; maxY: number };

	function bbox(ring: number[][]): Bbox {
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (const [x, y] of ring) {
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
		return { minX, minY, maxX, maxY };
	}

	function buildDots(polygons: number[][][]) {
		const bboxes = polygons.map(bbox);
		const isLand = (lon: number, lat: number) => {
			for (let i = 0; i < polygons.length; i++) {
				const b = bboxes[i];
				if (lon < b.minX || lon > b.maxX || lat < b.minY || lat > b.maxY) continue;
				if (pointInRing(lon, lat, polygons[i])) return true;
			}
			return false;
		};

		const geoms: THREE.BufferGeometry[] = [];
		const tmp = new THREE.Vector3();
		let nearestSdDistSq = Infinity;
		let nearestSdX = sdPos.x;
		let nearestSdY = sdPos.y;
		let nearestSdZ = sdPos.z;
		for (let lat = -90 + latStepDeg / 2; lat < 90; lat += latStepDeg) {
			const ringR = Math.cos(lat * DEG2RAD);
			const dotsInRing = Math.max(1, Math.round((ringR * 360) / latStepDeg));
			for (let i = 0; i < dotsInRing; i++) {
				const lon = (i / dotsInRing) * 360 - 180;
				if (!isLand(lon, lat)) continue;
				const phi = (90 - lat) * DEG2RAD;
				const theta = (lon + 180) * DEG2RAD;
				const x = -RADIUS * Math.sin(phi) * Math.cos(theta);
				const z = RADIUS * Math.sin(phi) * Math.sin(theta);
				const y = RADIUS * Math.cos(phi);
				const dx = x - sdPos.x;
				const dy = y - sdPos.y;
				const dz = z - sdPos.z;
				const distSq = dx * dx + dy * dy + dz * dz;
				if (distSq < nearestSdDistSq) {
					nearestSdDistSq = distSq;
					nearestSdX = x;
					nearestSdY = y;
					nearestSdZ = z;
				}
				tmp.set(x, y, z);
				const g = new THREE.CircleGeometry(dotRadius, 6);
				g.lookAt(tmp);
				g.translate(x, y, z);
				geoms.push(g);
			}
		}

		const snapped = new THREE.Vector3(nearestSdX, nearestSdY, nearestSdZ);
		orientToward(sdDotMesh, snapped);
		orientToward(pulseMesh, snapped);

		if (!geoms.length) return;
		const merged = mergeGeometries(geoms, false);
		geoms.forEach((g) => g.dispose());
		dotMesh = new THREE.Mesh(merged, dotMat);
		spinGroup.add(dotMesh);
	}

	$effect(() => {
		let cancelled = false;
		fetch('/land-polygons.json')
			.then((r) => r.json())
			.then((polygons: number[][][]) => {
				if (cancelled) return;
				buildDots(polygons);
			});
		return () => {
			cancelled = true;
		};
	});

	$effect(() => {
		dotMat.color.set(dotColorHex);
		outlineMat.color.set(dotColorHex);
	});

	$effect(() => {
		sdDotMat.color.set(redColorHex);
		pulseMat.color.set(redColorHex);
	});

	$effect(() => {
		bgMat.color.set(meshColor);
	});

	$effect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			prefersDark = e.matches;
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	useTask((delta) => {
		spinGroup.rotateY(delta * rotationSpeed);

		pulseT = (pulseT + delta) % PULSE_DURATION;
		const t = pulseT / PULSE_DURATION;
		pulseMesh.scale.setScalar(1 + t * 4);
		pulseMat.opacity = 0.6 * (1 - t);

		const cam = get(camera);
		if (cam) outlineMesh.lookAt(cam.position);
	});
</script>

<T.PerspectiveCamera makeDefault position={cameraPosition} {fov}>
	<OrbitControls
		enableZoom={false}
		enablePan={false}
		enableDamping
		dampingFactor={0.12}
		rotateSpeed={0.25}
	/>
</T.PerspectiveCamera>

<T is={spinGroup} />
<T is={outlineMesh} />
