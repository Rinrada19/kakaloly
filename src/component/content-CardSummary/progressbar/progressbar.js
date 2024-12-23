import React from "react";
import "./ProgressBar.scss"; // ไฟล์ CSS สำหรับปรับแต่ง

const ProgressBar = ({ value, max }) => {
  return (
    <progress value={value} max={max} className="custom-progress" />
  );
};

export default ProgressBar;
