/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { fakeProducts } from "@/utils/const/Constant";

import "./ProductsContainer.scss";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { Pagination } from "antd";
const ProductsContainer = () => {
  const listProducts = fakeProducts;
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(listProducts);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handlePagination = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setProducts(listProducts.slice(startIndex, endIndex));
    };
    handlePagination();
  }, [currentPage]);

  return (
    <div className="productsContainer">
      <div className="productsContainer__header">
        <h1>Tất cả sản phẩm</h1>
        <div className="productsContainer__header-search">
          <p>Sắp xếp theo</p>
          <select>
            <option>Mặc định</option>
            <option>A - Z</option>
            <option>Z - A</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
            <option>Hàng mới nhất</option>
            <option>Hàng cũ nhất</option>
          </select>
        </div>
      </div>
      <div className="productsContainer__list">
        {products.map((product, index) => (
          <ProductItem product={product} />
        ))}
      </div>
      <Pagination
        align="center"
        pageSize={pageSize}
        total={listProducts.length}
        current={currentPage}
        onChange={handleChangePage}
        style={{marginBottom: "20px"}}
      />
    </div>
  );
};

export default ProductsContainer;
