import * as XLSX from "xlsx";

export const exportCategoriesToExcel = (categories) => {
	const exportData = categories.map((category) => ({
		ID: category.id,
		Name: category.name,
		Description: category.description || "",
	}));

	const worksheet = XLSX.utils.json_to_sheet(exportData);

	worksheet["!cols"] = [
		{ wch: 40 }, // ID
		{ wch: 30 }, // Name
		{ wch: 40 }, // Description
	];

	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
	XLSX.writeFile(workbook, `Categories_Export.xlsx`);
};

export const sortCategories = (categories, sortConfig) => {
	if (!sortConfig.key) return categories;
	return [...categories].sort((a, b) => {
		let aValue = a[sortConfig.key];
		let bValue = b[sortConfig.key];
		if (typeof aValue === "string") aValue = aValue.toLowerCase();
		if (typeof bValue === "string") bValue = bValue.toLowerCase();
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});
};
