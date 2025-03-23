import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealHistory";
import "./mealsSection.scss";
import { getMealDate } from "../../../api/api_meal"; // นำเข้าฟังก์ชันดึงข้อมูลมื้ออาหาร

const MealsSectionHistory = ({ date, token }) => {
  const [meals, setMeals] = useState([]); // เก็บข้อมูลมื้ออาหาร
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  // console.log("ค่า date ที่ได้รับ:", date);
  // ฟังก์ชันในการดึงข้อมูลมื้ออาหารตามวันที่
  const fetchMealsByDate = async () => {
    if (!date) {
      //   console.error("ไม่พบวันที่");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // console.log("กำลังดึงข้อมูลมื้ออาหารสำหรับวันที่: ", date);
      const fetchedMeals = await getMealDate(date, token);

      if (
        fetchedMeals.message &&
        fetchedMeals.message.includes("No meals found")
      ) {
        setMeals([]); // กำหนดให้ไม่มีข้อมูล
      } else if (Array.isArray(fetchedMeals.meals)) {
        setMeals(fetchedMeals.meals);
      } else {
        setMeals([]); // ป้องกันกรณีข้อมูลไม่ถูกต้อง
      }
    } catch (error) {
      // console.error("เกิดข้อผิดพลาดในการดึงข้อมูลมื้ออาหาร:", error);
      setMeals([]); // กำหนดเป็น [] ถ้าเกิด error
      setError("ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("useEffect - ค่า date ที่ได้รับ:", date); // ดูค่าของ date
    fetchMealsByDate();
  }, [date]);

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
  const formatThaiDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
    });
  };

  // จัดกลุ่มมื้ออาหารตาม mealType
  const groupedMeals = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
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
      }
    });
  }

  // จัดกลุ่มข้อมูลมื้ออาหารสำหรับการแสดงผล
  const mealData = [
    { name: "มื้อเช้า", meals: groupedMeals.Breakfast },
    { name: "มื้อเที่ยง", meals: groupedMeals.Lunch },
    { name: "มื้อเย็น", meals: groupedMeals.Dinner },
  ];
  // console.log("mealData", mealData);
  return (
    <section className="meals-section">
      <p className="head">{formatThaiDate(date)}</p>{" "}
      {/* แสดงวันที่เป็นภาษาไทย */}
      {mealData.map((mealItem, index) => (
        <MealItem key={index} mealItem={mealItem} />
      ))}
    </section>
  );
};

export default MealsSectionHistory;
