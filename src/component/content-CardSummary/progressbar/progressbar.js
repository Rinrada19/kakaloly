import React from "react";
import "./ProgressBar.scss"; // ไฟล์ CSS สำหรับปรับแต่ง

const ProgressBar = ({ value, max, color }) => {
  const progressStyle = {
    '--progress-bar-color': color || '#EF7430', // ใช้สีที่ส่งมา หรือสีเริ่มต้น
  };
  return (
    <progress 
      value={value}   
      max={max} 
      className="custom-progress" 
      style={progressStyle} 
    />
  );
};

export default ProgressBar;
