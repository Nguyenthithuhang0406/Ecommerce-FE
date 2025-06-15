/* eslint-disable*/
import React, { useEffect, useState } from "react";

import { MdOutlineAccountCircle } from "react-icons/md";
import "./Information.scss";
import { getMe } from "@/api/authAPI/user";

const Infomation = () => {
  const [isEditting, setIsEditing] = useState(false);
  const [information, setInformation] = useState({
    username: "abc",
    firstName: "Nguyen",
    email: "abc@gmail.com",
    lastName: "Hang",
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await getMe();
        setInformation((prev) => ({
          ...prev,
          username: response.data.username || "abc",
          firstName: response.data.fullName.split(" ")[0] || "Nguyen",
          lastName:
            response.data.fullName.split(" ").slice(1).join(" ") || "Hang",
          email: response.data.email || "abc@gmail.com",
        }));
      } catch (error) {
        console.log("Error fetching user information:", error);
      }
    };
    fetchUserInformation();
  }, []);

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeInformation = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="information" data-aos="fade-right">
      <h1 className="information__title">Hồ sơ của tôi</h1>
      <p className="information__description">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      <hr />
      <div className="information__content">
        <div className="information__content__form">
          <div className="information__content__form__item">
            <p>Tên đăng nhập</p>
            <input
              type="text"
              value={information.username}
              disabled={!isEditting}
              name="username"
              onChange={(e) => handleChangeInformation(e)}
            />
          </div>
          <div className="information__content__form__item">
            <p>Họ</p>
            <input
              type="text"
              value={information.firstName}
              name="firstName"
              onChange={(e) => handleChangeInformation(e)}
              disabled={!isEditting}
            />
          </div>
          <div className="information__content__form__item">
            <p>Tên</p>
            <input
              type="text"
              value={information.lastName}
              name="lastName"
              onChange={(e) => handleChangeInformation(e)}
              disabled={!isEditting}
            />
          </div>
          <div className="information__content__form__item">
            <p>Email</p>
            <input
              type="email"
              value={information.email}
              name="email"
              disabled={!isEditting}
              onChange={(e) => handleChangeInformation(e)}
            />
          </div>

          <div className="information__content__form__btn">
            {!isEditting ? (
              <button
                onClick={() => setIsEditing(true)}
                className="information__content__form__btn-edit"
              >
                Chỉnh sửa
              </button>
            ) : (
              <div className="information__content__form__btn__group">
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className="information__content__form__btn__group-save"
                >
                  Lưu
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className="information__content__form__btn__group-cancel"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="information__content__avatar">
          <div className="information__content__avatar__img">
            {/* <img /> */}
            <MdOutlineAccountCircle />
          </div>
          <label htmlFor="file" className="information__content__avatar__label">
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleChangeAvatar(e)}
            />
            <span>Chọn ảnh đại diện</span>
          </label>
          <p>Dung lượng tối đa 1MB. Định dạng: .jpg, .png, .jpeg</p>
        </div>
      </div>
    </div>
  );
};

export default Infomation;
