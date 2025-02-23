import React, { useState } from "react";
import "./loadingcss.scss"; // นำเข้าไฟล์ CSS

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      {/* <div className="loading-message">กำลังโหลดข้อมูล...</div> */}
    </div>
  );
};

export default Loading;
