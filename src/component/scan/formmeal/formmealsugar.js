import React from "react";

const FormMealSugar = ({ selectSugar, handleSugarButtonClick }) => {
  return (
    <div className="sugar-container">
      <span>ความหวานของมื้อที่กิน</span>
      <div className="sugar-button-container">
        {["ไม่มีน้ำตาล", "ใส่น้ำตาลปกติ", "ใส่น้ำตาลเยอะ"].map((sugar) => (
          <button
            key={sugar}
            type="button"
            className={`sugar-button ${
              selectSugar === sugar ? "selected" : ""
            }`}
            onClick={() => handleSugarButtonClick(sugar)}
          >
            {sugar}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormMealSugar;
