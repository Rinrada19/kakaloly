import React, { useEffect, useState } from "react";
//scss
import styles from "./Sumweekpage.module.scss";

//import
import ButtonSumDandW from "../component/ButtonSumDandW/ButtonSumDandW";
import HeaderSum from "../../summary_page/component/header/HeaderSum";
import NavigationBar from "../../../component/navbar/NavigationBar";
import WeeklyBarChart from "../../../component/bar-chart/weekly_barchart";
import { getEatWeek } from "../../../api/api_eat_week"; // นำเข้าฟังก์ชัน API
import Loading from "../../../component/loader/loading";

const WeeklySummary = () => {
  const [eatWeek, setEatWeek] = useState([]); // เก็บข้อมูลที่ได้จาก API
  const [loading, setLoading] = useState(false); // ใช้ในการแสดงสถานะโหลด
  const [error, setError] = useState(""); // เก็บข้อความข้อผิดพลาด
  const [eatWeekall, setEatWeekall] = useState([]); // เก็บข้อมูลที่ได้จาก API
  useEffect(() => {
    const fetchEatWeek = async () => {
      setLoading(true); // เปิดสถานะโหลดก่อนดึงข้อมูล
      try {
        const token = localStorage.getItem("token"); // ดึง token จาก localStorage
        const eatWeekData = await getEatWeek({}, token); // เรียก API
        //    console.log("Fetched Eatweek data:", eatWeekData);

        if (
          eatWeekData &&
          eatWeekData.details &&
          Array.isArray(eatWeekData.details)
        ) {
          setEatWeek(eatWeekData.details);
          setEatWeekall(eatWeekData); // ตั้งค่าข้อมูลจาก details
        } else {
          setError("ข้อมูลที่ได้รับไม่ถูกต้อง");
        }
      } catch (error) {
        //   console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false); // ปิดสถานะโหลด
      }
    };

    fetchEatWeek();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const avgCalPerDay = eatWeek.length
    ? eatWeek.reduce((sum, item) => sum + item.calories, 0) / eatWeek.length
    : 0;

  if (error) {
    return <div>{error}</div>;
  }
  // console.log("eatWeekall----", eatWeekall);
  // console.log("eatWeek----", eatWeek);
  return (
    <div className={styles.custombackground}>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingTop: "30px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <HeaderSum link="/home" title="ภาพรวม" />
        </div>
        <ButtonSumDandW />
        <div className={styles.weeklySummary}>
          <div className={styles.fontSizebox}>
            <h1 className={styles.fontstyles}>
              เเคลอรี่ (
              <span style={{ color: "#63BF40", fontSize: "16px" }}>Kcal</span>)
            </h1>
          </div>
          <WeeklyBarChart data={eatWeek} />{" "}
          {/* ส่งข้อมูลไปยัง WeeklyBarChart */}
          <div className={styles.cotainerinfo}>
            <div className={styles.boxinfo}>
              <h4 className={styles.inforight}>เเคลอรี่ กินโดยเฉลี่ย</h4>
              <h4 className={styles.infoleft}>
                {Math.floor(avgCalPerDay)} Kcal
              </h4>
              {/* ค่าแคลอรี่เฉลี่ยจาก API */}
            </div>
            <div className={styles.lineinfo}></div>
            <div className={styles.boxinfo}>
              <h4 className={styles.inforight}>
                แคลอรี่เป้าหมาย{" "}
                <span style={{ color: "#ABABAB" }}>(ควรกินต่อวัน)</span>
              </h4>
              <h4 className={styles.infoleft}>
                {Math.floor(eatWeekall.cal_goal)} Kcal
              </h4>{" "}
              {/* เป้าหมายแคลอรี่จาก API */}
            </div>
          </div>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default WeeklySummary;
