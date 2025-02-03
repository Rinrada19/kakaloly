import React from "react";
import cal from "../../../imgAll/icon/cal.svg";
import "./succsefulcss.scss"; // ไฟล์ CSS

const Succesful = ({ setShowCamera }) => {
  // ✅ รับ setShowCamera
  return (
    <div className="succesful-container">
      <div className="img-section">
        <img src={cal} />
      </div>
      <div className="text-section">
        <span>บันทึกข้อมูลสำเร็จ! 🎉</span>
      </div>
      <div className="button-section">
        <button className="next-button" onClick={() => setShowCamera(false)}>
          ปิด
        </button>
      </div>
    </div>
  );
};

export default Succesful;
