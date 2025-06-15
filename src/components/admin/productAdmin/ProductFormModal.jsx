import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { toast } from "react-hot-toast";
import axios from "axios";

const ProductFormModal = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
	formType = "add",
}) => {
	const productId = initialData?.id;
	const [allCategory, setAllCategory] = useState([]);
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		description: "",
		price: "",
		categoryId: "",
		isActive: true,
		images: [],
		imagesFiles: [],
	});

	const getAllCategory = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/categories`
			);
			setAllCategory(res.data.data.content);
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} \n Nguyên nhân: ${
					err.response?.statusText || ""
				}`
			);
		}
	};

	useEffect(() => {
		getAllCategory();
		if (formType === "edit" && productId) {
			const fetchProduct = async () => {
				try {
					const res = await axios.get(
						`${import.meta.env.VITE_API_URL}/products/${productId}`
					);
					const product = res.data.data;
					setFormData({
						id: product.id,
						name: product.name || "",
						categoryId: product.categoryId || "",
						price: product.price || "",
						isActive: product.isActive,
						description: product.description || "",
						images: product.images
							? product.images.map((img) => img.imageUrl)
							: [],
						imagesFiles: [],
					});
				} catch (err) {
					toast.error("Không lấy được thông tin sản phẩm.");
				}
			};
			fetchProduct();
		} else if (formType === "add") {
			setFormData({
				id: "",
				name: "",
				description: "",
				categoryId: "",
				price: "",
				images: [],
				imagesFiles: [],
			});
		}
	}, [formType, productId, isOpen]);
	console.log("form data: ", formData);
	if (!isOpen) return null;

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (newImages, newFiles) => {
		setFormData((prev) => ({
			...prev,
			images: [...(prev.images || [])],
			imagesFiles: [...(prev.imagesFiles || []), ...newFiles].slice(
				0,
				4 - prev.images.length
			),
		}));
	};

	const handleImageRemove = (index) => {
		// Nếu là ảnh cũ (trong images), xóa khỏi images
		if (index < formData.images.length) {
			setFormData((prev) => ({
				...prev,
				images: prev.images.filter((_, i) => i !== index),
			}));
		} else {
			// Nếu là ảnh mới (trong imagesFiles), xóa khỏi imagesFiles
			const newIndex = index - formData.images.length;
			setFormData((prev) => ({
				...prev,
				imagesFiles: prev.imagesFiles.filter((_, i) => i !== newIndex),
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData, formData.imagesFiles);
	};

	return (
		<div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<form onSubmit={handleSubmit} className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-semibold">
							{formType === "add"
								? "Thêm sản phẩm"
								: "Sửa sản phẩm"}
						</h3>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-400 cursor-pointer hover:text-gray-600"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Tên sản phẩm
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Thuộc danh mục
							</label>
							<select
								name="categoryId"
								value={formData.categoryId}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							>
								<option value="">-- Chọn danh mục --</option>
								{allCategory.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Giá tiền
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleFormChange}
								step="0.01"
								min="0"
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							/>
						</div>
					</div>
					<div className="mt-6">
						<label className="block text-sm font-medium text-gray-700">
							Mô tả
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleFormChange}
							className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							rows="4"
						></textarea>
					</div>
					<ImageUploader
						images={[
							...formData.images, // link ảnh cũ
							...formData.imagesFiles.map((f) =>
								URL.createObjectURL(f)
							), // preview ảnh mới
						]}
						onUpload={handleImageUpload}
						onRemove={handleImageRemove}
						maxImages={4}
					/>
					<div className="mt-6 flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-400 hover:text-white duration-200"
						>
							Hủy bỏ
						</button>
						<button
							type="submit"
							onClick={handleSubmit}
							className="px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 duration-200"
						>
							{formType === "add"
								? "Thêm sản phẩm"
								: "Lưu các thay đổi "}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductFormModal;
