/* eslint-disable*/
import React, { useState } from "react";

import "./Accessory.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
const Accessory = () => {
  const [menu, setMenu] = useState("male");
  const [listProduct, setListProduct] = useState([
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
  ]);
  return (
    <div data-aos="fade-up" className="accessory">
      <div className="accessory-advertise">
        <div className="accessory-advertise__left">
          <p className="accessory-advertise__logo">
            <span>ND</span>
            <span className="second">Style</span>
          </p>
          <p className="accessory-advertise__title">
            <span>BLACK</span>
            <span className="yellow">FRIDAY</span>
            <span>CÓ GÌ?</span>
          </p>
        </div>
        <div className="accessory-advertise__right">
          <div className="accessory-advertise__right-item">
            <div className="accessory-advertise__right-item-one one">
              <p className="title">SALE TỚI 50%</p>
              <p className="description">Sản phẩm phụ kiện</p>
            </div>
            <div className="accessory-advertise__right-item-one two">
              <p className="title">SẢ HÀNG LỚN</p>
              <p className="description">Hơn 200 loại giày dép</p>
            </div>
          </div>
          <div className="accessory-advertise__right-item">
            <div className="accessory-advertise__right-item-one three">
              <p className="title">MUA 1 TẶNG 1</p>
              <p className="description">Sản phẩm trong BST Spring 2024</p>
            </div>
            <div className="accessory-advertise__right-item-one four">
              <p className="title">TẶNG PHỤ KIỆN</p>
              <p className="description">Khi mua váy thuộc BST</p>
            </div>
          </div>
        </div>
      </div>
      <Line title="PHỤ KIỆN" />
      <div data-aos="fade-up" className="accessory-products-menu__list">
        <ul className="accessory-products-menu__list-item">
          <li
            className={`accessory-products-menu__li ${
              menu === "male" ? "active" : ""
            }`}
            onClick={() => setMenu("male")}
          >
            Phụ kiện nam
          </li>
          <li
            className={`accessory-products-menu__li ${
              menu === "female" ? "active" : ""
            }`}
            onClick={() => setMenu("female")}
          >
            Phụ kiện nữ
          </li>
          <li
            className={`accessory-products-menu__li ${
              menu === "sock" ? "active" : ""
            }`}
            onClick={() => setMenu("sock")}
          >
            Tất/vớ
          </li>
        </ul>
      </div>
      <div data-aos="fade-up" className="accessory-products__list">
        {listProduct.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Accessory;
