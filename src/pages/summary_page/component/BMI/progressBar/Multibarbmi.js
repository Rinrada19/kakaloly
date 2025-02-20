import React from "react";
import "./multibarbmi.scss";

const Multibarbmi = ({ value, min, max }) => {
    let indicatorPosition;
  
    if (value < 16) {
      indicatorPosition = (value - 15) / (16 - 15) * 19; // 15 - 16 ช่วงนี้จะอยู่ที่ 0%-19%
    } else if (value >= 16 && value < 18.5) {
      // 16 - 18.5 ช่วงนี้จะอยู่ที่ 20% - 41%
      const ratio = (value - 16) / (18.5 - 16);
      indicatorPosition = 20 + ratio * 21; // คำนวณตำแหน่งจาก 20% ถึง 41%
    } else if (value >= 18.5 && value < 25) {
      // 18.5 - 25 ช่วงนี้จะอยู่ที่ 41% - 60%
      const ratio = (value - 18.5) / (25 - 18.5);
      indicatorPosition = 41 + ratio * 19; // คำนวณตำแหน่งจาก 41% ถึง 60%
    } else if (value >= 25 && value < 30) {
      // 25 - 30 ช่วงนี้จะอยู่ที่ 60% - 81%
      const ratio = (value - 25) / (30 - 25);
      indicatorPosition = 60 + ratio * 21; // คำนวณตำแหน่งจาก 60% ถึง 81%
    } else if (value >= 30 && value < 40) {
      // 30 - 40 ช่วงนี้จะอยู่ที่ 81% - 98%
      const ratio = (value - 30) / (40 - 30);
      indicatorPosition = 81 + ratio * 17; // คำนวณตำแหน่งจาก 81% ถึง 98%
    } else {
      indicatorPosition = 100; // ถ้ามากกว่า 40 จะไปที่ตำแหน่ง 100%
    }
  
    return (
      <div className="multi-color-bar">
        <div className="labels">
          {[min, 16, 18.5, 25, 30, max].map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
  
        <div className="ranges">
          <div className="range range-orange"></div>
          <div className="range range-yellow"></div>
          <div className="range range-green"></div>
          <div className="range range-yellow"></div>
          <div className="range range-red"></div>
        </div>
  
        {/* Indicator */}
        <div
          className="indicator"
          style={{
            left: `${indicatorPosition}%`, // ใช้ตำแหน่งที่คำนวณได้
          }}
        ></div>
      </div>
    );
  };
  
  

export default Multibarbmi;
