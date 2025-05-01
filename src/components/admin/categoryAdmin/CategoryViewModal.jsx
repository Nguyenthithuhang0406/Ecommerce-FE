import { X } from "lucide-react";
import React from "react";

const CategoryViewModal = ({ category, onClose, onEdit }) => {
	if (!category) return null;

	return (
		<div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-semibold">Category Details</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="p-6">
					<div className="flex items-center mb-6">
						<div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center text-4xl">
							{category.icon || "📂"}
						</div>
						<div className="ml-4">
							<h2 className="text-xl font-semibold">
								{category.name}
							</h2>
							<div className="flex items-center mt-1">
								<span className="text-sm text-gray-500">
									Order: {category.displayOrder}
								</span>
							</div>
						</div>
					</div>

					{category.description && (
						<div className="mb-6">
							<h4 className="text-sm font-medium text-gray-700 mb-2">
								Description
							</h4>
							<p className="text-gray-600">
								{category.description}
							</p>
						</div>
					)}

					{category.subcategories.length > 0 && (
						<div className="mb-6">
							<h4 className="text-sm font-medium text-gray-700 mb-2">
								Subcategories
							</h4>
							<div className="grid grid-cols-2 gap-2">
								{category.subcategories.map(
									(subcategory, index) => (
										<div
											key={index}
											className="bg-gray-50 px-3 py-2 rounded-lg text-sm"
										>
											{subcategory}
										</div>
									)
								)}
							</div>
						</div>
					)}

					<div className="mt-6">
						<h4 className="text-sm font-medium text-gray-700 mb-2">
							Statistics
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-gray-50 p-3 rounded-lg">
								<div className="text-sm text-gray-500">
									Total Products
								</div>
								<div className="font-semibold">
									{category.productCount || 0}
								</div>
							</div>
							<div className="bg-gray-50 p-3 rounded-lg">
								<div className="text-sm text-gray-500">
									Last Updated
								</div>
								<div className="font-semibold">
									{category.lastUpdated}
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end space-x-3 mt-6">
						<button
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
						>
							Close
						</button>
						<button
							onClick={() => onEdit(category)}
							className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
						>
							Edit Category
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryViewModal;
