import { Edit, Eye, Trash } from "lucide-react";
import React from "react";

const CategoryListItem = ({ category, onView, onEdit, onDelete }) => {
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
						{category.icon || "📂"}
					</div>
					<div className="ml-4">
						<div className="font-medium text-gray-900">
							{category.name}
						</div>
						<div className="text-sm text-gray-500">
							{category.subcategories.length > 0
								? `${category.subcategories.length} subcategories`
								: "No subcategories"}
						</div>
					</div>
				</div>
			</td>
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">
					{category.displayOrder}
				</div>
			</td>
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">
					{category.productCount > 0
						? `${category.productCount} products`
						: "No products"}
				</div>
			</td>
			<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
				{category.lastUpdated}
			</td>
			<td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex space-x-2">
					<button
						onClick={() => onView(category)}
						className="cursor-pointer text-blue-600 hover:text-blue-900"
						title="View Details"
					>
						<Eye className="h-4 w-4" />
					</button>
					<button
						onClick={() => onEdit(category)}
						className="cursor-pointer text-orange-500 hover:text-orange-700"
						title="Edit Category"
					>
						<Edit className="h-4 w-4" />
					</button>
					<button
						onClick={() => onDelete(category)}
						className="cursor-pointer text-red-500 hover:text-red-700"
						title="Delete Category"
					>
						<Trash className="h-4 w-4" />
					</button>
				</div>
			</td>
		</tr>
	);
};

export default CategoryListItem;
