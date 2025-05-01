import * as XLSX from 'xlsx';

export const exportProductsToExcel = (products, filename = 'Products_Export') => {
  // Prepare data for export
  const exportData = products.map(product => ({
    'Product ID': product.id,
    'Name': product.name,
    'Category': product.category,
    'Price': product.price,
    'Stock': product.stock,
    'Status': product.status,
    'SKU': product.sku,
    'Description': product.description,
    'Rating': product.rating,
    'Last Updated': product.lastUpdated,
    'Variations': product.variations.join(', '),
    'Tags': product.tags.join(', ')
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 10 }, // Product ID
    { wch: 25 }, // Name
    { wch: 15 }, // Category
    { wch: 10 }, // Price
    { wch: 10 }, // Stock
    { wch: 15 }, // Status
    { wch: 15 }, // SKU
    { wch: 50 }, // Description
    { wch: 10 }, // Rating
    { wch: 15 }, // Last Updated
    { wch: 30 }, // Variations
    { wch: 30 }  // Tags
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Save as Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};


export const getProductStatusCounts = (products) => {
  const counts = {
    'Active': 0,
    'Low Stock': 0,
    'Out of Stock': 0,
    'Clearance': 0
  };
  
  products.forEach(product => {
    if (counts[product.status] !== undefined) {
      counts[product.status]++;
    }
  });
  
  return counts;
};


export const formatProductForSave = (formData, existingProduct = null) => {
  // Use placeholder image if no images were uploaded
  const productImages = formData.images.length > 0 
    ? formData.images 
    : ['/api/placeholder/100/100'];

  return {
    id: formData.id,
    name: formData.name,
    category: formData.category,
    price: `$${parseFloat(formData.price).toFixed(2)}`,
    stock: parseInt(formData.stock) || 0,
    status: formData.status,
    image: productImages,
    description: formData.description,
    sku: formData.sku,
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    rating: existingProduct ? existingProduct.rating : 0,
    variations: formData.variations,
    tags: formData.tags,
  };
};