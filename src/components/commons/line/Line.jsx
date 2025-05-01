/* eslint-disable*/
import React from 'react';

import "./Line.scss";
const Line = ({title}) => {
  return (
    <div data-aos="fade-up" className="title-container">
      <div className="line line-left"></div>
      <span>{title}</span>
      <div className="line line-right"></div>
    </div>
  );
}

export default Line;
