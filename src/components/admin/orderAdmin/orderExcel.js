import * as XLSX from 'xlsx';

export const exportOrdersToExcel = (orders, filename = 'Orders_Export') => {
  const exportData = orders.map(order => ({
    'Order ID': order.id,
    'Order Date': new Date(order.orderDate).toLocaleDateString(),
    'Seller': order.sellerName,
    'Status': order.status,
    'Items Count': order.items.length,
    'Shipping Fee': order.shippingFee || 'Free',
    'Total Amount': order.totalAmount,
    'Payment Method': order.paymentMethod || 'N/A',
    'Payment Status': order.paymentStatus || 'N/A',
    'Recipient': order.recipient || 'N/A',
    'Delivery Address': order.deliveryAddress || 'N/A',
    'Items': order.items.map(item => `${item.name} (${item.quantity})`).join(', ')
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 10 },  // Order ID
    { wch: 15 },  // Order Date
    { wch: 20 },  // Seller
    { wch: 15 },  // Status
    { wch: 10 },  // Items Count
    { wch: 15 },  // Shipping Fee
    { wch: 15 },  // Total Amount
    { wch: 15 },  // Payment Method
    { wch: 15 },  // Payment Status
    { wch: 20 },  // Recipient
    { wch: 40 },  // Delivery Address
    { wch: 60 }   // Items
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  // Save as Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const getOrderStatusCounts = (orders) => {
  const counts = {
    'Delivered': 0,
    'Shipping': 0,
    'Pending': 0,
    'Cancelled': 0,
    'Processing': 0
  };
  
  orders.forEach(order => {
    if (counts[order.status] !== undefined) {
      counts[order.status]++;
    }
  });
  
  return counts;
};

export const sortOrders = (orders, sortConfig) => {
  if (!sortConfig.key) return orders;
  
  return [...orders].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    // Special handling for price/amount values
    if (sortConfig.key === 'totalAmount') {
      aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
      bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
    }
    
    // Special handling for dates
    if (sortConfig.key === 'orderDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
};