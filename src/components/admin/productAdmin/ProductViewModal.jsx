import React, { useEffect, useState } from "react";
import { Edit, Plus, Trash, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { toast } from "react-hot-toast";
import axios from "axios";
import VariantEditModal from "./variantAdmin/VariantEditModal";
import DeleteVariantModal from "./variantAdmin/DeleteVariantModal";
import VariantAddModal from "./variantAdmin/VariantAddModal";
const ProductViewModal = ({ product, onClose, onEdit, token }) => {
	if (!product) return null;
	const [productView, setProductView] = useState([]);
	const productId = product.id;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState(null);
	const [variantModalType, setVariantModalType] = useState(null);
	const getProductById = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${productId}`
			);
			console.log("res product view ", res.data.data);
			setProductView(res.data.data);
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} \n Nguyên nhân: ${
					err.response?.statusText || ""
				}`
			);
		}
	};

	useEffect(() => {
		getProductById();
	}, []);

	const reloadProduct = () => {
		getProductById();
		setVariantModalType(null);
		setSelectedVariant(null);
	};
	const handleAddVariant = () => {
		setSelectedVariant(null);
		setVariantModalType("add");
	};

	const handleEditVariant = (variant) => {
		setSelectedVariant(variant);
		setVariantModalType("edit");
	};

	const handleDeleteVariant = (variant) => {
		setSelectedVariant(variant);
		setVariantModalType("delete");
	};

	const handleCloseVariantModel = () => {
		setVariantModalType(null);
		setVariantModalType(null);
	};

	const handleConfirmDeleteVariant = async (variantId) => {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/variants/${variantId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (res.data.status === "SUCCESS") {
				toast.success("Xóa thuộc tính sản phẩm thành công");
				reloadProduct();
			}
		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.name} `);
			console.log("Lỗi: ", err);
		}
	};

	const getTotalStock = (product) => {
		if (!product.variants || product.variants.length === 0)
			return product.stock || 0;
		return product.variants.reduce(
			(total, variant) => total + (variant.stock || 0),
			0
		);
	};

	const formatDateTime = (dateTime) => {
		const date = new Date(dateTime + "Z");
		const utc = date.getTime() + date.getTimezoneOffset() * 60000;
		const vnTime = new Date(utc + 7 * 60 * 60 * 1000);

		const day = String(vnTime.getDate()).padStart(2, "0");
		const month = String(vnTime.getMonth() + 1).padStart(2, "0");
		const year = vnTime.getFullYear();
		const hours = String(vnTime.getHours()).padStart(2, "0");

		const minutes = String(vnTime.getMinutes()).padStart(2, "0");
		const seconds = String(vnTime.getSeconds()).padStart(2, "0");
		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	};

	if (!productView) return null;

	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center p-4 overflow-auto z-10"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg text-gray font-semibold">
							Chi tiết sản phẩm "{productView.name}"
						</h3>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<X className="h-5 w-5 cursor-pointer" />
						</button>
					</div>
					<div className="flex flex-col md:flex-row gap-6 mb-6">
						<div className="w-full md:w-1/3">
							<div className="grid grid-cols-2 gap-2">
								{productView.images &&
									productView.images.map((img, index) => (
										<div
											key={index}
											className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
										>
											<img
												src={img.imageUrl}
												alt={`${productView.name} - ${
													index + 1
												}`}
												className="w-full h-full object-cover"
											/>
										</div>
									))}
							</div>
						</div>
						<div className="w-full md:w-2/3">
							<h2 className="text-xl font-semibold mb-2">
								{productView.name}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<div className="text-sm text-gray-500">
										Mã sản phẩm
									</div>
									<div className="font-medium">
										{productView.id}
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">
										Danh mục
									</div>
									<div className="font-medium">
										{productView.categoryName} - Id:{" "}
										{productView.categoryId}
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">
										Cập nhật lần cuối{" "}
									</div>
									<div className="font-medium">
										{formatDateTime(
											productView.createdDate
										)}
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">
										Giá
									</div>
									<div className="font-medium text-lg">
										${productView.price}
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">
										Trạng thái sản phẩm
									</div>
									<StatusBadge
										status={productView.isActive}
									/>
								</div>
							</div>
							<div className="mb-4">
								<div className="text-sm text-gray-500 mb-1">
									Mô tả sản phẩm
								</div>
								<p className="text-gray-700">
									{productView.description}
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<div className="text-sm text-gray-500 mb-2">
								Thông tin tồn kho
							</div>
							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between mb-2">
									<span className="text-gray-700">
										Sản phẩm tồn kho:
									</span>
									<span className="font-medium">
										{getTotalStock(productView)} sản phẩm
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="">
						<div>
							<div className="text-sm text-gray-500 mb-2">
								Thuộc tính sản phẩm
							</div>
							<div className="flex flex-wrap gap-2">
								{productView.variants &&
									productView.variants.length > 0 && (
										<div className="mb-6">
											<div
												className="flex items-center m-3 bg-green-500 w-fit rounded-full p-1 border border-green-500 hover:bg-white duration-200"
												onClick={handleAddVariant}
											>
												<Plus className=" text-white hover:text-orange-500 cursor-pointer duration-200 " />
											</div>
											<div className="overflow-x-auto">
												<table className="min-w-full border text-sm">
													<thead>
														<tr className="bg-gray-100">
															<th className="px-2 py-1 border">
																Ảnh
															</th>
															<th className="px-2 py-1 border">
																Thuộc tính
															</th>
															<th className="px-2 py-1 border">
																Giá
															</th>
															<th className="px-2 py-1 border">
																Tồn kho
															</th>
															<th className="px-2 py-1 border">
																Thao tác
															</th>
														</tr>
													</thead>
													<tbody>
														{productView.variants.map(
															(variant) => (
																<tr
																	key={
																		variant.id
																	}
																>
																	<td className="px-2 py-1 border">
																		{variant.imageUrl ? (
																			<img
																				src={
																					variant.imageUrl
																				}
																				alt="variant"
																				className="w-12 h-12 object-cover rounded"
																			/>
																		) : (
																			<span className="text-gray-400">
																				Không
																				có
																				ảnh
																			</span>
																		)}
																	</td>
																	<td className="px-2 py-1 border">
																		{variant.attributes &&
																			variant.attributes.map(
																				(
																					attr
																				) => (
																					<span
																						key={
																							attr.id
																						}
																						className="inline-block mr-2 bg-gray-200 rounded px-2 py-0.5"
																					>
																						{
																							attr.type
																						}

																						:{" "}
																						{
																							attr.value
																						}
																					</span>
																				)
																			)}
																	</td>
																	<td className="px-2 py-1 border">
																		$
																		{
																			variant.price
																		}
																	</td>
																	<td className="px-2 py-1 border">
																		{
																			variant.stock
																		}
																	</td>
																	<td className="px-2 py-1 border">
																		<div className="flex space-x-2 justify-center">
																			<button
																				onClick={() =>
																					handleEditVariant(
																						variant
																					)
																				}
																				className="text-orange-500 cursor-pointer hover:text-orange-700"
																				title="Sửa"
																			>
																				<Edit className="h-4 w-4" />
																			</button>
																			<button
																				onClick={() =>
																					handleDeleteVariant(
																						variant
																					)
																				}
																				className="text-red-500 cursor-pointer hover:text-red-700"
																				title="Xóa"
																			>
																				<Trash className="h-4 w-4" />
																			</button>
																		</div>
																	</td>
																</tr>
															)
														)}
													</tbody>
												</table>
											</div>
										</div>
									)}
							</div>
						</div>
					</div>
					<div className="flex justify-end space-x-3">
						<button
							onClick={onClose}
							className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-400 duration-200 hover:text-white"
						>
							Đóng
						</button>
						<button
							onClick={() => onEdit(product)}
							className="px-4 py-2 border border-gray-300 bg-orange-500 rounded-lg text-white cursor-pointer hover:bg-orange-600 duration-200"
						>
							Sửa sản phẩm
						</button>
					</div>
				</div>
			</div>
			{variantModalType === "add" && (
				<VariantAddModal
					isOpen={true}
					onClose={handleCloseVariantModel}
					productId={productView.id}
					token={token}
					reloadProduct={reloadProduct}
				/>
			)}
			{variantModalType === "edit" && selectedVariant && (
				<VariantEditModal
					isOpen={true}
					onClose={handleCloseVariantModel}
					variant={selectedVariant}
					productId={productView.id}
					token={token}
					reloadProduct={reloadProduct}
				/>
			)}
			{variantModalType === "delete" && selectedVariant && (
				<DeleteVariantModal
					isOpen={true}
					onClose={handleCloseVariantModel}
					variant={selectedVariant}
					onConfirm={handleConfirmDeleteVariant}
				/>
			)}
		</div>
	);
};

export default ProductViewModal;
