import React from "react";
import ProgressBar from "../../../../component/content-CardSummary/progressbar/progressbar";
import { dailyNutrition } from "../../../../test_mock/MockData";
import styles from "../../component/conten-Nutrients/Nutrients.module.scss";

function Nutrients({ nutritionData }) {
  const nutrients = dailyNutrition[0];
  // const limit = LimitNutrition[0]

  const { sodium, sodium_goal, sugar_goal, sugar } = nutritionData || {};

  return (
    <div className={styles["warpperAllnutrition"]}>
      <div className={styles["bar-Allnutrition"]}>
        <div className={styles["bar-Eachnutriion"]}>
          <p>โซเดียม</p>
          <ProgressBar value={sodium} max={sodium_goal} color="#FD4600" />
          <p className={styles["proteinIntake"]}>
            {sodium}
            <span className={styles["proteinGoal"]}>/{sodium_goal}g</span>
          </p>
        </div>

        <div className={styles["bar-Eachnutriion"]}>
          <p>น้ำตาล</p>
          <ProgressBar value={sugar} max={sugar_goal} color="#FECA39" />
          <p className={styles["proteinIntake"]}>
            {sugar}
            <span className={styles["proteinGoal"]}>/{sugar_goal}g</span>
          </p>
        </div>

        <div className={styles["bar-Eachnutriion"]}>
          <p>ดื่มน้ำ</p>
          <ProgressBar value={60} max={100} color="#5BD1F8" />
          <p className={styles["proteinIntake"]}>{nutrients.water} เเก้ว</p>
        </div>
      </div>

      {/* เพิ่มการจัดวาง Warningtext */}
      {sugar && sugar > sugar_goal && (
        <div className={styles["Eachnutriion"]}>
          <p className={styles.Warningtext}>น้ำตาลเกินขีดจำกัดวันนี้ !</p>
        </div>
      )}
    </div>
  );
}
export default Nutrients;
