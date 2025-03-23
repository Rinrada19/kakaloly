import React, { useState } from "react";
import styles from "./mealItem.module.scss";

import iconMorning from "../../../../imgAll/icon/iconicon-morningfood.webp";
import iconLunch from "../../../../imgAll/icon/icon-lunchfood.webp";
import iconDinner from "../../../../imgAll/icon/icon-dinnerfood.webp";

const MealItem = ({ mealItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // console.log("mealItem.....", mealItem);

  // คำนวณแคลอรี่รวมทั้งหมด (ถ้าไม่มีข้อมูลให้เป็น 0)
  const totalCalories = mealItem.meals?.length
    ? mealItem.meals.reduce((total, item) => total + item.cal, 0)
    : 0;

  // เลือกไอคอนตามประเภทมื้ออาหาร
  const getMealIcon = (mealName) => {
    switch (mealName) {
      case "มื้อเช้า":
        return iconMorning;
      case "มื้อเที่ยง":
        return iconLunch;
      case "มื้อเย็น":
        return iconDinner;
      default:
        return null;
    }
  };

  // ฟังก์ชันสำหรับการคลิกที่กล่องเพื่อขยายหรือย่อข้อมูล
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles["meal-item"]} ${isExpanded ? styles.expanded : ""}`}
    >
      {/* บรรทัดแรก: รูปภาพ, ชื่อมื้อ, แคลอรี่รวม */}
      <div className={styles["meal-header"]} onClick={toggleDetails}>
        <div className={styles.boxleft}>
          <img
            src={getMealIcon(mealItem.name)}
            alt={mealItem.name}
            style={{ width: "56px" }}
          />
          <h3>{mealItem.name}</h3>
        </div>
        <p className={styles["total-calories"]}>
          {totalCalories} <span className={styles["cal-unit"]}>cal</span>
        </p>
      </div>

      {/* ถ้ามีการขยาย (isExpanded = true) จะแสดงข้อมูลอาหาร */}
      <div
        className={`${styles["meal-details"]} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {mealItem.meals?.length > 0 ? (
          mealItem.meals.map((item, index) => (
            <div key={index} className={styles["food-item"]}>
              <p className={styles["food-name"]}>{item.food_name}</p>
              <p className={styles["food-calories"]}>
                {item.cal} <span className={styles["cal-unit"]}>cal</span>
              </p>
            </div>
          ))
        ) : (
          <p className={styles["no-data"]}>-- ไม่มีข้อมูล --</p>
        )}
      </div>
    </div>
  );
};

export default MealItem;
