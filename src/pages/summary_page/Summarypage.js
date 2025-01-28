import React from 'react';
import "../../styles/custom.scss"; 
import HeaderSum from './component/header/HeaderSum';
import Weight from '../../component/summay-Weight/Weight';
import ButtonSumDandW from './component/ButtonSumDandW/ButtonSumDandW';
import Nutrients from '../summary_page/component/conten-Nutrients/Nutrients'
import SummaryCard  from '../../component/content-CardSummary/SummaryCard'
import BMIbar  from '../summary_page/component/BMI/BMIbar'
import NutritionalDetails  from '../summary_page/component/content-NutritionalDetails/NutritionalDetails'




function Summarypage() {
  return (
        <div className='custombackground' style={{backgroundColor:"#FFF2EA"}}>
          <div className='container'  
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}> 
            <HeaderSum link="/home" title="สรุปข้อมูล" />
            <ButtonSumDandW/>
            <Weight/>
            <SummaryCard/>
            <BMIbar/>
            <Nutrients/>
            <NutritionalDetails/>
          </div>
        </div>
  );
}

export default Summarypage;
