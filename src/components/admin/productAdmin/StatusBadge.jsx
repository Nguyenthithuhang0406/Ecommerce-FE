import React from "react";

const StatusBadge = ({ status, customColors }) => {
	const getDefaultStatusColor = (status) => {
		switch (status) {
			case true:
				return "bg-green-100 text-green-800";
			case false:
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const colorClasses = customColors || getDefaultStatusColor(status);

	const getStatusText = (status) => {
		switch (status) {
			case true:
				return "Hiển thị";
			case false:
				return "Không hiển thị";
			default:
				return "Unknown";
		}
	};

	return (
		<span className={`px-2 py-1 text-xs rounded-full ${colorClasses}`}>
			{getStatusText(status)}
		</span>
	);
};

export default StatusBadge;
