import React from "react";
import { useNavigate } from "react-router-dom";
import Complete from "../../../imgAll/img/save_complete.jpg";
import "./succsefulcss.scss"; // ไฟล์ CSS

const Close = () => {
  const handleClose = () => {
    window.location.href = "/home"; // ไปหน้าแรก (Home)
  };

  return (
    <div className="close-container">
      <div className="text-section">
        <span>ย้อนกลับไปยังหน้าแรก</span>
      </div>
      <img src={Complete} className="close-img" />
      <div className="button-section">
        <button className="back-button" onClick={handleClose}>
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
};

export default Close;
