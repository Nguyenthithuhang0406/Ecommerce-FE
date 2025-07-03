/* eslint-disable */
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { createReview } from "@/api/productAPI/review";

const AddComment = ({ setIsShowAddComment, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleAddComment = async () => {
    if (comment.trim() === "" || rating === 0) {
      alert("Vui lòng nhập nội dung và chọn số sao đánh giá");
      return;
    }

    try {
      const data = {
        productId,
        rating,
        comment,
      };

      const response = await createReview(data);
      console.log("Đánh giá đã được gửi:", response);
      setComment("");
      setRating(0);
      setIsShowAddComment(false);
      
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  return (
    <div className="w-[500px] pb-[50px] h-auto z-20 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="w-full h-[70px] flex items-center justify-between px-4 border-b">
        <div></div>
        <p className="text-[20px] font-bold">Thêm đánh giá</p>
        <IoMdClose
          className="w-[20px] h-[20px] cursor-pointer"
          onClick={() => setIsShowAddComment(false)}
        />
      </div>

      {/* Nội dung */}
      <div className="w-full mt-[20px] flex flex-col items-center gap-4 px-[20px]">
        <img
          src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
          alt="account"
          className="w-[100px] h-[100px] rounded-full"
        />

        {/* Rating sao */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Nhập đánh giá */}
        <div className="w-full flex gap-[10px] items-center">
          <input
            placeholder="Nhập nội dung đánh giá"
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="w-full h-[50px] px-[10px] border border-gray-200 rounded-[5px] shadow-lg outline-none focus:outline-blue-200 focus:ring-1"
          />
          <IoSend
            onClick={handleAddComment}
            className="w-[30px] h-[30px] text-blue-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AddComment;
