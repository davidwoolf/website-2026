<script lang="ts">
	let { latitude = '32.715736', longitude = '-117.161087' } = $props();

	const uid = $props.id();

	function pad(n: number) {
		return n.toString().padStart(2, '0');
	}

	function formatDatetime(d: Date) {
		return (
			`${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}.` +
			`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
		);
	}

	let datetime = $state(formatDatetime(new Date()));

	$effect(() => {
		const id = setInterval(() => {
			datetime = formatDatetime(new Date());
		}, 1000);
		return () => clearInterval(id);
	});
</script>

<div class="location">
	<svg
		class="circle-text"
		width="120"
		height="120"
		viewBox="-60 -60 120 120"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<defs>
			<path id="{uid}-datetime-path" d="M -46 0 A 46 46 0 0 1 46 0" fill="none" />
			<path id="{uid}-lat-path" d="M -51.5 0 A 51.5 51.5 0 0 0 0 51.5" fill="none" />
			<path id="{uid}-long-path" d="M 0 51.5 A 51.5 51.5 0 0 0 51.5 0" fill="none" />
		</defs>

		<!-- dial, from a 108x108 artboard centred on (53.85, 53.85) -->
		<path
			class="dial"
			transform="translate(-53.85 -53.85)"
			d="M54.5051 20.0756L54.7219 20.0785C72.8504 20.538 87.4267 35.2813 87.6233 53.474H87.6282V54.474H87.6194L87.6165 54.7181C87.1538 72.9702 72.2134 87.6243 53.8499 87.6244L52.9778 87.6127C35.0155 87.1574 20.5375 72.6804 20.0823 54.7181L20.0793 54.474H20.0715V53.474H20.0764C20.173 44.5387 23.7366 36.4359 29.4885 30.4486L29.4875 30.4476L29.6008 30.3334C35.6658 24.0797 44.1276 20.1655 53.5051 20.0717V20.0677H54.5051V20.0756ZM31.0481 77.391C36.8713 83.0317 44.779 86.5295 53.5051 86.6195V66.9164C50.2195 66.8313 47.2365 65.534 44.9846 63.4554L31.0481 77.391ZM62.5989 63.559C60.4328 65.5116 57.6128 66.7522 54.5051 66.9056V86.6166C63.0525 86.449 70.7963 83.0098 76.5393 77.4994L62.5989 63.559ZM66.9104 54.474C66.7569 57.7216 65.4161 60.6568 63.3157 62.8617L77.2493 76.7953C82.9131 71.021 86.4572 63.1622 86.6204 54.474H66.9104ZM21.0793 54.474C21.2414 63.1062 24.741 70.9202 30.3411 76.684L44.2776 62.7484C42.2385 60.5567 40.9412 57.6663 40.7903 54.474H21.0793ZM53.8499 41.7709C47.181 41.771 41.7748 47.1772 41.7747 53.8461C41.7747 60.5151 47.1809 65.9221 53.8499 65.9222C60.5189 65.9222 65.926 60.5151 65.926 53.8461C65.9259 47.1772 60.5188 41.7709 53.8499 41.7709ZM30.1956 31.1556C24.6245 36.9618 21.1729 44.8148 21.0764 53.474H40.7795C40.8696 50.2548 42.1235 47.3267 44.135 45.0951L30.1956 31.1556ZM63.4583 44.9808C65.5315 47.2265 66.8286 50.1989 66.9202 53.474H86.6233C86.5262 44.7587 83.0295 36.8613 77.3948 31.0443L63.4583 44.9808ZM53.5051 21.0717C44.7048 21.1624 36.7365 24.7205 30.8997 30.4457L44.8342 44.3802C47.1029 42.2189 50.1453 40.8618 53.5051 40.7748V21.0717ZM54.5051 40.7865C57.6863 40.9435 60.5668 42.2399 62.7522 44.2728L76.6877 30.3373C70.9301 24.7432 63.1264 21.2446 54.5051 21.0756V40.7865Z"
		/>

		<text text-anchor="middle">
			<textPath href="#{uid}-datetime-path" startOffset="50%">{datetime}</textPath>
		</text>
		<text text-anchor="middle">
			<textPath href="#{uid}-lat-path" startOffset="50%">{latitude}</textPath>
		</text>
		<text text-anchor="middle">
			<textPath href="#{uid}-long-path" startOffset="50%">{longitude}</textPath>
		</text>
	</svg>
</div>

<style>
	.location {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		place-items: center;

		svg {
			grid-column: 1 / -1;
			grid-row: 1 / -1;
		}

		.dial {
			fill: #9c8875;
			opacity: 0.3;
		}

		text {
			fill: var(--red-primary, var(--yellow-primary));
			font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
			font-size: 8px;
			font-weight: 500;
			letter-spacing: 0.22em;
			text-transform: uppercase;
		}
	}
</style>
