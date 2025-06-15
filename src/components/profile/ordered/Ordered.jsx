/* eslint-disable*/
import React, { useEffect, useState } from "react";

import "./Ordered.scss";
import { getOrderByOrderType } from "@/api/orderAPI/order";
import OrderedItem from "@/components/order/orderedItem/OrderedItem";
import { getProductByVariantId } from "@/api/productAPI/variant";

const Ordered = () => {
  const [orderType, setOrderType] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderByOrderType(orderType);
        const ordersData = response.data || [];

        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const updatedItems = await Promise.all(
              order.items.map(async (item) => {
                const detail = await getProductByVariantId(item.variantId);
                return {
                  ...item,
                  productName: detail.data.productName,
                  imageUrl: detail.data.imageUrl,
                };
              })
            );

            return {
              ...order,
              items: updatedItems,
            };
          })
        );

        setOrders(updatedOrders);
        console.log("Fetched orders:", updatedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [orderType]);
  
  return (
    <div className="ordered" data-aos="fade-left">
      <div className="ordered__container">
        <h1 className="ordered__container-title">Lịch sử mua hàng</h1>
        <div className="ordered__container-menu">
          <p
            onClick={() => setOrderType("")}
            className={`${orderType === "" ? "bg-[#7d2111]" : "bg-[#ff6347]"}`}
          >
            Tất cả
          </p>
          <p
            onClick={() => setOrderType("PENDING")}
            className={`${
              orderType === "PENDING" ? "bg-[#7d2111]" : "bg-[#ff6347]"
            }`}
          >
            Đang giao hàng
          </p>
          <p
            onClick={() => setOrderType("SHIPPED")}
            className={`${
              orderType === "SHIPPED" ? "bg-[#7d2111]" : "bg-[#ff6347]"
            }`}
          >
            Đã giao hàng
          </p>
          <p
            onClick={() => setOrderType("CANCELED")}
            className={`${
              orderType === "CANCELED" ? "bg-[#7d2111]" : "bg-[#ff6347]"
            }`}
          >
            Đã hủy
          </p>
        </div>
        {orders.length > 0 ? (
          <div className="w-full h-auto flex flex-col gap-5 mt-5">
            {orders.map((order) => (
              <OrderedItem item={order} />
            ))}
          </div>
        ) : (
          <p className="ordered__container-empty">Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default Ordered;
