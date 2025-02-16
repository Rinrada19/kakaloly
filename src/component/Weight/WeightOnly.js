import React from 'react';
import styles from '../../component/Weight/WeightOnly.module.scss';  // นำเข้าไฟล์ SCSS Module
  // นำเข้าไฟล์ SCSS

function WeightOnly() {
  return (
    <div>
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
              <div><span className={styles.fontchange}>น้ำหนักปัจจุบัน</span> </div>
              <div><span className={styles.weight_current}>70</span> <span className={styles.kilo}>kg</span></div>
          </div>
      </div> 
    </div>
  );
}

export default WeightOnly;
