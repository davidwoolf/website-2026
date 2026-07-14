<script lang="ts">
	import { assets } from '$app/paths';
	import { marked } from 'marked';

	interface Section {
		company: string;
		description: string;
		// Optional: omitted for non-job sections like Projects and Skills.
		icon?: string;
		color?: string;
		position?: string;
		startDate?: string;
		endDate?: string;
	}

	// Render a markdown block to HTML so descriptions can use links, bold, etc.
	function md(text: string): string {
		return marked.parse(text) as string;
	}

	const sections: Section[] = [
		{
			company: 'Tempest',
			position: 'Lead designer and senior front-end engineer',
			icon: 'tempest.svg',
			color: '#171717',
			startDate: 'Feb 2024',
			endDate: 'Present',
			description: `UI designer and front-end engineer for Friday Studio, an agent orchestration platform competing against OpenClaw and Claude Cowork. Customers range from Fortune 500 to SMB.

Designed and implemented rich, structured output in the Friday Studio realtime chat interface including streaming markdown, calendar schedules, and OAuth login cards.

Lead product and design of a team of three, implementing realtime chat integration between Friday Studio, Slack, Discord, Teams, and Telegram.

Implemented performant, real-time coordination between the Tempest front-end and GraphQL layer using Tanstack Query and an SSE event system.

Planned, designed, and implemented the relationship graph for Tempest, rendered as interactive parent/child DAG nodes with client-side filtering, and depth controls. Built with Apache AGE, the D3 Tree Hierarchy layout algorithm, and Web Workers for offloading relationship processing to keep rendering performant.

Implemented, managed, and kept both our Friday Studio and Tempest DX design system in-sync between Figma and code.

Built the design system's interactive components on top of Melt UI, a headless Svelte component library, to support drop-in comboboxes, drop downs, selects, dialogs, forms, tooltips, toast messages, page layouts, and a custom icon set.`
		},
		{
			company: 'Koala (acq by Chowly)',
			position: 'Senior front-end engineer',
			icon: 'koala.svg',
			color: '#FFDB34',
			startDate: 'Feb 2022',
			endDate: 'Dec 2023',
			description: `Built new features for our React and Next.js food ordering app serving 1M weekly sessions, redesigned cart, and cross-sell product recommendations.

Designed and developed Commerce+, a feature-rich block editor CMS interface in React supporting text, images, columns, slides, and product modules — led the project end-to-end over 6 months, resulting in 2 new enterprise launches within 3 months of release.

Consolidated hundreds of brand configuration options into a 10-field onboarding form in React, reducing customer onboarding from days to minutes.

Built new mobile interfaces and React hooks consumed by Koala's Android app, enabling 6 new enterprise brand app launches.

Led internal knowledge sharing including a "Design Systems for Developers" presentation for the front-end team.`
		},
		{
			company: 'Theory',
			position: 'Founder',
			icon: 'theory.svg',
			color: '#424EEE',
			startDate: 'Aug 2020',
			endDate: 'Feb 2022',
			description: `Designed and implemented a vehicle lookup API for LunoLife matching makes, models, and years to product SKUs — contributed to a $1M sales increase in the first year.

Redesigned and developed DSS Games' e-commerce site, improving sales and lead generation.

Conceived, designed, and built Index, a React-powered drop-in replacement for the WordPress dashboard.

Released Leaf, an open source design system and component library for WordPress developers built on React.`
		},
		{
			company: 'Flying Hippo',
			position: 'Senior front-end engineer',
			icon: 'flying-hippo.png',
			color: '#FF484A',
			startDate: 'Nov 2013',
			endDate: 'Aug 2020',
			description: `Led the front-end team, providing mentorship and technical guidance across 30+ website launches for enterprise and academic clients.

Authored and standardized accessibility documentation for all of Iowa State University's digital projects.

Created internal tooling to streamline site development workflows.

Championed adoption of React for new projects, driving larger and more complex engagements for the agency.`
		},
		{
			company: 'Projects',
			description: `**Anatomy UI** — Creator of [anatomyui.com](https://anatomyui.com), an interactive reference for front end engineers on building UI for the web

**Melt UI** — Contributor to Melt UI, a headless accessibility-focused component library for Svelte`
		},
		{
			company: 'Skills',
			description: `**Languages:** TypeScript, JavaScript, CSS, HTML5, GraphQL, SQL, Git

**Frameworks & Libraries:** Svelte, SvelteKit, React, Next.js, Remix, TanStack, Vercel AI SDK, Tailwind, Styled Components, Jest, React Testing Library, Vite, Node, Express, Deno

**Tools & Platforms:** Supabase, Figma, Linear, Claude Code, Vercel, Webpack, SWC, Playwright, GitHub Actions

**Design:** Design systems, component libraries, brand identity, marketing design`
		}
	];
</script>

<div class="resume">
	<div class="heading heading--screen">
		<h1>Resume</h1>
	</div>

	<div class="heading heading--print">
		<h1>David Woolf</h1>
	</div>

	<div>
		<p class="lead">User interface designer and front-end engineer</p>
		<p class="muted">
			San Diego, California • woolf.david@gmail.com <span class="phone">• 319.551.7658</span>
		</p>
	</div>

	{#each sections as section, index (index)}
		{#if index > 0}
			<div role="presentation" aria-hidden="true" class="divider"></div>
		{/if}
		<article>
			<div>
				<div class="company">
					{#if section.icon}
						<div class="icon" style:background={section.color}>
							<img src="{assets}/logos/{section.icon}" alt={section.company} />
						</div>
					{/if}
					<h2>{section.company}</h2>
				</div>
				{#if section.position || section.startDate || section.endDate}
					<div class="role">
						{#if section.position}
							<p class="position">{section.position}</p>
						{/if}
						{#if section.startDate || section.endDate}
							<p class="muted">{section.startDate} — {section.endDate}</p>
						{/if}
					</div>
				{/if}
			</div>

			<div class="section-description">
				{@html md(section.description)}
			</div>
		</article>
	{/each}
</div>

<svelte:head>
	<title>Resume — David Woolf</title>
</svelte:head>

<style>
	.resume {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
		margin-inline: auto;
		/* NOTE: original was max-w-5xl (64rem); no size token goes past 48rem
		   (--size-192), so this is a literal to preserve the two-column width. */
		max-inline-size: 64rem;
		padding-block: var(--size-12);
		padding-inline: var(--size-6);

		@media (min-width: 768px) {
			column-gap: var(--size-24);
			display: grid;
			grid-template-columns: 1fr 2fr;
			padding-inline: var(--size-12);
			row-gap: var(--size-12);
		}
	}

	h1 {
		color: var(--text-bright);
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-7);
		line-height: var(--font-lineheight-2);
	}

	.lead {
		color: var(--text-bright);
		font-weight: var(--font-weight-5);
	}

	.muted {
		color: var(--text-faded);
	}

	article {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
	}

	.company {
		align-items: center;
		display: flex;
		gap: var(--size-4);
	}

	.company h2 {
		color: var(--text-bright);
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
	}

	/* NOTE: chip colors are the source brand hex values, picked for a light
	   theme. On this dark surface the near-black Tempest chip (#171717) all but
	   disappears — flagged, not adjusted. */
	.icon {
		align-items: center;
		block-size: var(--size-8);
		border-radius: var(--size-2);
		display: flex;
		flex: none;
		inline-size: var(--size-8);
		justify-content: center;
	}

	.icon img {
		flex: none;
		inline-size: var(--size-5);
		object-fit: contain;
	}

	.role {
		padding-block-start: var(--size-4);
	}

	.position {
		color: var(--text);
		font-weight: var(--font-weight-5);
		line-height: var(--font-lineheight-1);
		text-wrap: balance;
	}

	.section-description {
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		padding-block-start: var(--size-4);

		@media (min-width: 768px) {
			padding-block-start: 0;
		}
	}

	.section-description :global(p) {
		color: var(--text);
		font-size: var(--font-size-4);
		line-height: var(--font-lineheight-6);
		margin: 0;
	}

	.section-description :global(strong) {
		color: var(--text-bright);
		font-weight: var(--font-weight-6);
	}

	.section-description :global(a) {
		text-decoration: underline;
		transition: all 0.2s ease;
	}

	.section-description :global(a:hover) {
		opacity: 0.6;
	}

	.divider {
		border-block-end: var(--size-px) solid var(--border);
		grid-column: 1 / -1;
	}

	/* Print: swap the "Resume" title for the name, reveal the phone number, and
	   drop the on-screen chrome (icons + dividers). */
	.heading--print,
	.phone {
		display: none;
	}

	@media print {
		.heading--screen,
		.divider,
		.icon {
			display: none;
		}

		.heading--print {
			display: block;
		}

		.phone {
			display: inline;
		}
	}
</style>
