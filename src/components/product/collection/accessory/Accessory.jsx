/* eslint-disable*/
import React, { useEffect, useState } from "react";

import "./Accessory.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { getAllProducts } from "@/api/productAPI/product";
const Accessory = () => {
  const [menu, setMenu] = useState("male");
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = {
        sortedBy: "price",
        sortDirection: "asc",
        page: 0,
        size: 10,
        category: "",
        status: "true",
      };

      if (menu === "male") {
        data.category = "Quần jeans";
      } else if (menu === "female") {
        data.category = "Váy";
      } else if (menu === "sock") {
        data.category = "Phụ kiện thời trang";
      }

      try {
        const response = await getAllProducts(data);
        setListProduct(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [menu]);

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
