import React from "react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, category }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
				<h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
				<p className="text-gray-600 mb-6">
					Xác nhận xóa danh mục{" "}
					<span className="font-medium">{category?.name}</span>?
				</p>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirmModal;
