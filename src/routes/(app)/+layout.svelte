<script lang="ts">
	import { asset } from '$app/paths';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<header>
	<a href={resolve('/')} class="mark">
		<img src={asset('/images/logo.svg')} alt="Logo mark" />

		<h1>David Woolf</h1>
		<p>Design engineer</p>
	</a>

	<img
		class="profile-mark"
		src={asset('/images/profile.png')}
		alt="Profile mark"
		width="32"
		height="32"
	/>

	<!-- <nav>
		<a
			href={resolve('/work/tempest')}
			class:active={(page.route.id ?? '').startsWith('/(app)/work')}>Work</a
		>
		<a
			href={resolve('/articles')}
			class:active={(page.route.id ?? '').startsWith('/(app)/articles')}>Notes</a
		>
	</nav> -->
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
		padding-block: var(--size-6);
		padding-inline: var(--size-8);
		position: fixed;
		z-index: var(--layer-2);

		.mark {
			align-items: center;
			display: grid;
			column-gap: var(--size-4);
			grid-template-columns: 2rem 1fr;
			grid-template-rows: auto auto;
		}

		img {
			grid-column: 1;
			grid-row: 1 / -1;
		}

		h1,
		p {
			color: var(--text-faded);
			font-size: var(--font-size-1);
			font-weight: var(--font-weight-5);
			line-height: var(--font-lineheight-1);
		}

		h1 {
			font-weight: var(--font-weight-6);
			grid-row: 1;
			grid-column: 2;
		}

		p {
			opacity: 0.6;
			grid-column: 2;
			grid-row: 2;
		}

		.profile-mark {
			border-radius: var(--radius-1);
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
