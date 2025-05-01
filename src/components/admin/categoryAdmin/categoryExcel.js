import * as XLSX from "xlsx";

export const exportCategoriesToExcel = (
	categories,
	filename = "Categories_Export"
) => {
	const exportData = categories.map((category) => ({
		ID: category.id,
		Name: category.name,
		Description: category.description || "",
		"Product Count": category.productCount || 0,
		Subcategories: category.subcategories.join(", "),
		"Last Updated": category.lastUpdated,
	}));

	// Create worksheet
	const worksheet = XLSX.utils.json_to_sheet(exportData);

	// Set column widths
	const columnWidths = [
		{ wch: 8 }, // ID
		{ wch: 25 }, // Name
		{ wch: 40 }, // Description
		{ wch: 12 }, // Product Count
		{ wch: 40 }, // Subcategories
		{ wch: 15 }, // Last Updated
	];
	worksheet["!cols"] = columnWidths;

	// Create workbook
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

	// Save as Excel file
	XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const sortCategories = (categories, sortConfig) => {
	if (!sortConfig.key) return categories;

	return [...categories].sort((a, b) => {
		let aValue = a[sortConfig.key];
		let bValue = b[sortConfig.key];

		// Special handling for number values
		if (
			sortConfig.key === "displayOrder" ||
			sortConfig.key === "productCount"
		) {
			aValue = Number(aValue);
			bValue = Number(bValue);
		}

		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});
};
