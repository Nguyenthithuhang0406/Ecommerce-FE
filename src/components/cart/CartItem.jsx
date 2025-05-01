/* eslint-disable */
import React from 'react';
import { MdCancel } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa6";
import { formatNumber } from "@/utils/function";

import "./CartItem.scss";

const CartItem = ({
  setListProducts,
  product,
  setSelectedProducts,
  selectedProducts,
}) => {
  const handleIncrease = (id) => {
    setListProducts((prev) => {
      return prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });

    setSelectedProducts((prev) => {
      return prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });
  };

  const handleDecrease = (id) => {
    setListProducts((prev) => {
      return prev.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    });

    setSelectedProducts((prev) => {
      return prev.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    });
  };

  const handleClickCheckbox = (id) => {
    setSelectedProducts((prev) => {
      const newProducts = [...prev];
      const index = newProducts.findIndex((product) => product.id === id);
      if (index === -1) {
        newProducts.push(product);
      } else {
        newProducts.splice(index, 1);
      }
      return newProducts;
    });
  };

  const handleClickDelete = (id) => {
    setListProducts((prev) => prev.filter((product) => product.id !== id));

    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="card-item">
      <div className="card-item__left">
        <input
          type="checkbox"
          checked={selectedProducts.some((p) => p.id === product.id)}
          onChange={() => handleClickCheckbox(product.id)}
        />

        <img src={product.image[0]} alt="product" />

        <div className="card-item__left-info">
          <h3>{product.name}</h3>
          <p>{product.type}</p>
          <p className="price">
            <span className="sale">
              {formatNumber(product.price * (1 - product.discount / 100))} đ
            </span>
            -<span className="real">{formatNumber(product.price)} đ</span>
          </p>
          <div className="quantity">
            <button onClick={() => handleDecrease(product.id)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => handleIncrease(product.id)}>+</button>
          </div>
          <p className="price__res">
            {formatNumber(
              product.quantity * product.price * (1 - product.discount / 100)
            )}{" "}
            đ
          </p>
        </div>
      </div>

      <div className="card-item__right">
        <p className="price">
          {formatNumber(
            product.quantity * product.price * (1 - product.discount / 100)
          )}{" "}
          đ
        </p>
        <div className="card-item__right-search">
          <MdCancel
            className="icon-cancel"
            onClick={() => handleClickDelete(product.id)}
          />
          <div className="search">
            <p>Tìm kiếm sản phẩm tương tự</p>
            <FaCaretDown className="icon-down" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
