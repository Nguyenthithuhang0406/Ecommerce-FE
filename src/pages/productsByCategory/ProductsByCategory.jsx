/* eslint-disable*/
import Layout from "@/components/commons/layout/Layout";
import CategoryHeader from "@/components/product/listProductByCategory/categoryHeader/CategoryHeader";
import MenuSidebar from "@/components/product/listProductByCategory/menuSidebar/MenuSidebar";
import ProductsContainer from "@/components/product/listProductByCategory/productsContainer/ProductsContainer";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import React from "react";
import { useParams } from "react-router-dom";

import "./ProductsByCategory.scss";
const ProductsByCategory = () => {
  const categoryName = useParams().categoryName;

  return (
    <Layout>
      <div className="productsByCategory">
        <TitleRouter title={categoryName} />
        <CategoryHeader />
        <div className="productsByCategory__container">
          <ProductsContainer />
          <MenuSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default ProductsByCategory;
