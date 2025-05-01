import React from "react";

import ImageOrderGallery from "./ImageOrderGallery";

const OrderItemsGallery = ({ items, onClose }) => {
	return (
		<div className="p-6">
			<h3 className="text-lg font-semibold mb-4">Order Items</h3>

			<ImageOrderGallery items={items} />

			<div className="mt-6">
				<div className="text-sm text-gray-500 mb-2">
					Tóm tắt đơn hàng
				</div>
				<div className="bg-gray-50 p-4 rounded-lg">
					<div className="grid grid-cols-2 gap-2">
						<div className="text-gray-600">Tổng đơn hàng:</div>
						<div className="text-right font-medium">
							{items.length} sản phẩm
						</div>

						<div className="text-gray-600">Tổng:</div>
						<div className="text-right font-medium">
							$
							{items
								.reduce(
									(sum, item) =>
										sum +
										parseFloat(
											item.price.replace("$", "")
										) *
											item.quantity,
									0
								)
								.toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemsGallery;
