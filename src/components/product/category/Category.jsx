/* eslint-disable */
import React, { useEffect, useState } from "react";
import { listCategory } from "@/utils/const/Constant";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/api/productAPI/category";

const Category = () => {
  const [categorys, setCategorys] = useState(listCategory);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategorys = async () => {
      try {
        const data = {
          sortedBy: "createdAt",
          sortDirection: "desc",
          page: 0,
          size: 10,
        };
        const response = await getAllCategories(data);
        setCategorys(response.data.content.slice(0,8));
      } catch (error) {
        console.log(error);
      }
    };
    getCategorys();
  }, []);

  return (
    <div data-aos="fade-up" className="category">
      {categorys?.map((item, index) => (
        <div
          key={index}
          className="category__item"
          onClick={() => navigate(`/productsByCategory/${item.name}`)}
        >
          <div className="category__item-img">
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <button className="category__item-btn">{item.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Category;
