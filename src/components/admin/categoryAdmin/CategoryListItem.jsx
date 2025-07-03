import { Edit, Eye, Trash } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const CategoryListItem = ({ category, onView, onEdit, onDelete }) => {
	return (
		<motion.tr
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="hover:bg-gray-50"
		>
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<img
						src={category.imageUrl}
						className="h-10 w-10 border border-none rounded-xl"
						alt={category.name}
					/>
					<div className="ml-4">
						<div className="font-medium text-gray-900">
							{category.name}
						</div>
					</div>
				</div>
			</td>
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">
					{category.description.length > 0
						? category.description
						: "Không có mô tả"}
				</div>
			</td>
			<td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex space-x-2">
					<button
						onClick={() => onView(category)}
						className="cursor-pointer text-blue-600 hover:text-blue-900"
						title="Xem chi tiết"
					>
						<Eye className="h-4 w-4" />
					</button>
					<button
						onClick={() => onEdit(category)}
						className="cursor-pointer text-orange-500 hover:text-orange-700"
						title="Sửa"
					>
						<Edit className="h-4 w-4" />
					</button>
					<button
						onClick={() => onDelete(category)}
						className="cursor-pointer text-red-500 hover:text-red-700"
						title="Xóa"
					>
						<Trash className="h-4 w-4" />
					</button>
				</div>
			</td>
		</motion.tr>
	);
};

export default CategoryListItem;
