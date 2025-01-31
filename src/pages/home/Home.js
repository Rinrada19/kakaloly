import React, { useState, useEffect } from "react";
import "../../styles/custom.scss";
import { Link } from "react-router-dom";
import Header from "../../component/headerUpper/Header";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import Water from "../../component/content-Water/Water"; // นำเข้า Water component
import MealsSection from "../../component/content-MealSection/MealsSection";
import { getEatToDay } from "../../api/api_eat_today"; // นำเข้า API สำหรับโภชนาการ
import { useUser } from "../../api/UserContext";
import { getUser } from "../../api/api_user";
import { getWaterIntake } from "../../api/api_water"; // นำเข้า API สำหรับน้ำดื่ม
import NavigationBar from "../../component/navbar/NavigationBar";

function Home() {
  const { user, setUser } = useUser();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [nutritionData, setNutritionData] = useState(null);
  const [waterData, setWaterData] = useState(null); // สถานะเก็บข้อมูลน้ำดื่ม

  // ดึงข้อมูล user จาก API
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

  // ดึงข้อมูลโภชนาการจาก API
  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const data = await getEatToDay();
        setNutritionData(data);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    fetchNutritionData();
  }, []);

  // ดึงข้อมูลน้ำดื่มจาก API
  useEffect(() => {
    const fetchWaterData = async () => {
      if (token) {
        try {
          const data = await getWaterIntake(token); // เรียกใช้ฟังก์ชัน getWaterIntake
          setWaterData(data); // อัปเดตสถานะน้ำดื่ม
        } catch (error) {
          console.error("Error fetching water intake data:", error);
        }
      }
    };

    fetchWaterData();
  }, [token]); // เมื่อ token เปลี่ยนแปลง

  if (loading) {
    return (
      <div className="container">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#FFF2EA",
        minHeight: "100vh",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          paddingBottom: "150px",
          paddingTop: "30px",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <Header />
        </div>
        <div>
          <Link
            to="/Summarypage"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginBottom: "40px",
            }}
          >
            <SummaryCard nutritionData={nutritionData} />
          </Link>
        </div>
        <div>
          <MealsSection />
        </div>
        {/* ส่งข้อมูลน้ำดื่มไปที่คอมโพเนนต์ Water */}
        <div>
          <Water waterData={waterData} />
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}

export default Home;
