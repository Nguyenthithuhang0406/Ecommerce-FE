/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatNumber } from "@/utils/function";

import "./Cart.scss";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import Layout from "@/components/commons/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList, setPrice } from "@/store/orderSlice";
import { getProductsInCart } from "@/api/cartAPI/cart";

const Cart = () => {
  const [listProducts, setListProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedProductsFromStore = useSelector(
    (state) => state.order.orderList || []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchListProductsInCart = async () => {
      try {
        setSelectedProducts(selectedProductsFromStore);
        const response = await getProductsInCart();
        setListProducts(response.data.items);
      } catch (error) {
        console.log("Error fetching products in cart:", error);
      }
    };
    fetchListProductsInCart();
  }, []);

  useEffect(() => {
    let total = 0;
    selectedProducts?.forEach((product) => {
      total += product.price * product.quantity;
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
