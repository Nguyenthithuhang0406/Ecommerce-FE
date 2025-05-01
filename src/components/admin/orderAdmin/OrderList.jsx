import ProductPagination from "../productAdmin/ProductPagination";
import OrderListItem from "./OrderListItem";

const OrderList = ({
	orders,
	currentPage,
	ordersPerPage,
	totalOrders,
	onPageChange,
	onOrdersPerPageChange,
	onViewOrder,
	onSort,
	sortConfig,
}) => {
	const indexOfLastItem = currentPage * ordersPerPage;
	const indexOfFirstItem = indexOfLastItem - ordersPerPage;
	const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(orders.length / ordersPerPage);
	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								onClick={() => onSort("id")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Mã đơn hàng{" "}
								{sortConfig.key === "id" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Số lượng sản phẩm
							</th>
							<th
								onClick={() => onSort("orderDate")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Thời gian đặt hàng{" "}
								{sortConfig.key === "orderDate" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th
								onClick={() => onSort("totalAmount")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Tổng tiền{" "}
								{sortConfig.key === "totalAmount" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Phí giao hàng
							</th>
							<th
								onClick={() => onSort("status")}
								className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
							>
								Trạng thái{" "}
								{sortConfig.key === "status" &&
									(sortConfig.direction === "asc"
										? "↑"
										: "↓")}
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Hành động
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentOrders.map((order) => (
							<OrderListItem
								key={order.id}
								order={order}
								onView={onViewOrder}
							/>
						))}
					</tbody>
				</table>
			</div>

			<ProductPagination
				currentPage={currentPage}
				totalPages={totalPages}
				itemsPerPage={ordersPerPage}
				totalItems={totalOrders}
				onPageChange={onPageChange}
				onItemsPerPageChange={onOrdersPerPageChange}
				indexOfFirstItem={indexOfFirstItem}
				indexOfLastItem={indexOfLastItem}
				itemName="orders"
			/>
		</div>
	);
};

export default OrderList;
