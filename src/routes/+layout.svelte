<script lang="ts">
	import '../app.css';
	import { Canvas } from '@threlte/core';
	import TorusScene from '$lib/TorusScene.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="logo">
		<Canvas>
			<TorusScene cameraPosition={[0, -4, 2]} fov={36} />
		</Canvas>
	</div>
	<div>
		<h1>David Woolf</h1>
		<p>Designer and Engineer</p>
	</div>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		display: flex;
		gap: 16px;
		padding-block: 24px;
		padding-inline: 24px;

		.logo {
			width: 72px;
			height: 40px;
			flex: none;
			margin-block-start: -2px;
		}

		h1 {
			color: var(--text-bright);
			font-size: 15px;
			line-height: 145%;
		}

		p {
			color: var(--text-faded);
			font-size: 15px;
			line-height: 125%;
		}
	}
</style>
