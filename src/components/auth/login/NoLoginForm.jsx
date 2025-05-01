/* eslint-disable*/
import React from "react";

import "./NoLoginForm.scss";
const NoLoginForm = ({ setIsLogin}) => {
  return (
    <div
      data-aos="fade-left"
      className={`no-login `}
    >
      <h1>Đăng ký</h1>
      <p>
        Chào mừng bạn đến với NDStyle. Nếu bạn chưa có tài khoản, có thể đăng ký
        tại ô dưới đây.
      </p>
      <div className="no-login_btn">
        <button onClick={() => setIsLogin(false)}>Tạo tài khoản</button>
      </div>
    </div>
  );
};

export default NoLoginForm;
