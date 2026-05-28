<script lang="ts">
	import Room from '$lib/room.svelte';
	import { Canvas } from '@threlte/core';
</script>

<div class="room">
	<Canvas>
		<Room />
	</Canvas>
</div>

<div class="description">
	<p>
		I’m David, a designer and software engineer. I started making little, fake websites when I was
		12 or 13, whatever popped into my head. My stack was a 2001 Dell computer, Microsoft Notepad,
		HTML, and CSS.
	</p>
	<p>
		I saved up for a MacBook and had enough by age 17 to get one. My stack upgraded to Pixelmator
		and Smultron editor (remember, the Strawberry Icon?) I used the hell out of that computer,
		learning real JavaScript and WordPress.
	</p>
	<p>
		My first business was selling HTML and later WordPress themes on Themeforest. One of them (a
		music theme) actually took off and started my freelance career: small theme tweaks for customers
		in exchange for a hundred dollars here and there.
	</p>

	<p>
		At 22 I moved from Cedar Rapids to Des Moines, Iowa to work as a front-end developer at Flying
		Hippo, a design agency. I spent the next 7 years making WordPress sites and learning how to ship
		quickly and professionally in a team. During that time, I also discovered React and started my
		move from websites to web app development.
	</p>
	<p>
		After Flying Hippo I started my own company: Theory. I primarily serviced various accounts with
		web design and development business while also developing first full app. Index didn’t end up
		being a successful app, but I proved that I can plan and ship end to end software, market it,
		and pencil out business requirements like free trials, licensing, support, and upgrades.
	</p>
	<p>
		Theory closed shop in 2022 and I joined my first real startup as a senior software engineer. At
		Koala, I shipped features weekly to a restaurant ordering platform that saw over 1 million
		visitors weekly.
	</p>
	<p>
		Koala was acquired by Chowly a year after I joined, and after 8 months helping get the companies
		joined together, I moved on to Tempest, making enterprise developer platform software. We solved
		some hard problems in that space, but after some market headwinds, we pivoted to AI
		orchestration software, which is where Friday Studio comes from.
	</p>
</div>

<style>
	.room {
		position: relative;
		margin-block-start: -150px;
	}

	.description {
		max-inline-size: 600px;
		margin-inline: auto;

		p {
			font-size: 14px;
			padding-block: 8px;
		}
	}
</style>
