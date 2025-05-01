import React, { useEffect, useState } from "react";
import { orderData } from "@/components/admin/orderAdmin/orderData";
import {motion} from 'framer-motion'
import { getOrderStatusCounts, sortOrders, exportOrdersToExcel } from "@/components/admin/orderAdmin/orderExcel";
import LayoutAdmin from "./LayoutAdmin";
import OrderFilters from "@/components/admin/orderAdmin/OrderFilters";
import OrderList from "@/components/admin/orderAdmin/OrderList";
import OrderViewModal from "@/components/admin/orderAdmin/OrderViewModal";
import HeaderAdmin from "@/components/admin/HeaderAdmin";

const OrderAdminPage = () => {
	const [orders, setOrders] = useState(orderData);
	const [showModal, setShowModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortConfig, setSortConfig] = useState({
		key: "orderDate",
		direction: "desc",
	});
	const [ordersPerPage, setOrdersPerPage] = useState(10);
	const [statusFilter, setStatusFilter] = useState("All");

	const statusCounts = getOrderStatusCounts(orders);

	const filteredOrders = orders.filter(
		(order) =>
			(order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.sellerName
					.toLowerCase()
					.includes(searchQuery.toLowerCase())) &&
			(statusFilter === "All" || order.status === statusFilter)
	);

	const sortedOrders = sortOrders(filteredOrders, sortConfig);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, statusFilter]);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const handleViewOrder = (order) => {
		setSelectedOrder(order);
		setShowModal(true);
	};

	const handleExportExcel = () => {
		exportOrdersToExcel(filteredOrders);
	};

	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Orders"}/>
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
           initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
          >
            <OrderFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onExportExcel={handleExportExcel}
              statusCounts={statusCounts}
              totalCount={orders.length}
            />

            <OrderList
              orders={sortedOrders}
              currentPage={currentPage}
              ordersPerPage={ordersPerPage}
              totalOrders={sortedOrders.length}
              onPageChange={setCurrentPage}
              onOrdersPerPageChange={setOrdersPerPage}
              onViewOrder={handleViewOrder}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            {showModal && selectedOrder && (
              <OrderViewModal
                order={selectedOrder}
                onClose={() => setShowModal(false)}
              />
            )}
          </motion.div>
        </main>
			</div>
		</LayoutAdmin>
	);
};

export default OrderAdminPage;
