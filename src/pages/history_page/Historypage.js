import React, { useState, useEffect } from "react";
import styles from "../../pages/history_page/custom.module.scss";
import "../../styles/custom.scss";

import WeightOnly from "../../component/Weight/WeightOnly";
import BMIonly from "../../component/BMIonly/BMIonly";
import NutritionalDetails from "../../pages/summary_page/component/content-NutritionalDetails/NutritionalDetails";
import NavigationBar from "../../component/navbar/NavigationBar";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import Calendar from "../../pages/history_page/component/calendar/Calendar";
import Gobackhead from "../../component/component-history/gobackhead";
import MealsSectionHistory from "./Mealsection-History/MealsSectionHistory";

import { getEatDate } from "../../api/api_eat_date";
import { getUser } from "../../api/api_user";
import Loading from "../../component/loader/loading";

function Historypage() {
  const [nutritionData, setNutritionData] = useState(null);
  const [user, setUser] = useState(null); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
  const [token, setToken] = useState(null); // สร้าง state สำหรับเก็บ token
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลผู้ใช้จาก API หรือ context
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(); // ดึงข้อมูลผู้ใช้จาก getUser
        setUser(userData); // เก็บข้อมูลผู้ใช้
        // console.log("ข้อมูลผู้ใช้:", userData);

        setToken(userData?.token || localStorage.getItem("token")); // เก็บ token
      } catch (error) {
        //    console.error("Error fetching user data:", error);
        setLoading(false); // หากมีข้อผิดพลาดเกิดขึ้นก็หยุดโหลด
      }
    };

    fetchUserData(); // ดึงข้อมูลผู้ใช้เมื่อเริ่มโหลดหน้า
  }, []);

  // ตรวจสอบว่า user ถูกโหลดเรียบร้อยแล้ว
  useEffect(() => {
    if (!user) {
      console.warn("⚠️ No user data available");
      setLoading(false);
    } else {
      // console.log("✅ User data loaded:", user);
      setLoading(false);
    }
  }, [user]);

  // กำหนด date ที่จะใช้ในการดึงข้อมูล
  useEffect(() => {
    const receivedDate = new Date().toISOString().split("T")[0]; // ได้รูปแบบ YYYY-MM-DD
    setDate(receivedDate);
    // console.log("receivedDate ---", receivedDate);
  }, []);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchNutritionData = async () => {
      setLoading(true); // ตั้งค่าให้เริ่มต้นการโหลดใหม่

      try {
        if (!token) {
          //  console.error("Token is missing or invalid.");
          return; // ถ้าไม่มี token ก็ไม่ดึงข้อมูล
        }

        if (!date) {
          // console.log("No date selected yet.");
          return; // ถ้าไม่มี date ก็คงไม่ดึงข้อมูล
        }

        // console.log("Fetching nutrition data for date:", date);
        const data = await getEatDate(date); // เรียก API
        // console.log("Nutrition data:", data);
        setNutritionData(data); // ตั้งค่า nutritionData ด้วยข้อมูลที่ได้รับ
      } catch (error) {
        //  console.error("Error fetching nutrition data:", error); // ถ้ามีข้อผิดพลาดเกิดขึ้น
      } finally {
        setLoading(false); // เมื่อเสร็จแล้วก็หยุดการโหลด
      }
    };

    if (date && token) {
      fetchNutritionData(); // ถ้ามีทั้ง date และ token ก็เริ่มดึงข้อมูล
    }
  }, [date, token]);

  // ถ้ากำลังโหลดข้อมูลจะแสดงข้อความระหว่างการโหลด
  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  // ถ้าไม่มีข้อมูลผู้ใช้
  if (!user) {
    return (
      <div className="container">
        <p>ข้อมูลผู้ใช้ยังไม่ถูกโหลด</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapperall}>
      <div className="container">
        <div style={{ marginBottom: "40px" }}>
          <Gobackhead text="ประวัติมื้ออาหาร" link="/home" />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Calendar onDateSelect={setDate} />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <SummaryCard nutritionData={nutritionData} />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <MealsSectionHistory date={date} token={token} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wrapper}>
            <div
              className="row g-3"
              style={{
                marginBottom: "15px",
              }}
            >
              <div className="col-6">
                <WeightOnly user={user} />
              </div>
              <div className="col-6">
                <BMIonly user={user} />
              </div>
            </div>
          </div>
          <NutritionalDetails nutritionData={nutritionData} />
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}

export default Historypage;
