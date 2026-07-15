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
	// The crossfade + auto-advance + keyboard nav only apply to the desktop
	// layout; below 768px the slider is a manual snap-scroll carousel.
	let desktop = $state(false);

	$effect(() => {
		const query = window.matchMedia('(min-width: 768px)');
		const update = () => (desktop = query.matches);

		update();
		query.addEventListener('change', update);

		return () => query.removeEventListener('change', update);
	});

	$effect(() => {
		if (!desktop || paused) return;

		const id = setInterval(() => {
			active = (active + 1) % slides.length;
		}, interval);

		return () => clearInterval(id);
	});

	function go(index: number) {
		active = (index + slides.length) % slides.length;
		paused = true;
	}

	function onkeydown(event: KeyboardEvent) {
		if (!desktop) return;

		if (event.key === 'ArrowRight') {
			go(active + 1);
		} else if (event.key === 'ArrowLeft') {
			go(active - 1);
		} else {
			return;
		}

		event.preventDefault();
	}
</script>

<div
	class="slider"
	role="group"
	aria-roledescription="carousel"
	aria-label={label}
	onmouseleave={() => (paused = false)}
>
	<div class="buffer" aria-hidden="true"></div>
	{#each slides as slide, index (index)}
		<div class="slide" class:active={index === active}>
			<img src={slide.src} alt={slide.alt} />
		</div>
	{/each}
	<div class="buffer" aria-hidden="true"></div>

	<div class="dots">
		{#each slides as _, index (index)}
			<button
				type="button"
				class="dot"
				class:active={index === active}
				aria-label={`Show slide ${index + 1}`}
				aria-current={index === active}
				onclick={() => go(index)}
			></button>
		{/each}
	</div>
</div>

<svelte:body {onkeydown} />

<style>
	/* Mobile: a manual, snap-scrolling carousel that peeks the next slide. */
	.slider {
		display: flex;
		gap: var(--size-3);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding: var(--size-6);
		/*scroll-margin: var(--size-6);*/
		scroll-margin-inline-end: var(--size-6);
		scrollbar-width: none;
		margin-inline: calc(-1 * var(--size-6));

		@media (min-width: 768px) {
			aspect-ratio: 8 / 5;
			display: grid;
			gap: 0;
			overflow: visible;
			margin-inline-end: 0;
			padding-block-end: var(--size-4);
			position: relative;
			scroll-snap-type: none;
		}
	}

	.buffer {
		inline-size: var(--size-6);
		flex: none;

		@media (min-width: 768px) {
			display: none;
		}
	}

	.slide {
		aspect-ratio: 8 / 5;
		flex: 0 0 85%; /* ~15% of the next slide peeks to signal scrollability */
		scroll-snap-align: start;
		scroll-snap-stop: always;

		@media (min-width: 768px) {
			aspect-ratio: auto;
			flex: initial;
			grid-area: 1 / 1;
			opacity: 0;
			transition: opacity 500ms ease;
		}

		&.active {
			opacity: 1;
		}
	}

	.slide img {
		border-radius: var(--radius-1);
		block-size: 100%;
		display: block;
		inline-size: 100%;
		object-fit: cover;
	}

	.dots {
		display: none;

		@media (min-width: 768px) {
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
	}

	.dot {
		&.active {
			background-color: var(--text-bright);
			opacity: 1;
		}
		@media (min-width: 768px) {
			appearance: none;
			background-color: var(--text-faded);
			block-size: var(--size-2);
			border-radius: 9999px;
			cursor: pointer;
			inline-size: var(--size-2);
			opacity: 0.4;
			transition: all 150ms ease;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.slide {
			transition: none;
		}
	}
</style>
