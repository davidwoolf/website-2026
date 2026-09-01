<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import LatLng from '$lib/components/lat-lng.svelte';
	import TorusScene from '$lib/TorusScene.svelte';
	import { Canvas } from '@threlte/core';
	import ArticleBlock from '$lib/components/article-block.svelte';
	import CaseStudy from '$lib/components/case-study.svelte';
	import Photos from '$lib/components/photos.svelte';
</script>

<!-- <div class="ruler"></div>
<div class="ruler-2"></div> -->

<div class="scroll-container">
	<div class="canvas">
		<div class="description" style:grid-column="1 / span 5" style:grid-row="1 / span 9">
			<p>
				<strong>Designer, engineer, builder.</strong> Previously at
				<span>
					<img src={asset('/images/tempest.svg')} alt="Tempest Logo" width="18" height="18" />
					<a href="https://tempestdx.com" target="_blank">Tempest</a>,
				</span>
				<span>
					<img src={asset('/images/koala.svg')} alt="Koala Logo" width="22" height="16" />
					<a href="https://chowly.com/solutions/branded-online-ordering/" target="_blank">Koala</a>,
				</span>
				and
				<span>
					<img
						src={asset('/images/flying-hippo.png')}
						alt="Flying Hippo Logo"
						width="26"
						height="16"
					/>
					<a href="https://flyinghippo.com" target="_blank">Flying Hippo</a>.
				</span>
				Now helping customers with their software needs directly.
				<a href="mailto:woolf.david@gmail.com">Reach out if you liked to talk.</a>
			</p>

			<p>
				I’m presently located in San Diego, CA with my dog Luka. I have over 15 year of experience
				working with clients directly, moving quickly at early-stage startups, and being responsible
				for shipping full products on my own.
			</p>
			<p>
				My work is driven by the respect that people’s time and energy are precious. The difference
				between feeling empowered and feeling frustrated often comes down to small details born out
				of the thinking from this respect.
			</p>
			<p>
				<strong>This site itself</strong> is an embodiment of what I enjoy: articles to read, work to
				explore, and interactivity you can discover. Move around, click, explore.
			</p>
			<p>
				– David <a href="https://bsky.app/profile/davidwoolf.me" target="_blank">
					<img src={asset('/images/bluesky.svg')} alt="Bluesky logo" width="18" />
				</a>
				<a href="mailto:woolf.david@gmail.com">
					<img src={asset('/images/email.svg')} alt="Email icon" width="18" />
				</a>
			</p>
		</div>

		<div class="globe">
			<div class="inner">
				<img src={asset('/ellipsoid.png')} alt="Ellipsoid" />
				<!-- <Canvas>
					<T.PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={36} />
					<EllipsoidScene
						color="#46B3E9"
						backgroundColor="#FBF9F8"
						groupPosition={[0, 0, 0]}
						groupScale={[1, 1, 0.01]}
					/>
				</Canvas> -->
			</div>
		</div>

		<div style:grid-column="1 / span 4" style:grid-row="17 / span 5">
			<ArticleBlock slug="anatomy-of-everyday-ui-layout" />
		</div>
		<div style:grid-column="5 / span 4" style:grid-row="12 / span 5">
			<ArticleBlock slug="anatomy-of-everyday-ui-color-light" />
		</div>
		<div style:grid-column="7 / span 2" style:grid-row="1 / span 3">
			<LatLng />
		</div>
		<!-- <div class="block" style:grid-column="11 / span 3" style:grid-row="1 / span 3">color block</div> -->
		<div class="case-study" style:grid-column="8 / span 4" style:grid-row="5 / span 6">
			<CaseStudy
				href="https://anatomyui.com"
				title="Anatomy UI"
				description="Gain deeper knowledge to making interfaces for the web"
				action="View project"
				highlight="#7916CA"
			/>
		</div>

		<div style:grid-column="15 / span 4" style:grid-row="2 / span 5">
			<ArticleBlock slug="anatomy-of-everyday-ui-text" />
		</div>
		<!-- <div class="block" style:grid-column="20 / span 4" style:grid-row="4 / span 5">friday</div> -->
		<div style:grid-column="13 / span 4" style:grid-row="8 / span 8">
			<Photos />
		</div>
		<div style:grid-column="10 / span 2" style:grid-row="14 / span 2">
			<Canvas>
				<TorusScene color="#C7C2C3" backgroundColor="#F7F4F3" />
			</Canvas>
		</div>
		<!-- <div class="block" style:grid-column="7 / span 4" style:grid-row="19 / span 5">sunset</div> -->
		<div class="eyeball" style:grid-column="12 / span 2" style:grid-row="20 / span 3">
			<img src={asset('/eyeball.png')} alt="Eyeball" />
		</div>

		<div class="case-study" style:grid-column="15 / span 4" style:grid-row="18 / span 5">
			<CaseStudy
				href={resolve('/work/tempest')}
				title="Tempest"
				description="Software orchestration for large engineering teams"
				action="Read case study"
				highlight="#163BCA"
			/>
		</div>
	</div>
</div>

<svelte:head>
	<title>David Woolf –Design Engineer</title>
</svelte:head>

<style>
	.scroll-container {
		block-size: 100vh;
		overflow: scroll;
		inline-size: 100wh;
	}

	.canvas {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
		grid-template-columns: repeat(24, var(--size-24));
		grid-template-rows: repeat(29, var(--size-12));
		padding-block-start: var(--size-32);
		padding-inline: var(--size-12);

		@media (min-width: 768px) {
			display: grid;
			gap: 0;
			block-size: max-content;
			inline-size: max-content;
			overflow: visible;
		}

		@media (min-width: 1024px) {
			padding-inline: var(--size-48) 0;
		}
	}

	.ruler {
		background-image: url('/images/ruler-x.svg');
		background-repeat: repeat-x;
		block-size: var(--size-2);
		inline-size: 100%;
		inset-block-start: 0;
		inset-inline-start: var(--size-2);
		opacity: 0.4;
		pointer-events: none;
		position: fixed;
	}

	.ruler-2 {
		background-image: url('/images/ruler-y.svg');
		background-repeat: repeat-y;
		block-size: calc(100% - var(--size-8));
		inline-size: var(--size-2);
		inset-block-start: var(--size-2);
		inset-inline-start: 0;
		opacity: 0.4;
		pointer-events: none;
		position: fixed;
	}

	.description {
		@media (min-width: 1024px) {
		}

		p {
			font-family: var(--font-serif);
			font-size: var(--font-size-2);
			line-height: var(--font-lineheight-6);
			text-wrap-style: pretty;

			& + p {
				margin-block-start: var(--size-4);
			}

			strong {
				font-style: italic;
				font-weight: var(--font-weight-6);
			}

			a {
				text-decoration: underline;
			}

			span {
				white-space: nowrap;
			}

			img {
				display: inline;
			}
		}
	}

	.globe {
		grid-column: 1 / span 3;
		grid-row: 12 / span 3;

		.inner {
			align-items: center;
			block-size: 100%;
			display: flex;
			inline-size: 100%;
			justify-content: center;
		}

		img {
			max-inline-size: 144px;
		}
	}

	/*.block {
		align-items: center;
		background-color: white;
		display: flex;
		justify-content: center;
	}*/

	.eyeball {
		align-items: center;
		display: flex;
		justify-content: center;
		img {
			max-inline-size: 100px;
		}
	}

	.case-study {
		display: flex;
		align-items: center;
	}
</style>
