import React, { useState } from "react";
//import cal from "../../../imgAll/icon/cal.svg";
import "./listcss.scss"; // ไฟล์ CSS

const List = ({ imageData, setStep }) => {
  const [selectMenu, setselectMenu] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const handleButtonClick = (meal) => {
    setselectMenu(meal); // เปลี่ยนค่า selectMenu
    console.log(meal); // แสดงค่าใน console
  };
  // ✅ รับ setShowCamera
  return (
    <div className="list-container">
      <span>รายชื่อเมนู</span>
      <div className="list-button-container">
        <button
          className={`Menu-button ${
            selectMenu === "มื้อเช้า" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("มื้อเช้า")}
        >
          มื้อเช้า
        </button>
        <button
          className={`Menu-button ${
            selectMenu === "มื้อกลางวัน" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("มื้อกลางวัน")}
        >
          มื้อกลางวัน
        </button>
        <button
          className={`Menu-button ${
            selectMenu === "มื้อเย็น" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("มื้อเย็น")}
        >
          มื้อเย็น
        </button>
      </div>
      <div className="button-container">
        <button className="next-button" onClick={() => setStep(3)}>
          ต่อไป
        </button>
      </div>
    </div>
  );
};

export default List;
