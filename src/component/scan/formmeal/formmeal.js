import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUser } from "../../../api/UserContext";
import "./formmealcss.scss"; // ไฟล์ CSS
import { addMeal } from "../../../api/api_add_meal"; // เรียก API addMeal

const FormMeal = ({ imageData, setStep, selectedMenu }) => {
  const [selectType, setselectType] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectSugar, setselectSugar] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectRice, setselectRice] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectMeat, setselectMeat] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectEgg, setselectEgg] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectValueEgg, setselectValueEgg] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const { user } = useUser();
  // console.log("userrrrrrrrr", user);
  const [calories, setCalories] = useState(selectedMenu?.cal || 0);
  const {
    food_name,
    cal,
    carb,
    protein,
    fat,
    food_description,
    sugar,
    sodium,
    default_meat,
  } = selectedMenu || {};
  console.log(
    food_name,
    cal,
    carb,
    protein,
    fat,
    food_description,
    sugar,
    sodium,
    default_meat
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let updatedCal = cal || 0; // ใช้ค่าแคลเริ่มต้นจากเมนูที่เลือก

    // 🎯 ปรับแคลอรี่ตามประเภทเนื้อสัตว์
    if (default_meat === "เนื้อหมูสับ") {
      updatedCal = 260; // หมูสับ 260 kcal
    } else if (default_meat === "เนื้อหมู") {
      updatedCal = 165; // เนื้อหมู 165 kcal
    } else if (default_meat === "เนื้อหมูสามชั้น") {
      updatedCal = 518; // หมูสามชั้น 518 kcal
    } else if (default_meat === "เนื้อไก่") {
      updatedCal = 165; // เนื้อไก่ 165 kcal
    } else if (default_meat === "เนื้อไก่สับ") {
      updatedCal = 165; // เนื้อไก่ 165 kcal
    } else if (default_meat === "กุ้ง") {
      updatedCal = 99; // กุ้ง 99 kcal
    } else if (default_meat === "ปลา") {
      updatedCal = 110; // ปลา 110 kcal
    }

    // ลบแคลอรี่จาก default_meat
    updatedCal -= cal;

    // คำนวณแคลอรี่ตาม selectMeat ที่เลือกใหม่
    if (selectMeat === "หมูสับ") {
      updatedCal += 260; // หมูสับ 260 kcal
    } else if (selectMeat === "เนื้อหมู") {
      updatedCal += 165; // เนื้อหมู 165 kcal
    } else if (selectMeat === "หมูสามชั้น") {
      updatedCal += 518; // หมูสามชั้น 518 kcal
    } else if (selectMeat === "เนื้อไก่") {
      updatedCal += 165; // เนื้อไก่ 165 kcal
    } else if (selectMeat === "กุ้ง") {
      updatedCal += 99; // กุ้ง 99 kcal
    } else if (selectMeat === "ปลา") {
      updatedCal += 110; // ปลา 110 kcal
    }

    console.log("setselectSugar:", setselectSugar);
    console.log("selectSugar:", selectSugar);

    console.log("setselectSugar:", setselectSugar);
    console.log("selectSugar:", selectSugar);

    //let sugar = selectedMenu?.sugar || 0; // รับค่า sugar จาก API หรือใช้ 0 ถ้าไม่มี

    console.log("น้ำตาลที่เลือก:", selectSugar); // ตรวจสอบค่าทุกครั้งที่ selectSugar เปลี่ยนแปลง

    let sugar = selectedMenu?.sugar || 0; // ค่าเริ่มต้นของน้ำตาลจาก API

    if (selectSugar === "ไม่มีน้ำตาล") {
      sugar = 0; // ไม่มีน้ำตาล
    } else if (selectSugar === "ใส่น้ำตาล") {
      sugar += 5; // เพิ่มน้ำตาลตามที่เลือก
    } else if (selectSugar === "ใส่น้ำตาลเยอะ") {
      sugar += 11; // เพิ่มน้ำตาลเยอะ (เพิ่ม 6 กรัม)
    }
    console.log("น้ำตาล =", sugar); // แสดงผลค่า sugar ที่คำนวณแล้ว

    // 🎯 ปรับแคลอรี่ตามจำนวนไข่
    if (selectEgg === "ไข่ดาว") {
      updatedCal += selectValueEgg * 90; // 1 ฟอง = 90 แคล
    } else if (selectEgg === "ไข่เจียว") {
      updatedCal += selectValueEgg * 110; // ไข่เจียว 1 ฟอง = 110 แคล
    } else if (selectEgg === "ไข่ต้ม") {
      updatedCal += selectValueEgg * 70; // ไข่ต้ม 1 ฟอง = 70 แคล
    }

    // 🎯 คำนวณแคลอรี่จากข้าว (1 ทัพพี = 60 แคล)
    updatedCal += selectRice * 60;

    setCalories(updatedCal);
  }, [selectMeat, selectEgg, selectValueEgg, selectRice, cal]);

  const onSubmit = async (data) => {
    // ตรวจสอบค่าที่จะใช้ก่อน
    if (!selectedMenu || !user.user_id) {
      console.error("Missing selected menu or user_id");
      return;
    }

    // รวมข้อมูลที่ได้จากฟอร์มและข้อมูลจาก API
    const mealData = {
      food_name: selectedMenu.food_name || "",
      food_description: selectedMenu.food_description || "",
      type: selectedMenu.food_category || "",
      rice: Number(selectRice) || 0, // แปลงเป็นตัวเลข
      egg: selectEgg || "",
      meal_type: selectType || "",
      cal: calories || 0,
      user_id: user.user_id,
      fat: selectedMenu.fat || 0,
      carb: selectedMenu.carb || 0,
      protein: selectedMenu.protein || 0,
      sugar: sugar || 0,
      sodium: selectedMenu.sodium || 0,
    };

    // ตรวจสอบข้อมูลก่อนการส่ง
    console.log("Data being sent:", mealData);

    try {
      const response = await addMeal(mealData);
      console.log("API response:", response); // เพิ่มการแสดงผลของ response ที่ได้รับจาก API

      if (response && response.message === "Meal created successfully!") {
        console.log("Meal added successfully");
        setStep(5); // ไปที่ขั้นตอนถัดไป
      }
    } catch (error) {
      console.error("Error adding meal:", error.response || error); // ตรวจสอบข้อผิดพลาดจาก API
    }
  };

  // ฟังก์ชันที่ทำให้ปุ่มมีสีเปลี่ยนไปตามที่เลือก
  const handleButtonClick = (meal) => {
    setselectType(meal); // เปลี่ยนค่า selectType
    console.log(meal); // แสดงค่าใน console
  };
  const handleSugarButtonClick = (sugar) => {
    setselectSugar(sugar); // เปลี่ยนค่า selectType
    console.log(sugar); // แสดงค่าใน console
  };
  const handleMeatButtonClick = (meat) => {
    setselectMeat(meat); // เปลี่ยนค่า selectType
    console.log(meat); // แสดงค่าใน console
  };
  const handleEggButtonClick = (egg) => {
    setselectEgg(egg); // เปลี่ยนค่า selectType
    console.log(egg); // แสดงค่าใน console
  };
  const handleValueEggButtonClick = (e) => {
    setselectValueEgg(e.target.value); // เก็บค่าที่กรอกใน input สำหรับข้าว
    console.log(e.target.value); // แสดงค่าที่กรอกใน console
  };

  const handleRiceButtonClick = (e) => {
    setselectRice(e.target.value); // เก็บค่าที่กรอกใน input สำหรับข้าว
    console.log(e.target.value); // แสดงค่าที่กรอกใน console
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div className="type-container">
          <span>เพิ่มมื้ออาหาร</span>
          <div className="type-button-container">
            <button
              type="button"
              className={`type-button ${
                selectType === "มื้อเช้า" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("มื้อเช้า")}
            >
              มื้อเช้า
            </button>
            <button
              type="button"
              className={`type-button ${
                selectType === "มื้อกลางวัน" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("มื้อกลางวัน")}
            >
              มื้อกลางวัน
            </button>
            <button
              type="button"
              className={`type-button ${
                selectType === "มื้อเย็น" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("มื้อเย็น")}
            >
              มื้อเย็น
            </button>
          </div>
        </div>
        {/* ***************************************************************************** */}
        <div className="sugar-container">
          <span>ความหวานของมื้อที่กิน</span>
          <div className="sugar-button-container">
            <button
              type="button"
              className={`sugar-button ${
                selectSugar === "ไม่มีน้ำตาล" ? "selected" : ""
              }`}
              onClick={() => handleSugarButtonClick("ไม่มีน้ำตาล")}
            >
              ไม่มีน้ำตาล
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectSugar === "ใส่น้ำตาลปกติ" ? "selected" : ""
              }`}
              onClick={() => handleSugarButtonClick("ใส่น้ำตาลปกติ")}
            >
              ใส่น้ำตาลปกติ
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectSugar === "ใส่น้ำตาลเยอะ" ? "selected" : ""
              }`}
              onClick={() => handleSugarButtonClick("ใส่น้ำตาลเยอะ")}
            >
              ใส่น้ำตาลเยอะ
            </button>
          </div>
        </div>
        {/* ****************************************************************************** */}
        <div className="meat-container">
          <span>เนื้อสัตว์</span>
          <div className="sugar-button-container">
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อหมูสับ" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อหมูสับ")}
            >
              เนื้อหมูสับ
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อหมู" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อหมู")}
            >
              เนื้อหมู
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อหมูสามชั้น" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อหมูสามชั้น")}
            >
              เนื้อหมูสามชั้น
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อไก่" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อไก่")}
            >
              เนื้อไก่
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อไก่สับ" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อไก่สับ")}
            >
              เนื้อไก่สับ
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อปลา" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อปลา")}
            >
              เนื้อปลา
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectMeat === "เนื้อกุ้ง" ? "selected" : ""
              }`}
              onClick={() => handleMeatButtonClick("เนื้อกุ้ง")}
            >
              เนื้อกุ้ง
            </button>
          </div>
        </div>
        {/* ***************************************************************************** */}
        <div className="egg-container">
          <span>เพิ่มไข่</span>
          <div className="sugar-button-container">
            <button
              type="button"
              className={`sugar-button ${
                selectEgg === "ไม่เพิ่มไข่" ? "selected" : ""
              }`}
              onClick={() => handleEggButtonClick("ไม่เพิ่มไข่")}
            >
              ไม่เพิ่มไข่
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectEgg === "ไข่ดาว" ? "selected" : ""
              }`}
              onClick={() => handleEggButtonClick("ไข่ดาว")}
            >
              ไข่ดาว
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectEgg === "ไข่เจียว" ? "selected" : ""
              }`}
              onClick={() => handleEggButtonClick("ไข่เจียว")}
            >
              ไข่เจียว
            </button>
            <button
              type="button"
              className={`sugar-button ${
                selectEgg === "ไข่ต้ม" ? "selected" : ""
              }`}
              onClick={() => handleEggButtonClick("ไข่ต้ม")}
            >
              ไข่ต้ม
            </button>
          </div>
        </div>
        <div className="rice-container">
          <span>ปริมาณไข่ (ต่อ 1 ฟอง)</span>
          <div className="rice-button-container">
            <input
              type="number"
              value={selectValueEgg} // ใช้ค่าใน state ที่เก็บค่าของข้าว
              onChange={handleValueEggButtonClick} // อัพเดตค่าตามที่กรอก
            />
          </div>
        </div>
        {/* ****************************************************************************** */}
        <div className="rice-container">
          <span>ปริมาณข้าวทัพพี (1 ทัพพี = 60 กรัม)</span>
          <div className="rice-button-container">
            <input
              type="number"
              value={selectRice} // ใช้ค่าใน state ที่เก็บค่าของข้าว
              onChange={handleRiceButtonClick} // อัพเดตค่าตามที่กรอก
            />
          </div>
        </div>

        <div className="meat-container">
          <span>แคลอรี่ทั้งหมด: {calories} kcal</span>
        </div>

        <div className="button-container">
          <button
            className="next-button"
            type="submit" // ต้องใช้ type="submit" เพื่อให้ฟอร์มส่งข้อมูล
            onClick={handleSubmit(onSubmit)} // ใช้ handleSubmit สำหรับส่งฟอร์ม
          >
            สร้าง
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormMeal;
