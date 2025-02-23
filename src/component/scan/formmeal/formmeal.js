import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getUser } from "../../../api/api_user";
import { useUser } from "../../../api/UserContext";
import "./formmealcss.scss"; // ไฟล์ CSS
import { addMeal } from "../../../api/api_add_meal"; // เรียก API addMeal

const FormMeal = ({ imageData, setStep, selectedMenu }) => {
  const [selectType, setselectType] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectSugar, setselectSugar] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectRice, setselectRice] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectMeat, setselectMeat] = useState("defual_meat"); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก

  const [selectEgg, setselectEgg] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  const [selectValueEgg, setselectValueEgg] = useState(null); // สร้าง state สำหรับเก็บค่าเมนูที่เลือก
  //nst { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      // console.log("Token from useEffect:", token);
      if (token) {
        try {
          const data = {};
          const response = await getUser(data, token); // ตรวจสอบว่า token มีค่าหรือไม่
          if (Array.isArray(response) && response.length > 0) {
            setUser(response[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // console.log("Token is missing");
        setLoading(false); // หรือสามารถนำผู้ใช้ไปที่หน้า login ได้
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
  // console.log(
  //   food_name,
  //   cal,
  //   carb,
  //   protein,
  //   fat,
  //   food_description,
  //   sugar,
  //   sodium,
  //   default_meat
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // let updatedCal = cal || 0; // ใช้ค่าแคลเริ่มต้นจากเมนูที่เลือก

    // 🎯 ปรับแคลอรี่ตามประเภทเนื้อสัตว์
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
        updatedCal -= meatCalories[default_meat] || 0; // ลบแคลอรี่ของเนื้อสัตว์เดิม
      }

      updatedCal += meatCalories[selectMeat] || 0; // เพิ่มแคลอรี่ของเนื้อสัตว์ใหม่

      return updatedCal;
    }
    let updatedCal = calculateCalories(default_meat, selectMeat, cal);

    // 🎯 คำนวณแคลอรี่จากน้ำตาล
    let sugar = selectedMenu?.sugar || 0; // ค่าเริ่มต้นของน้ำตาลจาก API
    if (selectSugar === "ไม่มีน้ำตาล") {
      sugar = 0; // ไม่มีน้ำตาล
    } else if (selectSugar === "ใส่น้ำตาล") {
      sugar += 5; // เพิ่มน้ำตาลตามที่เลือก
    } else if (selectSugar === "ใส่น้ำตาลเยอะ") {
      sugar += 11; // เพิ่มน้ำตาลเยอะ (เพิ่ม 6 กรัม)
    }
    // console.log("น้ำตาล =", sugar); // แสดงผลค่า sugar ที่คำนวณแล้ว

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

    // 🎯 อัพเดตค่าแคลอรี่
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
    // console.log("Data being sent:", mealData);

    try {
      const response = await addMeal(mealData);
      // console.log("API response:", response); // เพิ่มการแสดงผลของ response ที่ได้รับจาก API

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
    // console.log(meal); // แสดงค่าใน console
  };
  const handleSugarButtonClick = (sugar) => {
    setselectSugar(sugar); // เปลี่ยนค่า selectType
    // console.log(sugar); // แสดงค่าใน console
  };
  const handleMeatButtonClick = (meat) => {
    setselectMeat(meat); // เปลี่ยนค่า selectType
    // console.log(meat); // แสดงค่าใน console
  };
  const handleEggButtonClick = (egg) => {
    setselectEgg(egg); // เปลี่ยนค่า selectType
    // console.log(egg); // แสดงค่าใน console
  };
  const handleValueEggButtonClick = (e) => {
    setselectValueEgg(e.target.value); // เก็บค่าที่กรอกใน input สำหรับข้าว
    // console.log(e.target.value); // แสดงค่าที่กรอกใน console
  };

  const handleRiceButtonClick = (e) => {
    setselectRice(e.target.value); // เก็บค่าที่กรอกใน input สำหรับข้าว
    // console.log(e.target.value); // แสดงค่าที่กรอกใน console
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
              value={selectValueEgg} // ใช้ค่าใน state ที่เก็บค่าของข้าว
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
