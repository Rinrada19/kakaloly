import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import "./mealsSection.scss";
import { getMeal } from "../../api/api_meal";
import { useUser } from "../../api/UserContext"; // นำเข้า context ถ้ามี
import Loading from "../loader/loading";

const MealsSection = () => {
  const [meals, setMeals] = useState([]); // สถานะในการเก็บข้อมูลมื้ออาหาร
  const [loading, setLoading] = useState(true); // สถานะในการโหลดข้อมูล
  const { user } = useUser(); // ถ้ามี context สำหรับ user
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  // ดึง token จาก user context หรือ localStorage
  const token = user?.token || localStorage.getItem("token");

  // ฟังก์ชันในการดึงข้อมูลมื้ออาหารจาก API

  const fetchMeals = async () => {
    if (!token) {
      // console.error("ไม่พบ token");
      return;
    }

    setLoading(true);
    setError(null); // รีเซ็ตค่า error ก่อนโหลดข้อมูลใหม่

    try {
      const data = {}; // ถ้าต้องการส่ง params อื่น ๆ ก็ใส่ที่นี่
      const fetchedMeals = await getMeal(data, token);
      //  console.log ("fetchedMeals:", fetchedMeals);

      if (
        fetchedMeals.message &&
        fetchedMeals.message.includes("No meals found")
      ) {
        setMeals([]); // ไม่มีข้อมูล
      } else if (Array.isArray(fetchedMeals.meals)) {
        setMeals(fetchedMeals.meals);
      } else {
        setMeals([]); // ป้องกันกรณีข้อมูลไม่ถูกต้อง
      }
    } catch (error) {
      // console.error("ไม่สามารถดึงข้อมูลมื้ออาหารได้", error);
      setMeals([]); // กำหนดให้ไม่มีข้อมูล
      setError("ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  // ใช้ useEffect เพื่อเรียก fetchMeals เมื่อ component โหลด
  useEffect(() => {
    fetchMeals();
  }, [token]); // ตรวจสอบการเปลี่ยนแปลงของ token

  const deleteFoodItem = (mealId) => {
    setMeals((prevMeals) =>
      prevMeals.filter((meal) => meal.meal_id !== mealId)
    );
  };

  // จัดกลุ่มมื้ออาหารตาม mealType
  const groupedMeals = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Others: [], // เพิ่มหมวดหมู่อื่นๆ
  };

  if (Array.isArray(meals) && meals.length > 0) {
    meals.forEach((meal) => {
      const mealType = meal.meal_type.trim(); // ตัดช่องว่างเผื่อมี

      if (mealType === "มื้อเช้า" || mealType === "Breakfast") {
        groupedMeals.Breakfast.push(meal);
      } else if (
        mealType === "มื้อเที่ยง" ||
        mealType === "มื้อกลางวัน" ||
        mealType === "Lunch"
      ) {
        groupedMeals.Lunch.push(meal);
      } else if (mealType === "มื้อเย็น" || mealType === "Dinner") {
        groupedMeals.Dinner.push(meal);
      } else {
        groupedMeals.Others.push(meal); // ถ้าไม่ตรงเงื่อนไขไหนเลย ให้จัดอยู่ใน "อื่นๆ"
      }
    });
  }

  // จัดกลุ่มข้อมูลมื้ออาหารสำหรับการแสดงผล
  const mealData = [
    { name: "มื้อเช้า", meals: groupedMeals.Breakfast },
    { name: "มื้อเที่ยง", meals: groupedMeals.Lunch },
    { name: "มื้อเย็น", meals: groupedMeals.Dinner },
    { name: "อื่นๆ", meals: groupedMeals.Others }, // เพิ่มหมวดหมู่อื่นๆ
  ];

  // console.log("Grouped Meals:", groupedMeals);

  return (
    <div>
      <section className="meals-section">
        <p className="head">มื้อที่รับประทาน</p>
        {loading ? (
          <Loading /> // ถ้ากำลังโหลดให้แสดง Loading
        ) : (
          mealData.map((mealItem, index) => (
            <MealItem
              key={index}
              mealItem={mealItem}
              deleteFoodItem={deleteFoodItem} // ส่งฟังก์ชัน deleteFoodItem ไปที่ MealItem
              token={token}
            /> // ส่ง token ไปยัง MealItem
          ))
        )}
      </section>
    </div>
  );
};

export default MealsSection;
