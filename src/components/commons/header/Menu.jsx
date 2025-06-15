/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";

import { FaCaretDown } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

import "./Menu.scss";
const Menu = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="menu-desktop">
        <ul className="menu-desktop__list">
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/")}
              className="menu-desktop__item-span"
            >
              Trang chủ
            </span>
          </li>
          <li className="menu-desktop__item">
            <span className="menu-desktop__item-span">
              Nữ <FaCaretDown className="menu-desktop__item-span-down" />
              <FaCaretUp className="menu-desktop__item-span-up" />
            </span>
            <div className="menu-desktop__sub sub1">
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Phụ kiện nữ </li>
                <li className="menu-desktop__sub-list-item">Tất nữ</li>
                <li className="menu-desktop__sub-list-item">Túi nữ</li>
                <li className="menu-desktop__sub-list-item">
                  Phụ kiện nữ khác
                </li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Áo nữ</li>
                <li className="menu-desktop__sub-list-item">Áo khoác nữ</li>
                <li className="menu-desktop__sub-list-item">
                  Áo hoodie - Ảo nỉ nữ
                </li>
                <li className="menu-desktop__sub-list-item">Áo polo nữ</li>
                <li className="menu-desktop__sub-list-item">Áo sơ mi nữ</li>
                <li className="menu-desktop__sub-list-item">Áo thun nữ</li>
              </ul>
            </div>
          </li>
          <li className="menu-desktop__item">
            <span className="menu-desktop__item-span">
              Nam <FaCaretDown className="menu-desktop__item-span-down" />
              <FaCaretUp className="menu-desktop__item-span-up" />
            </span>
            <div className="menu-desktop__sub sub2">
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Phụ kiện nam </li>
                <li className="menu-desktop__sub-list-item">Tất nam</li>
                <li className="menu-desktop__sub-list-item">Túi xách nam</li>
                <li className="menu-desktop__sub-list-item">Mũ nam</li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Áo nam</li>
                <li className="menu-desktop__sub-list-item">Áo khoác nam</li>
                <li className="menu-desktop__sub-list-item">Áo nỉ nam</li>
                <li className="menu-desktop__sub-list-item">Áo len nam</li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Quần nam</li>
                <li className="menu-desktop__sub-list-item">Quần kaki</li>
                <li className="menu-desktop__sub-list-item">Quần short nam</li>
                <li className="menu-desktop__sub-list-item">Quần jeans nam</li>
                <li className="menu-desktop__sub-list-item">Quần âu nam</li>
              </ul>
            </div>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/blog")}
              className="menu-desktop__item-span"
            >
              Tin tức
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/contact")}
              className="menu-desktop__item-span"
            >
              Liên hệ
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/market-system")}
              className="menu-desktop__item-span"
            >
              Hệ thống cửa hàng
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              className="menu-desktop__item-span"
              onClick={() => navigate("/references")}
            >
              Kiểm tra đơn hàng
            </span>
          </li>
        </ul>
      </div>

      <div className="menu-mobile">
        <ul className="menu-mobile__list">
          <li className="menu-mobile__item">
            <FaBars className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Menu</p>
          </li>
          <li className="menu-mobile__item">
            <IoHeart className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Yêu thích</p>
          </li>
          <li className="menu-mobile__item">
            <MdAccountCircle className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Tài khoản</p>
          </li>
          <li className="menu-mobile__item">
            <FaShoppingCart className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Giỏ hàng</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
