import React, { useEffect, useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import { motion } from "framer-motion";
import CategoryViewModal from "@/components/admin/categoryAdmin/CategoryViewModal";
import CategoryFormModal from "@/components/admin/categoryAdmin/CategoryFormModal";
import DeleteConfirmModal from "@/components/admin/categoryAdmin/DeleteConfirmModal";
import CategoryList from "@/components/admin/categoryAdmin/CategoryList";
import CategoryFilters from "@/components/admin/categoryAdmin/CategoryFilters";
import { categoryData } from "@/components/admin/categoryAdmin/categoryData";
import { sortCategories } from "@/components/admin/categoryAdmin/categoryExcel";
const CategoryAdminPage = () => {
	const [categories, setCategories] = useState(categoryData);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [modalType, setModalType] = useState("add"); 
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortConfig, setSortConfig] = useState({
		key: "displayOrder",
		direction: "asc",
	});
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const getNewCategoryData = () => ({
		id: `CAT-${Math.floor(1000 + Math.random() * 9000)}`,
		name: "",
		description: "",
		icon: "",
		displayOrder:
			categories.length > 0
				? Math.max(...categories.map((c) => Number(c.displayOrder))) + 1
				: 1,
		subcategories: [],
		productCount: 0,
		lastUpdated: new Date().toLocaleDateString("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
		}),
	});

	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			category.description
				?.toLowerCase()
				.includes(searchQuery.toLowerCase())
	);

	const sortedCategories = sortCategories(filteredCategories, sortConfig);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const handleViewCategory = (category) => {
		setSelectedCategory(category);
		setShowViewModal(true);
	};

	const handleAddCategory = () => {
		setSelectedCategory(getNewCategoryData());
		setModalType("add");
		setShowFormModal(true);
	};

	const handleEditCategory = (category) => {
		setSelectedCategory({ ...category });
		setModalType("edit");
		setShowFormModal(true);
	};

	const handleDeleteCategory = (category) => {
		setSelectedCategory(category);
		setShowDeleteModal(true);
	};

	const handleFormSubmit = (formData) => {
		if (modalType === "add") {
			setCategories([...categories, formData]);
		} else {
			setCategories(
				categories.map((category) =>
					category.id === formData.id ? formData : category
				)
			);
		}
		setShowFormModal(false);
	};

	const handleDeleteConfirm = () => {
		setCategories(
			categories.filter((category) => category.id !== selectedCategory.id)
		);
		setShowDeleteModal(false);
	};

	const handleExportExcel = () => {
		exportCategoriesToExcel(filteredCategories);
	};

	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Categories"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<CategoryFilters
							searchQuery={searchQuery}
							onSearchChange={setSearchQuery}
							onExportExcel={handleExportExcel}
							onAddCategory={handleAddCategory}
						/>

						<CategoryList
							categories={sortedCategories}
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							totalItems={sortedCategories.length}
							onPageChange={setCurrentPage}
							onItemsPerPageChange={setItemsPerPage}
							onViewCategory={handleViewCategory}
							onEditCategory={handleEditCategory}
							onDeleteCategory={handleDeleteCategory}
							onSort={handleSort}
							sortConfig={sortConfig}
						/>

						{showViewModal && selectedCategory && (
							<CategoryViewModal
								category={selectedCategory}
								onClose={() => setShowViewModal(false)}
								onEdit={() => {
									setShowViewModal(false);
									handleEditCategory(selectedCategory);
								}}
							/>
						)}

						{showFormModal && selectedCategory && (
							<CategoryFormModal
								isOpen={showFormModal}
								onClose={() => setShowFormModal(false)}
								onSubmit={handleFormSubmit}
								initialData={selectedCategory}
								formType={modalType}
							/>
						)}

						{showDeleteModal && selectedCategory && (
							<DeleteConfirmModal
								isOpen={showDeleteModal}
								onClose={() => setShowDeleteModal(false)}
								onConfirm={handleDeleteConfirm}
								category={selectedCategory}
							/>
						)}
					</motion.div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default CategoryAdminPage;
