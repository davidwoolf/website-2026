<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<article class="container">
		<h1>Articles</h1>

		<div class="list">
			{#each data.items as article (article.slug)}
				<section>
					<h2>
						<a href="/articles/{article?.slug}">
							{article?.title}
						</a>
					</h2>

					<p class="excerpt">
						{article?.excerpt}
					</p>

					<div class="meta">
						<a class="read-more" href="/articles/{article?.slug}">Read more</a>
					</div>
				</section>
			{/each}
		</div>
	</article>
</div>

<svelte:head>
	<title>Articles — David Woolf</title>
</svelte:head>

<style>
	.wrapper {
		padding-inline: var(--size-6);
	}

	.container {
		max-inline-size: var(--size-192);
		margin-inline: auto;
		padding-block: var(--size-12);

		@media (min-width: 640px) {
			padding-block: var(--size-24);
		}
	}

	h1 {
		color: var(--text-bright);
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-7);
		line-height: var(--font-lineheight-2);
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	section {
		padding-block: var(--size-8);
		border-block-end: var(--size-px) solid var(--border);
	}

	section:last-child {
		border-block-end: none;
	}

	h2 {
		color: var(--text-bright);
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		line-height: var(--font-lineheight-3);
	}

	h2 a:hover {
		text-decoration: underline;
	}

	.excerpt {
		color: var(--text-faded);
		font-size: var(--font-size-4);
		line-height: var(--font-lineheight-6);
		padding-block-start: var(--size-2);
	}

	.meta {
		align-items: center;
		display: flex;
		margin-block-start: var(--size-4);
	}

	.read-more {
		border-block-end: var(--size-px) solid currentColor;
		color: var(--text);
		font-weight: var(--font-weight-6);
		transition: all 200ms ease;
	}

	.read-more:hover {
		color: var(--yellow-primary);
	}
</style>
