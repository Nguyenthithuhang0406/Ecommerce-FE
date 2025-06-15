/* eslint-disable*/
import Layout from "@/components/commons/layout/Layout";
import Payment from "@/components/order/payment/Payment";
import React from "react";

const Payments = () => {
  return (
    <Layout>
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Payment />
      </div>
    </Layout>
  );
};

export default Payments;
