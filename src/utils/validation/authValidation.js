/* eslint-disable*/
import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  firtName: Yup.string().required("Họ không được để trống"),
  lastName: Yup.string().required("Tên không được để trống"),
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email không được để trống")
    .max(100, "Email không được quá 100 ký tự"),
  userName: Yup.string()
    .required("Tên đăng nhập không được để trống")
    .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
    .max(20, "Tên đăng nhập không được quá 20 ký tự"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ in thường, 1 ký tự đặc biệt"
    ),
  confirmPassword: Yup.string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
});

export const loginValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Tên đăng nhập không được để trống")
    .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
    .max(20, "Tên đăng nhập không được quá 20 ký tự"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ in thường, 1 ký tự đặc biệt"
    ),
});
