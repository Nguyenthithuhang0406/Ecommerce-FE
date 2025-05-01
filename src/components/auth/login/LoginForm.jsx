/* eslint-disable */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "./LoginForm.scss";
import { loginValidationSchema } from "@/utils/validation/authValidation";
import ForgotPassword from "../forgotPassword/ForgotPassword";
const LoginForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFogotPassword, setIsForgotPassword] = useState(false);

  const initiateValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
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
              {isFogotPassword && <ForgotPassword />}
              <p>Hoặc</p>
              <div className="login-gg">
                <button>
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
