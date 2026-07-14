<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error">
	<h1>{page.status}: {page.error?.message}</h1>

	<a href="/">go home</a>
</div>

<style>
	.error {
		align-items: center;
		block-size: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		justify-content: center;
		padding-block: var(--size-24);
		text-align: center;
	}

	h1 {
		color: var(--text-bright);
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-7);
		line-height: var(--font-lineheight-2);
	}

	a {
		border-block-end: var(--size-px) solid currentColor;
		color: var(--text);
		font-weight: var(--font-weight-6);
		transition: all 200ms ease;
	}

	a:hover {
		color: var(--green-primary);
	}
</style>
