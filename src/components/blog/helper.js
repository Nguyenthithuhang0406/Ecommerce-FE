import { blogData } from "./blogData";

export const getBlogBySlug = (slug) => {
	return blogData.find((blog) => blog.slug === slug);
};

export const getRelatedBlogs = (currentBlog, limit = 3) => {
	return blogData
		.filter(
			(blog) =>
				blog.id !== currentBlog.id &&
				(blog.category === currentBlog.category ||
					blog.tags.some((tag) => currentBlog.tags.includes(tag)))
		)
		.slice(0, limit);
};

export const getBlogsByPage = (page = 1, perPage = 3) => {
	const startIndex = (page - 1) * perPage;
	const endIndex = startIndex + perPage;
	return blogData.slice(startIndex, endIndex);
};

export const getTotalPages = (perPage = 3) => {
	return Math.ceil(blogData.length / perPage);
};

export const getCategories = () => {
	const categories = {};

	blogData.forEach((blog) => {
		if (categories[blog.category]) {
			categories[blog.category]++;
		} else {
			categories[blog.category] = 1;
		}
	});

	return Object.entries(categories).map(([name, count]) => ({
		name,
		count,
	}));
};
export const getPopularTags = () => {
	const tags = {};

	blogData.forEach((blog) => {
		blog.tags.forEach((tag) => {
			if (tags[tag]) {
				tags[tag]++;
			} else {
				tags[tag] = 1;
			}
		});
	});

	return Object.entries(tags)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);
};
