<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Line2 } from 'three/examples/jsm/lines/Line2.js';
	import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
	import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
	import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
	import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

	const eb = 0.5;
	const latRings = 8;
	const lonRings = 16;
	const latRes = 128;
	const lonRes = 64;
	const TAU = Math.PI * 2;

	const vertCount = latRings * latRes * 2 + lonRings * lonRes * 2;
	const positions = new Float32Array(vertCount * 3);

	function fillEllipsoid(rotPhi: number) {
		let k = 0;
		for (let i = 0; i < latRings; i++) {
			const theta = ((i + 0.5) / latRings) * Math.PI;
			const sinTh = Math.sin(theta);
			const y = eb * Math.cos(theta);
			for (let s = 0; s < latRes; s++) {
				const p1 = (s / latRes) * TAU + rotPhi;
				const p2 = ((s + 1) / latRes) * TAU + rotPhi;
				positions[k++] = Math.cos(p1) * sinTh;
				positions[k++] = y;
				positions[k++] = Math.sin(p1) * sinTh;
				positions[k++] = Math.cos(p2) * sinTh;
				positions[k++] = y;
				positions[k++] = Math.sin(p2) * sinTh;
			}
		}
		for (let j = 0; j < lonRings; j++) {
			const phi = (j / lonRings) * TAU + rotPhi;
			const cosPhi = Math.cos(phi);
			const sinPhi = Math.sin(phi);
			for (let s = 0; s < lonRes; s++) {
				const t1 = (s / lonRes) * Math.PI;
				const t2 = ((s + 1) / lonRes) * Math.PI;
				positions[k++] = Math.sin(t1) * cosPhi;
				positions[k++] = eb * Math.cos(t1);
				positions[k++] = Math.sin(t1) * sinPhi;
				positions[k++] = Math.sin(t2) * cosPhi;
				positions[k++] = eb * Math.cos(t2);
				positions[k++] = Math.sin(t2) * sinPhi;
			}
		}
	}

	fillEllipsoid(0);

	const lineGeom = new LineSegmentsGeometry();
	lineGeom.setPositions(positions);
	const instanceBuffer = lineGeom.attributes.instanceStart.data;

	const lineMaterial = new LineMaterial({
		color: 0xfed243,
		linewidth: 1.5,
		toneMapped: false
	});

	const lineMesh = new LineSegments2(lineGeom, lineMaterial);

	const fovDeg = 50;
	const cameraDist = 11;
	const visibleHeight = 2 * cameraDist * Math.tan((fovDeg * Math.PI) / 360);
	const outerSamples = 256;

	function buildOuterPositions(vpHeight: number) {
		const gapPx = 4;
		const halfLineWidth = 1.5;
		const offsetPx = gapPx + halfLineWidth;
		const d = (offsetPx * visibleHeight) / vpHeight;
		const positions = new Float32Array((outerSamples + 1) * 3);
		const a = 1;
		const b = eb;
		for (let s = 0; s <= outerSamples; s++) {
			const t = (s / outerSamples) * TAU;
			const cosT = Math.cos(t);
			const sinT = Math.sin(t);
			const N = Math.sqrt(b * b * cosT * cosT + a * a * sinT * sinT);
			positions[s * 3] = a * cosT + (d * b * cosT) / N;
			positions[s * 3 + 1] = b * sinT + (d * a * sinT) / N;
			positions[s * 3 + 2] = 0;
		}
		return positions;
	}

	const outerGeom = new LineGeometry();
	outerGeom.setPositions(buildOuterPositions(800));

	const innerOutlineSamples = 256;
	const innerOutlinePositions = new Float32Array((innerOutlineSamples + 1) * 3);
	for (let s = 0; s <= innerOutlineSamples; s++) {
		const t = (s / innerOutlineSamples) * TAU;
		innerOutlinePositions[s * 3] = Math.cos(t);
		innerOutlinePositions[s * 3 + 1] = eb * Math.sin(t);
		innerOutlinePositions[s * 3 + 2] = 0;
	}

	const innerOutlineGeom = new LineGeometry();
	innerOutlineGeom.setPositions(innerOutlinePositions);

	const innerOutlineMaterial = new LineMaterial({
		color: 0xfed243,
		linewidth: 1.5,
		toneMapped: false
	});

	const innerOutlineMesh = new Line2(innerOutlineGeom, innerOutlineMaterial);

	const outerMaterial = new LineMaterial({
		color: 0xfed243,
		linewidth: 3,
		toneMapped: false
	});

	const outerMesh = new Line2(outerGeom, outerMaterial);

	const { size } = useThrelte();
	$effect(() => {
		lineMaterial.resolution.set($size.width, $size.height);
		outerMaterial.resolution.set($size.width, $size.height);
		innerOutlineMaterial.resolution.set($size.width, $size.height);
		outerGeom.setPositions(buildOuterPositions($size.height));
	});

	let phi = 0;
	useTask((delta) => {
		phi -= delta * 0.2;
		fillEllipsoid(phi);
		instanceBuffer.needsUpdate = true;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 11]} />

<T.Mesh scale={[1, 0.5, 1]}>
	<T.SphereGeometry args={[1, 32, 32]} />
	<T.MeshBasicMaterial
		color="black"
		toneMapped={false}
		polygonOffset
		polygonOffsetFactor={1}
		polygonOffsetUnits={1}
	/>
</T.Mesh>

<T is={lineMesh} />

<T is={innerOutlineMesh} />

<T is={outerMesh} />
