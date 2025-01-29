import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import "./mealsSection.scss";
import { getMeal } from "../../api/api_meal";
import { useUser } from "../../api/UserContext"; // นำเข้า context ถ้ามี

const MealsSection = () => {
  const [meals, setMeals] = useState([]); // สถานะในการเก็บข้อมูลมื้ออาหาร
  const [loading, setLoading] = useState(true); // สถานะในการโหลดข้อมูล
  const { user } = useUser(); // ถ้ามี context สำหรับ user

  // ดึง token จาก user context หรือ localStorage
  const token = user?.token || localStorage.getItem("token");

  // ฟังก์ชันในการดึงข้อมูลมื้ออาหารจาก API
  const fetchMeals = async () => {
    if (!token) {
      console.error("ไม่พบ token");
      return;
    }

    try {
      const data = {}; // ถ้าต้องการส่ง params อื่น ๆ ก็ใส่ที่นี่
      const fetchedMeals = await getMeal(data, token); // เรียกใช้ฟังก์ชัน getMeal
      console.log("fetchedMeals:", fetchedMeals);

      // ตรวจสอบว่า fetchedMeals.meals เป็น array หรือไม่
      if (Array.isArray(fetchedMeals.meals)) {
        setMeals(fetchedMeals.meals); // เก็บข้อมูลมื้ออาหารที่ได้รับ
      } else {
        console.error("ข้อมูลมื้ออาหารไม่เป็น array");
        setMeals([]); // กำหนด meals เป็น array ว่างในกรณีที่ข้อมูลไม่ถูกต้อง
      }
    } catch (error) {
      console.error("ไม่สามารถดึงข้อมูลมื้ออาหารได้", error);
    } finally {
      setLoading(false); // การโหลดข้อมูลเสร็จสิ้น
    }
  };

  // ใช้ useEffect เพื่อเรียก fetchMeals เมื่อ component โหลด
  useEffect(() => {
    fetchMeals();
  }, [token]); // ตรวจสอบการเปลี่ยนแปลงของ token

  // จัดกลุ่มมื้ออาหารตาม mealType
  const groupedMeals = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Other: [], // เพิ่มกลุ่มอื่นๆ สำหรับมื้อที่ไม่ได้ระบุ mealType
  };

  if (Array.isArray(meals) && meals.length > 0) {
    meals.forEach((meal) => {
      if (meal.meal_type === "Breakfast") {
        groupedMeals.Breakfast.push(meal);
      } else if (meal.meal_type === "Lunch") {
        groupedMeals.Lunch.push(meal);
      } else if (meal.meal_type === "Dinner") {
        groupedMeals.Dinner.push(meal);
      }
    });
  }

  // สร้าง array สำหรับการ map ข้อมูล
  const mealData = [
    { name: "มื้อเช้า", meals: groupedMeals.Breakfast },
    { name: "มื้อเที่ยง", meals: groupedMeals.Lunch },
    { name: "มื้อเย็น", meals: groupedMeals.Dinner },
  ];

  return (
    <div>
      <section className="meals-section">
        <p className="head">มื้อที่รับประทาน</p>
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p> // แสดงข้อความระหว่างการโหลดข้อมูล
        ) : meals.length === 0 ? (
          <p>ไม่มีข้อมูลมื้ออาหาร</p> // แสดงข้อความหากไม่มีมื้ออาหาร
        ) : (
          mealData.map((mealItem, index) => (
            <MealItem key={index} mealItem={mealItem} />
          ))
        )}
      </section>
    </div>
  );
};

export default MealsSection;
