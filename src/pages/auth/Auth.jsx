/* eslint-disable*/
import React, { useState } from "react";
import lineTop from "../../assets/images/lineTop.png";
import lineLeft from "../../assets/images/lineLeft.png";

import "./Auth.scss";
import NoRegister from "@/components/auth/register/NoRegister";
import RegisterForm from "@/components/auth/register/RegisterForm";
import NoLoginForm from "../../components/auth/login/NoLoginForm";
import LoginForm from "@/components/auth/login/LoginForm";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="auth"
      style={isLogin ? { height: "100vh" } : { height: "130vh" }}
    >
      <div
        className="auth-container"
        style={isLogin ? { height: "700px" } : { height: "900px" }}
      >
        <div className="auth-container_left">
          <img className="line-top" src={lineTop} />
          <img className="line-bottom" src={lineTop} />
          <img className="line-left" src={lineLeft} />
          <img className="line-right" src={lineLeft} />
          {isLogin ? (
            <NoLoginForm setIsLogin={setIsLogin} />
          ) : (
            <NoRegister setIsLogin={setIsLogin} />
          )}
        </div>
        <div className="auth-container_right">
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
