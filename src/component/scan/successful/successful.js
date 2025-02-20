import React from "react";
import calorie from "../../../imgAll/icon/calorie.svg";
import "./succsefulcss.scss"; // ไฟล์ CSS

const Succesful = ({ setShowCamera }) => {
  // ✅ รับ setShowCamera
  return (
    <div className="succesful-container">
      <div className="img-section">
        <img src={calorie} />
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
