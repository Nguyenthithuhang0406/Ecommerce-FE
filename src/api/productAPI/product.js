import { publicInstance, request } from "@/utils/axios/axios-http";

export const getAllProducts = async (data) => {
  try {
    const {
      sortedBy,
      sortDirection,
      page,
      size,
      searchKeyword,
      category,
      minPrice,
      maxPrice,
      status,
    } = data;
    const response = await request(publicInstance, {
      url: `/products?${sortedBy ? `sortedBy=${sortedBy}` : ""}&sortDirection=${
        sortDirection ? sortDirection : "asc"
      }&page=${page ? page : "0"}&size=${size ? size : "10"}${
        searchKeyword ? `&searchKeyword=${searchKeyword}` : ""
      }${category ? `&category=${category}` : ""}${
        minPrice ? `&minPrice=${minPrice}` : ""
      }${maxPrice ? `&maxPrice=${maxPrice}` : ""}&status=${
        status ? status : "true"
      }`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy danh sách sản phẩm không thành công");
  }
};

export const searchProducts = async (keyword) => {
  try {
    const response = await request(publicInstance, {
      url: `/products/search?keyword=${keyword}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Tìm kiếm sản phẩm không thành công");
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await request(publicInstance, {
      url: `/products/${productId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy thông tin sản phẩm không thành công");
  }
};
