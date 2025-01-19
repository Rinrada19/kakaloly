import React from 'react';
import ProgressBar from '../../../../component/content-CardSummary/progressbar/progressbar'
import { LimitNutrition , dailyNutrition } from "../../../../test_mock/MockData";
import styles from '../../component/conten-Nutrients/Nutrients.module.scss'

function Nutrients()  {
  const nutrients = dailyNutrition[0]
  const limit = LimitNutrition[0]

  return (
    <div className={styles['warpperAllnutrition']}>
      <div className={styles['bar-Allnutrition']}>
        <div className={styles['bar-Eachnutriion']}>
          <p>โซเดียม</p>
          <ProgressBar value={30} max={100} color="#FD4600" />
          <p className={styles['proteinIntake']}>
            {nutrients.sodium}
            <span className={styles['proteinGoal']}>/{limit.limitsodium}g</span>
          </p>
        </div>

        <div className={styles['bar-Eachnutriion']}>
          <p>น้ำตาล</p>
          <ProgressBar value={120} max={100} color="#FECA39" />
          <p className={styles['proteinIntake']}>
            {nutrients.sugar}
            <span className={styles['proteinGoal']}>/{limit.limitsugar}g</span>
          </p>
        </div>

        <div className={styles['bar-Eachnutriion']}>
          <p>ดื่มน้ำ</p>
          <ProgressBar value={60} max={100} color="#5BD1F8" />
          <p className={styles['proteinIntake']}>
            {nutrients.water} เเก้ว
          </p>
        </div>
      </div>

  {/* เพิ่มการจัดวาง Warningtext */}
  <div className={styles['Eachnutriion']}>
    <p className={styles.Warningtext}>น้ำตาลเกินขีดจำกัดวันนี้ !</p>
  </div>
</div>

  );
}
export default Nutrients;
