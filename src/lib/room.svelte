<script lang="ts">
	import Computer from '$lib/computer.svelte';
	import Desk from '$lib/desk.svelte';
	import EllipsoidScene from '$lib/EllipsoidScene.svelte';
	import { T } from '@threlte/core';
	import { BoxGeometry, PlaneGeometry } from 'three';

	const roomGeometry = new BoxGeometry(10, 6, 10);
	const boardGeometry = new PlaneGeometry(10, 0.2);
	// const board2Geometry = new BoxGeometry(10, 0.2, 10);
</script>

<T.PerspectiveCamera
	makeDefault
	// fov={100}
	// position={[0, 0, 0]}
	// rotation={[0, 0, 0]}
	fov={60}
	position={[-0.5, -Math.PI / 2.2, 0]}
	rotation={[0, Math.PI / 3.5, 0]}
/>

<T.LineSegments>
	<T.EdgesGeometry args={[roomGeometry]} />
	<T.LineBasicMaterial color="#353536" />
</T.LineSegments>

<T.LineSegments position={[0, -2.9, -5]}>
	<T.EdgesGeometry args={[boardGeometry]} />
	<T.LineBasicMaterial color="#353536" />
</T.LineSegments>

<T.LineSegments position={[-5, -2.9, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.EdgesGeometry args={[boardGeometry]} />
	<T.LineBasicMaterial color="#353536" />
</T.LineSegments>

<Desk />
<Computer />
<EllipsoidScene />
