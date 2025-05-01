import { Plus, Trash } from "lucide-react";
import React from "react";

const CategoryForm = ({
	formData,
	onChange,
	onSubmit,
	formType,
	onClose,
	onAddSubcategory,
	onRemoveSubcategory,
}) => {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Category Name
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={onChange}
					className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={onChange}
					rows="3"
					className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
				></textarea>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Icon
				</label>
				<input
					type="text"
					name="icon"
					value={formData.icon}
					onChange={onChange}
					placeholder="📱, 👕, 🏠, etc."
					className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Display Order
				</label>
				<input
					type="number"
					name="displayOrder"
					value={formData.displayOrder}
					onChange={onChange}
					min="1"
					className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Subcategories
				</label>

				{formData.subcategories.map((subcategory, index) => (
					<div key={index} className="flex items-center mb-2">
						<input
							type="text"
							value={subcategory}
							onChange={(e) => {
								const newSubcategories = [
									...formData.subcategories,
								];
								newSubcategories[index] = e.target.value;
								onChange({
									target: {
										name: "subcategories",
										value: newSubcategories,
									},
								});
							}}
							className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							placeholder="Subcategory name"
						/>
						<button
							type="button"
							onClick={() => onRemoveSubcategory(index)}
							className="ml-2 text-red-500 hover:text-red-700"
						>
							<Trash className="h-4 w-4" />
						</button>
					</div>
				))}

				<button
					type="button"
					onClick={onAddSubcategory}
					className="mt-2 flex items-center text-sm text-orange-500 hover:text-orange-700"
				>
					<Plus className="h-4 w-4 mr-1" /> Add Subcategory
				</button>
			</div>

			<div className="flex justify-end space-x-3 pt-4">
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
				>
					{formType === "add" ? "Add Category" : "Save Changes"}
				</button>
			</div>
		</form>
	);
};

export default CategoryForm;
