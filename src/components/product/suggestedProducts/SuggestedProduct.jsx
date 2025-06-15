/* eslint-disable */
import React, { useEffect, useState } from "react";

import "./SuggestedProduct.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../discountedProduct/productItem/ProductItem";
import { getAllProducts } from "@/api/productAPI/product";

const SuggestedProduct = () => {
  const [menu, setMenu] = useState("new");

  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const data = {
        sortedBy: "createdDate",
        sortDirection: "desc",
        page: 0,
        size: 8,
        status: "true",
      };

      if (menu === "discount") {
        data.sortedBy = "price";
        data.sortDirection = "asc";
      }

      if (menu === "new") {
        data.sortedBy = "createdDate";
        data.sortDirection = "desc";
      }
      
      try {
        const response = await getAllProducts(data);
        setListProduct(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [menu]);
  return (
    <div className="suggested-products">
      <Line title="SẢN PHẨM GỢI Ý" />

      <div data-aos="fade-up" className="suggested-products-menu__list">
        <ul className="suggested-products-menu__list-item">
          <li
            className={`suggested-products-menu__li ${
              menu === "new" ? "active" : ""
            }`}
            onClick={() => setMenu("new")}
          >
            Hàng mới về
          </li>
          <li
            className={`suggested-products-menu__li ${
              menu === "discount" ? "active" : ""
            }`}
            onClick={() => setMenu("discount")}
          >
            Giá tốt
          </li>
          <li
            className={`suggested-products-menu__li ${
              menu === "top" ? "active" : ""
            }`}
            onClick={() => setMenu("top")}
          >
            Tìm kiếm nhiều nhất
          </li>
        </ul>
      </div>

      <div data-aos="fade-up" className="suggested-products__list">
        {listProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProduct;
