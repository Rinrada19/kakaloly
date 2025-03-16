import React, { useState } from "react";

const FormMealEgg = ({
  selectEgg,
  handleEggButtonClick,
  handleEggCountChange,
}) => {
  const [eggCount, setEggCount] = useState("");

  const handleChange = (e) => {
    const count = Number(e.target.value);
    setEggCount(count);
    if (typeof handleEggCountChange === "function") {
      handleEggCountChange(count); // ✅ ตรวจสอบก่อนเรียกใช้
    }
  };

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

      <div className="egg-button-container">
        <label>จำนวนฟอง</label>
        <input
          type="number"
          min="0"
          value={eggCount}
          onChange={handleChange} // ใช้ฟังก์ชันใหม่
        />
      </div>
    </div>
  );
};

export default FormMealEgg;
