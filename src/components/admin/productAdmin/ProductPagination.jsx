import React from "react";

const ProductPagination = ({
	currentPage,
	totalPages,
	itemsPerPage,
	totalItems,
	onPageChange,
	onItemsPerPageChange,
	indexOfFirstItem,
	indexOfLastItem,
	itemName = "items",
}) => {
	const getPaginationItems = () => {
		const maxPagesToShow = 6;
		const pages = [];
		const ellipsis = "...";

		if (totalPages <= maxPagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			const leftBound = Math.max(2, currentPage - 1);
			const rightBound = Math.min(totalPages - 1, currentPage + 1);

			pages.push(1);

			if (leftBound > 2) {
				pages.push(ellipsis);
			}

			for (let i = leftBound; i <= rightBound; i++) {
				pages.push(i);
			}

			if (rightBound < totalPages - 1) {
				pages.push(ellipsis);
			}

			if (totalPages > 1) {
				pages.push(totalPages);
			}
		}

		return pages;
	};

	return (
		<div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex items-center justify-between flex-wrap gap-3">
			<div className="text-sm text-gray-700">
				Showing{" "}
				<span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
				<span className="font-medium">
					{Math.min(indexOfLastItem, totalItems)}
				</span>{" "}
				of <span className="font-medium">{totalItems}</span> {itemName}
			</div>

			{/* Items Per Page Selector */}
			<div className="flex items-center gap-2">
				<label htmlFor="itemsPerPage" className="text-sm text-gray-700">
					{itemName.charAt(0).toUpperCase() + itemName.slice(1)} per
					page:
				</label>
				<select
					id="itemsPerPage"
					value={itemsPerPage}
					onChange={(e) =>
						onItemsPerPageChange(parseInt(e.target.value))
					}
					className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
				</select>
			</div>

			<div className="flex space-x-2">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`px-3 py-1 rounded-md ${
						currentPage === 1
							? "text-gray-400 cursor-not-allowed"
							: "text-gray-700 hover:bg-gray-200"
					}`}
				>
					Previous
				</button>

				{getPaginationItems().map((page, index) => (
					<button
						key={index}
						onClick={() =>
							typeof page === "number" && onPageChange(page)
						}
						className={`px-3 py-1 rounded-md ${
							page === currentPage
								? "bg-orange-500 text-white"
								: page === "..."
								? "text-gray-500 cursor-default"
								: "text-gray-700 hover:bg-gray-200"
						}`}
						disabled={page === "..."}
					>
						{page}
					</button>
				))}

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`px-3 py-1 rounded-md ${
						currentPage === totalPages
							? "text-gray-400 cursor-not-allowed"
							: "text-gray-700 hover:bg-gray-200"
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ProductPagination;
