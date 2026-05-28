<script lang="ts">
	import { T } from '@threlte/core';
	import { ExtrudeGeometry, Shape, ShapeGeometry } from 'three';

	const width = 1.2;
	const height = 1;
	const radius = 0.2; // corner roundness

	const shape = new Shape();
	const w = width / 2;
	const h = height / 2;

	shape.moveTo(-w + radius, -h);
	shape.lineTo(w - radius, -h); // bottom edge
	shape.quadraticCurveTo(w, -h, w, -h + radius); // bottom-right corner
	shape.lineTo(w, h - radius); // right edge
	shape.quadraticCurveTo(w, h, w - radius, h); // top-right corner
	shape.lineTo(-w + radius, h); // top edge
	shape.quadraticCurveTo(-w, h, -w, h - radius); // top-left corner
	shape.lineTo(-w, -h + radius); // left edge
	shape.quadraticCurveTo(-w, -h, -w + radius, -h); // bottom-left corner

	// const roundedGeometry = new ShapeGeometry(shape);

	const computerScreen = new ExtrudeGeometry(shape, {
		depth: 0.05,
		bevelEnabled: false
	});
</script>

<T.LineSegments position={[-3, -1.2, -4.3]}>
	<T.Mesh>
		<T.BufferGeometry
			is={computerScreen}
			oncreate={(ref) => {
				ref.center();
			}}
		/>
		<T.MeshBasicMaterial color="#1a1a1a" polygonOffset polygonOffsetFactor={1} />
	</T.Mesh>

	<T.EdgesGeometry
		args={[computerScreen, 30]}
		oncreate={(ref) => {
			ref.center();
		}}
	/>
	<T.LineBasicMaterial color="#353536" />
</T.LineSegments>
