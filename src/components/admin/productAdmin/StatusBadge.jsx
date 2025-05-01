import React from 'react';

const StatusBadge = ({ status, customColors }) => {
  const getDefaultStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Clearance': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipping': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Featured': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const colorClasses = customColors || getDefaultStatusColor(status);

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colorClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;