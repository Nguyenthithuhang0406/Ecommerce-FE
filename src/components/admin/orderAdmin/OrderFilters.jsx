import { Download, Search } from "lucide-react";
import React from "react";
import OrderStatusFilter from "./OrderStatusFilter";

const OrderFilters = ({
	statusFilter,
	onStatusFilterChange,
	onExportExcel,
	statusCounts,
	totalCount,
}) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
			<OrderStatusFilter
				statusFilter={statusFilter}
				onFilterChange={onStatusFilterChange}
				statusCounts={statusCounts}
				totalCount={totalCount}
			/>

			<div className="w-full sm:w-auto">
				<button
					onClick={onExportExcel}
					className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-green-500 hover:text-white duration-200"
				>
					<Download className="h-4 w-4 mr-2" />
					Xuất thành Excel
				</button>
			</div>
		</div>
	);
};

export default OrderFilters;
