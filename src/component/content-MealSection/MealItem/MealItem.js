import React from "react";
import styles from "./MealItem.module.scss";

import iconMorning from "../../../imgAll/icon/iconicon-morningfood.webp";
import iconLunch from "../../../imgAll/icon/icon-lunchfood.webp";
import iconDinner from "../../../imgAll/icon/icon-dinnerfood.webp";

const MealItem = ({ mealItem }) => {
  // console.log("mealItem received:", mealItem); // เพิ่มการพิมพ์ค่า mealItem ลงในคอนโซล

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
      default:
        return null; // หรือใส่ไอคอน default ถ้ามมี
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
          {totalCalories} <span className={styles["cal-unit"]}>cal</span>
        </p>{" "}
        {/* จำนวนแคลอรี่รวม */}
      </div>

      {/* บรรทัดที่สอง: รายการอาหารและแคลอรี่ */}
      <div className={styles["meal-details"]}>
        {mealItem.meals.length > 0 ? (
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
