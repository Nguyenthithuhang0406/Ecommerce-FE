import {
  publicInstance,
  request,
  requestWithToken,
} from "@/utils/axios/axios-http";

export const getReviewsByProductId = async (data) => {
  try {
    const {
      productId,
      page,
      size,
      sortBy,
      sortDirection,
      minRating,
      maxRating,
    } = data;
    const response = await request(publicInstance, {
      url: `/reviews/${productId}?page=${page ? page : "0"}&size=${
        size ? size : "20"
      }${sortBy ? `&sortBy=${sortBy}` : ""}&sortDirection=${
        sortDirection ? sortDirection : "desc"
      }${minRating ? `&minRating=${minRating}` : ""}${
        maxRating ? `&maxRating=${maxRating}` : ""
      }`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy danh sách đánh giá không thành công");
  }
};

export const getAvgRatingByProductId = async (productId) => {
  try {
    const response = await request(publicInstance, {
      url: `/reviews/${productId}/avg`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy đánh giá trung bình không thành công");
  }
};

export const createReview = async (data) => {
  try {
    const { productId, rating, comment } = data;
    const response = await requestWithToken(publicInstance, {
      url: `/reviews`,
      method: "POST",
      data: {
        productId,
        rating,
        comment,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Tạo đánh giá không thành công");
  }
};
