/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa6";
import ProductItem from "./productItem/ProductItem";

import "./DiscountedProduct.scss";

const DiscountedProduct = () => {
  const listDiscountedProduct = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      name: "Váy liền nữ dáng dài, phối màu",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp15.jpg?v=1731125521717",
      ],
      discount: 28,
      price: 868000,
      count: 98,
    },
    {
      id: 4,
      name: "Áo nỉ nữ phối lá cổ dáng relax",
      image: [
        "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp10-2.jpg?v=1731125371523",
      ],
      discount: 17,
      price: 686000,
      count: 108,
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width > 1135) {
      setSlidesPerView(4);
    } else if (width > 912) {
      setSlidesPerView(3);
    } else if (width > 559) {
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
    <div className="discounted-product">
      <h1 data-aos="fade-up" className="discounted-product__title">
        Ưu đãi đặc biệt
      </h1>

      <div className="swiper-discounted-product">
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
          data-aos="fade-up"
          slidesPerView={slidesPerView}
          loop={slidesPerView < listDiscountedProduct.length}
          autoplay={{ delay: 2000 }}
          modules={[Navigation]}
          ref={swiperRef}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className={`swiper-container`}
        >
          {listDiscountedProduct.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          ref={nextRef}
          className={`swiper-button ${isEnd ? "swiper-button_disabled" : ""}`}
          disabled={isEnd}
        >
          <GrFormNext className="swiper-icon" />
        </button>
      </div>

      <div className="discounted-product__btn-container">
        <button className="discounted-product__btn">
          Xem tất cả <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DiscountedProduct;
