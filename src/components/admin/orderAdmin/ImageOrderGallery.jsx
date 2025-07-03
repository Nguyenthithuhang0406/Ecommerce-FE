import React, { useState } from "react";
import { X } from "lucide-react";

const ImageOrderGallery = ({ items, token }) => {
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
						{item.image ? (
							<img
								src={item.image}
								alt={item.productName || item.name}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm">
								Không có ảnh
							</div>
						)}
						<div className="absolute inset-0 bg-opacity-0 group-hover:bg-[#0000009e] group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
							<div className="text-white opacity-0 group-hover:opacity-200">
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
									{selectedItem.productName}
								</h3>
								<button
									onClick={closeModal}
									className="text-gray-500 hover:text-gray-700"
								>
									<X className="h-5 w-5 cursor-pointer" />
								</button>
							</div>
							<div className="flex flex-col md:flex-row gap-6">
								<div className="w-full md:w-1/2">
									<div className="rounded-lg overflow-hidden aspect-square">
										{selectedItem.image ? (
											<img
												src={selectedItem.image}
												alt={selectedItem.productName}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm">
												Không có ảnh
											</div>
										)}
									</div>
								</div>
								<div className="w-full md:w-1/2 space-y-2">
									<div>
										<span className="text-sm text-gray-500">
											Tên sản phẩm:
										</span>
										<div className="font-semibold">
											{selectedItem.productName}
										</div>
									</div>
									<div>
										<span className="text-sm text-gray-500">
											Tồn kho:
										</span>
										<div>{selectedItem.stock}</div>
									</div>
									<div>
										<span className="text-sm text-gray-500">
											Đơn giá:
										</span>
										<div>{selectedItem.price}</div>
									</div>
									<div>
										<span className="text-sm text-gray-500">
											Số lượng đặt:
										</span>
										<div>{selectedItem.quantity}</div>
									</div>
									{selectedItem.attributes &&
										selectedItem.attributes.length > 0 && (
											<div>
												<span className="text-sm text-gray-500">
													Thuộc tính:
												</span>
												<ul>
													{selectedItem.attributes.map(
														(attr, idx) => (
															<li key={idx}>
																<span className="font-medium">
																	{attr.type}:
																</span>{" "}
																{attr.value}
															</li>
														)
													)}
												</ul>
											</div>
										)}
									{selectedItem.description && (
										<div>
											<span className="text-sm text-gray-500">
												Mô tả:
											</span>
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
