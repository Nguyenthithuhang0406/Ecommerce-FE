/* eslint-disable*/
import React, { useEffect, useRef, useState } from "react";

import "./Male.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const Male = () => {
  const listProduct = [
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
  ];

  const [slidesPerView, setSlidesPerView] = useState(2);
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
              <button>
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
