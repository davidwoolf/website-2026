<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
	import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
	import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

	let { cameraPosition = [0, -16, 8] as [number, number, number], fov = 50 } = $props();

	let prefersDark = $state(
		typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const meshColor = $derived(prefersDark ? '#141414' : '#F4F2F1');
	const lineColorHex = $derived(prefersDark ? 0xf2f0e8 : 0x141414);

	const R = 1;
	const r = 0.6;
	const majorRings = 12;
	const tubeRings = 6;
	const majorRes = 128;
	const tubeRes = 64;
	const TAU = Math.PI * 2;

	const vertCount = majorRings * majorRes * 2 + tubeRings * tubeRes * 2;
	const positions = new Float32Array(vertCount * 3);

	function fill(majorOffset: number, tubeOffset: number) {
		let k = 0;
		for (let i = 0; i < majorRings; i++) {
			const phi = (i / majorRings) * TAU + tubeOffset;
			const ringR = R + r * Math.cos(phi);
			const z = r * Math.sin(phi);
			for (let s = 0; s < majorRes; s++) {
				const t1 = (s / majorRes) * TAU;
				const t2 = ((s + 1) / majorRes) * TAU;
				positions[k++] = ringR * Math.cos(t1);
				positions[k++] = ringR * Math.sin(t1);
				positions[k++] = z;
				positions[k++] = ringR * Math.cos(t2);
				positions[k++] = ringR * Math.sin(t2);
				positions[k++] = z;
			}
		}
		for (let j = 0; j < tubeRings; j++) {
			const theta = (j / tubeRings) * TAU + majorOffset;
			const cosT = Math.cos(theta);
			const sinT = Math.sin(theta);
			for (let s = 0; s < tubeRes; s++) {
				const p1 = (s / tubeRes) * TAU;
				const p2 = ((s + 1) / tubeRes) * TAU;
				const r1 = R + r * Math.cos(p1);
				const r2 = R + r * Math.cos(p2);
				positions[k++] = r1 * cosT;
				positions[k++] = r1 * sinT;
				positions[k++] = r * Math.sin(p1);
				positions[k++] = r2 * cosT;
				positions[k++] = r2 * sinT;
				positions[k++] = r * Math.sin(p2);
			}
		}
	}

	fill(0, 0);

	const lineGeom = new LineSegmentsGeometry();
	lineGeom.setPositions(positions);
	const instanceBuffer = lineGeom.attributes.instanceStart.data;

	const lineMaterial = new LineMaterial({
		color: lineColorHex,
		linewidth: 1,
		toneMapped: false
	});

	const lineMesh = new LineSegments2(lineGeom, lineMaterial);

	const { size } = useThrelte();
	$effect(() => {
		lineMaterial.resolution.set($size.width, $size.height);
	});

	$effect(() => {
		lineMaterial.color.set(lineColorHex);
	});

	$effect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			prefersDark = e.matches;
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	let majorOffset = 0;
	let tubeOffset = 0;
	useTask((delta) => {
		majorOffset += delta * 0.2;
		tubeOffset -= delta * 0.3;
		fill(majorOffset, tubeOffset);
		instanceBuffer.needsUpdate = true;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={cameraPosition}
	{fov}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh>
	<T.TorusGeometry args={[1, 0.6, 32, 96]} />
	<T.MeshBasicMaterial
		color={meshColor}
		toneMapped={false}
		polygonOffset
		polygonOffsetFactor={1}
		polygonOffsetUnits={1}
	/>
</T.Mesh>

<T is={lineMesh} />
