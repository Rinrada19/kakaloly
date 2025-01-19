import React from 'react';
import "../BMI/BMIbar.scss";  // นำเข้าไฟล์ SCSS Module
import { users } from "../../../../test_mock/MockData"
import Multibarbmi from "../BMI/progressBar/Multibarbmi"

const BMIbar = () => {
    return(
      <div className='wapper'>
        <p style={{
            color:"#BDA093",
            fontSize:"16px",
            fontWeight:"400",
        }}>ตอนนี้</p>
        <p className='bmivalues'> {users[0].BMI}{/*ค่า BMI*/} <span className='statusBMI'>{users[0].statusBMI}{/*ค่า สถานะbmi*/}</span> </p> 
        <div className="thin-divider"></div>
        <Multibarbmi value={21.5} min={15} max={40}/>
        {/* ค่า BMI มาเเทนในนี้เเสดง bar */}
      </div>
    );
}
export default BMIbar;