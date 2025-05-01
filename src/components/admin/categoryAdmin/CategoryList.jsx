import React from "react";
import ProductPagination from "../productAdmin/ProductPagination";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({
	categories,
	currentPage,
	itemsPerPage,
	totalItems,
	onPageChange,
	onItemsPerPageChange,
	onViewCategory,
	onEditCategory,
	onDeleteCategory,
	onSort,
	sortConfig,
}) => {
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(categories.length / itemsPerPage);

	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								onClick={() => onSort("name")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Category Name{" "}
								{sortConfig.key === "name" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th
								onClick={() => onSort("displayOrder")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Display Order{" "}
								{sortConfig.key === "displayOrder" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Products
							</th>
							<th
								onClick={() => onSort("lastUpdated")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Last Updated{" "}
								{sortConfig.key === "lastUpdated" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentItems.map((category) => (
							<CategoryListItem
								key={category.id}
								category={category}
								onView={onViewCategory}
								onEdit={onEditCategory}
								onDelete={onDeleteCategory}
							/>
						))}
					</tbody>
				</table>
			</div>

			<ProductPagination
				currentPage={currentPage}
				totalPages={totalPages}
				itemsPerPage={itemsPerPage}
				totalItems={totalItems}
				onPageChange={onPageChange}
				onItemsPerPageChange={onItemsPerPageChange}
				indexOfFirstItem={indexOfFirstItem}
				indexOfLastItem={indexOfLastItem}
				itemName="categories"
			/>
		</div>
	);
};

export default CategoryList;
