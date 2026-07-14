<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<article class="post">
		{@html data.post}

		{#if data.references.length}
			<hr />

			<h2>References</h2>

			<ul class="references">
				{#each data.references as reference}
					<li>
						<a href={reference} target="_blank">{reference}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</article>
</div>

<svelte:head>
	<title>{data.title} — David Woolf</title>
	<meta name="description" content={data.excerpt} />
</svelte:head>

<style>
	.wrapper {
		padding-inline: var(--size-6);
	}

	.post {
		max-inline-size: var(--size-192);
		margin-inline: auto;
		padding-block: var(--size-12);

		@media (min-width: 640px) {
			padding-block: var(--size-24);
		}
	}

	/* ── Headings ─────────────────────────────────────────────────────────
	   NOTE: the destination font scale only exposes four sizes, so the
	   article's h1–h4 hierarchy is compressed compared with the original
	   Tailwind scale. Levels are differentiated with weight + spacing. */
	.post :global(h1) {
		color: var(--text-bright);
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-7);
		line-height: var(--font-lineheight-2);
		margin: 0;
	}

	.post :global(h2) {
		color: var(--text-bright);
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		line-height: var(--font-lineheight-3);
		margin: 0;
		padding-block-start: var(--size-8);
	}

	.post :global(h3) {
		color: var(--text-bright);
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		margin: 0;
		padding-block-start: var(--size-6);
	}

	.post :global(h4) {
		color: var(--text-bright);
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		margin-block-end: calc(-1 * var(--size-3));
		margin-block-start: 0;
		padding-block-start: var(--size-4);
	}

	/* ── Body text ────────────────────────────────────────────────────── */
	.post :global(p),
	.post :global(li) {
		color: var(--text);
		font-size: var(--font-size-4);
		line-height: var(--font-lineheight-6);
		margin: 0;
	}

	.post :global(p) {
		padding-block-start: var(--size-4);
	}

	.post :global(h2 + p),
	.post :global(figure + p) {
		padding-block-start: var(--size-2);
	}

	.post :global(h3 + p),
	.post :global(h4 + p) {
		padding-block-start: 0;
	}

	.post :global(ul) {
		margin: 0;
		padding-block-start: var(--size-3);
		padding-inline-start: var(--size-6);
	}

	.post :global(li) {
		padding-block-start: var(--size-1);
	}

	/* ── Links ────────────────────────────────────────────────────────── */
	.post :global(a) {
		color: var(--text-bright);
		text-decoration: underline;
		transition: all 200ms ease;
	}

	.post :global(a:hover) {
		color: var(--green-primary);
		text-decoration: none;
	}

	.post :global(sup a) {
		text-decoration: none;
	}

	.post :global(sup a:hover) {
		text-decoration: underline;
	}

	/* ── Media ────────────────────────────────────────────────────────── */
	.post :global(img) {
		border-radius: var(--size-2);
		display: block;
		margin-block: 0;
		margin-inline: auto;
		max-inline-size: 100%;
	}

	/* NOTE: articles embed <iframe src="/examples/...">. Those interactive
	   demo routes live in the old app and were NOT part of this migration,
	   so the embeds resolve to 404s here until /examples is migrated too. */
	.post :global(iframe) {
		aspect-ratio: 1 / 1;
		border: var(--size-px) solid var(--border);
		border-radius: var(--size-2);
		inline-size: 100%;
		margin-block-start: var(--size-4);

		@media (min-width: 768px) {
			aspect-ratio: 16 / 9;
		}
	}

	.post :global(figure) {
		margin: 0;
		padding-block: var(--size-6) var(--size-2);
	}

	/* ── Code ─────────────────────────────────────────────────────────── */
	.post :global(:is(h2, h3, h4, p, li, a, s, td) > code),
	.post :global(p > em > code) {
		background-color: var(--highlight);
		border-radius: var(--size-1);
		color: var(--text-bright);
		display: inline-block;
		font-size: 0.825em;
		font-style: normal;
		font-weight: var(--font-weight-5);
		padding: 0 0.2rem;
	}

	.post :global(pre) {
		background-color: var(--surface);
		border: var(--size-px) solid var(--border);
		border-radius: var(--size-2);
		color: var(--text);
		font-size: 0.875rem;
		font-weight: var(--font-weight-5);
		inline-size: 100%;
		margin-block: var(--size-6) var(--size-2);
		max-inline-size: 100%;
		overflow: scroll;
		padding: var(--size-4);
	}

	/* Syntax highlighting.
	   NOTE: the original used an emerald/slate scheme tuned for a light
	   background; approximated here with the dark-theme accent tokens. */
	.post :global(.hljs-keyword),
	.post :global(.hljs-built_in),
	.post :global(.hljs-params),
	.post :global(.hljs-tag),
	.post :global(.hljs-comment) {
		color: var(--text-faded);
	}

	.post :global(.hljs-name),
	.post :global(.hljs-attr),
	.post :global(.hljs-selector-tag),
	.post :global(.hljs-title),
	.post :global(.hljs-string),
	.post :global(.hljs-attribute) {
		color: var(--green-primary);
	}

	/* ── Tables & rules ───────────────────────────────────────────────── */
	.post :global(table) {
		margin-block: var(--size-4) 0;
	}

	.post :global(hr) {
		border: none;
		border-block-start: var(--size-px) solid var(--border);
		margin-block: var(--size-8) 0;
	}

	.post :global(cite) {
		font-style: normal;
	}

	/* ── References ───────────────────────────────────────────────────── */
	.references {
		font-size: 0.875rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.references a {
		color: var(--text);
		opacity: 0.8;
		word-break: break-all;
	}

	.references a:hover {
		text-decoration: underline;
	}
</style>
