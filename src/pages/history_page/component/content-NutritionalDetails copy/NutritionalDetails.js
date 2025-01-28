import React from "react";
import styles from '../../../history_page/component/content-NutritionalDetails copy/NutritionalDetails.module.scss';

// import
import { dailyNutrition } from "../../../../test_mock/MockData";
import DonutChart from '../../component/content-NutritionalDetails copy/Donutchart/Donutchart';
import ProgressBar from '../../../../component/content-CardSummary/progressbar/progressbar';

function HisNutritionalDetails() {
  // เลือกข้อมูล nutrition ของวันที่ต้องการ (ในที่นี้ใช้ index 0)
  const nutritionData = dailyNutrition[0] || {};

  // ตัวแปรสำหรับข้อมูลการโภชนาการ
  const {
    goalcarbs,
    goalprotein,
    goalfats,
    carbs,
    protein,
    fats,
  } = nutritionData;

  return (
    <div className={styles.wapperNutri}>
      <div>
        <p className={styles.Headnutri}>รายละเอียดโภชนาการ</p>
        <DonutChart />
      </div>
      <div>
        <div className={styles["bar-Allnutrition"]} style={{ marginTop: "30px" }}>
          <div className={styles["bar-Eachnutriion"]}>
            <p>คาร์โบไฮเดรต</p>
            <ProgressBar value={carbs || 0} max={goalcarbs || 100} />
            <p className={styles.proteinIntake}>
              {carbs}
              <span className={styles.proteinGoal}>/{goalcarbs}g</span>
            </p>
          </div>

          <div className={styles["bar-Eachnutriion"]}>
            <p>โปรตีน</p>
            <ProgressBar value={protein || 0} max={goalprotein || 100} />
            <p className={styles.proteinIntake}>
              {protein}
              <span className={styles.proteinGoal}>/{goalprotein}g</span>
            </p>
          </div>

          <div className={styles["bar-Eachnutriion"]}>
            <p>ไขมัน</p>
            <ProgressBar value={fats || 0} max={goalfats || 100} />
            <p className={styles.proteinIntake}>
              {fats}
              <span className={styles.proteinGoal}>/{goalfats}g</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HisNutritionalDetails;
