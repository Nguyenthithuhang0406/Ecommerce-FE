import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	getOrderStatusCounts,
	exportOrdersToExcel,
} from "@/components/admin/orderAdmin/orderExcel";
import LayoutAdmin from "./LayoutAdmin";
import OrderFilters from "@/components/admin/orderAdmin/OrderFilters";
import OrderList from "@/components/admin/orderAdmin/OrderList";
import OrderViewModal from "@/components/admin/orderAdmin/OrderViewModal";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import axios from "axios";
import { toast } from "react-hot-toast";
const OrderAdminPage = () => {
	const [orders, setOrders] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [apiPage, setApiPage] = useState(0);
	const [totalPage, setTotalPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [hasNext, setHasNext] = useState(true);
	const [hasPrevious, setHasPrevious] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const statusCounts = getOrderStatusCounts(orders);

	const [token, setToken] = useState(
			localStorage.getItem("accessToken")
				? (localStorage.getItem("accessToken"))
				: null
		);


	const getAllOrders = async (page = 0, size = itemsPerPage) => {
		try {
			let url = `${
				import.meta.env.VITE_API_URL
			}/orders/all?page=${page}&size=${size}`;
			if (statusFilter === "All") {
				url = url;
			} else {
				url += `&status=${statusFilter}`;
			}

			const res = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("res order: ", res.data.data.content);
			setOrders(res.data.data.content);
			setTotalItems(res.data.data.totalElements);
			setTotalPage(res.data.data.totalPages);
			setHasNext(res.data.data.hasNext);
			setHasPrevious(res.data.data.hasPrevious);
			setApiPage(res.data.data.page);
			setCurrentPage(apiPage + 1);
			setItemsPerPage(res.data.data.size);
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} \n Nguyên nhân: ${err.response?.statusText} `
			);
		}
	};

	useEffect(() => {
		getAllOrders(apiPage, itemsPerPage);
	}, [apiPage, itemsPerPage, searchQuery, statusFilter]);
	const handlePageChange = (page) => {
		setApiPage(page - 1);
		setCurrentPage(page);
		getAllOrders(page - 1, itemsPerPage);
	};
	const handleItemsPerPageChange = (size) => {
		setItemsPerPage(size);
		setApiPage(0);
		setCurrentPage(1);
		getAllOrders(0, size, searchQuery);
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
				<HeaderAdmin title={"Quản lý đơn hàng"} />
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
							orders={orders}
							currentPage={currentPage}
							ordersPerPage={itemsPerPage}
							totalOrders={totalItems}
							totalPages={totalPage}
							onPageChange={handlePageChange}
							onOrdersPerPageChange={handleItemsPerPageChange}
							hasNext={hasNext}
							hasPrevious={hasPrevious}
							onViewOrder={handleViewOrder}
							token={token}
							onStatusChange={getAllOrders}
						/>
						{showModal && selectedOrder && (
							<OrderViewModal
								order={selectedOrder}
								onClose={() => setShowModal(false)}
								token={token}
							/>
						)}
					</motion.div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default OrderAdminPage;
