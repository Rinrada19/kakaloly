import React from 'react';
import styles from "../../pages/history_page/custom.module.scss"; 
import "../../styles/custom.scss"; 

import Weight from "../../component/summay-Weight/Weight"
import WeightOnly from "../../component/Weight/WeightOnly"
import BMIonly from "../../component/BMIonly/BMIonly"



// import
import Gobackhead from "../../component/component-history/gobackhead";
import MealsSection from "../../component/content-MealSection copy/MealsSection"

function Historypage() {
  return (
    <div className='container' style={{backgroundColor:"#FFF2EA"}}>
        <div className={styles.container}>
            <Gobackhead text="ประวัติมื้ออาหาร" />
            <MealsSection/>
            <Weight/>
            <div className={styles.wrapper}>
            <div className="row g-3">
                <div className="col-6">
                    <WeightOnly/>
                </div>
                <div className="col-6">
                    <BMIonly/>
                </div>
            </div>
            </div>
            
        </div>
    </div>
  );
}

export default Historypage;
