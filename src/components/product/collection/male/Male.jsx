/* eslint-disable*/
import React, { useEffect, useRef, useState } from "react";

import "./Male.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import { getAllProducts } from "@/api/productAPI/product";
import { useNavigate } from "react-router-dom";

const Male = () => {
  const [listProduct, setListProduct] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = {
          sortedBy: "price",
          sortDirection: "asc",
          page: 0,
          size: 10,
          category: "Áo sơ mi",
          status: "true",
        };

        const response = await getAllProducts(data);
        setListProduct(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width > 1040) {
      setSlidesPerView(2);
    } else if (width > 900) {
      setSlidesPerView(3);
    } else if (width > 648) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView); // Cleanup
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      const updateNavigation = () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      };

      swiperInstance.on("slideChange", updateNavigation);
      updateNavigation(); // Gọi 1 lần để cập nhật trạng thái ban đầu

      return () => {
        swiperInstance.off("slideChange", updateNavigation);
      };
    }
  }, []);

  return (
    <div data-aos="fade-up" className="male">
      <div data-aos="fade-up" className="advertisement">
        <img
          className="advertise_left"
          src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_banner_1.png?1742315771967"
        />
        <div className="advertise_right">
          <img
            className="advertise_top-right"
            src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_banner_2.png?1742315771967"
          />
          <div className="advertise_bottom-right">
            <img src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_banner_3.png?1742315771967" />
            <img src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_banner_4.png?1742315771967" />
          </div>
        </div>
      </div>
      <div data-aos="fade-up" className="male__list">
        <Line title="BỘ SƯU TẬP NAM" />
        <div data-aos="fade-up" className="male_container">
          <div className="male_product">
            <div className="male_swiper">
              <button
                ref={prevRef}
                className={`swiper-button ${
                  isBeginning ? "swiper-button_disabled" : ""
                }`}
                disabled={isBeginning}
              >
                <GrFormPrevious className="swiper-icon" />
              </button>
              <Swiper
                modules={[Navigation]}
                ref={swiperRef}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                slidesPerView={slidesPerView}
                loop={true}
                className="swiper-male__list"
              >
                {listProduct.map((product, index) => (
                  <SwiperSlide className="swiper-male__item" key={index}>
                    <ProductItem product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                ref={nextRef}
                className={`swiper-button ${
                  isEnd ? "swiper-button_disabled" : ""
                }`}
                disabled={isEnd}
              >
                <GrFormNext className="swiper-icon" />
              </button>
            </div>
            <div className="male_product__button">
              <button onClick={() => navigate("/productsByCategory/Áo sơ mi")}>
                XEM TẤT CẢ <FaArrowRight />
              </button>
            </div>
          </div>
          <img
            className="male_image"
            src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_product_banner_1.jpg?1742315771967"
          />
        </div>
      </div>
    </div>
  );
};

export default Male;
