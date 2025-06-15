/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

import "./Comment.scss";
import { getAllProducts } from "@/api/productAPI/product";
import { getReviewsByProductId } from "@/api/productAPI/review";

const Comment = () => {
  // const reviews = [
  //   {
  //     product: {
  //       name: "Aqua 9.8 kg ",
  //       image: [
  //         "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-2-c140d0a9-b56c-4166-8f5b-3da0c917eba6.jpg?v=1731513403483",
  //         "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp3-5-77cd757d-c5cb-4c38-afa9-ccd0c42b16d5.jpg?v=1731513403483",
  //       ],
  //     },
  //     comments: [
  //       {
  //         name: "Hồng Mến",
  //         job: "Kinh doanh",
  //         comment:
  //           "Tôi mới mua một bộ trang phục từ cửa hàng của họ và cảm thấy hoàn toàn hài lòng. Chất liệu vải rất mềm mại và thoáng khí.",
  //         rating: 5,
  //         avatar:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //       },
  //       {
  //         name: "Trần Minh",
  //         job: "Nhân viên văn phòng",
  //         comment: "Sản phẩm đẹp, giống hình, chất lượng tốt.",
  //         rating: 4,
  //         avatar:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //       },
  //     ],
  //   },
  //   {
  //     product: {
  //       name: "Panasonic Inverter giặt 10.5 kg",
  //       image: [
  //         "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-2-b6da4946-d566-436c-bb78-02b179755959.jpg?v=1731320140383",
  //         "https://bizweb.dktcdn.net/thumb/large/100/534/571/products/sp8-5-05c1c474-ce3f-4eec-963e-23a6751e0953.jpg?v=1731320140383",
  //       ],
  //     },
  //     comments: [
  //       {
  //         name: "Ngọc Lan",
  //         job: "Sinh viên",
  //         comment:
  //           "Giá cả hợp lý, thiết kế thời trang, sẽ ủng hộ shop lần sau.",
  //         rating: 5,
  //         avatar:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //       },
  //       {
  //         name: "Hoàng Anh",
  //         job: "Thiết kế đồ họa",
  //         comment: "Áo đẹp, chất vải mát, rất ưng ý!",
  //         rating: 5,
  //         avatar:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //       },
  //     ],
  //   },
  // ];

  const [reviews, setReviews] = useState([]);

  const fetchComments = async (productId) => {
    try {
      const data = {
        productId,
      };
      const response = await getReviewsByProductId(data);
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = {
          sortedBy: "price",
          sortDirection: "asc",
          page: 0,
          size: 10,
          status: "true",
        };

        const response = await getAllProducts(data);
        console.log("Product List Response:", response);

        const productList = response.data.content || [];
        
        const listReview = await Promise.all(
          productList.map(async (product) => {
            const commentsRaw = await fetchComments(product.id);
            const comments = commentsRaw.map((comment) => ({
              name: comment.fullName,
              comment: comment.comment,
              rating: Math.min(5, comment.rating), // Giới hạn tối đa 5 sao
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s", // dùng ảnh mặc định
              job: "Khách hàng", // nếu không có, dùng mặc định
            }));

            return {
              product: {
                name: product?.name,
                image: product?.images?.length > 0 ? product?.images : ["", ""],
              },
              comments,
            };
          })
        );

        // Lọc ra những sản phẩm có đánh giá
        const filteredReviews = listReview.filter(
          (review) => review.comments.length > 0
        );
        // Sắp xếp theo thứ tự nhiều đánh giá nhất
        filteredReviews.sort(
          (a, b) => b.comments.length - a.comments.length
        );

        console.log("Filtered Reviews:", filteredReviews);
        setReviews(filteredReviews.slice(0, 5)); // Lấy 5 sản phẩm có đánh giá nhiều nhất

      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="comment">
      <Swiper
        data-aos="fade-up"
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="swiper-reviews__list"
      >
        {reviews.map((review, index) => (
          <SwiperSlide className="swiper-reviews__item" key={index}>
            {/* image */}
            <div className="swiper-reviews__item-image">
              <img
                src={review.product.image[0].imageUrl}
                alt={review.product.name}
                className="swiper-reviews__item-img"
              />
              {review.product.image[1] && (
                <img
                  src={review.product.image[1]}
                  alt={review.product.name}
                  className="swiper-reviews__item-img image2"
                />
              )}
            </div>
            {/* comment */}
            <div className="swiper-reviews__item-comment">
              <h1 className="swiper-reviews__item-comment-title">
                ĐÁNH GIÁ CỦA KHÁCH HÀNG
              </h1>
              <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                nested={true}
                className="swiper-comments__list"
              >
                {review.comments.map((comment, index) => (
                  <SwiperSlide className="swiper-comment__item" key={index}>
                    <div className="swiper-comment__item-content">
                      <p className="swiper-comment__item-comment">
                        {comment.comment}
                      </p>
                      <div className="swiper-comment__item-content-rating">
                        <span className="swiper-comment__item-content-rating-star">
                          {Array.from({ length: comment.rating }, (_, i) => (
                            <FaStar key={i} />
                          ))}
                        </span>
                        <span className="swiper-comment__item-content-rating-star">
                          {Array.from(
                            { length: 5 - comment.rating },
                            (_, i) => (
                              <FaRegStar key={i} />
                            )
                          )}
                        </span>
                      </div>
                      <div className="swiper-comment__item-content-avatar">
                        <img
                          src={comment.avatar}
                          alt={comment.name}
                          className="swiper-comment_item-avatar"
                        />
                      </div>
                      <p className="swiper-comment_name">{comment.name}</p>
                      <p className="swiper-comment_job">{comment.job}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Comment;
