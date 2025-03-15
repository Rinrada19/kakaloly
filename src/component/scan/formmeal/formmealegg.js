import React, { useState } from "react";

const FormMealEgg = ({ selectEgg, handleEggButtonClick }) => {
  const [eggCount, setEggCount] = useState(0); // สร้าง state สำหรับจำนวนไข่ที่เหลือ

  return (
    <div className="egg-container">
      <p>เพิ่มไข่ (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก)</p>
      <div className="sugar-button-container">
        {["ไม่เพิ่มไข่", "ไข่ดาว", "ไข่เจียว", "ไข่ต้ม"].map((egg) => (
          <button
            key={egg}
            type="button"
            className={`sugar-button ${selectEgg === egg ? "selected" : ""}`}
            onClick={() => handleEggButtonClick(egg)}
          >
            {egg}
          </button>
        ))}
      </div>

      {/* ช่องให้กรอกจำนวนไข่ที่เหลือ */}
      <div className="rice-button-container">
        <label>จำนวนฟอง :</label>
        <input
          type="number"
          min="0"
          value={eggCount}
          onChange={(e) => setEggCount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormMealEgg;
