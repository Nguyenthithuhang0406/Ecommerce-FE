import { MapPin, Package, Truck, User, X } from "lucide-react";
import React from "react";

import { useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemsGallery from "./OrderItemsGallery";

const OrderViewModal = ({ order, onClose }) => {
	const [activeTab, setActiveTab] = useState("details"); // 'details' or 'items'

	if (!order) return null;

	return (
		<div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4 ">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-semibold">
						Đơn hàng #{order.id}
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="flex border-b">
					<button
						className={`px-4 py-2 font-medium ${
							activeTab === "details"
								? "text-orange-600 border-b-2 border-orange-500"
								: "text-gray-500 hover:text-gray-700"
						}`}
						onClick={() => setActiveTab("details")}
					>
						Chi tiết đơn hàng
					</button>
					<button
						className={`px-4 py-2 font-medium ${
							activeTab === "items"
								? "text-orange-600 border-b-2 border-orange-500"
								: "text-gray-500 hover:text-gray-700"
						}`}
						onClick={() => setActiveTab("items")}
					>
						Sản phẩm có trong đơn hàng ({order.items.length})
					</button>
				</div>

				<div className="overflow-y-auto flex-1">
					{activeTab === "details" ? (
						<div className="p-6">
							<div className="mb-6">
								<h4 className="text-lg font-medium mb-4">
									Tổng quan đơn hàng
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-gray-50 p-4 rounded-lg">
										<div className="flex items-start">
											<div className="bg-orange-100 p-2 rounded-lg mr-3">
												<Package className="h-5 w-5 text-orange-600" />
											</div>
											<div>
												<div className="text-sm font-medium">
													Thông tin đơn hàng
												</div>
												<div className="mt-2 space-y-2 text-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Mã đơn hàng:
														</div>
														<div>{order.id}</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Ngày đặt:
														</div>
														<div>
															{new Date(
																order.orderDate
															).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																	hour: "2-digit",
																	minute: "2-digit",
																}
															)}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Trạng thái:
														</div>
														<div>
															<OrderStatusBadge
																status={
																	order.status
																}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg">
										<div className="flex items-start">
											<div className="bg-blue-100 p-2 rounded-lg mr-3">
												<User className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<div className="text-sm font-medium">
													Thông tin người bán
												</div>
												<div className="mt-2 space-y-2 text-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Tên người bán:{" "}
														</div>
														<div>
															{order.sellerName}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Tên cửa hàng:
														</div>
														<div>
															{order.storeName ||
																"N/A"}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Liên hệ:
														</div>
														<div>
															{order.sellerContact ||
																"N/A"}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg">
										<div className="flex items-start">
											<div className="bg-green-100 p-2 rounded-lg mr-3">
												<Truck className="h-5 w-5 text-green-600" />
											</div>
											<div>
												<div className="text-sm font-medium">
													Thông tin vận chuyển
												</div>
												<div className="mt-2 space-y-2 text-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Phương thức vận
															chuyển:
														</div>
														<div>
															{order.shippingMethod ||
																"Standard Delivery"}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Phí vận chuyển:
														</div>
														<div>
															{order.shippingFee ||
																"Free"}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Ngày giao hàng:
														</div>
														<div>
															{order.estimatedDelivery ||
																"N/A"}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg">
										<div className="flex items-start">
											<div className="bg-purple-100 p-2 rounded-lg mr-3">
												<MapPin className="h-5 w-5 text-purple-600" />
											</div>
											<div>
												<div className="text-sm font-medium">
													Địa chỉ nhận đơn
												</div>
												<div className="mt-2 space-y-2 text-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Người nhận:
														</div>
														<div>
															{order.recipient ||
																"N/A"}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Số điện thoại:
														</div>
														<div>
															{order.recipientPhone ||
																"N/A"}
														</div>
													</div>
													<div className="grid grid-cols-2 gap-2">
														<div className="text-gray-500">
															Địa chỉ:
														</div>
														<div>
															{order.deliveryAddress ||
																"N/A"}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-6">
								<h4 className="text-lg font-medium mb-4">
									Thông tin thanh toán
								</h4>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<div className="text-sm text-gray-500 mb-1">
												Phương thức thanht toán
											</div>
											<div>
												{order.paymentMethod ||
													"Credit Card"}
											</div>
										</div>
										<div>
											<div className="text-sm text-gray-500 mb-1">
												Trạng thái thanh toán
											</div>
											<div
												className={`px-2 py-1 text-xs inline-block rounded-full ${
													order.paymentStatus ===
													"Paid"
														? "bg-green-100 text-green-800"
														: "bg-yellow-100 text-yellow-800"
												}`}
											>
												{order.paymentStatus || "Paid"}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h4 className="text-lg font-medium mb-4">
									Tổng tiền đơn hàng
								</h4>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-gray-600">
												Tổng tiền:
											</span>
											<span>
												$
												{order.subtotal ||
													order.items
														.reduce(
															(sum, item) =>
																sum +
																parseFloat(
																	item.price.replace(
																		"$",
																		""
																	)
																) *
																	item.quantity,
															0
														)
														.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">
												Phí vận chuyển:
											</span>
											<span>
												{order.shippingFee || "Free"}
											</span>
										</div>
										{order.discount && (
											<div className="flex justify-between">
												<span className="text-gray-600">
													Giảm giá:
												</span>
												<span className="text-green-600">
													-{order.discount}
												</span>
											</div>
										)}
										{order.tax && (
											<div className="flex justify-between">
												<span className="text-gray-600">
													Thuế:
												</span>
												<span>{order.tax}</span>
											</div>
										)}
										<div className="border-t pt-2 mt-2 flex justify-between font-semibold">
											<span>Thành tiền:</span>
											<span>{order.totalAmount}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<OrderItemsGallery
							items={order.items}
							onClose={() => setActiveTab("details")}
						/>
					)}
				</div>

				{/* Footer Actions */}
				<div className="p-4 border-t flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderViewModal;
