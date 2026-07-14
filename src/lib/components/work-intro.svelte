<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<div class="component">
	{@render children()}
</div>

<style>
	.component {
		padding-block: var(--size-8) 0;

		@media (min-width: 640px) {
			padding-block: var(--size-16) 0;
		}
	}
</style>
