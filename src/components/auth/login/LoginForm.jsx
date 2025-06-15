/* eslint-disable */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginValidationSchema } from "@/utils/validation/authValidation";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import { login, loginWithGoogle } from "@/api/authAPI/auth";

import "./LoginForm.scss";
import { getMe } from "@/api/authAPI/user";
const LoginForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFogotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const initiateValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        username: values.userName,
        password: values.password,
      };
      const response = await login(data);
      const user = await getMe();
      localStorage.setItem("fullName", user.data.fullName);
      if(localStorage.getItem("roles").includes("ADMIN")) {
        navigate('/admin/*')
      }else {
        navigate("/");
      }
      toast.success("Đăng nhập thành công");
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 500:
            toast.error("Lỗi hệ thống");
            break;
          case 400:
            toast.error("Dữ liệu không hợp lệ");
            break;
          default:
            toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại kết nối!");
        }
      }
      console.log(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const response = await loginWithGoogle();
      window.open(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div data-aos="fade-right" className={`login `}>
      <h1>Đăng nhập</h1>
      <div className="login-form">
        <Formik
          initialValues={initiateValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="login-form_item">
                <label className="login-form_title" htmlFor="userName">
                  Tên đăng nhập
                </label>
                <Field
                  className="login-form_input"
                  type="text"
                  name="userName"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className="login-form_item password">
                <label className="login-form_title" htmlFor="password">
                  Mật khẩu
                </label>
                <Field
                  className="login-form_input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
                {showPassword ? (
                  <FaRegEye
                    className="eye"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="eye"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <button type="submit">Đăng nhập</button>
              <p>
                Bạn chưa có tài khoản?{" "}
                <span onClick={() => setIsLogin(false)}>Đăng ký</span>
              </p>
              <p
                className="p_forgotPassword"
                onClick={() => setIsForgotPassword(true)}
              >
                Quên mật khẩu?
              </p>
              {isFogotPassword && (
                <ForgotPassword setIsForgotPassword={setIsForgotPassword} />
              )}
              <p>Hoặc</p>
              <div className="login-gg">
                <button onClick={handleLoginWithGoogle}>
                  <FcGoogle />
                  <p>Đăng nhập bằng Google</p>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
