import React from 'react';
import styles from "../../pages/history_page/custom.module.scss";
import "../../styles/custom.scss"; 

import WeightOnly from "../../component/Weight/WeightOnly"
import BMIonly from "../../component/BMIonly/BMIonly"
import NutritionalDetails from "../../pages/summary_page/component/content-NutritionalDetails/NutritionalDetails";
import NavigationBar from "../../component/navbar/NavigationBar"
import SummaryCard from "../../component/content-CardSummary/SummaryCard"
import Calendar from "../../pages/history_page/component/calendar/Calendar"

// import
import Gobackhead from "../../component/component-history/gobackhead";
import MealsSectionHistory from "./Mealsection-History/MealsSectionHistory";

function Historypage() {
  return (
        <div style={{
                backgroundColor:"#FFF2EA", 
                minHeight:"100vh",
                position: "relative",
                paddingBottom: "150px",
                paddingTop: "30px",
                }}>
            <div className='container'>
                    {/* ส่วน Header กดปุ่มย้อน */}
                    <div style={{
                        marginBottom: "40px"
                    }}>
                    <Gobackhead text="ประวัติมื้ออาหาร" link="/home" />
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                       <Calendar/> 
                    </div>
                    {/* ส่วน Summary */}
                    <div style={{
                        marginBottom: "25px"
                    }}>
                         <SummaryCard/>
                    </div>
                    {/* ดูมื้ออาหาร */}
                    <div style={{
                        marginBottom: "25px"}}>
                        <MealsSectionHistory/>
                    </div>
                     {/* น้ำหนักปัจุบัน เเละ BMI */}
                    <div className={styles.wrapper}>
                        <div className="roow row g-3" style={{
                        marginBottom: "15px"
                    }}>
                            <div className="cool col-6">
                                <WeightOnly/>
                            </div>
                            <div className="cool col-6">
                                <BMIonly/>
                            </div>
                        </div>
                     {/* รายละเอียดโภชนาการ */}
                        <NutritionalDetails/>
                    </div>
            </div>
            <NavigationBar />
        </div>
        
  );
}

export default Historypage;
