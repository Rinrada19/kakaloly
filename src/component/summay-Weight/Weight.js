// Weight.js
import React from "react";
import styles from "../summay-Weight/weight.module.scss"; // นำเข้าไฟล์ SCSS Module
import editpen from "../../imgAll/element/editpen.png";

function Weight({ user }) {
  // เพิ่ม props user เพื่อรับข้อมูลจาก Home
  return (
    <div className={styles.warpperbox}>
      <div className={styles.weightbox1}>
        <div>
          <span className={styles.fontchange}>น้ำหนักปัจจุบัน</span>{" "}
          <img src={editpen} className={styles.pen} alt="editpen"></img>
        </div>
        <div>
          <span className={styles.weight_current}>{user?.weight || "0"}</span>{" "}
          <span className={styles.kilo}>kg</span>
        </div>{" "}
        {/* ใช้ค่า weight จาก user */}
      </div>

      <div className={styles.weightbox1}>
        <div>
          <span className={styles.fontchange}>น้ำหนักเป้าหมาย</span>{" "}
          {/* <img src={editpen} className={styles.pen} alt="editpen"></img> */}
        </div>
        <div>
          <span className={styles.weight_goal}>
            {user?.require_weight || "0"}
          </span>{" "}
          <span className={styles.kilogoal}>kg</span>
        </div>{" "}
        {/* ใช้ค่า require_weight จาก user */}
      </div>
    </div>
  );
}

export default Weight;
