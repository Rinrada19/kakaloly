import React from "react";

const FormMealMeat = ({ selectMeat, handleMeatButtonClick, foodId }) => {
  const excludedFoodIds = [
    0, 1, 2, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 20, 21, 23, 24, 25, 28, 29,
    30, 31, 34, 35, 37, 38, 39, 40, 41, 42, 43, 45, 47,
  ];

  const numericFoodId = Number(foodId); // แปลง foodId เป็น number
  //console.log("foodId received:", foodId, "numericFoodId:", numericFoodId);

  if (excludedFoodIds.includes(numericFoodId)) {
    // console.log("Food ID is excluded:", numericFoodId);
    return null;
  }

  const meats = [
    "ไม่มี",
    "หมูสับ",
    "หมู",
    "หมูสามชั้น",
    "ไก่",
    "ไก่สับ",
    "อกไก่",
    "สะโพกไก่",
    "ปีกไก่",
    "หนังไก่",
    "กุ้ง",
    "กุ้งสด",
    "กุ้งต้ม",
    "กุ้งทอด",
    "ปลา",
    "ปลาแซลมอน",
    "หอยแมลงภู่",
    "หอยแครง",
    "หอยนางรม",
    "วัว",
    "วัวติดมัน",
    "สันในวัว",
    "ปู",
    "ปูทอด",
    "เป็ด",
    "ปลาหมึก",
    "เต้าหู้",
  ];

  return (
    <div className="meat-container">
      <span>เนื้อสัตว์ (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก)</span>
      <div className="sugar-button-container">
        {meats.map((meat) => (
          <button
            key={meat}
            type="button"
            className={`sugar-button ${selectMeat === meat ? "selected" : ""}`}
            onClick={() => handleMeatButtonClick(meat)}
          >
            {meat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormMealMeat;
