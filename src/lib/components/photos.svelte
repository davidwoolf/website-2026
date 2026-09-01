<script lang="ts">
	import { asset } from '$app/paths';
</script>

<div class="component">
	<img src={asset('/images/grid/corn.png')} alt="Corn" />
	<img src={asset('/images/grid/paris.png')} alt="Paris" />
	<img src={asset('/images/grid/dog.png')} alt="Dog" />
	<img src={asset('/images/grid/west.png')} alt="West" />
	<img src={asset('/images/grid/berlin.png')} alt="Berlin" />
</div>

<style>
	.component {
		aspect-ratio: 1;
		position: relative;
		inline-size: 100%;
	}

	img {
		border-radius: var(--radius-3);
		border: 2px solid var(--surface);
		position: absolute;
	}

	img:nth-child(1) {
		inline-size: 30.8%;
		inset-block-start: 21.24%;
		inset-inline-start: 0;
	}

	img:nth-child(2) {
		inline-size: 62.95%;
		inset-block-start: 0;
		inset-inline-start: 16.06%;
	}

	img:nth-child(3) {
		inline-size: 41.96%;
		inset-block-start: 10.36%;
		inset-inline-end: 0;
	}

	img:nth-child(4) {
		inline-size: 44.56%;
		inset-block-start: 39.37%;
		inset-inline-start: 25.9%;
		z-index: -1;
	}

	img:nth-child(5) {
		inset-block-end: 0;
		inline-size: 41.96%;
		inset-inline-end: 20.98%;
	}
</style>
