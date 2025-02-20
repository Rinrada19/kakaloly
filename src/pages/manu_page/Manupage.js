import React, { useEffect, useState } from "react";
import styles from "./Manupage.module.scss";
import "../../styles/custom.scss";

import NavigationBar from "../../component//navbar/NavigationBar";
import SearchMenu from "./component/searchMenu/SearchMenu";
import ManuCard from "./component/manuCard/ManuCard.js";
import { getFood } from "../../api/api_food.js";
import Gobackhead from "../../component/component-history/gobackhead";

function Manupage() {
  const [foods, setFoods] = useState([]); // สถานะสำหรับเก็บข้อมูลอาหาร
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [error, setError] = useState(null); // สถานะสำหรับข้อผิดพลาด
  const [searchQuery, setSearchQuery] = useState(""); // สถานะสำหรับคำค้นหา

  useEffect(() => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage
    const data = {}; // ข้อมูลที่ส่งไปกับ request (ถ้าจำเป็น)

    // เรียกใช้ API getFood
    const fetchFood = async () => {
      try {
        const foodData = await getFood(data, token);
        // console.log("foodssssssss", foodData);
        setFoods(foodData); // ตั้งค่าข้อมูลที่ได้รับจาก API
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู"); // ตั้งค่าข้อผิดพลาด
      } finally {
        setLoading(false); // ปิดการโหลด
      }
    };

    fetchFood();
  }, []); // รันเพียงครั้งเดียวเมื่อโหลดหน้า

  // ฟังก์ชันกรองอาหารตามคำค้นหา
  const filteredFoods = foods.filter((food) =>
    food.food_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.wapper}>
        <div className="container">
          {/* content All */}
          <div className={styles.box}>
            <Gobackhead text="เมนูอาหาร" link="/home" />
          </div>
          <SearchMenu
            style={{ marginBottom: "20px" }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ManuCard foods={filteredFoods} /> {/* ใช้ข้อมูลที่กรองแล้ว */}
        </div>
        <NavigationBar />
      </div>
    </>
  );
}

export default Manupage;
