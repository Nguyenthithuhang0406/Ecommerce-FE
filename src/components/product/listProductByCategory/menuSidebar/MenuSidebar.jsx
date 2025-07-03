/* eslint-disable */
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import "./MenuSidebar.scss";
import { categorys } from "@/utils/const/Constant";
const MenuSidebar = ({ setPrice }) => {
  const [opens, setOpens] = useState([]);
  const [isOpenPrice, setIsOpenPrice] = useState(true);

  const handleClick = (value, isOpen) => {
    if (isOpen) {
      setOpens((prev) => [...prev, value]);
    } else {
      setOpens((prev) => prev.filter((item) => item !== value));
    }
  };

  const category = categorys;
  return (
    <div className="menuSidebar">
      <div className="menuSidebar__category">
        <h1>Danh mục sản phẩm</h1>
        {category.map((item, index) => (
          <div key={index}>
            <div key={item.id} className="menuSidebar__category-item">
              <p>{item.name}</p>
              {opens.includes(item.id) ? (
                <FaCaretUp
                  className="icon-up"
                  onClick={() => handleClick(item.id, false)}
                />
              ) : (
                <FaCaretDown
                  className="icon-down"
                  onClick={() => handleClick(item.id, true)}
                />
              )}
            </div>
            {opens.includes(item.id) && (
              <div className="menuSidebar__category-item-child">
                {item.children.map((child) => (
                  <p
                    key={child.id}
                    onClick={() => {
                      setPrice({
                        categoryName: child.name,
                        minPrice: 0,
                        maxPrice: 0,
                      });
                    }}
                  >
                    {child.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="menuSidebar__price">
        <div className="menuSidebar__price-header">
          <p>Chọn mức giá</p>
          {isOpenPrice ? (
            <FaCaretDown
              className="icon"
              onClick={() => setIsOpenPrice(false)}
            />
          ) : (
            <FaCaretUp className="icon" onClick={() => setIsOpenPrice(true)} />
          )}
        </div>
        {isOpenPrice && (
          <div>
            <div className="menuSidebar__price-item">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 200000,
                    }));
                  } else {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 0,
                    }));
                  }
                }}
              />
              <p>Giá dưới 200.000đ</p>
            </div>
            <div className="menuSidebar__price-item">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 200000,
                      maxPrice: 500000,
                    }));
                  } else {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 0,
                    }));
                  }
                }}
              />
              <p>200.000đ - 500.000đ</p>
            </div>
            <div className="menuSidebar__price-item">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 500000,
                      maxPrice: 700000,
                    }));
                  } else {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 0,
                    }));
                  }
                }}
              />
              <p>500.000đ - 700.000đ</p>
            </div>
            <div className="menuSidebar__price-item">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 700000,
                      maxPrice: 1000000,
                    }));
                  } else {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 0,
                    }));
                  }
                }}
              />
              <p>700.000đ - 1.000.000đ</p>
            </div>
            <div className="menuSidebar__price-item">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 1000000,
                    }));
                  } else {
                    setPrice((prev) => ({
                      ...prev,
                      minPrice: 0,
                      maxPrice: 0,
                    }));
                  }
                }}
              />
              <p>Giá trên 1.000.000đ</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSidebar;
