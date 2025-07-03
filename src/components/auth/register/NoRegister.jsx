/* eslint-disable*/
import React from "react";

import "./NoRegister.scss";
const NoRegister = ({ setIsLogin}) => {
  return (
    <div
      data-aos="fade-left"
      className={`no-register `}
    >
      <h1>Đăng nhập</h1>
      <p>
        Chào mừng bạn đến với NDStyle. Nếu bạn đã có tài khoản, có thể đăng nhập
        tại ô dưới đây.
      </p>
      <div className="no-register_btn">
        <button onClick={() => setIsLogin(true)}>Tôi có tài khoản</button>
      </div>
    </div>
  );
};

export default NoRegister;
