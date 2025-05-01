/* eslint-disable */
import React from "react";

import "./Order.scss";
import Layout from "@/components/commons/layout/Layout";
import LeftOrder from "@/components/order/leftOrder/LeftOrder";
import RightOrder from "@/components/order/rightOrder/RightOrder";

const Order = () => {
  return (
    <Layout>
      <div className="order">
        <LeftOrder />
        <RightOrder />
      </div>
    </Layout>
  );
};

export default Order;
