import React from "react";
import styles from "../../component/BMIonly/BMIonly.module.scss"; // นำเข้าไฟล์ SCSS Module

function BMIonly({ user }) {
  // ดึงข้อมูลน้ำหนักและส่วนสูงจาก props
  const weight = user?.[0]?.weight || 0; // ถ้าไม่มีค่าใช้ 0
  const height = user?.[0]?.height || 0; // ถ้าไม่มีค่าใช้ 0

  // คำนวณค่า BMI
  const heightInMeters = height / 100; // แปลงส่วนสูงจาก cm เป็นเมตร
  const bmi = weight / heightInMeters ** 2; // คำนวณค่า BMI

  return (
    <div className={styles.weightbox1}>
      <div>
        <span className={styles.fontchange}>BMI (Kg/m²)</span>{" "}
      </div>
      <div>
        <span className={styles.weight_current}>{Math.floor(bmi)}</span>{" "}
        {/* ใช้ Math.round() เพื่อปัดเศษ */}
        {/* แสดงค่า BMI */}
      </div>
    </div>
  );
}

export default BMIonly;
