import {
  publicInstance,
  request,
  requestWithToken,
} from "@/utils/axios/axios-http";

export const register = async (data) => {
  try {
    const { username, password, email, firstName, lastName } = data;

    await request(publicInstance, {
      url: "/auths/register",
      method: "POST",
      data: {
        username,
        password,
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Đăng ký không thành công");
  }
};

export const login = async (data) => {
  try {
    const { username, password } = data;
    const response = await request(publicInstance, {
      url: "/auths/login",
      method: "POST",
      data: {
        username,
        password,
      },
    });
    const { accessToken, refreshToken, roles } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("roles", roles);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Đăng nhập không thành công");
  }
};

export const forgotPassword = async (data) => {
  try {
    const { email, username } = data;
    await request(publicInstance, {
      url: "/auths/forgot-password",
      method: "POST",
      data: {
        email,
        username,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Quên mật khẩu không thành công");
  }
};

export const changePassword = async (data) => {
  try {
    const { currentPassword, newPassword } = data;
    await requestWithToken(publicInstance, {
      url: "/auths/change-password",
      method: "POST",
      data: {
        currentPassword,
        newPassword,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Đổi mật khẩu không thành công");
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await request(publicInstance, {
      url: "/auths/login",
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Đăng nhập không thành công");
  }
};
