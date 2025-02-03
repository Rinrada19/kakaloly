import React, { useState } from "react";
import "./formmealcss.scss"; // ไฟล์ CSS

const FormMeal = ({ imageData, setStep }) => {
  const [selectType, setselectType] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectSugar, setselectSugar] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectRice, setselectRice] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  // ฟังก์ชันที่ทำให้ปุ่มมีสีเปลี่ยนไปตามที่เลือก
  const handleButtonClick = (meal) => {
    setselectType(meal); // เปลี่ยนค่า selectType
    console.log(meal); // แสดงค่าใน console
  };
  const handleSugarButtonClick = (sugar) => {
    setselectSugar(sugar); // เปลี่ยนค่า selectType
    console.log(sugar); // แสดงค่าใน console
  };
  const handleRiceButtonClick = (e) => {
    setselectRice(e.target.value); // เก็บค่าที่กรอกใน input สำหรับข้าว
    console.log(e.target.value); // แสดงค่าที่กรอกใน console
  };

  return (
    <div className="form-container">
      <div className="type-container">
        <span>เพิ่มมื้ออาหาร</span>
        <div className="type-button-container">
          <button
            className={`type-button ${
              selectType === "มื้อเช้า" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("มื้อเช้า")}
          >
            มื้อเช้า
          </button>
          <button
            className={`type-button ${
              selectType === "มื้อกลางวัน" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("มื้อกลางวัน")}
          >
            มื้อกลางวัน
          </button>
          <button
            className={`type-button ${
              selectType === "มื้อเย็น" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("มื้อเย็น")}
          >
            มื้อเย็น
          </button>
        </div>
      </div>
      {/* ****************************************************************************** */}
      <div className="sugar-container">
        <span>ความหวานของมื้อที่กิน</span>
        <div className="sugar-button-container">
          <button
            className={`sugar-button ${
              selectSugar === "ไม่มีน้ำตาล" ? "selected" : ""
            }`}
            onClick={() => handleSugarButtonClick("ไม่มีน้ำตาล")}
          >
            ไม่มีน้ำตาล
          </button>
          <button
            className={`sugar-button ${
              selectSugar === "ใส่น้ำตาลปกติ" ? "selected" : ""
            }`}
            onClick={() => handleSugarButtonClick("ใส่น้ำตาลปกติ")}
          >
            ใส่น้ำตาลปกติ
          </button>
          <button
            className={`sugar-button ${
              selectSugar === "ใส่น้ำตาลเยอะ" ? "selected" : ""
            }`}
            onClick={() => handleSugarButtonClick("ใส่น้ำตาลเยอะ")}
          >
            ใส่น้ำตาลเยอะ
          </button>
        </div>
      </div>
      {/* ****************************************************************************** */}
      <div className="rice-container">
        <span>ปริมาณข้าวทัพพี (1 ทัพพี = 60 กรัม)</span>
        <div className="rice-button-container">
          <input
            type="number"
            value={selectRice} // ใช้ค่าใน state ที่เก็บค่าของข้าว
            onChange={handleRiceButtonClick} // อัพเดตค่าตามที่กรอก
          />
        </div>
      </div>
      <div className="button-container">
        <button className="next-button" onClick={() => setStep(5)}>
          สร้าง
        </button>
      </div>
    </div>
  );
};

export default FormMeal;
