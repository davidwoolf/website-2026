<script lang="ts">
	import Room from '$lib/room.svelte';
	import { Canvas } from '@threlte/core';
</script>

<div class="room">
	<Canvas>
		<Room />
	</Canvas>
</div>

<div class="description"></div>

<svelte:head>
	<title>David Woolf – Design Engineer</title>
</svelte:head>

<style>
	.room {
		position: relative;
		margin-block-start: -150px;
		z-index: var(--layer-1);
	}

	.description {
		max-inline-size: 600px;
		margin-inline: auto;
	}
</style>
