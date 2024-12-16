import React from 'react';
import './MealItem.scss';

const MealItem = ({ mealItem }) => {
  // คำนวณแคลอรี่รวมทั้งหมด
  const totalCalories = mealItem.meals.reduce((total, item) => total + item.calories, 0);

  return (
    <div className="meal-item">
      {/* บรรทัดแรก: รูปภาพ, ชื่อมื้อ, แคลอรี่รวม */}
      <div className="meal-header">
        <div className="boxleft">
            <div className='imgfood'></div> {/* รูปภาพอาหาร */}
            <h3>{mealItem.name}</h3>            {/* ชื่อมื้ออาหาร */}
        </div>
         
        <p className="total-calories">{totalCalories} <span className="cal-unit">cal</span></p> {/* จำนวนแคลอรี่รวม */}
      </div>

      {/* บรรทัดที่สอง: รายการอาหารและแคลอรี่ */}
      <div className="meal-details">
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
