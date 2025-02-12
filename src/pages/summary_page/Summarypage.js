import React from 'react';
import "../../styles/custom.scss";
import styles from "./summarypage.module.scss"
//scss

import HeaderSum from './component/header/HeaderSum';
import Weight from '../../component/summay-Weight/Weight';
import ButtonSumDandW from './component/ButtonSumDandW/ButtonSumDandW';
import Nutrients from '../summary_page/component/conten-Nutrients/Nutrients'
import SummaryCard  from '../../component/content-CardSummary/SummaryCard'
import BMIbar  from '../summary_page/component/BMI/BMIbar'
import NutritionalDetails  from '../summary_page/component/content-NutritionalDetails/NutritionalDetails'
import NavigationBar from '../../component/navbar/NavigationBar'
//import



function Summarypage() {
  return (
        <div className={styles.custombackground}>
          <div className='container' style={{ display: "flex", flexDirection: "column", gap: "20px" }}> 
            <div style={{marginBottom:"20px"}}>
               <HeaderSum link="/home" title="ภาพรวม" />
            </div>
            <ButtonSumDandW/>
            <Weight/>
            <SummaryCard/>
            <BMIbar/>
            <Nutrients/>
            <NutritionalDetails/>
          </div>
          <NavigationBar />
        </div>
  );
}

export default Summarypage;
