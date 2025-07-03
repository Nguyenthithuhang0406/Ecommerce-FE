/* eslint-disable */
import React from "react";
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
  const handleIncrease = (variantId) => {
    setListProducts((prev) => {
      return prev.map((product) =>
        product.variantId === variantId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });

    setSelectedProducts((prev) => {
      return prev.map((product) =>
        product.variantId === variantId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });
  };

  const handleDecrease = (variantId) => {
    setListProducts((prev) => {
      return prev.map((product) =>
        product.variantId === variantId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    });

    setSelectedProducts((prev) => {
      return prev.map((product) =>
        product.variantId === variantId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    });
  };

  const handleClickCheckbox = (variantId) => {
    setSelectedProducts((prev) => {
      const newProducts = [...prev];
      const index = newProducts.findIndex(
        (product) => product.variantId === variantId
      );
      if (index === -1) {
        newProducts.push(product);
      } else {
        newProducts.splice(index, 1);
      }
      return newProducts;
    });
  };

  const handleClickDelete = (variantId) => {
    setListProducts((prev) =>
      prev.filter((product) => product.variantId !== variantId)
    );

    setSelectedProducts((prev) =>
      prev.filter((product) => product.variantId !== variantId)
    );
  };

  return (
    <div className="card-item">
      <div className="card-item__left">
        <input
          type="checkbox"
          checked={selectedProducts?.some(
            (p) => p.variantId === product.variantId
          )}
          onChange={() => handleClickCheckbox(product.variantId)}
        />

        <img src={product.imageUrl} alt="product" />

        <div className="card-item__left-info">
          <h3>{product.productName}</h3>
          {product.attributes &&
            product.attributes.map((attribute, index) => (
              <p key={index}>
                {attribute.type}: {attribute.value}
              </p>
            ))}
          <p className="price">
            <span className="sale">{formatNumber(product.price)} đ</span>
            {/* <span className="real">{formatNumber(product.price)} đ</span> */}
          </p>
          <div className="quantity">
            <button onClick={() => handleDecrease(product.variantId)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => handleIncrease(product.variantId)}>+</button>
          </div>
          <p className="price__res">
            {formatNumber(product.quantity * product.price)} đ
          </p>
        </div>
      </div>

      <div className="card-item__right">
        <p className="price">
          {formatNumber(product.quantity * product.price)} đ
        </p>
        <div className="card-item__right-search">
          <MdCancel
            className="icon-cancel"
            onClick={() => handleClickDelete(product.variantId)}
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
