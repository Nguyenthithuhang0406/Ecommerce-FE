/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import "./SwiperHeader.scss";
const SwiperHeader = () => {
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
    <div className="swiper-header">
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
        className="swiper-container"
      >
        <SwiperSlide>Chào đón bộ sưu tập thu đông 2024</SwiperSlide>
        <SwiperSlide>Phái đẹp để yêu, vạn deal cưng chiều</SwiperSlide>
        <SwiperSlide>Đồ mặc cả nhà, êm ái cả ngày</SwiperSlide>
      </Swiper>
      <button
        ref={nextRef}
        className={`swiper-button ${isEnd ? "swiper-button_disabled" : ""}`}
        disabled={isEnd}
      >
        <GrFormNext className="swiper-icon" />
      </button>
    </div>
  );
}

export default SwiperHeader
