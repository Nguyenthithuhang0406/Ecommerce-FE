import { Download, Plus, Search } from "lucide-react";
import React, { useState } from "react";
const CategoryFilters = ({
	searchQuery,
	onSearchChange,
	onExportExcel,
	onAddCategory,
}) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
			<div className="w-full sm:w-auto flex gap-3">
				<div className="relative">
					<input
						type="text"
						placeholder="Tìm kiếm danh mục..."
						value={searchQuery}
						onChange={onSearchChange}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
					/>
					<Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
				</div>
			</div>

			<div className="w-full sm:w-auto flex gap-3">
				<button
					onClick={onExportExcel}
					className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-green-500 hover:text-white duration-200"
				>
					<Download className="h-4 w-4 mr-2" />
					Xuất thành Excel
				</button>
				<button
					onClick={onAddCategory}
					className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 duration-200"
				>
					<Plus className="h-4 w-4 mr-2" />
					Thêm danh mục
				</button>
			</div>
		</div>
	);
};

export default CategoryFilters;
