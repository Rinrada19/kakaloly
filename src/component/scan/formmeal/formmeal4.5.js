import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react"; // นำ useRef เข้ามาใช้งาน
import { useNavigate } from "react-router-dom";

import { getUser } from "../../../api/api_user";
import { useUser } from "../../../api/UserContext";
import "./formmealcss.scss"; // ไฟล์ CSS
import { addMeal } from "../../../api/api_add_meal"; // เรียก API addMeal

import FormMealType from "./formmealtype";
import FormMealSugar from "./formmealsugar";
import FormMealMeat from "./formmealmeat";
import FormMealEgg from "./formmealegg";
import FormMealRice from "./formmealrice";

const FormMeal45 = ({ imageData, setStep, selectedMenu }) => {
  const [selectType, setselectType] = useState(null);
  const [selectSugar, setselectSugar] = useState(null);
  const [selectRice, setselectRice] = useState(null);
  const [selectMeat, setselectMeat] = useState("defual_meat");
  const [selectEgg, setselectEgg] = useState(null);
  const [selectValueEgg, setselectValueEgg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const [message, setMessage] = useState(""); // State for displaying messages
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // const [step, setStep] = useState(0); // กำหนดค่าเริ่มต้นของ step เป็น 0
  const [eggCount, setEggCount] = useState(0); // Track egg count here
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
  const [sugarValue, setSugarValue] = useState(selectedMenu?.sugar || 0); // State for sugarValue

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

  const handleChange = (event) => {
    setEggCount(Number(event.target.value)); // ✅ ใช้ setEggCount ที่ได้รับจาก props
  };

  const previousMeat = useRef(selectMeat); // เก็บค่าเนื้อก่อนหน้า
  const [calorie, setCalorie] = useState(cal); // ใช้ useState แทนการรีเซ็ตค่า

  useEffect(() => {
    let sugar = selectedMenu?.sugar || 0;

    if (selectSugar === "ไม่ใส่น้ำตาล") sugar = selectedMenu?.sugar || 0;
    else if (selectSugar === "น้ำตาลน้อย") sugar += 5;
    else if (selectSugar === "พอดี") sugar += 10;
    else if (selectSugar === "มาก") sugar += 20;
    else if (selectSugar === "น้ำตาลมาก") sugar += 30;

    setSugarValue(sugar); // Update sugarValue state
    setMessage(`น้ำตาลทั้งหมด: ${sugar} กรัม`);
    console.log("selectedsugar", sugar);
  }, [selectSugar, selectedMenu?.sugar]);

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
      ปลาหมึก: 100,
    };

    let updatedCal = calorie; // ใช้ค่าของ calorie ที่มีอยู่แล้ว

    if (selectMeat === default_meat) {
      return; // หยุดการคำนวณ ถ้า selectMeat เท่ากับ default_meat
    }

    // ถ้าเลือก default_meat ให้ลบแคลอรี่จากเนื้อที่เลือกล่าสุด
    if (selectMeat === "default_meat") {
      const previousMeatCalories = meatCalories[previousMeat.current] || 0; // เอาค่าแคลอรี่จาก previousMeat
      updatedCal -= previousMeatCalories; // ลบแคลอรี่จากเนื้อเดิม
    } else {
      // ถ้าเลือกเนื้อใหม่หรือเปลี่ยนจาก default_meat
      const selectMeatCalories = meatCalories[selectMeat] || 0;
      // ถ้า meat ยังไม่เปลี่ยนจาก previousMeat.current ไม่ต้องทำอะไร
      if (selectMeat !== previousMeat.current) {
        updatedCal += selectMeatCalories; // เพิ่มแคลอรี่จากเนื้อใหม่
      }
    }

    // คำนวณแคลอรี่จากไข่
    let eggCalories = 0;
    if (selectEgg === "ไข่ดาว") eggCalories = eggCount * 90;
    else if (selectEgg === "ไข่เจียว") eggCalories = eggCount * 110;
    else if (selectEgg === "ไข่ต้ม") eggCalories = eggCount * 70;

    // เพิ่มแคลอรี่จากไข่และข้าว
    updatedCal += eggCalories;
    updatedCal += selectRice * 60; // คำนวณข้าวเพิ่ม

    setCalories(updatedCal); // อัปเดตค่าแคลอรี่
    previousMeat.current = selectMeat; // อัปเดตค่าเนื้อที่เลือกล่าสุด
  }, [
    selectMeat,
    selectEgg,
    eggCount,
    selectRice,
    selectSugar,
    selectedMenu?.sugar,
    calorie, // เพิ่ม calorie ใน dependency เพื่อให้การคำนวณแคลอรี่อัปเดตได้ถูกต้อง
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
      sugar: sugarValue || 0,
      sodium: selectedMenu.sodium || 0,
    };

    try {
      const response = await addMeal(mealData);
      console.log("API response:", response);

      if (response && response.message === "Meal created successfully!") {
        setMessage("เพิ่มมื้ออาหารสำเร็จ");
        setIsPopupVisible(true); // Show the popup
        console.log("เพิ่มมื้ออาหารสำเร็จ");
      } else {
        setMessage("เพื่มมื้ออาหารไม่สำเร็จ: " + response?.message);
        setIsPopupVisible(true); // Show the popup
        console.error("เพื่มมื้ออาหารไม่สำเร็จ:", response?.message);
      }
    } catch (error) {
      setMessage("Error adding meal: " + (error.response || error));
      setIsPopupVisible(true); // Show the popup
      console.error("Error adding meal:", error.response || error);
    }
  };

  console.log("foodis:", selectedMenu?.food_id);
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
  const handlePopupClose = () => {
    setselectType(null);
    setselectSugar(null);
    setselectRice(null);
    setselectMeat("defual_meat");
    setselectEgg(null);
    setselectValueEgg(null);
    setEggCount(0);
    setCalories(0);
    setMessage("");
    setIsPopupVisible(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <FormMealType
          selectType={selectType}
          handleButtonClick={setselectType}
        />
        <FormMealSugar
          selectSugar={selectSugar}
          handleSugarButtonClick={setselectSugar}
        />
        <FormMealMeat
          selectMeat={selectMeat}
          handleMeatButtonClick={setselectMeat}
          foodId={selectedMenu?.food_id}
        />
        <FormMealEgg
          selectEgg={selectEgg}
          handleEggButtonClick={setselectEgg}
          handleEggCountChange={setEggCount} // ✅ ส่งฟังก์ชัน setEggCount ไป
        />

        <FormMealRice
          selectRice={selectRice}
          handleRiceButtonClick={setselectRice}
        />
        <div className="meat-container">
          <span>แคลอรี่ทั้งหมด: {calories} kcal</span>
        </div>
        <div className="meat-container">
          <span> {message}</span>
        </div>

        <div className="button-container">
          <button
            className="next-button"
            type="submit" // ต้องใช้ type="submit" เพื่อให้ฟอร์มส่งข้อมูล
            // ใช้ handleSubmit สำหรับส่งฟอร์ม
          >
            เพิ่มมื้ออาหาร
          </button>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="message_container">
              <p className="message_p">{message}</p>
              <p className="message_sub">
                คุณต้องการเพิ่มเมนูอาหารอีก หรือไม่?
              </p>
            </div>
            <div className="button_container">
              <button
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #FFA088",
                  color: "#000000",
                }}
                className="button_manudetail"
                onClick={() => {
                  handlePopupClose();
                  navigate("/Manupage");
                }}
              >
                เพิ่มอีก
              </button>
              <button
                className="button_manudetail"
                onClick={() => {
                  handlePopupClose();
                  // setIsPopupVisible(false); // Hide the popup
                  navigate("/home");
                }}
              >
                กลับไปหน้าแรก
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormMeal45;
