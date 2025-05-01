/* eslint-disable */
import React, { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";
import { FiPackage } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";

import "./RightSession.scss";
import { formatNumber } from "@/utils/function";

const RightSession = ({product}) => {
  const [infoSelect, setInfoSelect] = useState({
    type: 0,
    quantity: "1",
  });
  const [isLike, setIsLike] = useState(false);

  const benefits = [
    {
      icon: <ImHeadphones />,
      title: "Giao hàng toàn quốc",
      desc: "Thanh toán (COD) khi nhận hàng",
    },
    {
      icon: <FiPackage />,
      title: "Miễn phí giao hàng",
      desc: "Theo chính sách",
    },
    {
      icon: <FaTruck />,
      title: "Đổi trả trong 7 ngày",
      desc: "Kể từ ngày giao hàng",
    },
    {
      icon: <PiHandCoinsFill />,
      title: "Hỗ trợ 24/7",
      desc: "Theo chính sách",
    },
  ];

  return (
    <div className="right-session">
      <div className="right-session__product-name">
        <h1>{product.name}</h1>
        <div className="right-session__product-name__icons">
          {isLike ? (
            <FaHeart
              onClick={() => setIsLike(!isLike)}
              style={{ fontSize: "24px", cursor: "pointer", color: "#ff6347" }}
            />
          ) : (
            <FaRegHeart
              onClick={() => setIsLike(!isLike)}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          )}
          <button>{product.status}</button>
        </div>
      </div>
      <div className="right-session__price">
        <span
          className={`right-session__price__sale ${
            product.discount > 0 ? "" : "hidden"
          }`}
        >
          {formatNumber(product.price * (1 - product.discount / 100))} đ
        </span>
        <span className="right-session__price__real">
          {formatNumber(product.price)} đ
        </span>
      </div>
      <div className="right-session__type">
        <p>Phân loại</p>
        <div className="right-session__type__buttons">
          {product.types.map((type, index) => (
            <button
              onClick={() => setInfoSelect({ ...infoSelect, type: index })}
              key={index}
              className={`${infoSelect.type === index ? "active" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="right-session__quantity-group">
        <p>Số lượng</p>
        <div className="right-session__quantity-group__quantity">
          <div className="right-session__quantity-group__quantity-buttons">
            <button
              onClick={() =>
                setInfoSelect({
                  ...infoSelect,
                  quantity:
                    Number(infoSelect.quantity) > 1
                      ? Number(infoSelect.quantity) - 1
                      : 1,
                })
              }
            >
              -
            </button>
            <input
              name="quantity"
              value={infoSelect.quantity}
              onChange={(e) =>
                setInfoSelect({ ...infoSelect, quantity: e.target.value })
              }
            />
            <button
              onClick={() =>
                setInfoSelect({
                  ...infoSelect,
                  quantity: Number(infoSelect.quantity) + 1,
                })
              }
            >
              +
            </button>
          </div>
          <p>Tìm kiếm sản phẩm tương tự</p>
        </div>
      </div>
      <div className="right-session__button">
        <button className="right-session__button-add">Thêm vào giỏ hàng</button>
        <button className="right-session__button-buy">Mua ngay</button>
      </div>
      <div className="right-session__benefits">
        {benefits.map((benefit, index) => (
          <div key={index} className="right-session__benefits__item">
            <div className="right-session__benefits__icon-item">
              {benefit.icon}
            </div>
            <div className="right-session__benefits__content-item">
              <p className="title-item">{benefit.title} :</p>
              <p className="content-item">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightSession;
