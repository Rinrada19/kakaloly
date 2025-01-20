import React from 'react';
import '../content-CardSummary/summarycard.scss';
import { dailyNutrition } from "../../test_mock/MockData";
import ProgressChart from "../content-CardSummary/cicle-chart/circle-chart";
import ProgressBar from "./progressbar/progressbar";

const SummaryCard = () => {
  // เลือกข้อมูล nutrition ของวันที่ต้องการ (ในที่นี้ใช้ index 0)
  const nutritionData = dailyNutrition[0] || {};

  // คำนวณแคลอรีที่กินไปทั้งหมดจาก dailyNutrition
  const totalCaloriesConsumed = nutritionData.calories || 0;

  // คำนวณแคลอรีที่เหลือ
  const remainingCalories = Math.max(
    nutritionData.goal - totalCaloriesConsumed,
    0
  );

  // ตัวแปรสำหรับข้อมูลการโภชนาการ
  const {
    goal,
    goalcarbs,
    goalprotein,
    goalfats,
    carbs,
    protein,
    fats,
  } = nutritionData;

  return (
    <div className='container' style={{ padding: "0" }}>
      <section className="wrapper-sum">
        <div className="container-box">
          <div className="cicle-chart">
            <ProgressChart value={totalCaloriesConsumed} max={goal} />
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
                  {goal} <span className="cal-unit">cal</span>
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
            <ProgressBar value={carbs || 0} max={goalcarbs || 100} />
            <p className="proteinIntake">
              {carbs}
              <span className="proteinGoal">/{goalcarbs}g</span>
            </p>
          </div>

          <div className="bar-Eachnutriion">
            <p>โปรตีน</p>
            <ProgressBar value={protein || 0} max={goalprotein || 100} />
            <p className="proteinIntake">
              {protein}
              <span className="proteinGoal">/{goalprotein}g</span>
            </p>
          </div>

          <div className="bar-Eachnutriion">
            <p>ไขมัน</p>
            <ProgressBar value={fats || 0} max={goalfats || 100} />
            <p className="proteinIntake">
              {fats}
              <span className="proteinGoal">/{goalfats}g</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummaryCard;
