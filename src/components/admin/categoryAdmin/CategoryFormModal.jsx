import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import { X } from "lucide-react";

const CategoryFormModal = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
	formType,
}) => {
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		description: "",
		imageUrl: "",
	});
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
			setImagePreview(initialData.imageUrl || null);
		} else {
			setFormData({
				id: "",
				name: "",
				description: "",
				imageUrl: "",
			});
			setImagePreview(null);
		}
		setImageFile(null);
	}, [initialData, formType]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData, imageFile);
		console.log("imageFile", imageFile);
		console.log("formDatamodalmodal", formData);
		console.log("imagePreview", imagePreview);
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-semibold">
						{formType === "add" ? "Thêm danh mục" : "Sửa danh mục"}
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5 cursor-pointer" />
					</button>
				</div>
				<div className="p-4">
					<CategoryForm
						formData={formData}
						onChange={handleChange}
						onSubmit={handleSubmit}
						formType={formType}
						onClose={onClose}
						handleFileChange={handleFileChange}
						imageFile={imageFile}
						imagePreview={imagePreview}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryFormModal;
