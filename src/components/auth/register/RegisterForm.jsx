/* eslint-disable */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "./RegisterForm.scss";
import { registerValidationSchema } from "@/utils/validation/authValidation";
const RegisterForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initiateValues = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div data-aos="fade-right" className={`register `}>
      <h1>Đăng ký</h1>
      <div className="register-form">
        <Formik
          initialValues={initiateValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="register-form_item">
                <label className="register-form_title" htmlFor="firstName">
                  Họ
                </label>
                <Field
                  className="register-form_input"
                  type="text"
                  name="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className="register-form_item">
                <label className="register-form_title" htmlFor="lastName">
                  Tên
                </label>
                <Field
                  className="register-form_input"
                  type="text"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className="register-form_item">
                <label className="register-form_title" htmlFor="email">
                  Email
                </label>
                <Field
                  className="register-form_input"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className="register-form_item">
                <label className="register-form_title" htmlFor="userName">
                  Tên đăng nhập
                </label>
                <Field
                  className="register-form_input"
                  type="text"
                  name="userName"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className="register-form_item password">
                <label className="register-form_title" htmlFor="password">
                  Mật khẩu
                </label>
                <Field
                  className="register-form_input"
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
              <div className="register-form_item password">
                <label
                  className="register-form_title"
                  htmlFor="confirmPassword"
                >
                  Xác nhận lại mật khẩu
                </label>
                <Field
                  className="register-form_input"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
                {showConfirmPassword ? (
                  <FaRegEye
                    className="eye"
                    onClick={() => showConfirmPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="eye"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
              <button type="submit">Đăng ký</button>
              <p>
                Bạn đã có tài khoản?{" "}
                <span onClick={() => setIsLogin(true)}>Đăng nhập</span>
              </p>
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

export default RegisterForm;
