import React, { useState, useEffect } from "react";
import "../../styles/custom.scss";
import HeaderSum from "./component/header/HeaderSum";
import Weight from "../../component/summay-Weight/Weight";
import ButtonSumDandW from "./component/ButtonSumDandW/ButtonSumDandW";
import Nutrients from "../summary_page/component/conten-Nutrients/Nutrients";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import BMIbar from "../summary_page/component/BMI/BMIbar";
import NutritionalDetails from "../summary_page/component/content-NutritionalDetails/NutritionalDetails";
import { getEatToDay } from "../../api/api_eat_today"; // นำเข้า API
import { useUser } from "../../api/UserContext"; // นำเข้า context ถ้ามี

function Summarypage() {
  const [nutritionData, setNutritionData] = useState(null); // สถานะเก็บข้อมูลโภชนาการ
  const [loading, setLoading] = useState(true); // สถานะโหลดข้อมูล
  const { user } = useUser(); // ถ้ามี context สำหรับ user
  const token = user?.token || localStorage.getItem("token"); // ดึง token จาก user context หรือ localStorage

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        if (token) {
          const data = await getEatToDay(); // เรียกใช้งาน API
          setNutritionData(data); // อัปเดตสถานะด้วยข้อมูลที่ได้รับ
          console.log("userrrrrrrrrrrrrr", user);
        } else {
          console.error("Token is missing or invalid.");
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      } finally {
        setLoading(false); // ตั้งสถานะโหลดข้อมูลเป็น false
      }
    };

    fetchNutritionData();
  }, [token]);

  if (loading) {
    return (
      <div className="container">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="custombackground" style={{ backgroundColor: "#FFF2EA" }}>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <HeaderSum link="/home" title="ภาพรวม" />
        <ButtonSumDandW />
        {user ? (
          <Weight user={user} />
        ) : (
          <p>กรุณาล็อกอินเพื่อดูข้อมูลน้ำหนัก</p>
        )}
        <SummaryCard nutritionData={nutritionData} />
        <BMIbar user={user} />
        <Nutrients nutritionData={nutritionData} />
        <NutritionalDetails nutritionData={nutritionData} />
      </div>
    </div>
  );
}

export default Summarypage;
