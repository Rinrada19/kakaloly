import React from 'react';
import './summaryCard.scss';
import { meals, dailyNutrition } from "../../test_mock/MockData";
import ProgressChart from "../content-CardSummary/cicle-chart/circle-chart";
import ProgressBar from "./progressbar/progressbar";



const SummaryCard = () => {
  // เลือกข้อมูล nutrition ของวันที่ต้องการ (ในที่นี้ใช้ index 0)
  const nutritionData = dailyNutrition[0];

  // คำนวณแคลอรีที่กินไปทั้งหมดสำหรับ userId = 1
  const userId = 1; // ระบุ userId
  const totalCaloriesConsumed = meals
    .filter((meal) => meal.userId === userId) // เลือกมื้ออาหารของ userId ที่ระบุ
    .reduce((total, meal) => total + meal.calories, 0); // รวมค่าแคลอรีทั้งหมด

  // คำนวณแคลอรีที่เหลือ
  const remainingCalories = Math.max(
    nutritionData.goal - totalCaloriesConsumed - nutritionData.exercise,
    0
  );

  return (
    <div className='container'>
    <section className="wrapper-sum">
      <div className="container-box">
        <div className="cicle-chart">
        <ProgressChart value={760} max={2000} />
        {/* <div className="circle-chart">
          <p>{totalCaloriesConsumed} cal</p>
        </div> */}
        </div>
            <div className="summary-info">
                <h3>สรุป</h3>
                <div className="summary-detail-info">
                  <div>
                    <p>กินไป</p>
                    <p>เป้าหมาย</p>
                    <p className="fade_text">ต้องกินอีก</p>
                  </div>
                  <div className="sumCal_info">
                    <p className="highlight__black">
                      {totalCaloriesConsumed} <span className="cal-unit">cal</span>
                    </p>
                    <p className="highlight__black">
                      {nutritionData.goal} <span className="cal-unit">cal</span>
                    </p>
                    <p className="highlight__green">
                      {remainingCalories} <span className="cal-unit">cal</span>
                    </p>
                  </div>
                </div>
           </div>
      </div>
      
      <div className="bar-Allnutrition">

        <div className="bar-Eachnutriion">
          <p>คาร์โบไฮเดรต</p>
          <ProgressBar value={60} max={100} />
          <p className="proteinIntake">
            {nutritionData.carbs}
            {/* เอา component มาใช้ */}
            <span className="proteinGoal">/{nutritionData.goalcarbs}g</span>
          </p>
        </div>

        <div className="bar-Eachnutriion">
          <p>โปรตีน</p>
          <ProgressBar value={15} max={100} />
          <p className="proteinIntake">
            {nutritionData.protein}
            <span className="proteinGoal">/{nutritionData.goalprotein}g</span>
          </p>
        </div>

        <div className="bar-Eachnutriion">
          <p>ไขมัน</p>
          <ProgressBar value={40} max={100} />
          <p className="proteinIntake">
            {nutritionData.fats}
            <span className="proteinGoal">/{nutritionData.goalfats}g</span>
          </p>
        </div>

      </div>
    </section>
    </div>
  );
};

export default SummaryCard;
