/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ImHeadphones } from "react-icons/im";
import { FiPackage } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";

import "./Banner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  const benefits = [
    {
      icon: <ImHeadphones />,
      title: "Giao hàng toàn quốc",
      desc: "Thanh toán (COD) khi nhận hàng",
    },
    {
      icon: <FiPackage />,
      title: "Miễn phí giao hàng",
      desc: "Theo chính sách",
    },
    {
      icon: <FaTruck />,
      title: "Đổi trả trong 7 ngày",
      desc: "Kể từ ngày giao hàng",
    },
    {
      icon: <PiHandCoinsFill />,
      title: "Hỗ trợ 24/7",
      desc: "Theo chính sách",
    },
  ];

  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isLoop, setIsLoop] = useState(false);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width > 1220) {
      setSlidesPerView(4);
      setIsLoop(false);
    } else if (width > 1024) {
      setSlidesPerView(3);
      setIsLoop(true);
    } else if (width > 768) {
      setSlidesPerView(2);
      setIsLoop(true);
    } else {
      setSlidesPerView(1);
      setIsLoop(true);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView); // Cleanup
  }, []);

  return (
    <div className="banner-container">
      <div
        className="banner"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <img
          src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/slider_1.jpg?1741622097223"
          alt="Banner"
          className="banner__img"
        />
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        className="swipper-benifits"
      >
        <Swiper
          slidesPerView={slidesPerView}
          loop={isLoop}
          autoplay={window.innerWidth < 1220 ? { delay: 2000 } : false}
          modules={[Autoplay]}
          className="swiper-benifits__list"
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide className="swiper-benifits__item" key={index}>
              <div className="swiper-benifits__item-content">
                <div className="swiper-benifits__item-icon">
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "white",
                      fontSize: "25px",
                      objectFit: "cover",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <div className="swiper-benifits__item-p">
                  <p className="swiper-benifits__item-title">{benefit.title}</p>{" "}
                  <p>{benefit.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner
