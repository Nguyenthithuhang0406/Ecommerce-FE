import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import VariantImageUploader from "./VariantImageUploader";

const VariantAddModal = ({
	isOpen,
	onClose,
	productId,
	token,
	reloadProduct,
}) => {
	const [form, setForm] = useState({
		price: "",
		stock: "",
		imageFile: null,
	});

	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.price || !form.stock) {
			toast.error("Vui lòng nhập đủ giá và tồn kho.");
			return;
		}
		const formData = new FormData();
		formData.append("productId", productId);
		formData.append("price", form.price);
		formData.append("stock", form.stock);
		if (form.imageFile) {
			formData.append("image", form.imageFile);
		}
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/variants`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Thêm biến thể thành công");
			if (res.data.status === "SUCCESS") {
				reloadProduct();
			}
			onClose();
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} - Nguyên nhân: ${
					err.response?.statusText || ""
				}`
			);
			console.log(err);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center p-4 overflow-auto z-20"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">
						Thêm biến thể sản phẩm
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5 cursor-pointer" />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Giá
						</label>
						<input
							type="number"
							name="price"
							value={form.price}
							onChange={handleChange}
							min={0}
							step="0.01"
							className="w-full border border-gray-300 rounded-lg p-2"
							required
							placeholder="Nhập giá biến thể"
						/>
					</div>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Tồn kho
						</label>
						<input
							type="number"
							name="stock"
							value={form.stock}
							onChange={handleChange}
							min={0}
							className="w-full border border-gray-300 rounded-lg p-2"
							required
							placeholder="Nhập số lượng tồn kho"
						/>
					</div>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Ảnh biến thể (tùy chọn)
						</label>
						<VariantImageUploader
							imageUrl={null}
							onChange={(file) =>
								setForm((prev) => ({
									...prev,
									imageFile: file,
								}))
							}
						/>
					</div>
					<div className="flex justify-end space-x-3 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 duration-200"
						>
							Hủy
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 duration-200"
						>
							Thêm mới
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VariantAddModal;
