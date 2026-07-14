import { error } from '@sveltejs/kit';

// Articles are static content, so prerender them to plain HTML at build time
// (matching the original site's fully-prerendered setup).
export const prerender = true;

export async function load({ fetch }) {
	const res = await fetch(`/list.json`);

	if (res.status === 404) {
		throw error(404, 'page not found');
	}

	if (res.status !== 200) {
		throw error(500, 'something went wrong');
	}

	return {
		items: await res.json()
	};
}
