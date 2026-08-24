interface PostItem {
	title: string;
	slug: string;
	excerpt: string;
	tags: string[];
}

export async function load({ fetch }) {
	const res = await fetch('/list.json');

	// the home page still renders without the article blocks, so a bad list
	// shouldn't take the whole page down
	const articles: PostItem[] = res.status === 200 ? await res.json() : [];

	return { articles };
}
