import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import VariantImageUploader from "./VariantImageUploader";
const ATTRIBUTE_TYPES = [
	{
		value: "color",
		label: "Màu sắc",
	},
	{
		value: "size",
		label: "Kích cỡ",
	},
];

const VariantEditModal = ({
	isOpen,
	onClose,
	variant,
	productId,
	token,
	reloadProduct,
}) => {
	console.log("Variant: ", variant);

	const [type, setType] = useState("");
	const [value, setValue] = useState("");

	const [form, setForm] = useState({
		price: variant?.price || 0,
		stock: variant?.stock || 0,
		imageFile: null,
		attributes: variant?.attributes || [],
	});

	const colorAttributes = form.attributes.filter(
		(attr) => attr.type === "color"
	);
	const sizeAttributes = form.attributes.filter(
		(attr) => attr.type === "size"
	);
	const [editingAttribute, setEditingAttribute] = useState(null);
	const [attributeId, setAttributeId] = useState(null);

	if (!isOpen || !variant) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleDeleteAttribute = async (attributeId) => {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/attributes/${attributeId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Xóa thuộc tính thành công");
			setForm((prev) => ({
				...prev,
				attributes: prev.attributes.filter(
					(attr) => attr.id !== attributeId
				),
			}));
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `
			);
		}
	};

	const handleAddAttribute = async () => {
		if (!type || !value) return;
		try {
			const resAttribute = await axios.post(
				`${import.meta.env.VITE_API_URL}/attributes/${variant.id}`,
				{
					type: type,
					value: value,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (resAttribute.data.status === "SUCCESS") {
				toast.success("Thêm thuộc tính sách phẩm thành công");
				setForm((prev) => ({
					...prev,
					attributes: [
						...prev.attributes,
						{ type: type, value: value },
					],
				}));
			}
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `
			);
		}
	};

	const handleUpdateAttribute = async () => {
		try {
			const res = await axios.put(
				`${import.meta.env.VITE_API_URL}/attributes/${attributeId}`,
				{
					type: type,
					value: value,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (res.data.status === "SUCCESS") {
				toast.success("Cập nhật thuộc tính thành công");
				setForm((prev) => ({
					...prev,
					attributes: prev.attributes.map((attr) =>
						attr.id === editingAttribute.id
							? { ...attr, type, value }
							: attr
					),
				}));
				setEditingAttribute(null);
				setType("");
				setValue("");
			}
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `
			);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("productId", productId);
		formData.append("price", form.price);
		formData.append("stock", form.stock);
		if (form.imageFile) {
			formData.append("image", form.imageFile);
		}
		try {
			const res = await axios.put(
				`${import.meta.env.VITE_API_URL}/variants/${variant.id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Lưu thông tin thành công");
			if (res.data.status === "SUCCESS") {
				reloadProduct();
			}
			onClose();
		} catch (err) {
			toast.error(
				`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `
			);
			console.log(err);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center p-4 overflow-auto z-10"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">
						Chỉnh sửa thuộc tính
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
						/>
					</div>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Ảnh thuộc tính
						</label>
						<VariantImageUploader
							imageUrl={variant.imageUrl}
							onChange={(file) =>
								setForm((prev) => ({
									...prev,
									imageFile: file,
								}))
							}
						/>
					</div>
					<div className="mb-3">
						<label className="block text-sm font-medium mb-1">
							Thuộc tính
						</label>
						<div className="flex gap-4">
							<div className="flex-1">
								<div className="font-semibold mb-1">
									Màu sắc
								</div>
								{colorAttributes.map((attr, idx) => (
									<div
										key={attr.id || idx}
										className="flex items-center gap-2 mb-1"
									>
										<span
											className=" rounded-bl-xs cursor-pointer bg-gray-400 w-auto p-1 m-1 text-white hover:text-indigo-500 hover:bg-white duration-200 hover:border"
											onClick={() => {
												setEditingAttribute(attr);
												setType("color");
												setValue(attr.value);
												setAttributeId(attr.id);
											}}
										>
											{attr.value}
										</span>
										<button
											type="button"
											onClick={() =>
												handleDeleteAttribute(attr.id)
											}
											className="text-red-500 cursor-pointer hover:text-red-800 duration-200"
											title="Xóa thuộc tính"
										>
											&times;
										</button>
									</div>
								))}
							</div>
							<div className="flex-1">
								<div className="font-semibold mb-1">
									Kích cỡ
								</div>
								{sizeAttributes.map((attr, idx) => (
									<div
										key={attr.id || idx}
										className="flex items-center gap-2 mb-1"
									>
										<span
											className="rounded-bl-xs cursor-pointer bg-gray-400 w-auto p-1 m-1 text-white hover:text-indigo-500 hover:bg-white duration-200 hover:border"
											onClick={() => {
												setEditingAttribute(attr);
												setType("size");
												setValue(attr.value);
												setAttributeId(attr.id);
											}}
										>
											{attr.value}
										</span>
										<button
											type="button"
											onClick={() =>
												handleDeleteAttribute(attr.id)
											}
											className="text-red-500 cursor-pointer hover:text-red-800 duration-200"
											title="Xóa thuộc tính"
										>
											&times;
										</button>
									</div>
								))}
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<select
								value={type}
								onChange={(e) => setType(e.target.value)}
								className="border-none border-orange-600 bg-amber-500 text-white rounded px-2 py-1"
							>
								<option value="">Chọn loại thuộc tính</option>
								{ATTRIBUTE_TYPES.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
							<input
								type="text"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder="Nhập giá trị"
								className="border focus:outline-none focus:ring-0 focus:border-red-700 border-orange-600 rounded px-2 py-1"
							/>
						</div>
						<button
							disabled={!type || !value}
							type="button"
							onClick={
								editingAttribute
									? handleUpdateAttribute
									: handleAddAttribute
							}
							className="mt-2 px-2 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 duration-200"
						>
							{editingAttribute
								? "Cập nhật thuộc tính"
								: "Thêm thuộc tính"}
						</button>
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
							Lưu thay đổi
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VariantEditModal;
