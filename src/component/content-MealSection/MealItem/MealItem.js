import React, { useState, useRef } from "react";
import styles from "./MealItem.module.scss";

import { deleteFood } from "../../../api/api_meal";

import iconMorning from "../../../imgAll/icon/iconicon-morningfood.webp";
import iconLunch from "../../../imgAll/icon/icon-lunchfood.webp";
import iconDinner from "../../../imgAll/icon/icon-dinnerfood.webp";
import iconVegetables from "../../../imgAll/icon//icon-vegetabless.png";

const MealItem = ({ mealItem, deleteFoodItem, token }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // ✅ Hover state

  const closeModal = () => setShowConfirm(false);

  // ฟังชันต้องกดค้าง 0.8 วิ
  const handleClick = (item) => {
    // console.log("Item ที่ได้รับ:", item); // เพิ่มการ log เพื่อดูค่าของ item
    if (!item.meal_id) {
      //  console.error("ไม่พบ ID สำหรับรายการนี้");
      return;
    }
    setSelectedItem(item);
    setShowConfirm(true); // แสดง modal ยืนยันการลบเมื่อคลิก
    // console.log("กดเเล้ว จะถูกไปส่งในdelete:", item.meal_id);
  };
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // ฟังก์ชันลบข้อมูลโดยเรียก api
  const handleDelete = async () => {
    // ดึง token จาก localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      //   console.error("ไม่พบ Token");
      return; // หยุดทำงานถ้าไม่มี Token
    }

    if (!selectedItem || !selectedItem.meal_id) {
      //   console.error("ID ของเมนูไม่ถูกต้อง");
      return; // หยุดทำงานถ้าไม่พบ ID
    }

    // console.log("Item ที่จะลบ:", selectedItem);
    try {
      // ส่ง meal_id และ token ไปยังฟังก์ชัน deleteFood
      await deleteFood(selectedItem.meal_id, token);
      deleteFoodItem(selectedItem.meal_id); // ใช้ meal_id ในการลบ
      // console.log("Item ที่จะลบ:", selectedItem); //
      // console.log(`ลบ "${selectedItem.food_name}" สำเร็จ`);
      setShowConfirm(false);
    } catch (error) {
      // console.error("เกิดข้อผิดพลาดในการลบ:", error);
    }
  };

  // คำนวณแคลอรี่รวมทั้งหมด
  const totalCalories = mealItem.meals.reduce(
    (total, item) => total + item.cal,
    0
  );

  // เลือกไอคอนตามประเภทมื้ออาหาร
  const getMealIcon = (mealName) => {
    switch (mealName) {
      case "มื้อเช้า":
        return iconMorning;
      case "มื้อเที่ยง":
        return iconLunch;
      case "มื้อเย็น":
        return iconDinner;
      case "อื่นๆ": // เพิ่มกรณี "อื่นๆ"
        return iconVegetables;
      default:
        return null;
    }
  };

  return (
    <div className={styles["meal-item"]}>
      {/* บรรทัดแรก: รูปภาพ, ชื่อมื้อ, แคลอรี่รวม */}
      <div className={styles["meal-header"]}>
        <div className={styles["boxleft"]}>
          <img src={getMealIcon(mealItem.name)} alt={mealItem.name} />{" "}
          {/* รูปภาพอาหาร */}
          <h3>{mealItem.name}</h3> {/* ชื่อมื้ออาหาร */}
        </div>
        <p className={styles["total-calories"]}>
          {totalCalories} <span className={styles["cal-unit"]}>kcal</span>
        </p>{" "}
        {/* จำนวนแคลอรี่รวม */}
      </div>

      {/* บรรทัดที่สอง: รายการอาหารและแคลอรี่ */}
      <div className={styles["meal-details"]}>
        {mealItem.meals.length > 0 ? (
          mealItem.meals.map((item, index) => (
            <div
              key={index}
              className={`${styles["food-item"]} ${
                hoveredItem === item ? styles["hovered"] : "" // ✅ เพิ่ม class เมื่อ hover
              }`}
              onClick={() => handleClick(item)} // เปลี่ยนจาก onMouseDown เป็น onClick เพื่อให้ทำงานเมื่อคลิก
              onMouseEnter={() => handleMouseEnter(item)} // hover effect
              onMouseLeave={handleMouseLeave} // hover effect
            >
              <p className={styles["food-name"]}>{item.food_name}</p>{" "}
              {/* ชื่ออาหาร */}
              <p className={styles["food-calories"]}>
                {item.cal} <span className={styles["cal-unit"]}>kcal</span>{" "}
                {/* cal อาหาร */}
              </p>
            </div>
          ))
        ) : (
          <p className={styles["no-data"]}>-- ไม่มีข้อมูล --</p>
        )}
      </div>
      {/* Modal ยืนยันการลบ */}
      {showConfirm && (
        <>
          <div className={styles["confirm_overlay"]} onClick={closeModal}></div>
          <div className={styles["confirm_modal"]}>
            <p className={styles["header_modal"]}>ลบเมนูอาหาร</p>
            <p style={{ fontWeight: "400", marginBottom: "20px" }}>
              ต้องการลบ "{selectedItem.food_name}" หรือไม่?
            </p>
            <div className={styles["buttonall"]}>
              <button onClick={handleDelete}>ลบ</button>
              <button onClick={() => setShowConfirm(false)}>ไม่ลบ</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MealItem;
