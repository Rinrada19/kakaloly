import React, { useState } from 'react';
import './mealItem.scss';

import iconMorning from '../../../imgAll/icon/iconicon-morningfood.webp';
import iconLunch from '../../../imgAll/icon/icon-lunchfood.webp';
import iconDinner from '../../../imgAll/icon/icon-dinnerfood.webp';

const MealItem = ({ mealItem }) => {
  const [isExpanded, setIsExpanded] = useState(false); // สถานะการแสดงข้อมูล

  // คำนวณแคลอรี่รวมทั้งหมด
  const totalCalories = mealItem.meals.reduce((total, item) => total + item.calories, 0);

  // เลือกไอคอนตามประเภทมื้ออาหาร
  const getMealIcon = (mealName) => {
    switch (mealName) {
      case 'มื้อเช้า':
        return iconMorning;
      case 'มื้อเที่ยง':
        return iconLunch;
      case 'มื้อเย็น':
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
    <div className={`meal-item ${isExpanded ? 'expanded' : ''}`}>
      {/* บรรทัดแรก: รูปภาพ, ชื่อมื้อ, แคลอรี่รวม */}
      <div className="meal-header" onClick={toggleDetails}>
        <div className="boxleft">
          <img src={getMealIcon(mealItem.name)} alt={mealItem.name} />
          <h3>{mealItem.name}</h3>
        </div>
        <p className="total-calories">{totalCalories} <span className="cal-unit">cal</span></p>
      </div>

      {/* ถ้ามีการขยาย (isExpanded = true) จะแสดงข้อมูลอาหาร */}
      <div className={`meal-details ${isExpanded ? 'expanded' : ''}`}>
        {mealItem.meals.length > 0 ? (
          mealItem.meals.map((item, index) => (
            <div key={index} className="food-item">
              <p className="food-name">{item.foodName}</p>
              <p className="food-calories">{item.calories} <span className="cal-unit">cal</span></p>
            </div>
          ))
        ) : (
          <p className="no-data">-- ไม่มีข้อมูล --</p>
        )}
      </div>
    </div>
  );
};

export default MealItem;
