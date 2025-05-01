import React, { useEffect, useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { motion } from "framer-motion";
import ProductFilters from "@/components/admin/productAdmin/ProductFilters";
import ProductList from "@/components/admin/productAdmin/ProductList";
import ProductViewModal from "@/components/admin/productAdmin/ProductViewModal";
import ProductFormModal from "@/components/admin/productAdmin/ProductFormModal";
import {
	exportProductsToExcel,
	formatProductForSave,
	getProductStatusCounts,
} from "@/components/admin/productAdmin/productExcel";
import { productData } from "@/components/admin/productAdmin/productData";
import DeleteProductModal from "@/components/admin/productAdmin/DeleteProductModal";
const ProductAdminPage = () => {
	const [products, setProducts] = useState(productData);
	const [showModal, setShowModal] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: null,
	});
	const [productsPerPage, setProductsPerPage] = useState(10);
	const [statusFilter, setStatusFilter] = useState("All");

	const statusCounts = getProductStatusCounts(products);

	const filteredProducts = products.filter(
		(product) =>
			(product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
			(statusFilter === "All" || product.status === statusFilter)
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (!sortConfig.key) return 0;
		const aValue =
			sortConfig.key === "price"
				? parseFloat(a[sortConfig.key].replace("$", ""))
				: a[sortConfig.key];
		const bValue =
			sortConfig.key === "price"
				? parseFloat(b[sortConfig.key].replace("$", ""))
				: b[sortConfig.key];
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, statusFilter]);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowModal("view");
	};

	const handleAddProduct = () => {
		setSelectedProduct(null);
		setShowModal("add");
	};

	const handleEditProduct = (product) => {
		const formData = {
			id: product.id,
			name: product.name,
			category: product.category,
			price: product.price.replace("$", ""),
			stock: product.stock.toString(),
			status: product.status,
			description: product.description,
			sku: product.sku,
			variations: [...product.variations],
			tags: [...product.tags],
			images: [...product.image],
		};

		setSelectedProduct(product);
		setShowModal("edit");
	};

	const handleDeleteProductClick = (product) => {
		setSelectedProduct(product);
		setShowModal("delete");
	};

	const handleDeleteProduct = (id) => {
		setProducts(products.filter((product) => product.id !== id));
		setShowModal(null);
	};

	const handleExportExcel = () => {
		exportProductsToExcel(filteredProducts);
	};

	const handleFormSubmit = (formData) => {
		const newProduct = formatProductForSave(formData, selectedProduct);

		if (showModal === "add") {
			setProducts([...products, newProduct]);
		} else if (showModal === "edit") {
			setProducts(
				products.map((p) => (p.id === formData.id ? newProduct : p))
			);
		}

		setShowModal(null);
	};
	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Products"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-4"
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<StatCard
							name="Total Sales"
							icon={Zap}
							value="$12,345"
							color="#6366F1"
						/>
						<StatCard
							name="New Users"
							icon={Users}
							value="1,234"
							color="#8B5CF6"
						/>
						<StatCard
							name="Total Products"
							icon={ShoppingBag}
							value="567"
							color="#EC4899"
						/>
						<StatCard
							name="Conversion Rate"
							icon={BarChart2}
							value="12,5%"
							color="#10B981"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<ProductFilters
							searchQuery={searchQuery}
							onSearchChange={setSearchQuery}
							statusFilter={statusFilter}
							onStatusFilterChange={setStatusFilter}
							onExportExcel={handleExportExcel}
							onAddProduct={handleAddProduct}
							statusCounts={statusCounts}
							totalCount={products.length}
						/>

						<ProductList
							products={sortedProducts}
							currentPage={currentPage}
							productsPerPage={productsPerPage}
							totalProducts={sortedProducts.length}
							onPageChange={setCurrentPage}
							onProductsPerPageChange={setProductsPerPage}
							onViewProduct={handleViewProduct}
							onEditProduct={handleEditProduct}
							onDeleteProduct={handleDeleteProductClick}
							onSort={handleSort}
							sortConfig={sortConfig}
						/>
						{showModal === "view" && selectedProduct && (
							<ProductViewModal
								product={selectedProduct}
								onClose={() => setShowModal(null)}
								onEdit={handleEditProduct}
							/>
						)}

						{(showModal === "add" || showModal === "edit") && (
							<ProductFormModal
								isOpen={true}
								onClose={() => setShowModal(null)}
								onSubmit={handleFormSubmit}
								initialData={
									showModal === "edit"
										? {
												id: selectedProduct.id,
												name: selectedProduct.name,
												category:
													selectedProduct.category,
												price: selectedProduct.price.replace(
													"$",
													""
												),
												stock: selectedProduct.stock.toString(),
												status: selectedProduct.status,
												description:
													selectedProduct.description,
												sku: selectedProduct.sku,
												variations: [
													...selectedProduct.variations,
												],
												tags: [...selectedProduct.tags],
												images: [
													...selectedProduct.image,
												],
										  }
										: null
								}
								formType={showModal}
							/>
						)}

						{showModal === "delete" && selectedProduct && (
							<DeleteProductModal
								isOpen={true}
								onClose={() => setShowModal(null)}
								onConfirm={handleDeleteProduct}
								product={selectedProduct}
							/>
						)}
					</motion.div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default ProductAdminPage;
