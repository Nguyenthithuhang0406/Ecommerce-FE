/* eslint-disable */
import React, { useState } from "react";

import "./Order.scss";
import Layout from "@/components/commons/layout/Layout";
import LeftOrder from "@/components/order/leftOrder/LeftOrder";
import RightOrder from "@/components/order/rightOrder/RightOrder";
import Address from "@/components/order/address/Address";
import UpdateAddress from "@/components/order/address/UpdateAddress";
import ConfirmDeleteAddress from "@/components/order/address/ConfirmDeleteAddress";

const Order = () => {
  const [isShowAddAddress, setIsShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({
    id: null,
    isShowUpdateAddress: false,
  });
  const [deleteAddress, setDeleteAddress] = useState({
    id: null,
    isShowDeleteAddress: false,
  });
  const [orderInformation, setOrderInformation] = useState({
    paymentMethod: "COD",
    addressId: null,
    language: "vi",
    bankCode: null,
    items: [],
  });

  return (
    <>
      <Layout>
        <div className="order">
          <LeftOrder
            setIsShowAddAddress={setIsShowAddAddress}
            isShowAddAddress={isShowAddAddress}
            setEditAddress={setEditAddress}
            setDeleteAddress={setDeleteAddress}
            isShowEditAddress={editAddress.isShowUpdateAddress}
            isShowDeleteAddress={deleteAddress.isShowDeleteAddress}
            orderInformation={orderInformation}
            setOrderInformation={setOrderInformation}
          />
          <RightOrder
            orderInformation={orderInformation}
            setOrderInformation={setOrderInformation}
          />
        </div>
      </Layout>
      {isShowAddAddress && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setIsShowAddAddress(false)}
          ></div>
          <div className="relative z-20">
            <Address setIsShowAddAddress={setIsShowAddAddress} />
          </div>
        </div>
      )}
      {editAddress.isShowUpdateAddress && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() =>
              setEditAddress({ id: null, isShowUpdateAddress: false })
            }
          ></div>
          <div className="relative z-20">
            <UpdateAddress
              editAddress={editAddress}
              setEditAddress={setEditAddress}
            />
          </div>
        </div>
      )}
      {deleteAddress.isShowDeleteAddress && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() =>
              setDeleteAddress({ id: null, isShowDeleteAddress: false })
            }
          ></div>
          <div className="relative z-20">
            <ConfirmDeleteAddress
              deleteAddress={deleteAddress}
              setDeleteAddress={setDeleteAddress}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
