import React from 'react';
import styles from '../../component/BMIonly/BMIonly.module.scss';  // นำเข้าไฟล์ SCSS Module

function BMIonly() {
  return (
    <div 
        className={styles.boxweight}
            style={{
            backgroundColor:"#FFFFFF",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // ใช้ CamelCase
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
        }}
    >
        <div className={styles.weightbox1}>
            <div><span className={styles.fontchange}>BMI (Kg/m2)</span> </div>
            <div><span className={styles.weight_current}>21</span></div>
        </div>
    </div>
  );
}

export default BMIonly;
