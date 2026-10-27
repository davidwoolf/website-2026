// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Noto Sans',
			cssVariable: '--font-sans',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			// wdth 75 is condensed (font-stretch: condensed), 100 is normal width
			options: { experimental: { variableAxis: { wdth: [75, 100] } } },
			fallbacks: ['sans-serif'],
		},
	],
});
