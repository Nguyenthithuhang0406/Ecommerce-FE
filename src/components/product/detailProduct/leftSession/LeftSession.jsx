/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "./LeftSession.scss";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./LeftSession.scss";

const LeftSession = ({ product }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  const updateNavigation = useCallback(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current;
      setIndexImage(swiperInstance.activeIndex);
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current;
      swiperInstance.on("slideChange", updateNavigation);
      updateNavigation(); // Gọi 1 lần để cập nhật trạng thái ban đầu

      return () => {
        swiperInstance.off("slideChange", updateNavigation);
      };
    }
  }, [updateNavigation]);

  // useEffect(() => {
  //   console.log("indexImage", indexImage);
  // }, [indexImage]);

  return (
    <div className="left-session">
      <div className="left-session__left-images">
        {product?.images?.length > 0 &&
          product?.images?.map((image, index) => (
            <div
              onClick={() => {
                setIndexImage(index);
                swiperRef.current?.slideTo(index);
              }}
              key={index}
              className={`left-session__left-image-item ${
                indexImage === index ? "active" : ""
              }`}
            >
              <img src={image.imageUrl} alt="product" />
            </div>
          ))}
      </div>
      <div className="swiper-images">
        <button
          onClick={() => {
            if (swiperRef.current) {
              updateNavigation(); // Cập nhật indexImage sau khi bấm nút Prev
            }
          }}
          ref={prevRef}
          className={`swiper-button btn-left ${
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigation(); // Cập nhật indexImage khi khởi tạo Swiper
          }}
          className="swiper-container"
        >
          {product?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-image_item">
                <img src={image.imageUrl} alt="product" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => {
            if (swiperRef.current) {
              updateNavigation(); // Cập nhật indexImage sau khi bấm nút Next
            }
          }}
          ref={nextRef}
          className={`swiper-button btn-right ${
            isEnd ? "swiper-button_disabled" : ""
          }`}
          disabled={isEnd}
        >
          <GrFormNext className="swiper-icon" />
        </button>
      </div>
    </div>
  );
};

export default LeftSession;
