import React from "react";

const OrderStatusBadge = ({ status }) => {
	const getStatusColor = (status) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800";
			case "Shipping":
				return "bg-blue-100 text-blue-800";
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Cancelled":
				return "bg-red-100 text-red-800";
			case "Processing":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<span
			className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
				status
			)}`}
		>
			{status}
		</span>
	);
};

export default OrderStatusBadge;
