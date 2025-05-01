import React, { useState } from "react";
import { X } from "lucide-react";

const ImageOrderGallery = ({ items }) => {
	const [selectedItem, setSelectedItem] = useState(items[0] || null);
	const [modalOpen, setModalOpen] = useState(false);
	const handleItemClick = (item) => {
		setSelectedItem(item);
		setModalOpen(true);
	};


	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{items.map((item, index) => (
					<div
						key={index}
						className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 aspect-square relative group"
						onClick={() => handleItemClick(item)}
					>
						<img
							src={item.image}
							alt={item.name}
							className="w-full h-full object-cover"
						/>
						<div className="absolute  inset-0 bg-opacity-0 group-hover:bg-[#0000009e] group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
							<div className="text-white  opacity-0 group-hover:opacity-200">
								Chi tiết sản phẩm
							</div>
						</div>
					</div>
				))}
			</div>

			{modalOpen && selectedItem && (
				<div className="fixed inset-0 bg-[#0000009e] bg-opacity-75 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">
									{selectedItem.name}
								</h3>
								<button
									onClick={closeModal}
									className="text-gray-500 hover:text-gray-700"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							<div className="flex flex-col md:flex-row gap-6">
								<div className="w-full md:w-1/2">
									<div className="rounded-lg overflow-hidden aspect-square">
										<img
											src={selectedItem.image}
											alt={selectedItem.name}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>

								<div className="w-full md:w-1/2">
									<div className="mb-4">
										<div className="text-sm text-gray-500">
											Đơn giá:{" "}
										</div>
										<div className="font-semibold text-lg">
											{selectedItem.price}
										</div>
									</div>

									{selectedItem.size && (
										<div className="mb-4">
											<div className="text-sm text-gray-500">
												Loại:
											</div>
											<div>{selectedItem.size}</div>
										</div>
									)}

									{selectedItem.quantity && (
										<div className="mb-4">
											<div className="text-sm text-gray-500">
												Số lượng:
											</div>
											<div>{selectedItem.quantity}</div>
										</div>
									)}

									{selectedItem.subtotal && (
										<div className="mb-4">
											<div className="text-sm text-gray-500">
												Tổng:
											</div>
											<div className="font-semibold">
												{selectedItem.subtotal}
											</div>
										</div>
									)}

									{selectedItem.description && (
										<div className="mb-4">
											<div className="text-sm text-gray-500">
												Mô tả
											</div>
											<div className="text-sm text-gray-700">
												{selectedItem.description}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageOrderGallery;
