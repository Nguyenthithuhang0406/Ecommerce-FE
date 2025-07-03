/* eslint-disable*/
import { formatDate, formatNumber } from "@/utils/function";
import React from "react";

import "./OrderedItem.scss";
const OrderedItem = ({ item }) => {
  const handleTotal = (items) => {
    return items?.reduce((total, product) => {
      return total + (product.quantity || 0) * (product.price || 0);
    }, 0);
  };

  return (
    <div className="shadow-lg rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <p className="italic">{formatDate(item?.createdDate)} </p>
        <div className="flex items-center gap-4">
          <p className="text-red-500">
            {item?.status === "PENDING"
              ? "Đang giao hàng"
              : item?.status === "SHIPPED"
              ? "Đã giao hàng"
              : item?.status === "CANCELED"
              ? "Đã hủy"
              : "Chưa thanh toán."}
          </p>
        </div>
      </div>
      {item?.items?.map((product, index) => (
        <div className="flex gap-4 items-center" key={index}>
          <img
            className="w-[100px] h-[100px] object-cover rounded-lg"
            src={
              product?.imageUrl ||
              "https://bode.vn/wp-content/uploads/2024/12/bo-ba-ba-nu-co-tim-khuy-boc-bo-de-2.jpg"
            }
            alt="item"
          />

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h3>{product?.itemName || "abc"}</h3>
              <p>
                Giá:{" "}
                <span className="text-[#7d2111]">
                  {formatNumber(product?.price) || 0} đ
                </span>
              </p>
              <p>
                Số lượng: <span>{product?.quantity || 0}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 method">
              <p>
                Mã đơn hàng:{" "}
                <span className="text-[#7d2111]">{item?.reference}</span>
              </p>
              <p>
                {item?.paymentMethod === "COD"
                  ? "Thanh toán khi nhận hàng."
                  : item?.paymentMethod === "MOMO"
                  ? "Phương thức thanh toán qua MoMo."
                  : item?.paymentMethod === "VNPAY"
                  ? "Phương thức thanh toán qua VNPAY."
                  : "Phương thức thanh toán không xác định."}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-end italic">
        Tổng đơn: {handleTotal(item?.items)} đ
      </div>
    </div>
  );
};

export default OrderedItem;
