/* eslint-disable*/
import { publicInstance, requestWithToken } from "@/utils/axios/axios-http";

export const addToCart = async (data) => {
  try {
    const { variantId, quantity } = data;
    const response = await requestWithToken(publicInstance, {
      url: "/carts",
      method: "POST",
      data: {
        variantId,
        quantity,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsInCart = async () => {
  try {
    const response = await requestWithToken(publicInstance, {
      url: "/carts",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy danh sách sản phẩm trong giỏ hàng không thành công");
  }
};

export const deleteAllProductsInCart = async () => {
  try {
    const response = await requestWithToken(publicInstance, {
      url: "/carts",
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Xoá tất cả sản phẩm trong giỏ hàng không thành công");
  }
};

export const deleteProductInCart = async (variantId) => {
  try {
    const response = await requestWithToken(publicInstance, {
      url: `/carts/${variantId}`,
      method: "POST",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Xoá sản phẩm trong giỏ hàng không thành công");
  }
};

export const updateProductInCart = async (data) => {
  try {
    const { variantId, quantity } = data;
    const response = await requestWithToken(publicInstance, {
      url: `/carts/${variantId}?quantity=${quantity}`,
      method: "PUT",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Cập nhật sản phẩm trong giỏ hàng không thành công");
  }
};
