<script lang="ts">
	import '../app.css';
	import { Canvas } from '@threlte/core';
	import TorusScene from '$lib/TorusScene.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import GlobeScene from '$lib/GlobeScene.svelte';

	let { children } = $props();

	function pad(n: number) {
		return n.toString().padStart(2, '0');
	}

	function formatDatetime(d: Date) {
		return (
			`${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}.` +
			`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
		);
	}

	let datetime = $state(formatDatetime(new Date()));

	$effect(() => {
		const id = setInterval(() => {
			datetime = formatDatetime(new Date());
		}, 1000);
		return () => clearInterval(id);
	});
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

<!-- <footer>
	<div class="location">
		<svg
			class="circle-text"
			width="120"
			height="120"
			viewBox="-60 -60 120 120"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<defs>
				<path id="datetime-path" d="M -50 0 A 50 50 0 0 1 50 0" fill="none" />
				<path id="lat-path" d="M -56 0 A 56 56 0 0 0 0 56" fill="none" />
				<path id="long-path" d="M 0 56 A 56 56 0 0 0 56 0" fill="none" />
			</defs>

			<text text-anchor="middle">
				<textPath href="#datetime-path" startOffset="50%">{datetime}</textPath>
			</text>
			<text text-anchor="middle">
				<textPath href="#lat-path" startOffset="50%">32.715736</textPath>
			</text>
			<text text-anchor="middle">
				<textPath href="#long-path" startOffset="50%">-117.161087</textPath>
			</text>
		</svg>

		<div class="globe">
			<Canvas>
				<GlobeScene />
			</Canvas>
		</div>
	</div>
</footer> -->

<style>
	header {
		display: flex;
		gap: var(--size-4);
		padding: var(--size-6);
		position: fixed;
		inset-block-start: 0;
		inset-inline-start: 0;
		inline-size: 100%;

		.logo {
			inline-size: var(--size-18);
			block-size: var(--size-10);
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

	footer {
		display: flex;
		justify-content: center;
		padding: var(--size-6);

		.location {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			place-items: center;

			.globe {
				block-size: var(--size-16);
				flex: none;
				inline-size: var(--size-16);
				grid-column: 1 / -1;
				grid-row: 1 / -1;
			}

			svg {
				grid-column: 1 / -1;
				grid-row: 1 / -1;
			}

			text {
				fill: var(--red-primary);
				font-family: var(--font-mono);
				font-size: 8px;
				font-weight: 500;
				letter-spacing: 0.22em;
				text-transform: uppercase;
			}
		}
	}
</style>
