import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ChartDonut({ value, max, isSelected }) {
  const percentage = (value / max) * 100;
  
  // สีของ donut chart ถ้าถูกเลือกจะเป็นสีใหม่
  const pathColor = isSelected ? "#EF7430" : "#EF7430";
  
  return (
    <div style={{ width: 70, height: 70, position: "relative" }}>
      {/* วงกลมแสดง Progress */}
      <CircularProgressbar
        value={percentage}
        strokeWidth={14} // เพิ่มความหนาของเส้น
        styles={buildStyles({
          pathColor: pathColor, // สีของ progress
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
          width: "52px",
          height: "52px",
          backgroundColor: "#FDF1EA", // สีพื้นหลังวงกลม
          borderRadius: "50%", // ทำให้เป็นวงกลม
          zIndex: 1,
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
          zIndex: 2,
        }}
      >
      </div>
    </div>
  );
}

export default ChartDonut;
