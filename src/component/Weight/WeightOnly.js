import React from "react";
import styles from "../../component/Weight/WeightOnly.module.scss"; // นำเข้าไฟล์ SCSS Module

function WeightOnly({ user }) {
  // แสดงน้ำหนักจากออบเจกต์แรกในอาร์เรย์
  const currentWeight = user?.[0]?.weight || 0; // ใช้ user[0]?.weight ถ้า user เป็นอาร์เรย์

  // เพิ่มการตรวจสอบเพื่อป้องกันกรณีที่ user หรือ user[0]?.weight ไม่มีค่า
  console.log("น้ำหนักที่ได้รับจาก props:", currentWeight);

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
          <span className={styles.fontchange}>น้ำหนักปัจจุบัน</span>{" "}
        </div>
        <div>
          <span className={styles.weight_current}>{currentWeight}</span>{" "}
          <span className={styles.kilo}>kg</span>
        </div>
      </div>
    </div>
  );
}

export default WeightOnly;
