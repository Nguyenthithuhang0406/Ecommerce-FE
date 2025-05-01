import LayoutBlog from "@/pages/blog/LayoutBlog";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { getBlogsByPage, getTotalPages } from "./helper.js";
import PaginationBlog from "./PaginationBlog";

const BlogList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [blogs, setBlogs] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const blogsPerPage = 3;

	useEffect(() => {
		const fetchedBlogs = getBlogsByPage(currentPage, blogsPerPage);
		setBlogs(fetchedBlogs);

		const total = getTotalPages(blogsPerPage);
		setTotalPages(total);
	}, [currentPage]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};
	return (
		<LayoutBlog>
			<div className="mb-7">
				<span>Trang chủ</span>
				<span>{" > "}</span>
				<span className="font-bold text-[#ff6347]">Tin tức</span>
			</div>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="space-y-8"
			>
				{blogs.map((blog, index) => (
					<BlogCard key={blog.id} blog={blog} index={index} />
				))}
			</motion.div>
			<PaginationBlog
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</LayoutBlog>
	);
};

export default BlogList;
