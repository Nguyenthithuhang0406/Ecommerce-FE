/* eslint-disable*/
import axios from 'axios';

// tao ra instance axios cho cac api khong can token
const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
}

// tao ra instance axios cho cac api can token, neu token het han thi se refresh token
const createAuthAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (response) => response, async(error) => {
      if(error.response.status === 401) {
        //refresh token
        //set lai local storage

      }
    },
    
  );

  return instance;
}

// url backend
const publicInstance = createAxiosInstance(import.meta.env.VITE_APP_URL_BE);
const authInstance = createAuthAxiosInstance(import.meta.env.VITE_APP_URL_BE);

const request = (instance, config) => {
  return instance({ ...config });
};

// tao ra instance axios cho cac api can token
const requestWithToken = (instance, config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Bạn cần đăng nhập để thực hiện yêu cầu này.");
  }
  return instance({
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { publicInstance, request, requestWithToken};