import React, { useState, useEffect } from "react";
import "./listcss.scss";

const List = ({
  imageData,
  setStep,
  setSelectedMenu,
  completedMenus = [],
  setCompletedMenus,
}) => {
  const [selectMenu, setSelectMenu] = useState(null); // รักษาค่าของเมนูที่เลือก

  // useEffect(() => {
  //   setSelectMenu(null); // รีเซ็ตการเลือกเมนูใหม่ทุกครั้ง
  // }, [imageData, completedMenus]);

  // ฟังก์ชันที่จัดการเมื่อกดเลือกเมนู
  const handleButtonClick = (food) => {
    setSelectMenu(food.food_name); // เลือกเมนูที่คลิก
    setSelectedMenu(food); // เก็บข้อมูลเมนูที่เลือก
    // console.log("food ที่ส่ง ---", food); // ส่งข้อมูลทั้งหมดของอาหารที่เลือก
  };

  // ฟังก์ชันต่อไปเมื่อเลือกเมนูแล้ว
  const handleNextStep = () => {
    if (availableMenus.length === 0) {
      setStep(6); // ปิดหรือกลับไปหน้าแรก
      // console.log("ไม่มีเมนูที่เหลือ ปิดหน้าต่าง");
      return;
    }

    if (selectMenu) {
      const updatedCompletedMenus = [...completedMenus, selectMenu];
      setCompletedMenus(updatedCompletedMenus); // อัพเดต completedMenus

      setStep(3); // เลื่อนไปขั้นตอนถัดไป
      // console.log("กำลังเปลี่ยนไปขั้นตอนที่ 3");
    } else {
      alert("โปรดเลือกเมนูที่ต้องการ");
    }
  };

  // รีเซ็ต selectMenu เมื่อ imageData หรือ completedMenus เปลี่ยนแปลง
  useEffect(() => {
    // ตรวจสอบว่าเราไม่ควรรีเซ็ต selectMenu ถ้ามีการเลือกเมนูแล้ว
    if (!selectMenu) {
      setSelectMenu(null); // รีเซ็ต selectMenu หากยังไม่ได้เลือกเมนู
      setSelectedMenu(null); // รีเซ็ต selectedMenu
    }
  }, [imageData, completedMenus]); // รีเซ็ตเมื่อ imageData หรือ completedMenus เปลี่ยนแปลง

  // ตรวจสอบว่า imageData เป็นอาร์เรย์ก่อน
  const availableMenus = Array.isArray(imageData)
    ? imageData.filter((food) => !completedMenus.includes(food.food_name))
    : []; // หากไม่ใช่จะส่งอาร์เรย์ว่าง

  return (
    <div className="list-container">
      <span>รายชื่อเมนู</span>

      {/* แสดงผลลัพธ์จาก API */}

      {Array.isArray(availableMenus) && availableMenus.length > 0 ? (
        <div className="list-button-container">
          {availableMenus.map((food, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(food)}
              className={`Menu-button ${
                selectMenu === food.food_name ? "selected" : ""
              }`}
            >
              {food.food_name} - {food.cal} แคลอรี่
            </button>
          ))}
        </div>
      ) : (
        <p>ไม่มีข้อมูลจาก API หรือเลือกเมนูที่เหลือหมดแล้ว</p> // แสดงข้อความเมื่อไม่มีข้อมูลหรือไม่มีเมนูที่เหลือ
      )}

      {/* ปุ่มต่อไป */}
      <div className="button-container">
        <button className="next-button" onClick={handleNextStep}>
          {availableMenus.length === 0 ? "ปิด" : "ต่อไป"}
        </button>
      </div>
    </div>
  );
};

export default List;
