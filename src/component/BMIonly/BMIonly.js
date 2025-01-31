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
    <div
      className="container"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // ใช้ CamelCase
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        padding: "26px 39px",
      }}
    >
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
    </div>
  );
}

export default BMIonly;
