import { X } from "lucide-react";
import React from "react";

const CategoryViewModal = ({ category, onClose, onEdit }) => {
	if (!category) return null;
	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-semibold">
						Thông tin danh mục
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5 cursor-pointer" />
					</button>
				</div>
				<div className="p-6">
					<div className="flex items-center mb-6">
						<img
							className="h-24 w-24 border border-none rounded-xl"
							src={
								category.imageUrl
									? category.imageUrl
									: "https://picsum.photos/200/300?grayscale"
							}
							alt={category.name}
							onError={(e) => {
								e.target.src =
									"https://picsum.photos/200/300?grayscale";
							}}
						/>
						<div className="ml-4">
							<h2 className="text-xl font-semibold">
								{category.name}
							</h2>
							<div className="flex items-center mt-1">
								<span className="text-sm text-gray-500">
									Id: {category.id}
								</span>
							</div>
						</div>
					</div>

					{category.description && (
						<div className="mb-6">
							<h4 className="text-sm font-medium text-gray-700 mb-2">
								Mô tả
							</h4>
							<p className="text-gray-600">
								{category.description}
							</p>
						</div>
					)}

					<div className="flex justify-end space-x-3 mt-6">
						<button
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-50"
						>
							Đóng
						</button>
						<button
							onClick={() => onEdit(category)}
							className="px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 duration-200"
						>
							Sửa danh mục
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryViewModal;
