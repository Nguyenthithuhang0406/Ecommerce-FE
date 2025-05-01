/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatNumber } from "@/utils/function";

import "./Cart.scss";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import Layout from "@/components/commons/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import { useDispatch } from "react-redux";
import { setOrderList, setPrice } from "@/store/orderSlice";

const Cart = () => {
  const [listProducts, setListProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const listProductsFake = [
    {
      id: 1,
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
      type: "29",
      quantity: 1,
    },
    {
      id: 2,
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
      type: "S",
      quantity: 2,
    },
    {
      id: 3,
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
      type: "M",
      quantity: 3,
    },
    {
      id: 4,
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
      type: "L",
      quantity: 1,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setListProducts(listProductsFake);
  }, []);

  useEffect(() => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price * (1 - product.discount / 100) * product.quantity;
    });
    setTotalPrice(total);
  }, [selectedProducts]);

  const handleClickBuy = () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }

    dispatch(setOrderList(selectedProducts));
    dispatch(setPrice(totalPrice));
    navigate("/order");
  };

  return (
    <div>
      <Layout>
        <div className="card-page">
          <TitleRouter title="Giỏ hàng" />
          <div className="card">
            <div className="card-container">
              <h1>Giỏ hàng của bạn</h1>
              <div className="card-container__list">
                {listProducts.map((product, index) => (
                  <CartItem
                    setListProducts={setListProducts}
                    key={index}
                    product={product}
                    setSelectedProducts={setSelectedProducts}
                    selectedProducts={selectedProducts}
                  />
                ))}
              </div>
              <div className="card-container__total">
                <p>
                  Tổng tiền: <span>{formatNumber(totalPrice)} đ</span>
                </p>
                <div className="card-container__total-buttons">
                  <button className="btn1" onClick={() => navigate("/")}>
                    Tiếp tục mua hàng
                  </button>
                  <button className="btn2" onClick={handleClickBuy}>
                    Thanh toán ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Cart;
