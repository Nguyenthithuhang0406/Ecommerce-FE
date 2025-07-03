/* eslint-disable */
import React, { useEffect, useState } from "react";

import "./RightOrder.scss";
import { useSelector } from "react-redux";
import { formatNumber } from "@/utils/function";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { createdOrder } from "@/api/orderAPI/order";
import { toast } from "react-toastify";

const RightOrder = ({ orderInformation, setOrderInformation }) => {
  const selectedProducts = useSelector((state) => state.order.orderList);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const [price, setPrice] = useState(totalPrice);
  const [products, setProducts] = useState(selectedProducts);
  const navigate = useNavigate();

  const handleClickQuantity = (product, status) => {
    const updatedProducts = products.map((item) => {
      if (item.variantId === product.variantId) {
        return {
          ...item,
          quantity:
            status === "increase" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
    setPrice(
      status === "increase" ? price + product.price : price - product.price
    );
  };

  useEffect(() => {
    setOrderInformation((prev) => ({
      ...prev,
      items: products.map((product) => ({
        variantId: product.variantId,
        quantity: product.quantity,
      })),
    }));
  }, [selectedProducts]);

  const handleOrder = async () => {
    console.log("Updated order information:", orderInformation);
    try {
      const response = await createdOrder(orderInformation);
      // toast.success("Đặt hàng thành công!");
      if (response.data.payment.paymentUrl) {
        window.location.href = response.data.payment.paymentUrl;
      }
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  return (
    <div className="rightOrder">
      <h1>Đơn hàng ({selectedProducts.length} sản phẩm)</h1>
      <div className="rightOrder__list">
        {products.map((product, index) => (
          <div key={index} className="rightOrder__list-item">
            <img src={product.imageUrl} />
            <div className="rightOrder__list-item-info">
              <p>{product.productName}</p>
              {product.attributes &&
                product.attributes.map((attribute, index) => (
                  <p className="rightOrder__list-item-info-type">
                    {attribute.type}: {attribute.value}
                  </p>
                ))}
              <div className="rightOrder__list-item-info-price">
                <div className="rightOrder__list-item-info-price-quantity">
                  <button
                    className="rightOrder__list-item-info-price-quantity-button"
                    onClick={() => handleClickQuantity(product, "decrease")}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="rightOrder__list-item-info-price-quantity-button"
                    onClick={() => handleClickQuantity(product, "increase")}
                  >
                    +
                  </button>
                </div>
                <p>{formatNumber(product.price * product.quantity)} đ</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rightOrder__total-container">
        <div className="rightOrder__total-container-item">
          <div className="rightOrder__total-container-item-i">
            <p>Tạm tính:</p>
            <p>{formatNumber(price)} đ</p>
          </div>
          <div className="rightOrder__total-container-item-i">
            <p>Phí vận chuyển:</p>
            <p>0 đ</p>
          </div>
        </div>
      </div>
      <div className="rightOrder__total-container">
        <div className=" total-item">
          <p>Tổng cộng:</p>
          <p>{formatNumber(price)} đ</p>
        </div>
      </div>
      <div className="rightOrder__button">
        <p
          className="rightOrder__button-back"
          onClick={() => navigate("/cart")}
        >
          <span>
            <GrFormPrevious />
          </span>
          Quay lại giỏ hàng
        </p>
        <button className="rightOrder__button-btn" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default RightOrder;
