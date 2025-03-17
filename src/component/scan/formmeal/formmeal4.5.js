import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../../api/api_user";
import { useUser } from "../../../api/UserContext";
import "./formmealcss.scss"; // ไฟล์ CSS
import { addMeal } from "../../../api/api_add_meal"; // เรียก API addMeal
// import Succesful from "../successful/successful";

import FormMealType from "./formmealtype";
import FormMealSugar from "./formmealsugar";
import FormMealMeat from "./formmealmeat";
import FormMealEgg from "./formmealegg";
import FormMealRice from "./formmealrice";
import { Style } from "@mui/icons-material";

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

  const token = localStorage.getItem("token");

  const navigate = useNavigate(); // ใช้ useNavigate hook เพื่อเปลี่ยนหน้า

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
      ปลาหมึก: 100,
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

  console.log("foodis---", selectedMenu?.food_id);
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
        />
        <FormMealRice
          selectRice={selectRice}
          handleRiceButtonClick={setselectRice}
        />
        <div className="meat-container">
          <span>แคลอรี่ทั้งหมด: {calories} kcal</span>
        </div>

        <div className="button-container">
          <button
            className="next-button45"
            type="submit" // ต้องใช้ type="submit" เพื่อให้ฟอร์มส่งข้อมูล
            onClick={handleSubmit(onSubmit)} // ใช้ handleSubmit สำหรับส่งฟอร์ม
          >
            สร้าง
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
                  // setIsPopupVisible(false); // Hide the popup
                  navigate("/Manupage");
                }}
              >
                เพิ่มอีก
              </button>
              <button
                className="button_manudetail"
                onClick={() => {
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
