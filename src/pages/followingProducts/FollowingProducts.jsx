/* eslint-disable*/
import React, { useState } from "react";

import "./FollowingProducts.scss";
import Layout from "@/components/commons/layout/Layout";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import ProductItem from "@/components/product/discountedProduct/productItem/ProductItem";
import { Pagination } from "antd";
const FollowingProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const likeProducts = JSON.parse(localStorage.getItem("likeProducts")) || [];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <Layout>
      <TitleRouter title="Yêu thích" />
      {likeProducts.length === 0 ? (
        <div className="following-products-empty">
          Chưa có sản phẩm yêu thích nào, hãy thêm vào nhé!
        </div>
      ) : (
        <div>
          <div className="following-products">
            {likeProducts.map((item, index) => (
              <ProductItem product={item} key={index} />
            ))}
          </div>
          <Pagination
            align="center"
            pageSize={8}
            total={likeProducts.length}
            current={currentPage}
            onChange={handleChangePage}
            style={{ marginBottom: "20px" }}
          />
        </div>
      )}
    </Layout>
  );
};

export default FollowingProducts;
