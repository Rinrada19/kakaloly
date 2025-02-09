import React from "react";
import { useNavigate } from "react-router-dom";

import "./succsefulcss.scss"; // ไฟล์ CSS

const Close = () => {
  const handleClose = () => {
    window.location.href = "/home"; // ไปหน้าแรก (Home)
  };

  return (
    <div className="succesful-container">
      <div className="text-section">
        <span>ย้อนกลับไปยังหน้าแรก</span>
      </div>
      <div className="button-section">
        <button className="next-button" onClick={handleClose}>
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
};

export default Close;
