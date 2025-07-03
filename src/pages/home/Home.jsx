/* eslint-disable */
import Banner from "@/components/commons/banner/Banner";
import Layout from "@/components/commons/layout/Layout";
import Category from "@/components/product/category/Category";
import Accessory from "@/components/product/collection/accessory/Accessory";
import Female from "@/components/product/collection/female/Female";
import Male from "@/components/product/collection/male/Male";
import Comment from "@/components/product/comment/Comment";
import DiscountedProduct from "@/components/product/discountedProduct/DiscountedProduct";
import SuggestedProduct from "@/components/product/suggestedProducts/SuggestedProduct";
import Voucher from "@/components/product/voucher/Voucher";
import React from "react";

const Home = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <Category />
        <Voucher />
        <DiscountedProduct />
        <SuggestedProduct />
        <Male />
        <Female />
        <Accessory/>
        <Comment />
      </Layout>
    </div>
  );
};

export default Home;
