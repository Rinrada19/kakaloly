// Loading.js
import React from "react";
import "./loadingcss.scss"; // สไตล์ที่ใช้สำหรับ loader

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loading-message">กำลังโหลดข้อมูล...</div>
    </div>
  );
};

export default Loading;
