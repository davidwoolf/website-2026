<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
	import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
	import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
	import { untrack } from 'svelte';

	let {
		cameraPosition = [0, -16, 8] as [number, number, number],
		// on-screen width of the torus, in CSS pixels — the fov is derived from it
		torusWidth = 120,
		// --surface
		color = '#F7F4F3',
		// --text
		backgroundColor = '#181C2F'
	} = $props();

	const { size } = useThrelte();

	const R = 1;
	const r = 0.6;
	const majorRings = 18;
	const tubeRings = 6;
	const majorRes = 128;
	const tubeRes = 64;
	const TAU = Math.PI * 2;

	// widest projected dimension of the torus, in world units
	const torusWorldWidth = 2 * (R + r);
	const cameraDistance = $derived(Math.hypot(...cameraPosition));

	// vertical fov that renders `torusWorldWidth` as `torusWidth` CSS pixels:
	// the camera frames a viewport of (torusWorldWidth * height / torusWidth)
	// world units tall, since three derives the horizontal fov from the aspect
	const fov = $derived(
		2 *
			Math.atan((torusWorldWidth * $size.height) / torusWidth / (2 * cameraDistance)) *
			(180 / Math.PI)
	);

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
		color: untrack(() => color),
		linewidth: 1.5,
		toneMapped: false
	});

	const lineMesh = new LineSegments2(lineGeom, lineMaterial);

	$effect(() => {
		lineMaterial.resolution.set($size.width, $size.height);
	});

	$effect(() => {
		lineMaterial.color.set(color);
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
		color={backgroundColor}
		toneMapped={false}
		polygonOffset
		polygonOffsetFactor={1}
		polygonOffsetUnits={1}
	/>
</T.Mesh>

<T is={lineMesh} />
