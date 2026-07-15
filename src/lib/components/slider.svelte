<script lang="ts">
	interface Slide {
		src: string;
		alt: string;
	}

	let {
		slides,
		label = 'Highlights',
		interval = 6500
	}: {
		slides: Slide[];
		label?: string;
		interval?: number;
	} = $props();

	let active = $state(0);
	// Selecting a slide pauses auto-advance until the pointer leaves the slider.
	let paused = $state(false);

	$effect(() => {
		if (paused) return;

		const id = setInterval(() => {
			active = (active + 1) % slides.length;
		}, interval);

		return () => clearInterval(id);
	});
</script>

<div
	class="slider"
	role="group"
	aria-roledescription="carousel"
	aria-label={label}
	onmouseleave={() => (paused = false)}
>
	{#each slides as slide, index (index)}
		<div class="slide" class:active={index === active}>
			<img src={slide.src} alt={slide.alt} />
		</div>
	{/each}

	<div class="dots">
		{#each slides as _, index (index)}
			<button
				type="button"
				class="dot"
				class:active={index === active}
				aria-label={`Show slide ${index + 1}`}
				aria-current={index === active}
				onclick={() => {
					active = index;
					paused = true;
				}}
			></button>
		{/each}
	</div>
</div>

<style>
	.slider {
		aspect-ratio: 8 / 5;
		display: grid;
		padding-block-end: var(--size-4);
		position: relative;
	}

	/* All slides stack in a single grid cell and crossfade via opacity. */
	.slide {
		grid-area: 1 / 1;
		opacity: 0;
		transition: opacity 500ms ease;
	}

	.slide.active {
		opacity: 1;
	}

	.slide img {
		border-radius: var(--radius-1);
		block-size: 100%;
		display: block;
		inline-size: 100%;
		object-fit: cover;
	}

	.dots {
		align-items: center;
		background-color: var(--surface-bright);
		block-size: var(--size-9);
		border-radius: 9999px;
		border: var(--size-1) solid var(--surface-dark);
		display: flex;
		gap: var(--size-2);
		inline-size: fit-content;
		inset-block-end: calc(-1 * var(--size-1));
		inset-inline: 0;
		justify-content: center;
		margin-inline: auto;
		padding: var(--size-2) var(--size-3);
		position: absolute;
	}

	.dot {
		appearance: none;
		background-color: var(--text-faded);
		block-size: var(--size-2);
		border-radius: 9999px;
		cursor: pointer;
		inline-size: var(--size-2);
		opacity: 0.4;
		transition: all 150ms ease;
	}

	.dot.active {
		background-color: var(--text-bright);
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.slide {
			transition: none;
		}
	}
</style>
