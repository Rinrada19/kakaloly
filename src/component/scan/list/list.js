import React, { useState, useEffect } from "react";
import "./listcss.scss";
import Loading from "../../loader/loading";

const List = ({
  imageData,
  setStep,
  setSelectedMenu,
  completedMenus = [],
  setCompletedMenus,
}) => {
  const [selectMenu, setSelectMenu] = useState(null); // รักษาค่าของเมนูที่เลือก
  const [loading, setLoading] = useState(true);

  // ตรวจสอบว่า imageData เป็นอาร์เรย์ก่อน
  const availableMenus = Array.isArray(imageData)
    ? imageData.filter((food) => !completedMenus.includes(food.food_name))
    : []; // หากไม่ใช่จะส่งอาร์เรย์ว่าง

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // 10 วินาที

    return () => clearTimeout(timer);
  }, [imageData]); // เปลี่ยนจาก availableMenus เป็น imageData เพื่อให้แน่ใจว่าตรวจสอบข้อมูลจาก API

  // ฟังก์ชันเมื่อกดเลือกเมนู
  const handleButtonClick = (food) => {
    setSelectMenu(food.food_name); // เลือกเมนูที่คลิก
    setSelectedMenu(food); // เก็บข้อมูลเมนูที่เลือก
    // console.log("food ที่ส่ง ---", food);
  };

  // ฟังก์ชันต่อไปเมื่อเลือกเมนูแล้ว
  const handleNextStep = () => {
    if (availableMenus.length === 0) {
      setStep(6); // ปิดหรือกลับไปหน้าแรก
      return;
    }

    if (selectMenu) {
      const updatedCompletedMenus = [...completedMenus, selectMenu];
      setCompletedMenus(updatedCompletedMenus); // อัพเดต completedMenus
      setStep(3); // ไปขั้นตอนถัดไป
    } else {
      alert("โปรดเลือกเมนูที่ต้องการ");
    }
  };

  // รีเซ็ต selectMenu เมื่อ imageData หรือ completedMenus เปลี่ยนแปลง
  useEffect(() => {
    if (!selectMenu) {
      setSelectMenu(null);
      setSelectedMenu(null);
    }
  }, [imageData, completedMenus]);

  return (
    <div className="list-container">
      <span>รายชื่อเมนู</span>

      {/* แสดงข้อมูลจาก API */}
      {loading ? (
        <Loading /> // แสดงข้อความกำลังโหลดก่อน 10 วินาที
      ) : availableMenus.length > 0 ? (
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
        <p>ไม่มีข้อมูลเมนูอาหาร</p> // ถ้าข้อมูลไม่มีหลังจาก 10 วิ
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
