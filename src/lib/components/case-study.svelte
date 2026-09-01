<script lang="ts">
	type Props = {
		href: string;
		title: string;
		description: string;
		action: string;
		highlight?: string;
	};
	let { href, title, description, action, highlight = 'black' }: Props = $props();
</script>

<a {href} style:--highlight={highlight}>
	<h2>{title}</h2>

	<p>{description}</p>

	<span>{action}</span>
</a>

<style>
	a {
		--case-study-border: color-mix(var(--highlight), transparent 80%);
		--case-study-gradient-1: color-mix(var(--highlight), transparent 90%);
		--case-study-gradient-2: color-mix(var(--highlight), transparent 100%);

		background: radial-gradient(
			87.08% 87.08% at 50% 26.25%,
			var(--case-study-gradient-1) 0%,
			var(--case-study-gradient-2) 100%
		);
		border: 1px solid var(--case-study-border);
		border-radius: var(--radius-2);
		box-shadow: var(--shadow-1);

		/* shared styles */
		align-items: center;
		aspect-ratio: 8 / 5;
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		justify-content: center;
		padding-inline: var(--size-16);
		text-align: center;
		transition: transform 200ms ease;

		&:hover {
			transform: scale(1.02) rotate(0.2deg);
		}
	}

	h2 {
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-8);
	}

	p {
		font-family: var(--font-serif);
		font-size: var(--font-size-2);
		font-style: var(--font-italic);
		text-wrap-style: balance;
		opacity: 0.8;
	}

	span {
		color: var(--highlight);
		font-size: var(--font-size-2);
		font-weight: var(--font-weight-6);
		margin-block-start: var(--size-5);
		text-decoration: underline;
	}
</style>
