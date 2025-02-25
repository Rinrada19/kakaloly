import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getUser } from "../../../api/api_user";
import { useUser } from "../../../api/UserContext";
import "./formmealcss.scss"; // ไฟล์ CSS
import { addMeal } from "../../../api/api_add_meal"; // เรียก API addMeal
import Succesful from "../successful/successful";

const FormMeal = ({ imageData, setStep, selectedMenu }) => {
  const [selectType, setselectType] = useState(null);
  const [selectSugar, setselectSugar] = useState(null);
  const [selectRice, setselectRice] = useState(null);
  const [selectMeat, setselectMeat] = useState("defual_meat");
  const [selectEgg, setselectEgg] = useState(null);
  const [selectValueEgg, setselectValueEgg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  // const [step, setStep] = useState(0); // กำหนดค่าเริ่มต้นของ step เป็น 0

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = {};
          const response = await getUser(data, token);
          if (Array.isArray(response) && response.length > 0) {
            setUser(response[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setUser]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const meatCalories = {
      ไม่มี: 0,
      หมูสับ: 260,
      หมู: 165,
      หมูสามชั้น: 518,
      ไก่: 165,
      ไก่สับ: 165,
      อกไก่: 165,
      สะโพกไก่: 209,
      ปีกไก่: 203,
      หนังไก่: 450,
      กุ้ง: 99,
      กุ้งสด: 85,
      กุ้งต้ม: 90,
      กุ้งทอด: 290,
      ปลา: 110,
      ปลาแซลมอน: 208,
      หอยแมลงภู่: 172,
      หอยแครง: 82,
      หอยนางรม: 60,
      วัว: 250,
      วัวติดมัน: 290,
      สันในวัว: 190,
      ปู: 97,
      ปูทอด: 250,
    };

    function calculateCalories(default_meat, selectMeat, cal) {
      let updatedCal = cal;

      if (default_meat !== "none") {
        updatedCal -= meatCalories[default_meat] || 0;
      }

      updatedCal += meatCalories[selectMeat] || 0;

      return updatedCal;
    }
    let updatedCal = calculateCalories(default_meat, selectMeat, cal);

    let sugar = selectedMenu?.sugar || 0;
    if (selectSugar === "ไม่มีน้ำตาล") {
      sugar = 0;
    } else if (selectSugar === "ใส่น้ำตาล") {
      sugar += 5;
    } else if (selectSugar === "ใส่น้ำตาลเยอะ") {
      sugar += 11;
    }

    if (selectEgg === "ไข่ดาว") {
      updatedCal += selectValueEgg * 90;
    } else if (selectEgg === "ไข่เจียว") {
      updatedCal += selectValueEgg * 110;
    } else if (selectEgg === "ไข่ต้ม") {
      updatedCal += selectValueEgg * 70;
    }

    updatedCal += selectRice * 60;

    setCalories(updatedCal);
  }, [
    selectMeat,
    selectEgg,
    selectValueEgg,
    selectRice,
    selectSugar,
    default_meat,
    cal,
    selectedMenu?.sugar,
  ]);

  const onSubmit = async (data) => {
    if (!selectedMenu || !user.user_id) {
      console.error("Missing selected menu or user_id");
      return;
    }

    const mealData = {
      food_name: selectedMenu.food_name || "",
      food_description: selectedMenu.food_description || "",
      type: selectedMenu.food_category || "",
      rice: Number(selectRice) || 0,
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

    console.log("Data being sent:", mealData);

    try {
      const response = await addMeal(mealData);
      console.log("API response:", response);

      if (response && response.message === "Meal created successfully!") {
        console.log("Meal added successfully");
        setStep(5); // ✅ อัปเดตไปยังขั้นตอน 5
      } else {
        console.error("Meal creation failed:", response?.message);
      }
    } catch (error) {
      console.error("Error adding meal:", error.response || error);
    }
  };

  const handleButtonClick = (meal) => {
    setselectType(meal);
  };
  const handleSugarButtonClick = (sugar) => {
    setselectSugar(sugar);
  };
  const handleMeatButtonClick = (meat) => {
    setselectMeat(meat);
  };
  const handleEggButtonClick = (egg) => {
    setselectEgg(egg);
  };
  const handleValueEggButtonClick = (e) => {
    setselectValueEgg(e.target.value);
  };

  const handleRiceButtonClick = (e) => {
    setselectRice(e.target.value);
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
          <span>เนื้อสัตว์ (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก)</span>
          <div className="sugar-button-container">
            {[
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
            ].map((meat) => (
              <button
                key={meat}
                type="button"
                className={`sugar-button ${
                  selectMeat === meat ? "selected" : ""
                }`}
                onClick={() => handleMeatButtonClick(meat)}
              >
                {meat} {/* ✅ เพิ่มชื่อเนื้อสัตว์ตรงนี้ */}
              </button>
            ))}
          </div>
        </div>

        {/* ***************************************************************************** */}
        <div className="egg-container">
          <span>เพิ่มไข่ (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก) </span>
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
              value={selectValueEgg ?? ""} // ใช้ค่าว่างหากเป็น null หรือ undefined
              onChange={handleValueEggButtonClick} // อัพเดตค่าตามที่กรอก
            />
          </div>
        </div>
        {/* ****************************************************************************** */}
        <div className="rice-container">
          <span>
            ปริมาณข้าวทัพพี (1 ทัพพี = 60 กรัม) <br />
            (หากเป็นเครื่องดื่ม / ของหวานไม่ต้องเลือก)
          </span>
          <div className="rice-button-container">
            <input
              type="number"
              value={selectRice ?? ""} // ใช้ค่าว่างหากเป็น null หรือ undefined
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

      {/* {step === 5 && <Succesful />} */}
    </form>
  );
};

export default FormMeal;
