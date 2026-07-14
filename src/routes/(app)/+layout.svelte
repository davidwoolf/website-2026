<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<header>
	<div>
		<h1>David Woolf</h1>
		<p>Design engineer</p>
	</div>

	<nav>
		<a href={resolve('/work/tempest')} class:active={(page.route.id ?? '').startsWith('/(app)/work')}
			>Work</a
		>
		<a href={resolve('/articles')}>Notes</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		align-items: end;
		display: flex;
		gap: var(--size-4);
		inset-block-start: 0;
		inset-inline-start: 0;
		inline-size: 100%;
		justify-content: space-between;
		padding-block: var(--size-4);
		padding-inline: var(--size-6);
		position: relative;
		z-index: var(--layer-2);

		@media (min-width: 640px) {
			padding-block: var(--size-9);
			padding-inline: var(--size-12);
		}

		h1,
		p,
		a {
			color: var(--text-faded);
			font-size: var(--font-size-1);
			font-weight: var(--font-weight-5);
			line-height: 125%;
		}

		h1 {
			color: var(--text-bright);
			line-height: 145%;
		}

		nav {
			display: flex;
			gap: var(--size-8);

			a {
				transition: all 200ms ease;
			}

			a.active,
			a:hover {
				color: var(--text-bright);
			}
		}
	}
</style>
