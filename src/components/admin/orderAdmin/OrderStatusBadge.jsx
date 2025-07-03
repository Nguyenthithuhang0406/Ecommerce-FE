import React from "react";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Đang giao", color: "bg-yellow-100 text-yellow-800" },
  { value: "SHIPPED", label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  { value: "PAID", label: "Hoàn đơn", color: "bg-blue-100 text-blue-800" },
  { value: "CANCELED", label: "Hủy đơn", color: "bg-red-100 text-red-800" },
];

function getStatusColor(status) {
  const found = STATUS_OPTIONS.find(opt => opt.value === status);
  return found ? found.color : "bg-gray-100 text-gray-800";
}

const OrderStatusBadge = ({ value, onChange }) => (
  <div className="relative inline-block">
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none px-2 py-1 pr-6 text-xs rounded-full border focus:outline-none cursor-pointer transition ${getStatusColor(value)}`}
      style={{ minWidth: 120 }}
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">&#9662;</span>
  </div>
);

export default OrderStatusBadge;
