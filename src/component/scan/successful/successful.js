import React from "react";
import Complete from "../../../imgAll/img/save_complete.jpg";
import "./succsefulcss.scss"; // ไฟล์ CSS

const Succesful = ({ setShowCamera }) => {
  // ✅ รับ setShowCamera
  return (
    <div className="succesful-container">
      <div className="img-section">
        <img src={Complete} />
      </div>
      <div className="text-section">
        <span>บันทึกข้อมูลสำเร็จ!</span>
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
