import React, { useState, useEffect } from "react";
import "../content-CardSummary/SummaryCard.scss";
import ProgressChart from "../content-CardSummary/cicle-chart/circle-chart";
import ProgressBar from "./progressbar/progressbar";

// นำเข้า API
import { getWaterIntake } from "../../api/api_water";
import { getEatToDay } from "../../api/api_eat_today";

const SummaryCard = ({ nutritionData }) => {
  const [waterData, setWaterData] = useState(null);
  const token = localStorage.getItem("token");
  const [overLimit, setOverLimit] = useState(false);

  useEffect(() => {
    if (!nutritionData) return;

    const goal = Math.floor(cal_goal) || 0;
    const consumed = totalCaloriesConsumed;

    setOverLimit(consumed > goal);
  }, [nutritionData]);

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const data = await getWaterIntake(token);
        setWaterData(data);
      } catch (error) {
        console.error("โหลดข้อมูลน้ำดื่มล้มเหลว", error);
      }
    };

    fetchWaterData();
  }, []);

  if (!nutritionData) {
    return (
      <div className="container">
        <p>กำลังโหลดข้อมูลโภชนาการ...</p>
      </div>
    );
  }

  const {
    cal_goal,
    carb_goal,
    protein_goal,
    fat_goal,
    carb,
    protein,
    fat,
    total_cal,
  } = nutritionData;

  const totalCaloriesConsumed = Math.floor(total_cal) || 0;
  const remainingCalories = Math.max(
    Math.floor(cal_goal - totalCaloriesConsumed),
    0
  );

  const carbConsumed = Math.floor(carb) || 0;
  const proteinConsumed = Math.floor(protein) || 0;
  const fatConsumed = Math.floor(fat) || 0;

  // console.log("nutritionData cardddddddd------", nutritionData);
  return (
    <div className="container" style={{ padding: "0" }}>
      <section className="wrapper-sum">
        <div className="container-box">
          <div className="cicle-chart">
            <ProgressChart
              value={totalCaloriesConsumed}
              max={Math.floor(cal_goal)}
            />
          </div>
          <div className="summary-info">
            <h3>สรุป</h3>
            <div className="summary-detail-info">
              <div className="sumCal_inforight">
                <p>กินไป</p>
                <p>เป้าหมาย</p>
                <p className="fade_text">ต้องกินอีก</p>
                <p>จำนวนน้ำ</p>
              </div>
              <div className="sumCal_info">
                <p className="highlight__black">
                  {totalCaloriesConsumed} <span className="cal-unit">kcal</span>
                </p>
                <p className="highlight__black">
                  {Math.floor(cal_goal)} <span className="cal-unit">kcal</span>
                </p>
                <p className="highlight__green">
                  {remainingCalories} <span className="cal-unit">kcal</span>
                </p>
                <p className="highlight__blue">
                  {waterData?.water_amount ?? 0}{" "}
                  <span className="cal-unit">แก้ว</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="warpper_barAllnutrition">
          <div className="container_box">
            <div>
              {overLimit && (
                <p>⚠️ วันนี้แคลอรี่เกินแล้ว! ลองปรับมื้อถัดไปดูนะ</p>
              )}
            </div>
          </div>
          <div className="bar-Allnutrition">
            <div className="bar-Eachnutriion">
              <p>คาร์โบไฮเดรต</p>
              <ProgressBar value={carbConsumed} max={Math.floor(carb_goal)} />
              <p className="proteinIntake">
                {carbConsumed}
                <span className="proteinGoal">/{Math.floor(carb_goal)}g</span>
              </p>
            </div>
            <div className="bar-Eachnutriion">
              <p>โปรตีน</p>
              <ProgressBar
                value={proteinConsumed}
                max={Math.floor(protein_goal)}
              />
              <p className="proteinIntake">
                {proteinConsumed}
                <span className="proteinGoal">
                  /{Math.floor(protein_goal)}g
                </span>
              </p>
            </div>
            <div className="bar-Eachnutriion">
              <p>ไขมัน</p>
              <ProgressBar value={fatConsumed} max={Math.floor(fat_goal)} />
              <p className="proteinIntake">
                {fatConsumed}
                <span className="proteinGoal">/{Math.floor(fat_goal)}g</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummaryCard;
