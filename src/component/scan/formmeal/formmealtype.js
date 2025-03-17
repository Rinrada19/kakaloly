import React from "react";

const FormMealType = ({ selectType, handleButtonClick }) => {
  return (
    <div className="type-container">
      <p>เพิ่มมื้ออาหาร</p>
      <div className="type-button-container">
        {["มื้อเช้า", "มื้อกลางวัน", "มื้อเย็น"].map((meal) => (
          <button
            key={meal}
            type="button"
            className={`type-button ${selectType === meal ? "selected" : ""}`}
            onClick={() => handleButtonClick(meal)}
          >
            {meal}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormMealType;
