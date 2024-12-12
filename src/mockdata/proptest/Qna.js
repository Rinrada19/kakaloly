import React, { useState } from "react";
import { Popup } from "./Popup"; // Import Popup component

export const Qna = () => {
  // 2 บรรทัดนี้ต้องมีไว้ควบคุมป้อปอัพ
  const [isPopupOpen, setIsPopupOpen] = useState(false); //เช้คว่าป้อปอัพเปิดอยุ่มั้ย
  const [popupMessage, setPopupMessage] = useState(""); //ไว้เซ็ตค่าที่จะส่งไปในป้อปอัพ

  // ฟังกชั่นไว้เปิดป้อปอัพ เป็น pattern นี้
  const openPopup = (message) => {
    setPopupMessage(message); //เซ็ตคำที่จะส่งไปในป้อปอัพ
    setIsPopupOpen(true); //เปิดป้อปอัพ
  };

  // ฟังก์ชันที่ใช้ปิด Popup
  const closePopup = () => {
    setIsPopupOpen(false); //ปิดป้อปอัพ
  };

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1 className="mb-4">ไก่กับไข่อะไรเกิดก่อน</h1>
        <p className="lead text-muted">เลือกคำตอบของคุณด้านล่าง</p>

        {/* ปุ่มสำหรับเปิด Popup */}
        <div className="d-flex justify-content-center ">
          <button
            className="btn btn-primary btn-lg mr-3 mx-2"
            onClick={() => openPopup("ไข่ ต่างหากไอโง่")}
            //  onClick={() => ชื่อฟังก์ชั่น("จะส่งอะไร")}
          >
            ไก่
          </button>
          <button
            className="btn btn-success btn-lg mx-2"
            onClick={() => openPopup("ไก่ เหมือนมึง")}
          >
            ไข่
          </button>
        </div>
      </div>

      {/* แสดง Popup เมื่อ isPopupOpen เป็น true */}
      {/*ต้องมีบรรทัดนี้ ไม่มีป้อปอัพไม่แสดง
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
        ป้อปอัพเปิด และ ส่งข้อมูลไป กะฟังชั่นไว้ปิดป้อปอัพ
      */}
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};
