import React from "react";
import spoon from "../../../imgAll/element/spoon.png";

const FormMealSugar = ({ selectSugar, handleSugarButtonClick }) => {
  const sugarLevels = [
    { label: "ไม่ใส่น้ำตาล", spoons: 0 },
    { label: "พอดี", spoons: 0 },
    { label: "น้ำตาลน้อย", spoons: 1 },
    { label: "ปานกลาง", spoons: 2 },
    { label: "มาก", spoons: 3 },
    { label: "น้ำตาลมากๆ", spoons: 4 },
  ];

  return (
    <div className="sugar-container">
      <span>ความหวานของมื้อที่กิน</span>
      <div className="sugar-button-container">
        {sugarLevels.map(({ label, spoons }) => (
          <button
            key={label}
            type="button"
            className={`sugar-button ${
              selectSugar === label ? "selected" : ""
            }`}
            onClick={() => handleSugarButtonClick(label)}
          >
            <div>{label}</div>
            <div className="spoon-container">
              {Array.from({ length: spoons }).map((_, index) => (
                <img
                  key={index}
                  src={spoon}
                  alt="spoon"
                  style={{
                    width: "20px",
                    marginTop: "-5px",
                    filter:
                      selectSugar === label
                        ? "invert(60%) hue-rotate(180deg)" // ใช้ฟิลเตอร์แปลงสีเป็นฟ้า
                        : "none",
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormMealSugar;
