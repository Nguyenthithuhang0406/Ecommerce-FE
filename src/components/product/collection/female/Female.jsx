/* eslint-disable*/
import React, { useEffect, useRef, useState } from "react";

import "./Female.scss";
import Line from "@/components/commons/line/Line";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import { getAllProducts } from "@/api/productAPI/product";
import { useNavigate } from "react-router-dom";

const Female = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = {
          sortedBy: "price",
          sortDirection: "asc",
          page: 0,
          size: 10,
          category: "Váy",
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
    <div data-aos="fade-up" className="female">
      <div data-aos="fade-up" className="advertisement">
        <img
          data-aos="fade-left"
          src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_lookbook_1.jpg?1742401393294"
        />
        <div data-aos="fade-right" className="advertisement__text">
          <h1>ENCHANTING DRESS 2024</h1>
          <p>
            Khám phá bộ sưu tập hơn 20 sản phẩm váy hoa với thiết kế thanh thoát
            và nữ tính. Những họa tiết hoa tươi sáng và chất liệu mềm mại mang
            đến sự quyến rũ và thoải mái cho mọi dịp. Tỏa sáng với vẻ đẹp tự
            nhiên và phong cách thanh lịch!
          </p>
          <p>
            Từ những buổi dạo phố nhẹ nhàng đến các bữa tiệc sang trọng, mỗi
            chiếc váy đều được thiết kế tỉ mỉ, chú trọng đến từng chi tiết nhỏ.
            Họa tiết hoa rực rỡ không chỉ làm nổi bật phong cách cá nhân mà còn
            mang đến cảm giác tươi mới, tràn đầy sức sống. Chất liệu mềm mại,
            nhẹ nhàng ôm sát cơ thể, giúp bạn tự tin tỏa sáng và di chuyển một
            cách thoải mái.
          </p>
          <p>
            Hãy để bộ sưu tập váy hoa này trở thành người bạn đồng hành lý tưởng
            trong hành trình khám phá vẻ đẹp tự nhiên của bạn. Tỏa sáng và thể
            hiện nét quyến rũ riêng biệt của mình với những thiết kế thanh lịch,
            đầy nữ tính!
          </p>

          <button>
            Xem thêm <FaArrowRight />
          </button>
        </div>
      </div>
      <div data-aos="fade-up" className="female__list">
        <Line title="BỘ SƯU TẬP NỮ" />
        <div data-aos="fade-up" className="female_container">
          <div className="female_product">
            <div className="female_swiper">
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
                className="swiper-female__list"
              >
                {listProduct.map((product, index) => (
                  <SwiperSlide className="swiper-female__item" key={index}>
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
            <div className="female_product__button">
              <button onClick={() => navigate("/productsByCategory/Váy")}>
                XEM TẤT CẢ <FaArrowRight />
              </button>
            </div>
          </div>
          <img
            className="female_image"
            src="https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/img_product_banner_2.jpg?1742401393294"
          />
        </div>
      </div>
    </div>
  );
};

export default Female;
