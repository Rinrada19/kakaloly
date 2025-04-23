import React from "react";
import ProgressBar from "../../../../component/content-CardSummary/progressbar/progressbar";
import { dailyNutrition } from "../../../../test_mock/MockData";
import styles from "../../component/conten-Nutrients/Nutrients.module.scss";

function Nutrients({ nutritionData, waterData }) {
  const nutrients = dailyNutrition[0];
  // const limit = LimitNutrition[0]

  const { sodium, sodium_goal, sugar_goal, sugar } = nutritionData || {};
  const { water } = waterData || { water: {} };
  // console.log("waterData", waterData);
  // console.log("waterrr", waterData?.water_amount);
  // console.log("น้ำตาลที่ได้รับ:", sugar);
  // console.log("Token:", localStorage.getItem("token"));
  return (
    <div className={styles["warpperAllnutrition"]}>
      <div className={styles["bar-Allnutrition"]}>
        <div className={styles["bar-Eachnutriion"]}>
          <p>โซเดียม</p>
          <ProgressBar value={sodium} max={sodium_goal} color="#FD4600" />
          <p className={styles["proteinIntake"]}>
            {Math.floor(sodium)}
            <span className={styles["proteinGoal"]}>/{sodium_goal}g</span>
          </p>
          {/* เพิ่มการตรวจสอบการเตือนหากโซเดียมเกินขีดจำกัด */}
        </div>

        <div className={styles["bar-Eachnutriion"]}>
          <p>น้ำตาล</p>
          <ProgressBar value={sugar} max={sugar_goal} color="#FECA39" />
          <p className={styles["proteinIntake"]}>
            {Math.floor(sugar)}
            <span className={styles["proteinGoal"]}>/{sugar_goal}g</span>
          </p>
        </div>

        <div className={styles["bar-Eachnutriion"]}>
          <p>ดื่มน้ำ</p>
          <ProgressBar value={waterData?.water_amount || 0} max={10} />

          <p className={styles["proteinIntake"]}>
            {waterData?.water_amount || 0}{" "}
            <span style={{ fontSize: "12px", color: "#ABABAB" }}>แก้ว</span>
          </p>
        </div>
      </div>

      {/* เพิ่มการจัดวาง Warningtext สำหรับน้ำตาล */}
      {sugar !== undefined &&
        sugar !== null &&
        sugar !== 0 &&
        sugar > sugar_goal && (
          <div className={styles["Eachnutriion"]}>
            <p className={styles.Warningtext}>❗ น้ำตาลเกินขีดจำกัดวันนี้ !</p>
          </div>
        )}

      {sodium !== undefined && sodium !== null && sodium > sodium_goal && (
        <div className={styles["Eachnutriion"]}>
          <p className={styles.Warningtext}>❗ โซเดียมเกินขีดจำกัดวันนี้ !</p>
        </div>
      )}
    </div>
  );
}
export default Nutrients;
