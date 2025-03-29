import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressChart = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div style={{ width: 120, height: 120, position: "relative" }}>
      {/* วงกลมแสดง Progress */}
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          pathColor: "#EF7430", // สีของ progress (สีส้ม)
          trailColor: "#C9C9C9", // สีของพื้นหลัง
        })}
      />

      {/* วงกลมพื้นหลังของข้อความ */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          backgroundColor: "#FDF1EA", // สีพื้นหลังวงกลม
          borderRadius: "50%", // ทำให้เป็นวงกลม
          zIndex: 1, // วงกลมนี้จะอยู่ใต้ข้อความ
        }}
      ></div>

      {/* ข้อความแสดงตรงกลาง */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2, // ข้อความอยู่เหนือวงกลมพื้นหลัง
        }}
      >
        <div style={{ fontSize: "22px", fontWeight: "500" }}>{value}</div>
        <div style={{ fontSize: "14px", fontWeight: "400" }}>kcal</div>
      </div>
    </div>
  );
};

export default ProgressChart;
