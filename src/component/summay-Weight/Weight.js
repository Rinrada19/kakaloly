import React from 'react';
import styles from '../summay-Weight/weight.module.scss';  // นำเข้าไฟล์ SCSS Module
import editpen from '../../imgAll/element/editpen.png'


function Weight() {
  return (
    <div 
        className="container" 
            style={{
            backgroundColor:"#FFFFFF",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // ใช้ CamelCase
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            padding: "26px 39px"
        }}
    >
        <div className={styles.weightbox1}>
            <div><span className={styles.fontchange}>น้ำหนักปัจจุบัน</span> <img src={editpen} className={styles.pen} alt='editpen'></img></div>
            <div><span className={styles.weight_current}>70</span> <span className={styles.kilo}>kg</span></div>
        </div>

        <div className={styles.weightbox1}>
            <div><span className={styles.fontchange}>น้ำหนักปัจจุบัน</span> <img src={editpen} className={styles.pen} alt='editpen'></img></div>
            <div><span className={styles.weight_goal}>65</span> <span className={styles.kilogoal}>kg</span></div>
        </div>
        

    </div>
  );
}

export default Weight;
