/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "./Voucher.scss";
import Line from '@/components/commons/line/Line';

const Voucher = () => {
  const listVoucher = [
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_voucher_1.png?1739788165295",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_voucher_2.png?1739788165295",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_voucher_3.png?1739788165295",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_voucher_4.png?1739788165295",
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
    <div data-aos="fade-up" className="voucher">
      <Line title="DÀNH RIÊNG CHO BẠN" />

      <div data-aos="fade-up" className="swiper-voucher">
        <Swiper
          slidesPerView={slidesPerView}
          loop={isLoop}
          autoplay={window.innerWidth < 1220 ? { delay: 2000 } : false}
          modules={[Autoplay]}
          className="swiper-voucher__list"
        >
          {listVoucher.map((voucher, index) => (
            <SwiperSlide className="swiper-voucher__item" key={index}>
              <div className="swiper-voucher__item-content">
                <img
                  src={voucher.image}
                  alt="Voucher"
                  className="swiper-voucher__item-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Voucher;
