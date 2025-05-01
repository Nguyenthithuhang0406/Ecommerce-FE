import React from "react";

const OrderStatusFilter = ({
	statusFilter,
	onFilterChange,
	statusCounts,
	totalCount,
}) => {
	return (
		<div className="w-full sm:w-auto flex flex-wrap gap-2">
			<span className="text-sm font-medium text-gray-700 self-center mr-2">
				Status:
			</span>
			<button
				onClick={() => onFilterChange("All")}
				className={`px-3 py-1 rounded-md text-sm ${
					statusFilter === "All"
						? "bg-orange-500 text-white"
						: "bg-gray-100 text-gray-700 hover:bg-gray-200"
				}`}
			>
				All ({totalCount})
			</button>
			<button
				onClick={() => onFilterChange("Delivered")}
				className={`px-3 py-1 rounded-md text-sm ${
					statusFilter === "Delivered"
						? "bg-green-600 text-white"
						: "bg-green-100 text-green-800 hover:bg-green-200"
				}`}
			>
				Delivered ({statusCounts["Delivered"] || 0})
			</button>
			<button
				onClick={() => onFilterChange("Shipping")}
				className={`px-3 py-1 rounded-md text-sm ${
					statusFilter === "Shipping"
						? "bg-blue-600 text-white"
						: "bg-blue-100 text-blue-800 hover:bg-blue-200"
				}`}
			>
				Shipping ({statusCounts["Shipping"] || 0})
			</button>
			<button
				onClick={() => onFilterChange("Pending")}
				className={`px-3 py-1 rounded-md text-sm ${
					statusFilter === "Pending"
						? "bg-yellow-500 text-white"
						: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
				}`}
			>
				Pending ({statusCounts["Pending"] || 0})
			</button>
			<button
				onClick={() => onFilterChange("Cancelled")}
				className={`px-3 py-1 rounded-md text-sm ${
					statusFilter === "Cancelled"
						? "bg-red-600 text-white"
						: "bg-red-100 text-red-800 hover:bg-red-200"
				}`}
			>
				Cancelled ({statusCounts["Cancelled"] || 0})
			</button>
		</div>
	);
};

export default OrderStatusFilter;
