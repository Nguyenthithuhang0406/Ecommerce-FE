import { Download, Plus, Search } from "lucide-react";
import React from "react";

const CategoryFilters = ({
	searchQuery,
	onSearchChange,
	onExportExcel,
	onAddCategory,
}) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
			<div className="w-full sm:w-auto">
				<div className="relative">
					<input
						type="text"
						placeholder="Search categories..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
					/>
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
				</div>
			</div>

			<div className="w-full sm:w-auto flex gap-3">
				<button
					onClick={onExportExcel}
					className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
				>
					<Download className="h-4 w-4 mr-2" />
					Export
				</button>
				<button
					onClick={onAddCategory}
					className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Category
				</button>
			</div>
		</div>
	);
};

export default CategoryFilters;
