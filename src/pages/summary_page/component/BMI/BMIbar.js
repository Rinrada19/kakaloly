import React from "react";
import "../BMI/BMIbar.scss"; // นำเข้าไฟล์ SCSS Module
import { users } from "../../../../test_mock/MockData";
import Multibarbmi from "../BMI/progressBar/Multibarbmi";

const BMIbar = ({ user }) => {
  const heightInMeters = user?.height / 100; // แปลงส่วนสูงจากเซนติเมตรเป็นเมตร
  const bmi = Math.floor(user?.weight / (heightInMeters * heightInMeters)); // คำนวณค่า BMI และปัดเศษลง
  return (
    <div className="wapper">
      <p
        style={{
          color: "#BDA093",
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        <span
          style={{ fontSize: "18px", color: "#915B43", marginRight: "3px" }}
        >
          BMI
        </span>
        <span styles={{ fontSize: "16px", color: "#915B43" }}>(Kg/m2)</span>{" "}
        ตอนนี้
      </p>
      <p className="bmivalues">
        {" "}
        {bmi}
        {/*ค่า BMI*/}{" "}
        <span className="statusBMI">
          {users[0].statusBMI}
          {/*ค่า สถานะbmi*/}
        </span>{" "}
      </p>
      <div className="thin-divider"></div>
      <Multibarbmi value={21.5} min={15} max={40} />
      {/* ค่า BMI มาเเทนในนี้เเสดง bar */}
    </div>
  );
};
export default BMIbar;
