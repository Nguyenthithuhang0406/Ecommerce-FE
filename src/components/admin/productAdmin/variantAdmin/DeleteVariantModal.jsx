import React from "react";
import { X } from "lucide-react";

const DeleteVariantModal = ({ isOpen, onClose, onConfirm, variant }) => {
	if (!isOpen || !variant) return null;

	return (
		<div
			className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">
						Xác nhận xóa phiên bản
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5 cursor-pointer" />
					</button>
				</div>
				<div className="mb-6">
					<p className="text-gray-600 mb-4">
						Bạn có chắc chắn muốn xóa phiên bản này không?
					</p>
					<div className="flex items-center p-3 bg-gray-50 rounded-lg">
						{variant.imageUrl && (
							<img
								src={variant.imageUrl}
								alt="variant"
								className="h-12 w-12 rounded-lg object-cover"
							/>
						)}
						<div className="ml-3">
							<div className="font-medium">
								Giá: {variant.price}
							</div>
							<div className="text-sm text-gray-500">
								Tồn kho: {variant.stock}
							</div>
							<div className="text-sm text-gray-500">
								{variant.attributes &&
									variant.attributes.map((attr) => (
										<span key={attr.id} className="mr-2">
											{attr.type}: {attr.value}
										</span>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-50"
					>
						Hủy
					</button>
					<button
						onClick={() => onConfirm(variant.id)}
						className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
					>
						Xóa
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteVariantModal;
