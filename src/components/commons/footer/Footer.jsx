/* eslint-disable */
import React from 'react';

import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer" data-aos="fade-up">
      <div className="header-desktop__logo">
        <span className="header-desktop-logo_first">ND</span>
        <span className="header-desktop-logo_second">Style</span>
      </div>
      <ul className="footer__list">
        <li className="footer__title">Công ty...</li>
        <li className="footer__item">Địa chỉ: ...</li>
        <li className="footer__item">Email: ...</li>
        <li className="footer__item">Hotline:...</li>
      </ul>
      <ul className="footer__list">
        <li className="footer__title">Về chúng tôi</li>
        <li className="footer__item hover">Giới thiệu</li>
        <li className="footer__item hover">Liên hệ</li>
        <li className="footer__item hover">Tin tức</li>
        <li className="footer__item hover">Hệ thống cửa hàng</li>
        <li className="footer__item hover">Sản phẩm</li>
      </ul>
      <ul className="footer__list">
        <li className="footer__title">Dịch vụ khách hàng</li>
        <li className="footer__item hover">Kiểm tra đơn hàng</li>
        <li className="footer__item hover">Chính sách vận chuyển</li>
        <li className="footer__item hover">Chính sách đổi trả</li>
        <li className="footer__item hover">Bảo mật khách hàng</li>
        <li className="footer__item hover">Đăng ký tài khoản</li>
      </ul>
    </div>
  );
}

export default Footer
