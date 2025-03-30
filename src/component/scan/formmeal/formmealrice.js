import React from "react";

const FormMealRice = ({ selectRice, handleRiceButtonClick }) => {
  return (
    <div className="rice-container">
      <span>
        ปริมาณข้าวทัพพี (1 ทัพพี = 60 กรัม) <br />
        (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก)
      </span>
      <div className="rice-button-container">
        <input
          type="number"
          value={selectRice ?? ""}
          onChange={(e) => handleRiceButtonClick(e.target.value)}
          placeholder="ไม่ใส่ก็ได้"
          style={{ color: "black", letterSpacing: "0.5px" }}
        />
      </div>
    </div>
  );
};

export default FormMealRice;
