<script lang="ts">
	import '../app.css';
	import { asset } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/images/profile.png')} />
</svelte:head>

{@render children()}
