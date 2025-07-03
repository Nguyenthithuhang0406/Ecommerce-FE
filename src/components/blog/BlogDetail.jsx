import React from "react";
import LayoutBlog from "@/pages/blog/LayoutBlog";
import { blogContent, blogData } from "./blogData";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
const BlogDetail = () => {
	const navigate = useNavigate();
	const slug = useParams().slug;
	const blog = blogData.find((blog) => blog.slug === slug);
	const content = blogContent[slug] || [];

	return (
		<LayoutBlog>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="text-sm text-gray-500">
					<button
						className="hover:text-[#ff6347] duration-300 cursor-pointer"
						onClick={() => navigate("/")}
					>
						Trang chủ
					</button>
					<span>{" > "}</span>
					<button
						className="hover:text-[#ff6347] duration-300 cursor-pointer"
						onClick={() => navigate("/blog")}
					>
						Tin tức
					</button>
					<span>{" > "}</span>
					<span className="text-[#ff6347] font-bold">
						{blog.title}
					</span>
				</div>
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="p-6 md:p-8">
						<div className="flex items-center text-sm text-gray-500 mb-4">
							<span>{blog.date}</span>
							<span className="mx-2">•</span>
							<span>{blog.category}</span>
							<span className="mx-2">•</span>
							<span>Bởi {blog.author}</span>
						</div>

						<h1 className="text-3xl font-bold text-gray-800 mb-6">
							{blog.title}
						</h1>

						<div className="prose max-w-none">
							{content.map((item, index) => {
								if (item.type === "text") {
									return (
										<motion.p
											key={index}
											className="text-gray-700 mb-6"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.5,
												delay: index * 0.1,
											}}
										>
											{item.value}
										</motion.p>
									);
								} else if (item.type === "image") {
									return (
										<motion.div
											key={index}
											className="mb-6"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.5,
												delay: index * 0.1,
											}}
										>
											<img
												src={item.value}
												alt={`Hình ảnh ${index + 1}`}
												className="w-full h-auto rounded-lg"
											/>
										</motion.div>
									);
								}
								return null;
							})}
						</div>

						<div className="mt-8 pt-6 border-t border-gray-200">
							<div className="flex flex-wrap gap-2">
								{blog.category && (
									<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
										#{blog.category}
									</span>
								)}
								<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
									#thời_trang
								</span>
								<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
									#mùa_đông
								</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</LayoutBlog>
	);
};

export default BlogDetail;
