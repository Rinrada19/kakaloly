import React from "react";
//scss
import styles from './Sumweekpage.module.scss'

//import
import ButtonSumDandW from '../component/ButtonSumDandW/ButtonSumDandW'
import HeaderSum from '../../summary_page/component/header/HeaderSum'
import NavigationBar from '../../../component/navbar/NavigationBar'
import WeeklyBarChart from '../../../component/bar-chart/weekly_barchart'


const WeeklySummary = () => {
    return (
        <div className={styles.custombackground}>
             <div className='container' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{marginBottom:"20px"}}>
                     <HeaderSum link="/home" title="ภาพรวม" />
                </div>
                 <ButtonSumDandW/>
                 <div className={styles.weeklySummary}>
                    <div className={styles.fontSizebox}>
                        <h1 className={styles.fontstyles}>เเคลอรี่ (<span style={{color:"#63BF40",fontSize:"16px"}}>Kcal</span>)</h1>
                    </div>
                    <WeeklyBarChart/>  {/* ต่อcalข้างใน api */}
                    <div className={styles.cotainerinfo}>
                       <div className={styles.boxinfo}>
                            <h4 className={styles.inforight}>เเคลอรี่ กินโดยเฉลี่ย</h4>
                            <h4 className={styles.infoleft}>2000 Kcal</h4>    {/* consumed average api */}
                       </div>
                       <div className={styles.lineinfo}></div>
                       <div className={styles.boxinfo}>
                            <h4 className={styles.inforight}>แคลอรี่เป้าหมาย <span style={{color:"#ABABAB"}}>(ควรกินต่อวัน)</span></h4>
                            <h4 className={styles.infoleft}>2000 Kcal</h4> {/* Goalcal api */}
                       </div>
                    </div>
                </div>
             </div>
             <NavigationBar />
        </div>
    );
};

export default WeeklySummary;