<script lang="ts">
	import WorkHeader from '$lib/components/work-header.svelte';
	import WorkIntro from '$lib/components/work-intro.svelte';
	import Slider from '$lib/components/slider.svelte';
	import tables from '$lib/assets/work/tempest/tables.png';
	import classifications from '$lib/assets/work/tempest/classifications.png';
	import recipe from '$lib/assets/work/tempest/recipe.png';
	import catalog from '$lib/assets/work/tempest/catalog.png';
	import project from '$lib/assets/work/tempest/project.png';
	import resources from '$lib/assets/work/tempest/resources.png';
	import variables from '$lib/assets/work/tempest/variables.png';

	const slides = [
		{
			src: recipe,
			alt: 'Tempest Recipes planner for the Marketing Website recipe, arranging global resources and deployment environments'
		},
		{
			src: catalog,
			alt: 'Tempest Deploy view showing a grid of deployable application cards with icons, details, and owning teams'
		},
		{
			src: project,
			alt: 'Tempest project Deployments view listing recent deployments with their authors, branches, environments, and status'
		},
		{
			src: resources,
			alt: 'Tempest Resources catalog listing repositories with their teams, owners, types, projects, and tags'
		},
		{
			src: variables,
			alt: 'Tempest Variables screen for managing environment variables, secrets, and cryptographic assets'
		}
	];
</script>

<div class="wrapper">
	<article>
		<header>
			<WorkHeader>
				{#snippet title()}
					<svg
						width="84"
						height="86"
						viewBox="0 0 84 86"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.4"
							d="M25.8379 43.0179C28.6939 40.5985 31.4707 40.3877 33.292 40.6407L35.4986 32.5602C34.2422 32.0384 23.3145 28.1326 2.70508 40.4509V50.4553C7.18172 47.4455 11.1463 45.2791 14.6041 43.7295C11.1727 49.828 9.08747 58.1509 8.37479 68.6191L16.6101 73.363C16.8794 64.5446 18.4578 49.2746 25.8432 43.0179H25.8379ZM50.3592 56.5116C46.8328 55.2519 45.2649 52.959 44.5681 51.2565L36.4594 53.3859C36.6336 54.7353 38.703 66.1365 59.6926 77.8012L68.3714 72.799C63.5199 70.4323 59.6609 68.0868 56.5885 65.8729C63.5938 65.7886 71.8555 63.4325 81.2892 58.8151V49.322C73.5026 53.4966 59.4761 59.7691 50.3539 56.5116H50.3592ZM34.2 56.8332C33.5295 53.154 34.7332 50.6503 35.8629 49.1955L29.9609 43.2498C28.8787 44.0721 20.0257 51.5727 20.4058 75.5505L29.0793 80.5527C28.7045 75.1762 28.8101 70.6643 29.1954 66.9008C32.7694 72.915 38.9459 78.8818 47.6669 84.7326L55.9022 79.9887C48.3901 75.3449 35.9368 66.3473 34.2 56.8332ZM49.8049 28.5595C50.4753 32.2387 49.2717 34.7424 48.142 36.1972L54.044 42.1429C55.1262 41.3206 63.9792 33.8253 63.5991 9.84223L54.9256 4.84006C55.3004 10.2165 55.1948 14.7284 54.8094 18.4919C51.2355 12.4777 45.059 6.51096 36.338 0.660156L28.1027 5.40405C35.62 10.0478 48.0681 19.0454 49.8049 28.5595ZM69.4008 41.6632C72.8322 35.5647 74.9174 27.2418 75.6301 16.7736L67.3947 12.0297C67.1255 20.8481 65.5471 36.1129 58.1617 42.3748C55.3057 44.7942 52.5289 45.0051 50.7076 44.752L48.501 52.8325C49.0183 53.0486 51.1616 53.834 54.9361 53.834C60.3577 53.834 69.1421 52.2052 81.2945 44.9471V34.9427C76.8179 37.9525 72.8533 40.1188 69.3955 41.6632H69.4008ZM33.6457 28.8811C37.1721 30.1408 38.74 32.4337 39.4368 34.1363L47.5455 32.0068C47.3712 30.6574 45.3019 19.2562 24.3123 7.59152L15.6335 12.5937C20.485 14.9604 24.344 17.306 27.4164 19.5198C20.4111 19.6041 12.1493 21.9603 2.71564 26.5776V36.0707C10.5023 31.8961 24.5287 25.6236 33.651 28.8811H33.6457Z"
							stroke="#086FD7"
							style="stroke:#086FD7;stroke:color(display-p3 0.0314 0.4353 0.8431);stroke-opacity:1;"
							stroke-width="1.12097"
						/>
					</svg>

					<h1>Tempest<br />Platform</h1>
				{/snippet}

				Software orchestration for<br />large engineering teams
			</WorkHeader>
		</header>

		<section>
			<WorkIntro>
				<div class="intro-media">
					<Slider {slides} label="Tempest interface highlights" />
				</div>

				<p>
					The Tempest Developer Platform helps engineering teams manage their growing catalog of
					deployed software, while also empowering teams without a dev-ops engineer to deploy code
					safely and effectively.
				</p>
			</WorkIntro>

			<h2>Table Navigation</h2>
			<p>
				Tables regularly display thousands of rows. A combination of structured columns, scannable
				service icons, tags, and profile pictures assist with taking in content quickly.
			</p>

			<img
				class="full-width"
				src={tables}
				alt="Tempest table navigation with structured columns, service icons, tags, and profile pictures"
			/>

			<h2>Classification</h2>
			<p>
				Large organizations require many signals for classifying both software and teams. In a
				developer platform, the use of these values in scheduled reporting makes keeping them up to
				date even more important. Color, iconography, and editing that supports 1 to 1000s of items
				makes this task realistic.
			</p>

			<img
				class="full-width"
				src={classifications}
				alt="Tempest classification interface using color, iconography, and bulk editing"
			/>

			<h2>Design system</h2>

			<p>
				The design system starts with type, color, and iconography. These (along with design tokens)
				make spinning up high fidelity views in Figma easy, but are only a tiny percentage of the
				story. With software, it’s common that the “ideal” design system lives in design, while the
				real design system lives in code. Here, we explore how the design system exists between the
				two and how to scale a design to thousands of views.
			</p>
		</section>
	</article>
</div>

<style>
	.wrapper {
		padding-inline: var(--size-6);
	}

	article {
		max-inline-size: var(--size-192);
		margin-inline: auto;
		padding-block: var(--size-12);

		@media (min-width: 640px) {
			padding-block: var(--size-24);
		}
	}

	header {
		inline-size: fit-content;
		margin-inline: auto;
	}

	section {
		h2 {
			color: var(--text-bright);
			display: flex;
			align-items: center;
			gap: var(--size-4);
			font-size: var(--font-size-2);
			font-weight: var(--font-weight-5);
			line-height: var(--font-lineheight-6);
			padding-block: var(--size-12) 0;
			text-align: center;

			@media (min-width: 640px) {
				padding-block: var(--size-24) 0;
			}

			&::before,
			&::after {
				background-color: var(--border);
				block-size: var(--size-px);
				content: '';
				flex: 1;
			}
		}

		p {
			font-size: var(--font-size-2);
			line-height: var(--font-lineheight-6);
			text-align: center;
		}

		h2 + p {
			color: var(--text-faded);
			font-size: var(--font-size-1);
			margin-inline: auto;
			max-inline-size: 64ch;
		}

		.full-width {
			display: block;
			inline-size: 100%;
			block-size: auto;
			margin-block: var(--size-8) 0;
		}
	}

	.intro-media {
		margin-block-end: var(--size-8);
	}
</style>
