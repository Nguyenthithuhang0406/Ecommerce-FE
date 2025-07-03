/* eslint-disable*/
import { getReferenceOrder } from "@/api/orderAPI/order";
import Layout from "@/components/commons/layout/Layout";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import React, { useState } from "react";

import "./References.scss";
import OrderedItem from "@/components/order/orderedItem/OrderedItem";
import { getProductByVariantId } from "@/api/productAPI/variant";
const References = () => {
  const [references, setReferences] = useState("");
  const [order, setOrder] = useState(null);

  const handleResolve = async () => {
    if (references) {
      try {
        const response = await getReferenceOrder(references);
        const orderData = response.data;

        const updatedItems = await Promise.all(
          (orderData.items || []).map(async (item) => {
            try {
              const detail = await getProductByVariantId(item.variantId);
              return {
                ...item,
                productName: detail.data.productName,
                imageUrl: detail.data.imageUrl,
              };
            } catch (err) {
              console.error(
                `Lỗi khi lấy chi tiết sản phẩm với variantId ${item.variantId}:`,
                err
              );
              return {
                ...item,
                productName: "Không tìm thấy",
                imageUrl: null,
              };
            }
          })
        );
        setOrder({
          ...orderData,
          items: updatedItems,
        });

        console.log("Đơn hàng:", order);
      } catch (error) {
        console.error("Lỗi khi kiểm tra đơn hàng:", error);
      }
    } else {
      setOrder(null);
    }
  };
  return (
    <Layout>
      <TitleRouter title={"Kiểm tra đơn hàng"} />
      <div className="references h-[500px]">
        <div className="w-full flex justify-center items-center gap-3">
          {/* <lable>Nhập mã đơn hàng: </lable> */}
          <input
            className="p-2 border border-gray-300 rounded outline-none focus:border-amber-700"
            placeholder="Nhập mã đơn hàng..."
            type="text"
            onChange={(e) => setReferences(e.target.value)}
            value={references}
          />
          <button
            className="bg-[#ff6347] text-white cursor-pointer py-2 px-5 rounded hover:bg-[#eda092]"
            onClick={handleResolve}
          >
            Kiểm tra
          </button>
        </div>
        <p className="text-[#9d1d07] my-5">Thông tin đơn hàng</p>
        {order ? (
          <OrderedItem item={order} />
        ) : (
          <div>Không tìm thấy đơn hàng</div>
        )}
      </div>
    </Layout>
  );
};

export default References;
