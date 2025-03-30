import React, { useState } from "react";

const FormMealEgg = ({
  selectEgg,
  handleEggButtonClick,
  handleEggCountChange,
}) => {
  const [eggCount, setEggCount] = useState("");

  const handleChange = (e) => {
    const count = e.target.value ? Number(e.target.value) : ""; // ค่าจะเป็น "" ถ้าเว้นว่าง
    setEggCount(count);
    if (typeof handleEggCountChange === "function") {
      handleEggCountChange(count);
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
            className={`egg-button ${selectEgg === egg ? "selected" : ""}`}
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
          onChange={handleChange}
          placeholder="ไม่ใส่ก็ได้"
          style={{ color: "black", letterSpacing: "0.5px" }}
        />
      </div>
    </div>
  );
};

export default FormMealEgg;
