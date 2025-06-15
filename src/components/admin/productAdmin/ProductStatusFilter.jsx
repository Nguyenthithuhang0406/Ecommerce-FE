import React from "react";

const ProductStatusFilter = ({ statusFilter, onFilterChange }) => {
	return (
		<div className="w-full sm:w-auto flex flex-wrap gap-2">
			<span className="text-sm font-medium text-gray-700 self-center mr-2">
				Trạng thái:
			</span>
			<button
				onClick={() => onFilterChange(true)}
				className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
					statusFilter == true
						? "bg-green-600 text-white"
						: "bg-green-100 text-green-800 hover:bg-green-200"
				}`}
			>
				Sản phẩm hiển thị
			</button>
			<button
				onClick={() => onFilterChange(false)}
				className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
					statusFilter === false
						? "bg-gray-600 text-white"
						: "bg-gray-100 text-gray-800 hover:bg-gray-200"
				}`}
			>
				Sản phẩm không hiển thị
			</button>
		</div>
	);
};

export default ProductStatusFilter;
