<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	interface PostItem {
		title: string;
		slug: string;
		excerpt: string;
		tags: string[];
	}

	let { slug }: { slug: string } = $props();

	const articles = $derived((page.data.articles ?? []) as PostItem[]);
	const article = $derived(articles.find((item) => item.slug === slug));
</script>

{#if article}
	<h2>{article.title}</h2>
	<p>{article.excerpt}</p>
	<a href={resolve('/(app)/articles/[slug]', { slug: article.slug })}>Read the article</a>
{/if}

<style>
	h2 {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-7);
	}

	p {
		font-size: var(--font-size-1);
		font-family: var(--font-serif);
		margin-block-start: var(--size-1);
		opacity: 0.8;
	}

	a {
		align-items: center;
		background-color: var(--surface-bright);
		block-size: var(--size-7);
		border-radius: var(--radius-round);
		display: flex;
		inline-size: fit-content;
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-6);
		justify-content: center;
		margin-block-start: var(--size-3);
		padding-inline: var(--size-4);
	}
</style>
