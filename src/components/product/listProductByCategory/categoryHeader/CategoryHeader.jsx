/* eslint-disable*/
import { listCategory } from "@/utils/const/Constant";
import React, { useEffect, useRef, useState } from "react";

import "./CategoryHeader.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const CategoryHeader = () => {
  const categorys = listCategory;
  const [slidesPerView, setSlidesPerView] = useState(5);
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width > 1280) {
      setSlidesPerView(5);
    } else if (width > 1024) {
      setSlidesPerView(4);
    } else if (width > 992) {
      setSlidesPerView(3);
    } else if (width > 624) {
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

  // Cập nhật navigation sau khi component đã mount
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <div className="category_swiper">
      <button ref={prevRef} className={`swiper-button `}>
        <GrFormPrevious className="swiper-icon" />
      </button>
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        ref={swiperRef}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        slidesPerView={slidesPerView}
        loop={true}
        className="swiper-category__list"
      >
        {categorys.map((category, index) => (
          <SwiperSlide className="swiper-category__item" key={index}>
            <div key={index} className="category__item">
              <div className="category__item-img">
                <img src={category.image} alt={category.title} />
              </div>
              <button className="category__item-btn">{category.title}</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button ref={nextRef} className={`swiper-button `}>
        <GrFormNext className="swiper-icon" />
      </button>
    </div>
  );
};

export default CategoryHeader;
