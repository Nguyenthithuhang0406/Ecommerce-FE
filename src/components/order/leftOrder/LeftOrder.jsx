/* eslint-disable*/
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import cod from "@/assets/images/cod.png";
import momo from "@/assets/images/momo.png";
import vnpay from "@/assets/images/vnpay.png";
import momoIcon from "@/assets/images/momoIcon.png";
import vnpayIcon from "@/assets/images/vnpayIcon.png";

import "./LeftOrder.scss";
const LeftOrder = () => {
  const [addresses, setAddresses] = useState([
    {
      address: "39, ngõ 134, Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội",
      name: "Nguyễn Văn A",
      phone: "0987654321",
    },
  ]);

  const [addressOrder, setAddressOrder] = useState(addresses[0]);

  return (
    <div className="leftOrder">
      <h1>Địa chỉ nhận hàng</h1>
      <div className="leftOrder__address">
        {addresses.map((address, index) => (
          <div key={index} className="leftOrder__address-item">
            <input
              type="radio"
              name="address"
              onClick={() =>
                setAddressOrder({
                  address: address.address,
                  name: address.name,
                  phone: address.phone,
                })
              }
            />
            <div className="leftOrder__address-item-info">
              <p className="leftOrder__address-item-info-name">
                {address.name}
              </p>
              <p>{address.phone}</p>
              <p>{address.address}</p>
            </div>
          </div>
        ))}
        <div className="leftOrder__address-addAddress">
          <MdAddCircleOutline className="leftOrder__address-addAddress-icon" />
          <p>Thêm địa chỉ mới</p>
        </div>
      </div>
      <h1>Phương thức thanh toán</h1>
      <div className="leftOrder__payment">
        <div className="leftOrder__payment-item">
          <input type="radio" name="payment" />
          <div className="leftOrder__payment-item-info">
            <img src={cod} />
            <div className="leftOrder__payment-item-info-detail">
              <p className="title">Thanh toán khi nhận hàng</p>
              <div className="detailt-item">
                <p>{addressOrder.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="leftOrder__payment-item">
          <input type="radio" name="payment" />
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
          <input type="radio" name="payment" />
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
