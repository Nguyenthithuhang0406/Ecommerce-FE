import { publicInstance, requestWithToken } from "@/utils/axios/axios-http";

export const createdOrder = async (data) => {
  try {
    const response = await requestWithToken(publicInstance, {
      method: "POST",
      url: "/orders",
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi ở đặt hàng:", error);
    throw new Error("Đặt hàng không thành công");
  }
};

export const getOrderByOrderType = async (orderType) => {
  try {
    const response = await requestWithToken(publicInstance, {
      method: "GET",
      url: `/orders${orderType && `?orderType=${orderType}`}`,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi ở lấy đơn hàng:", error);
    throw new Error("Lấy đơn hàng không thành công");
  }
};

export const getConfirmedOrder = async (params) => {
  try {
    const response = await requestWithToken(publicInstance, {
      method: "GET",
      url: `/orders/confirm?${params}`,
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching confirmed orders:", error);
    throw new Error("Lấy đơn hàng đã xác nhận không thành công");
  }
};

export const getReferenceOrder = async (reference) => {
  try {
    const response = await requestWithToken(publicInstance, {
      method: "GET",
      url: `/orders/reference?reference=${reference}`,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi ở lấy đơn hàng theo mã tham chiếu:", error);
    throw new Error("Lấy đơn hàng theo mã tham chiếu không thành công");
  }
}
