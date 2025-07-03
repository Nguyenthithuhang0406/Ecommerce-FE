import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
const SearchBox = ({ blogs }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const searchRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			return;
		}

		const filteredResults = blogs
			.filter(
				(blog) =>
					blog.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					blog.summary
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					blog.category
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					blog.tags.some((tag) =>
						tag.toLowerCase().includes(searchTerm.toLowerCase())
					)
			)
			.slice(0, 5);

		setSearchResults(filteredResults);
		setIsOpen(filteredResults.length > 0);
	}, [searchTerm, blogs]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim() !== "") {
			setIsOpen(false);
			navigate(`/search-blog?q=${encodeURIComponent(searchTerm)}`);
		}
	};

	const handleSelectResult = (slug) => {
		setIsOpen(false);
		navigate(`/blog/${slug}`);
		console.log("slug", slug);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearchSubmit(e);
		}
	};

	return (
		<div className="relative" ref={searchRef}>
			<form onSubmit={handleSearchSubmit}>
				<div className="relative flex items-center w-full md:w-full">
					<input
						type="text"
						placeholder="Tìm kiếm tin..."
						value={searchTerm}
						onChange={handleSearchChange}
						onKeyDown={handleKeyPress}
						className="py-2 pr-10 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7f00] focus:border-transparent w-full"
						onFocus={() =>
							searchTerm.trim() !== "" && setIsOpen(true)
						}
					/>
					<button
						type="submit"
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
					>
						<Search />
					</button>
				</div>
			</form>

			<AnimatePresence>
				{isOpen && searchResults.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute z-10 mt-2 w-full md:w-80 bg-white rounded-md shadow-lg overflow-hidden"
					>
						<div className="max-h-80 overflow-y-auto">
							<ul className="divide-y divide-gray-200">
								{searchResults.map((blog) => (
									<li
										key={blog.id}
										className="hover:bg-gray-50 transition-colors duration-150"
									>
										<button
											className="p-3 w-full text-left"
											onClick={() =>
												handleSelectResult(blog.slug)
											}
										>
											<div className="flex items-start gap-3">
												<img
													src={blog.thumbnail}
													alt={blog.title}
													className="w-12 h-12 object-cover rounded"
												/>
												<div className="flex-1 overflow-hidden">
													<h4 className="text-sm font-medium text-gray-800 line-clamp-1">
														{blog.title}
													</h4>
													<p className="text-xs text-gray-500 mt-1 line-clamp-1">
														{blog.summary}
													</p>
													<div className="flex items-center mt-1">
														<span className="text-xs bg-[#fff3e0] text-[#ff6347] rounded px-1.5 py-0.5">
															{blog.category}
														</span>
													</div>
												</div>
											</div>
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="bg-gray-50 border-t border-gray-200 p-2 flex justify-between items-center">
							<span className="text-xs text-gray-500">
								{searchResults.length} kết quả
							</span>
							<button
								className="cursor-pointer text-xs text-[#ff6347] hover:underline duration-700 font-medium"
								onClick={handleSearchSubmit}
							>
								Xem tất cả kết quả
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SearchBox;
