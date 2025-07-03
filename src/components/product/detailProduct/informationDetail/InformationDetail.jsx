/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

import "./InformationDetail.scss";
import axios from "axios";
import {
  getAvgRatingByProductId,
  getReviewsByProductId,
} from "@/api/productAPI/review";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InformationDetail = ({
  product,
  setIsShowAddComment,
  isShowAddComment,
}) => {
  const [typeMenu, setTypeMenu] = useState("info");
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRateAndComments = async () => {
      try {
        const reviewParams = {
          productId: product.id,
          page: 0,
          size: 20,
          sortBy: "createdAt",
          sortDirection: "desc",
        };

        const [ratingAvgRes, reviewsRes] = await Promise.all([
          getAvgRatingByProductId(product.id),
          getReviewsByProductId(reviewParams),
        ]);

        setRate(ratingAvgRes.data.averageRating || 0);
        setComments(reviewsRes.data.content);

        console.log("Rating Average:", ratingAvgRes);
        console.log("Comments:", reviewsRes);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 500:
              toast.error("Lỗi hệ thống");
              break;
            case 404:
              toast.error("Sản phẩm không tồn tại");
              break;
            default:
              toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại kết nối!");
          }
        }
      }
    };

    fetchRateAndComments();
  }, [product, isShowAddComment]);

  const handleClickAddComment = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
      navigate("/auth");
      return;
    } else {
      setIsShowAddComment(true);
    }
  };

  return (
    <div className="infomation">
      <div data-aos="fade-up" className="infomation-menu">
        <ul className="infomation-menu__list">
          <li
            className={`${typeMenu === "info" ? "active" : ""}`}
            onClick={() => setTypeMenu("info")}
          >
            Thông tin sản phẩm
          </li>
          <li
            className={`${typeMenu === "exchangePolicy" ? "active" : ""}`}
            onClick={() => setTypeMenu("exchangePolicy")}
          >
            Chính sách đổi trả
          </li>
          <li
            className={`${typeMenu === "comment" ? "active" : ""}`}
            onClick={() => setTypeMenu("comment")}
          >
            Đánh giá sản phẩm
          </li>
        </ul>
      </div>
      {typeMenu === "info" && (
        <div data-aos="fade-up" className="info">
          {product.description}
        </div>
      )}
      {/* {typeMenu === "exchangePolicy" && (
        <div data-aos="fade-up" className="exchangePolicy">
          {product.exchangePolicy}
        </div>
      )} */}
      {typeMenu === "comment" &&
        (comments.length === 0 ? (
          <div data-aos="fade-up" className="comment__no">
            Chưa có đánh giá nào
            <div className="comment__have__write">
              <button onClick={handleClickAddComment}>Viết đánh giá</button>
            </div>
          </div>
        ) : (
          <div data-aos="fade-up" className="comment__have">
            <h1>{product.name}</h1>
            <div className="comment__have__rate">
              <div className="comment__have__rate__star">
                <span className="comment__have__rate-number">{rate}</span>
                <span>
                  {Array.from({ length: Math.floor(rate) }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                  {rate % 1 !== 0 && <FaRegStarHalfStroke />}
                  {Array.from({ length: 5 - Math.ceil(rate) }, (_, i) => (
                    <FaRegStar key={i} />
                  ))}
                </span>
              </div>
              <div className="comment__have__rate-count">
                <span>{comments.length}</span> Đánh giá
              </div>
            </div>
            <div className="comment__have__list">
              {comments.map((comment, index) => (
                <div className="comment__have__item" key={index}>
                  {/* <img src={comment.avatar} alt={comment.name} /> */}
                  <div className="comment__have__item-content">
                    <p className="name">{comment.fullName}</p>
                    <div className="rating">
                      {Array.from({ length: comment.rating }, (_, i) => (
                        <FaStar key={i} />
                      ))}
                      {Array.from({ length: 5 - comment.rating }, (_, i) => (
                        <FaRegStar key={i} />
                      ))}
                    </div>
                    <p className="content">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="comment__have__write">
              <button onClick={handleClickAddComment}>Viết đánh giá</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InformationDetail;
