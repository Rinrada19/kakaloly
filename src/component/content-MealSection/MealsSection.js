import React from 'react';
import MealItem from './MealItem/MealItem';
import './mealsSection.scss';
import { meals } from '../../test_mock/MockData'; // นำเข้าข้อมูล mock

const MealsSection = () => {
  // จัดกลุ่มมื้ออาหารตาม mealType
  const groupedMeals = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  };

  meals.forEach((meal) => {
    if (groupedMeals[meal.mealType]) {
      groupedMeals[meal.mealType].push(meal);
    }
  });

  // สร้าง array สำหรับการ map ข้อมูล
  const mealData = [
    { name: 'มื้อเช้า', meals: groupedMeals.Breakfast },
    { name: 'มื้อเที่ยง', meals: groupedMeals.Lunch },
    { name: 'มื้อเย็น', meals: groupedMeals.Dinner },
  ];

  return (
    <div>
      <section className="meals-section">
        <p className="head">มื้อที่รับประทาน</p>
        {mealData.map((mealItem, index) => (
          <MealItem key={index} mealItem={mealItem} />
        ))}
      </section>
    </div>
  );
};

export default MealsSection;
