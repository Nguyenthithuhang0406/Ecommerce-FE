/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInputImage, setInputValue, setResult } from "@/store/searchSlice";
import { readFileAsync } from "@/utils/readFile";
import Menu from "./Menu";

import { FiSearch } from "react-icons/fi";
import { MdFlipCameraIos } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GrCart } from "react-icons/gr";

import "./HeaderDesktop.scss";
const HeaderDesktop = () => {
  const [inputText, setInputText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const childRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (childRef.current && !childRef.current.contains(event.target)) {
        setIsShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [childRef]);

  const resultFake = [
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
    {
      name: "Áo khoác da lộn nam 2 lớp",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
      ],
      discount: 7,
      price: 2000000,
      count: 119,
    },
    {
      name: "Áo polo nam phối màu ND008",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
      ],
      discount: 25,
      price: 600000,
      count: 148,
    },
    {
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setInputValue(inputText));
      dispatch(setResult(resultFake));
      dispatch(setInputImage(""));
      navigate("/search");
      dispatch(setInputValue(""));
    }
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    try {
      const fileData = await readFileAsync(file);
      dispatch(setInputImage(fileData));
      dispatch(setInputValue(""));
      dispatch(setResult(resultFake));
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-desktop">
      <div className="header-desktop__search">
        <div onClick={() => navigate("/")} className="header-desktop__logo">
          <span className="header-desktop-logo_first">ND</span>
          <span className="header-desktop-logo_second">Style</span>
        </div>

        <div className="header-desktop__search-input">
          <button className="header-desktop__search-input-button">
            <FiSearch className="header-desktop__search-input-icon1" />
          </button>
          <input
            onChange={(e) => setInputText(e.target.value)}
            className="header-desktop__search-i"
            onKeyDown={handleKeyPress}
            value={inputText}
            type="text"
            placeholder="Tìm kiếm sản phẩm"
          />
          <label className="header-desktop__search-input-file-label">
            <input
              onChange={handleChangeFile}
              accept="image/*"
              type="file"
              className="header-desktop__search-input-file"
            />
            <span className="header-desktop__search-input-image"></span>
            <MdFlipCameraIos className="header-desktop__search-input-icon2" />
          </label>
        </div>

        <div className="header-desktop__group-icon">
          <div
            className="header-desktop__group-icon-item"
            onClick={() => navigate(`/followingProducts/1`)}
          >
            <AiOutlineHeart className="header-desktop_group-i" />
            <p className="header-desktop_group-p">Yêu thích</p>
          </div>
          <div
            className="header-desktop__group-icon-item"
            onClick={() => setIsShow(!isShow)}
          >
            <MdOutlineAccountCircle className="header-desktop_group-i" />
            <p className="header-desktop_group-p">Tài khoản</p>
          </div>
          {isShow && (
            <div
              ref={childRef}
              className="header-desktop__group-icon-item-child"
            >
              <p onClick={() => navigate("/auth")}>Đăng ký</p>
              <p onClick={() => navigate("/auth")}>Đăng nhập</p>
            </div>
          )}
          <div
            className="header-desktop__group-icon-item"
            onClick={() => navigate("/cart")}
          >
            <GrCart className="header-desktop_group-i" />
            <p className="header-desktop_group-p">Giỏ hàng</p>
          </div>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default HeaderDesktop;
