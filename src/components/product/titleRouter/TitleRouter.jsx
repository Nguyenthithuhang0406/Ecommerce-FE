/* eslint-disable */
import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./TitleRouter.scss";

const TitleRouter = ({title}) => {
  const navigate = useNavigate();
  return (
    <div data-aos="fade-up" className="title-router">
      <span onClick={() => navigate("/")} className="title__home">
        Trang chủ {" > "}
      </span>{" "}
      <span className="title_router">{title}</span>
    </div>
  );
}

export default TitleRouter;
