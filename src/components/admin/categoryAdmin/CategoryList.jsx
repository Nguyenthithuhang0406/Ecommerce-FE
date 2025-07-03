import React from "react";
import ProductPagination from "../productAdmin/ProductPagination";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({
	categories,
	apiPage,
	currentPage,
	itemsPerPage,
	totalItems,
	totalPages,
	onPageChange,
	onItemsPerPageChange,
	onViewCategory,
	onEditCategory,
	onDeleteCategory,
	onSort,
	sortConfig,
	hasNext,
	hasPrevious,
}) => {
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = categories;

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
								Tên danh mục{" "}
								{sortConfig.key === "name" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Mô tả
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Thao tác
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
				hasNext={hasNext}
				hasPrevious={hasPrevious}
				itemName="danh mục"
			/>
		</div>
	);
};

export default CategoryList;
