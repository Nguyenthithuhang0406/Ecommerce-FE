import React from "react";
import ProductListItem from "./ProductListItem";
import ProductPagination from "./ProductPagination";

const ProductList = ({
	products,
	apiPage,
	currentPage,
	productsPerPage,
	totalProducts,
	totalPages,
	onPageChange,
	onProductsPerPageChange,
	onViewProduct,
	onEditProduct,
	onDeleteProduct,
	onSort,
	sortConfig,
	hasNext,
	hasPrevious,
	onToggleActive,
}) => {
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products;

	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tên sản phẩm
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Mô tả
							</th>
							<th
								onClick={() => onSort("price")}
								className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Giá{" "}
								{sortConfig.key === "price" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>

							<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
								Trạng thái hiển thị
							</th>
							<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
								Hành động
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentProducts.map((product) => (
							<ProductListItem
								key={product.id}
								product={product}
								onView={onViewProduct}
								onEdit={onEditProduct}
								onDelete={onDeleteProduct}
								onToggleActive={onToggleActive}
							/>
						))}
					</tbody>
				</table>
			</div>

			<ProductPagination
				contentProduct={products}
				currentPage={currentPage}
				totalPages={totalPages}
				itemsPerPage={productsPerPage}
				totalItems={totalProducts}
				onPageChange={onPageChange}
				onItemsPerPageChange={onProductsPerPageChange}
				indexOfFirstItemProduct={indexOfFirstProduct}
				indexOfLastItem={indexOfLastProduct}
				hasNext={hasNext}
				hasPrevious={hasPrevious}
				itemName="sản phẩm"
			/>
		</div>
	);
};

export default ProductList;
