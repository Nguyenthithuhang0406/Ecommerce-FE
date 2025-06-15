import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LayoutAdmin from "./LayoutAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import { motion } from "framer-motion";
import CategoryViewModal from "@/components/admin/categoryAdmin/CategoryViewModal";
import CategoryFormModal from "@/components/admin/categoryAdmin/CategoryFormModal";
import DeleteConfirmModal from "@/components/admin/categoryAdmin/DeleteConfirmModal";
import CategoryList from "@/components/admin/categoryAdmin/CategoryList";
import CategoryFilters from "@/components/admin/categoryAdmin/CategoryFilters";
import {
	exportCategoriesToExcel,
} from "@/components/admin/categoryAdmin/categoryExcel";
const CategoryAdminPage = () => {
	const [allCate, setAllCate] = useState([]);
	const [categories, setCategories] = useState([]);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [modalType, setModalType] = useState("add");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [totalItems, setTotalItems] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [hasNext, setHasNext] = useState(true);
	const [hasPrevious, setHasPrevious] = useState(true);
	const [apiPage, setApiPage] = useState(0);
	const [sortConfig, setSortConfig] = useState({
		key: "displayOrder",
		direction: "asc",
	});
	const [sortDirection, setSortDirection] = useState("asc");

	const [token, setToken] = useState(
		localStorage.getItem("accessToken")
			? (localStorage.getItem("accessToken"))
			: null
	);
	const getAllCategories = async (
		page = 0,
		size = itemsPerPage,
		search = ""
	) => {
		try {
			let url = `${
				import.meta.env.VITE_API_URL
			}/categories?sortDirection=${sortDirection}&page=${page}&size=${size}`;
			let urlAll = `${import.meta.env.VITE_API_URL}/categories`;
			if (search && search.length > 0) {
				url += `&searchKeyword=${encodeURIComponent(search)}`;
			}
			const res = await axios.get(url, {
				header: {
					Authorization: `Bearer ${token}`,
				},
			});
			const resAll = await axios.get(urlAll);
			console.log("res", res.data.data.content);
			setAllCate(resAll.data.data.content);
			setCategories(res.data.data.content);
			setApiPage(res.data.data.page);
			setCurrentPage(apiPage + 1);
			setTotalPages(res.data.data.totalPages);
			setTotalItems(res.data.data.totalElements);
			setItemsPerPage(res.data.data.size);
			setHasNext(res.data.data.hasNext);
			setHasPrevious(res.data.data.hasPrevious);
		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.name} `);
			console.log(err);
		}
	};
	useEffect(() => {
		getAllCategories(apiPage, itemsPerPage, searchQuery);
	}, [apiPage, itemsPerPage, searchQuery]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		console.log("searchquery: ", searchQuery);
	};

	const getNewCategoryData = () => ({
		name: "",
		description: "",
		imageUrl: "",
	});
	useEffect(() => {
		setCurrentPage(0);
	}, [searchQuery]);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const uploadImage = async (categoryId, file) => {
		const formData = new FormData();
		formData.append("image", file);
		try {
			const res = await axios.put(
				`${
					import.meta.env.VITE_API_URL
				}/categories/${categoryId}/upload`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("uploadImage res: ", res);
			return res.data;
		} catch (error) {
			console.error("Upload image error:", error.response?.data);
			throw error;
		}
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
		setSelectedCategory({
			...category,
			imageUrl: category.imageUrl || "",
		});
		setModalType("edit");
		setShowFormModal(true);
	};

	const handleDeleteCategory = (category) => {
		setSelectedCategory(category);
		setShowDeleteModal(true);
	};

	const handleFormSubmit = async (formData, imageFile) => {
		console.log("formDATAAA:", formData);
		try {
			const data = new FormData();
			data.append("name", formData.name);
			data.append("description", formData.description || "");
			if (imageFile) data.append("image", imageFile);
			if (modalType === "add") {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/categories`,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.data.status === "SUCCESS") {
					const cateId = res.data.data.id;
					if (imageFile) {
						try {
							await toast.promise(
								uploadImage(cateId, imageFile),
								{
									loading: "Đang upload...",
									success: "Upload hình ảnh thành công!",
									error: "Lỗi khi upload hình ảnh!",
								}
							);
						} catch (err) {
							console.error("Upload error:", err);
							toast.error("Lỗi khi upload hình ảnh!");
						}
					} else {
						toast.success("Thêm danh mục thành công!");
					}
					setShowFormModal(false);
					getAllCategories(apiPage, itemsPerPage, searchQuery);
				}
			} else {
				const res = await axios.put(
					`${import.meta.env.VITE_API_URL}/categories/${formData.id}`,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.data.status === "SUCCESS") {
					if (imageFile) {
						try {
							const res = await uploadImage(
								formData.id,
								imageFile
							);
							toast.success(
								"Cập nhật danh mục và hình ảnh thành công!"
							);
						} catch (err) {
							console.error("Upload error:", err);
							toast.error("Lỗi khi upload hình ảnh!");
						}
					} else {
						toast.success("Cập nhật danh mục thành công!");
					}

					setShowFormModal(false);
					getAllCategories(apiPage, itemsPerPage, searchQuery);
				}
			}
		} catch (err) {
			toast.error(`LỖI: ${err.message}`);
		}
	};
	const handleDeleteConfirm = async () => {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/categories/${
					selectedCategory.id
				}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (res.data.status == "SUCCESS") {
				toast.success("Xóa danh mục thành công!");
				setShowDeleteModal(false);
				getAllCategories(apiPage, itemsPerPage, searchQuery);
			}
		} catch (err) {
			toast.error(`Lỗi: ${err.message}`);
		}
	};

	const handleExportExcel = () => {
		exportCategoriesToExcel(allCate);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		getAllCategories(page - 1, itemsPerPage, searchQuery);
	};

	const handleItemsPerPageChange = (size) => {
		setItemsPerPage(size);
		setApiPage(0);
		setCurrentPage(1);
		getAllCategories(0, size, searchQuery);
	};

	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Quản lý danh mục"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<CategoryFilters
							searchQuery={searchQuery}
							onSearchChange={handleSearchChange}
							onExportExcel={handleExportExcel}
							onAddCategory={handleAddCategory}
						/>

						<CategoryList
							categories={categories}
							apiPage={apiPage}
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							totalItems={totalItems}
							totalPages={totalPages}
							onPageChange={handlePageChange}
							onItemsPerPageChange={handleItemsPerPageChange}
							onViewCategory={handleViewCategory}
							onEditCategory={handleEditCategory}
							onDeleteCategory={handleDeleteCategory}
							onSort={handleSort}
							sortConfig={sortConfig}
							hasNext={hasNext}
							hasPrevious={hasPrevious}
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
