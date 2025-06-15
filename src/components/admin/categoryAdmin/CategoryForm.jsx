import { Plus, Trash } from "lucide-react";
import React from "react";

const CategoryForm = ({
	formData,
	onChange,
	onSubmit,
	formType,
	onClose,
	handleFileChange,
	imageFile,
	imagePreview,
}) => {
	console.log("formData cate form", formData);
	return (
		<form onSubmit={onSubmit}>
			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Tên danh mục
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={onChange}
					className="w-full focus:outline-none focus:ring-2 focus:ring-orange-500 p-2 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">Mô tả</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={onChange}
					className="w-full h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 p-2 border border-gray-300 rounded"
					rows="3"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Ảnh minh họa
				</label>
				<div>
					<input
						type="file"
						onChange={handleFileChange}
						className="flex-1"
					/>
					{imagePreview && (
						<div className="flex items-center gap-2">
							<img
								src={imagePreview}
								alt="Preview"
								className="w-xl object-cover rounded"
							/>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onClose}
					className="px-6 py-2 text-gray-500 border border-gray-300 rounded hover:bg-gray-200 duration-200 cursor-pointer"
				>
					Hủy
				</button>
				<button
					type="submit"
					className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer duration-200 "
				>
					{formType === "add" ? "Thêm" : "Cập nhật"}
				</button>
			</div>
		</form>
	);
};

export default CategoryForm;
