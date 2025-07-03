/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import cod from "@/assets/images/cod.png";
import momo from "@/assets/images/momo.png";
import vnpay from "@/assets/images/vnpay.png";
import momoIcon from "@/assets/images/momoIcon.png";
import vnpayIcon from "@/assets/images/vnpayIcon.png";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";

import "./LeftOrder.scss";
import { getAddresses } from "@/api/authAPI/user";
const LeftOrder = ({
  setIsShowAddAddress,
  isShowAddAddress,
  setEditAddress,
  setDeleteAddress,
  isShowEditAddress,
  isShowDeleteAddress,
  orderInformation,
  setOrderInformation,
}) => {
  const [addresses, setAddresses] = useState([]);
  const [addressOrder, setAddressOrder] = useState([]);

  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddresses();
        setAddresses(response.data);
        if (response.data.length > 0) {
          setAddressOrder(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [isShowAddAddress, isShowEditAddress, isShowDeleteAddress]);

  const handleAddressSelection = (address) => {
    setAddressOrder(address);
    setOrderInformation({
      ...orderInformation,
      addressId: address.id,
    });
  };
  return (
    <div className="leftOrder">
      <h1>Địa chỉ nhận hàng</h1>
      <div className="leftOrder__address">
        {addresses?.length > 0 ? (
          addresses?.map((address, index) => (
            <div key={index} className="leftOrder__address-item">
              <input
                type="radio"
                name="address"
                checked={addressOrder?.id === address?.id}
                onClick={() => handleAddressSelection(address)}
              />
              <div className="leftOrder__address-item-info group">
                <div>
                  <p className="leftOrder__address-item-info-name">
                    {fullName}
                  </p>
                  <p>{address?.phoneNumber}</p>
                  <p>
                    {address?.description && `${address?.description},`}{" "}
                    {address?.street && `${address?.street},`}{" "}
                    {address?.city && `${address?.city},`}{" "}
                    {address?.country && `${address?.country}`}
                  </p>
                </div>
                <div className="items-center gap-2 hidden group-hover:flex">
                  <FaPencilAlt
                    className="text-blue-500 text-[20px] cursor-pointer"
                    onClick={(e) =>
                      setEditAddress({
                        id: address.id,
                        isShowUpdateAddress: true,
                      })
                    }
                  />
                  <ImBin
                    onClick={(e) =>
                      setDeleteAddress({
                        id: address.id,
                        isShowDeleteAddress: true,
                      })
                    }
                    className="text-red-500 text-[20px] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <p>Chưa có địa chỉ nào</p>
          </div>
        )}
        <div
          className="leftOrder__address-addAddress"
          onClick={() => setIsShowAddAddress(true)}
        >
          <MdAddCircleOutline className="leftOrder__address-addAddress-icon" />
          <p>Thêm địa chỉ mới</p>
        </div>
      </div>
      <h1>Phương thức thanh toán</h1>
      <div className="leftOrder__payment">
        <div className="leftOrder__payment-item">
          <input
            type="radio"
            name="payment"
            checked={orderInformation.paymentMethod === "COD"}
            onChange={() =>
              setOrderInformation({
                ...orderInformation,
                paymentMethod: "COD",
              })
            }
          />
          <div className="leftOrder__payment-item-info">
            <img src={cod} />
            <div className="leftOrder__payment-item-info-detail">
              <p className="title">Thanh toán khi nhận hàng</p>
              <div className="detailt-item">
                <p>
                  {addressOrder?.description && `${addressOrder?.description},`}{" "}
                  {addressOrder?.street && `${addressOrder?.street},`}{" "}
                  {addressOrder?.city && `${addressOrder?.city},`}{" "}
                  {addressOrder?.country && `${addressOrder?.country}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="leftOrder__payment-item">
          <input
            type="radio"
            name="payment"
            checked={orderInformation.paymentMethod === "VN_PAY"}
            onChange={() =>
              setOrderInformation({
                ...orderInformation,
                paymentMethod: "VN_PAY",
              })
            }
          />
          <div className="leftOrder__payment-item-info">
            <img src={vnpay} />
            <div className="leftOrder__payment-item-info-detail">
              <p className="title">Ví điện tử</p>
              <div className="detailt-item">
                <p>VN PAY</p>
                <img src={vnpayIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className="leftOrder__payment-item">
          <input
            type="radio"
            name="payment"
            checked={orderInformation.paymentMethod === "MOMO"}
            onChange={() =>
              setOrderInformation({
                ...orderInformation,
                paymentMethod: "MOMO",
              })
            }
          />
          <div className="leftOrder__payment-item-info">
            <img src={momo} />
            <div className="leftOrder__payment-item-info-detail">
              <p className="title">Ví điện tử</p>
              <div className="detailt-item">
                <p>Momo</p>
                <img src={momoIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftOrder;
