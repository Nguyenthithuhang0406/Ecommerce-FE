import React, { useEffect, useState } from "react";
import LayoutBlog from "./LayoutBlog";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData } from "../../components/blog/blogData";
import { SquareUser } from "lucide-react";

const SearchResultPage = () => {
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("q") || "";
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			return;
		}

		const filteredResults = blogData.filter(
			(blog) =>
				blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
				blog.category
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				blog.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase())
				)
		);

		setSearchResults(filteredResults);
	}, [searchTerm]);
	return (
		<LayoutBlog>
			<div className="mb-6">
				<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
					<Link to="/" className="hover:text-[#ff6347] duration-200">
						Trang chủ
					</Link>
					<span>&gt;</span>
					<span className="text-[#ff6347] font-bold">Tìm kiếm</span>
				</div>

				<h1 className="text-2xl font-bold text-gray-800 mb-6">
					Có {searchResults.length} kết quả tìm kiếm phù hợp{" "}
					{searchTerm && <span>với "{searchTerm}"</span>}
				</h1>

				{searchResults.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{searchResults.map((blog) => (
							<motion.div
								key={blog.id}
								className="bg-white rounded-lg shadow overflow-hidden"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
								whileHover={{
									scale: 1.02,
									boxShadow:
										"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
									transition: { duration: 0.3 },
								}}
							>
								<Link to={`/blog/${blog.slug}`}>
									<div className="relative">
										<img
											src={blog.thumbnail}
											alt={blog.title}
											className="w-full h-48 object-cover"
										/>
										<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
											<div className="flex items-center gap-2">
												<span className="text-white text-xs font-medium px-2 py-1 bg-[#ff6347] rounded-full">
													{blog.category}
												</span>
												<span className="text-white text-xs">
													{blog.date}
												</span>
											</div>
										</div>
									</div>
									<div className="p-4">
										<h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
											{blog.title}
										</h3>
										<div className="flex items-center text-sm text-gray-500 mb-2">
											<SquareUser className="w-6 h-6 mr-2" />
											<span>{blog.author}</span>
										</div>
										<p className="text-gray-600 text-sm mb-3 line-clamp-3">
											{blog.summary}
										</p>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				) : (
					<div className="bg-white rounded-lg shadow p-8 text-center">
						<img
							src="https://static.vecteezy.com/system/resources/previews/006/208/684/non_2x/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
							alt="Không tìm thấy kết quả"
							className="w-32 h-32 mx-auto mb-4"
						/>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Không tìm thấy kết quả nào
						</h2>
						<p className="text-gray-600 mb-6">
							Không tìm thấy kết quả nào cho từ khóa "{searchTerm}
							". Vui lòng thử với từ khóa khác.
						</p>
						<Link
							to="/"
							className="px-4 py-2 border bg-[#ff7f00] text-white rounded-md hover:bg-[#ffff] hover:text-[#ff7f00] hover:boder-[#ff7f00] transition"
						>
							Quay lại trang chủ
						</Link>
					</div>
				)}
			</div>
		</LayoutBlog>
	);
};

export default SearchResultPage;
