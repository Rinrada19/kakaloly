import React from 'react';
import './SummaryCard.scss';
import { dailyNutrition } from "../test_mock/MockData";
const SummaryCard = () => {
  // เลือกรายการแรกใน dailyNutrition
  const item = dailyNutrition[0];
  const remaining = item.goal - item.calories - item.exercise; // คำนวณแคลอรีที่ต้องกินอีก

  return (
    <section className="summary-card">
     <div className='container-box'>
        <div className="circle-chart">  {/* ส่วนของ chart */}
                <p>{item.calories} cal</p>
              </div>
              <div className="summary-info">
                <h3>สรุป</h3>
                <div className="summary-detail-info">
                  <div>
                    <p>กินไป</p>
                    <p>เป้าหมาย</p>
                    <p>ออกกำลังกาย</p>
                    <p className="fade_text">ต้องกินอีก</p>
                  </div>

                {/* ส่วนของ ค่าตัวเลขต่างๆ etc consumed goal */}
                  <div className="sumCal_info">
                    <p className="highlight__black">
                      {item.calories} <span className="cal-unit">cal</span>
                    </p>
                    <p className="highlight__black">
                      {item.goal} <span className="cal-unit">cal</span>
                    </p>
                    <p className="highlight__red">
                      {item.exercise} <span className="cal-unit">cal</span>
                    </p>
                    <p className="highlight__green">
                      {remaining > 0 ? remaining : 0} <span className="cal-unit">cal</span>
                    </p>
                  </div>
                </div>
            </div>
     </div>
     
      {/* ส่วนของ Nutritione -โปรตีน ไขมัน คาโบ */}
      <div className="bar-Allnutrition">

        <div className="bar-Eachnutriion">
          <p>คาร์โบไฮเดรต</p>
          <p className="proteinIntake">
            {item.carbs}<span className="proteinGoal">/{item.goalcarbs}g</span>
          </p>
        </div>

        <div className="bar-Eachnutriion">
          <p>โปรตีน</p>
          <p className="proteinIntake">
            {item.protein}<span className="proteinGoal">/{item.goalprotein}g</span>
          </p>
        </div>

        <div className="bar-Eachnutriion">
          <p>ไขมัน</p>
          <p className="proteinIntake">
            {item.fats}<span className="proteinGoal">/{item.goalfats}g</span>
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default SummaryCard;