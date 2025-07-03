import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SquareUser } from "lucide-react";
const BlogCard = ({ blog, index }) => {
	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				delay: index * 0.1,
			},
		},
		hover: {
			scale: 1.02,
			boxShadow:
				"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
			transition: { duration: 0.3 },
		},
	};
	return (
		<motion.div
			variants={cardVariants}
			whileHover="hover"
			className="bg-white rounded-lg shadow overflow-hidden"
		>
			<Link to={`/blog/${blog.slug}`}>
				<div className="md:flex">
					<div className="md:w-1/3">
						<img
							src={blog.thumbnail}
							alt={blog.title}
							className=" h-48 md:h-full w-full object-cover"
						/>
					</div>
					<div className="md:w-2/3 p-6">
						<div className="flex items-center text-sm text-gray-500 mb-2">
							<span>{blog.date}</span>
							<span className="mx-2">•</span>
							<span>{blog.category}</span>
						</div>
						<h2 className="text-xl font-bold text-gray-800 mb-3">
							{blog.title}
						</h2>
						<p className="text-gray-600 mb-4 line-clamp-3">
							{blog.summary}
						</p>
						<div className="flex items-center">
							<div className="flex items-center">
								<SquareUser className="w-6 h-6 mr-2" />
								<span className="text-sm text-gray-600">
									{blog.author}
								</span>
							</div>
							<div className="ml-auto">
								<span className="text-[#ff6347] hover:underline text-sm">
									Đọc tiếp
								</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default BlogCard;
