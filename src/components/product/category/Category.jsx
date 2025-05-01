/* eslint-disable */
import React from "react";
import { listCategory } from "@/utils/const/Constant";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const categorys = listCategory;
  const navigate = useNavigate();
  return (
    <div data-aos="fade-up" className="category">
      {categorys.map((item, index) => (
        <div
          key={index}
          className="category__item"
          onClick={() => navigate(`/productsByCategory/${item.title}`)}
        >
          <div className="category__item-img">
            <img src={item.image} alt={item.title} />
          </div>
          <button className="category__item-btn">{item.title}</button>
        </div>
      ))}
    </div>
  );
};

export default Category;
