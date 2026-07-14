<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		children
	}: {
		title: Snippet;
		children: Snippet;
	} = $props();
</script>

<div class="component">
	<div class="brand">
		{@render title()}
	</div>
	<p>{@render children()}</p>
</div>

<style>
	.component {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: var(--size-4);

		@media (min-width: 768px) {
			align-items: end;
			flex-direction: row;
			gap: var(--size-14);
		}

		.brand {
			display: flex;
			align-items: center;
		}

		:global(h1) {
			color: var(--text-bright);
			font-size: var(--font-size-6);
			font-weight: var(--font-weight-7);
			line-height: var(--font-lineheight-0);
			margin-inline-start: calc(-1 * var(--size-6));
		}
	}

	p {
		color: var(--text-faded);
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-5);
		inline-size: max-content;
		line-height: var(--font-lineheight-2);
		text-align: center;

		@media (min-width: 768px) {
			text-align: left;
		}
	}
</style>
