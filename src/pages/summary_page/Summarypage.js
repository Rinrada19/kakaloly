import React, { useState, useEffect } from "react";
import "../../styles/custom.scss";
import styles from "./summarypage.module.scss";
import HeaderSum from "./component/header/HeaderSum";
import Weight from "../../component/summay-Weight/Weight";
import ButtonSumDandW from "./component/ButtonSumDandW/ButtonSumDandW";
import Nutrients from "../summary_page/component/conten-Nutrients/Nutrients";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import BMIbar from "../summary_page/component/BMI/BMIbar";
import NutritionalDetails from "../summary_page/component/content-NutritionalDetails/NutritionalDetails";
import NavigationBar from "../../component/navbar/NavigationBar";

import { getEatToDay } from "../../api/api_eat_today"; // นำเข้า API
import { useUser } from "../../api/UserContext"; // นำเข้า context ถ้ามี
import Loading from "../../component/loader/loading";
import { getWaterIntake } from "../../api/api_water"; // นำเข้า API สำหรับน้ำดื่ม

function Summarypage() {
  const [nutritionData, setNutritionData] = useState(null); // สถานะเก็บข้อมูลโภชนาการ
  const [loading, setLoading] = useState(true); // สถานะโหลดข้อมูล
  const { user } = useUser(); // ถ้ามี context สำหรับ user
  const token = user?.token || localStorage.getItem("token"); // ดึง token จาก user context หรือ localStorage
  const [waterData, setWaterData] = useState(null); // สถานะเก็บข้อมูลน้ำดื่ม

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        if (token) {
          const data = await getEatToDay(); // เรียกใช้งาน API
          setNutritionData(data); // อัปเดตสถานะด้วยข้อมูลที่ได้รับ
          // console.log("userrrrrrrrrrrrrr", user);
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
  console.log("nutritionData-----", nutritionData);
  useEffect(() => {
    const fetchWaterData = async () => {
      if (token) {
        try {
          const data = await getWaterIntake(token); // เรียกใช้ฟังก์ชัน getWaterIntake
          setWaterData(data); // อัปเดตสถานะน้ำดื่ม
        } catch (error) {
          //   console.error("Error fetching water intake data:", error);
        }
      }
    };

    fetchWaterData();
  }, [token]); // เมื่อ token เปลี่ยนแปลง

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.custombackground}>
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
        <Nutrients nutritionData={nutritionData} waterData={waterData} />
        <NutritionalDetails nutritionData={nutritionData} />
      </div>
      <NavigationBar />
    </div>
  );
}

export default Summarypage;
