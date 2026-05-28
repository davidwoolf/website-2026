<script lang="ts">
	import { T } from '@threlte/core';
	import { Shape, ExtrudeGeometry } from 'three';

	const deskWidth = 2.4;
	const deskHeight = 1.2;
	const deskDepth = 1.4;
	const topThickness = 0.4;
	const legThickness = 0.6;

	// Draw the side profile as a 2D shape (an upside-down U)
	const shape = new Shape();
	shape.moveTo(0, 0); // bottom-left of left leg
	shape.lineTo(legThickness, 0); // across the bottom of left leg
	shape.lineTo(legThickness, deskHeight - topThickness); // up the inside of left leg
	shape.lineTo(deskWidth - legThickness, deskHeight - topThickness); // across under the top
	shape.lineTo(deskWidth - legThickness, 0); // down the inside of right leg
	shape.lineTo(deskWidth, 0); // across the bottom of right leg
	shape.lineTo(deskWidth, deskHeight); // up the outside of right leg
	shape.lineTo(0, deskHeight); // across the top
	shape.lineTo(0, 0); // back down to start

	const deskGeometry = new ExtrudeGeometry(shape, {
		depth: deskDepth,
		bevelEnabled: false
	});
</script>

<T.LineSegments position={[-3, -2.4, -4.3]}>
	<T.Mesh>
		<T.BufferGeometry
			is={deskGeometry}
			oncreate={(ref) => {
				ref.center();
			}}
		/>
		<T.MeshBasicMaterial color="#1a1a1a" polygonOffset polygonOffsetFactor={1} />
	</T.Mesh>
	<T.EdgesGeometry
		args={[deskGeometry]}
		oncreate={(ref) => {
			ref.center();
		}}
	/>
	<T.LineBasicMaterial color="#353536" />
</T.LineSegments>
