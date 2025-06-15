/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { forgotPassword } from "@/api/authAPI/auth";

import "./ForgotPassword.scss";

const ForgotPassword = ({ setIsForgotPassword }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const handleChange = (e) => {
    setUsernameOrEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: usernameOrEmail,
        email: usernameOrEmail,
      };
      await forgotPassword(data);
      toast.success("Đã gửi yêu cầu đổi mật khẩu, vui lòng kiểm tra email");
      setUsernameOrEmail("");
      setIsForgotPassword(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 500:
            toast.error("Lỗi hệ thống");
            break;
          case 404:
            toast.error("Không tìm thấy tài khoản");
            break;
          default:
            toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại kết nối!");
        }
      }
      console.log(error);
    }
  };
  return (
    <div className="forgot-password">
      <input
        placeholder="Nhập tên đăng nhập"
        type="text"
        name="usernameOrEmail"
        value={usernameOrEmail}
        onChange={handleChange}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Lấy lại mật khẩu
      </button>
    </div>
  );
};

export default ForgotPassword;
