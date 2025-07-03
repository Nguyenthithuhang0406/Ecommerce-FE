import { publicInstance, request } from "@/utils/axios/axios-http";

export const getAllCategories = async (data) => {
  try {
    const { sortedBy, sortDirection, page, size, searchKeyword } = data;
    
    const response = await request(publicInstance, {
      url: `/categories?${
        sortedBy ? `sortedBy=${sortedBy}` : ""
      }&sortDirection=${sortDirection ? sortDirection : "asc"}&page=${
        page ? page : "0"
      }&size=${size ? size : "10"}${
        searchKeyword ? `&searchKeyword=${searchKeyword}` : ""
      }`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy danh sách danh mục không thành công");
  }
};

