import React, { useState, useEffect } from "react";
import styles from "./Water.module.scss";

import minus from "../../imgAll/element/minus.png";
import waterelement from "../../imgAll/element/waterelement.png";
import plus from "../../imgAll/element/plus.png";
import water1 from "../../imgAll/element/water1.png";
import water0 from "../../imgAll/element/water0.png";
import { updateWaterIntake } from "../../api/api_water";

const Water = ({ waterData, token }) => {
  const [glasses, setGlasses] = useState(Array(12).fill(false));

  useEffect(() => {
    // ตรวจสอบค่าของ waterData ก่อนทำการอัปเดต glasses
    if (waterData && waterData.water_amount !== undefined) {
      const filledGlasses = Array(12).fill(false);
      for (let i = 0; i < waterData.water_amount; i++) {
        if (i < 12) filledGlasses[i] = true;
      }
      setGlasses(filledGlasses);
      console.log("waterData:", waterData); // ตรวจสอบว่า waterData ถูกต้องหรือไม่
      console.log("Updated glasses:", filledGlasses);
    } else {
      // ถ้า waterData เป็น null หรือไม่ถูกต้อง
      console.error("Invalid waterData:", waterData);
      setGlasses(Array(12).fill(false)); // กำหนดให้เริ่มต้นเป็น 0 แก้ว
    }
  }, [waterData]);

  const handleAdd = async () => {
    const index = glasses.indexOf(false); // หาแก้วว่างตัวแรก
    if (index !== -1) {
      const newGlasses = [...glasses];
      newGlasses[index] = true; // เปลี่ยนแก้วว่างเป็นมีน้ำ
      setGlasses(newGlasses);

      // นับจำนวนแก้วที่มีน้ำ
      const filledGlassesCount = newGlasses.filter((filled) => filled).length;

      console.log("Added water: ", newGlasses);
      console.log("Number of glasses with water: ", filledGlassesCount); // แสดงจำนวนแก้วที่มีน้ำ

      // ส่งข้อมูลไปยัง API
      try {
        if (waterData && waterData.water_intake_id) {
          console.log(
            "Sending data to API: ",
            waterData.water_intake_id,
            filledGlassesCount
          );
          const dataToSend = {
            water_amount: filledGlassesCount, // ส่งปริมาณน้ำที่ดื่มเป็นตัวเลข
          };
          await updateWaterIntake(dataToSend); // ส่งข้อมูลที่มีน้ำ
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลน้ำดื่ม: ", error);
      }
    }
  };

  const handleRemove = async () => {
    const index = glasses.lastIndexOf(true); // หาแก้วสุดท้ายที่มีน้ำ
    if (index !== -1) {
      const newGlasses = [...glasses];
      newGlasses[index] = false; // เปลี่ยนแก้วที่มีน้ำกลับเป็นว่าง
      setGlasses(newGlasses);

      console.log("Removed water: ", newGlasses);

      // คำนวณจำนวนแก้วที่มีน้ำหลังจากลบ
      const remainingWaterCount = newGlasses.filter(Boolean).length;
      console.log("Number of glasses with water: ", remainingWaterCount); // แสดงจำนวนแก้วที่มีน้ำ

      // ถ้าจำนวนแก้วที่มีน้ำเป็น 0 ส่งข้อมูล 0 แก้วไปยัง API
      try {
        if (waterData && waterData.water_intake_id) {
          console.log(
            "Sending data to API: ",
            waterData.water_intake_id,
            remainingWaterCount
          );
          const dataToSend = {
            water_amount: remainingWaterCount, // ส่งปริมาณน้ำที่ดื่มเป็นตัวเลข
          };
          await updateWaterIntake(dataToSend); // ส่งข้อมูลที่มีน้ำ
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลน้ำดื่ม: ", error);
      }
    } else {
      // ถ้าไม่มีแก้วน้ำเลยก็จะส่งข้อมูล 0 แก้ว
      try {
        if (waterData && waterData.water_intake_id) {
          console.log("Sending 0 glasses to API");
          const dataToSend = {
            water_amount: 0, // ส่ง 0 แก้ว
          };
          await updateWaterIntake(dataToSend); // ส่งข้อมูล 0 แก้ว
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลน้ำดื่ม: ", error);
      }
    }
  };

  return (
    <div>
      <div className={styles["wrapper-water"]}>
        <div className={styles.header}>
          <img
            className={styles["minus-icon"]}
            src={minus}
            alt="minus"
            onClick={handleRemove}
          />
          <div>
            <img
              className={styles.watericon}
              src={waterelement}
              alt="water element"
            />
            <span>ปริมาณน้ำที่ดื่ม</span>
          </div>
          <img
            className={styles["plus-icon"]}
            src={plus}
            alt="plus"
            onClick={handleAdd}
          />
        </div>
        <div className={styles["count-water"]}>
          {/* แถวที่ 1 */}
          <div className={styles.row}>
            {glasses.slice(0, 6).map((filled, index) => (
              <img
                key={`row1-${index}`}
                className={styles["water-icon"]}
                src={filled ? water1 : water0}
                alt={`water ${index}`}
              />
            ))}
          </div>
          {/* แถวที่ 2 */}
          <div className={styles.row}>
            {glasses.slice(6, 12).map((filled, index) => (
              <img
                key={`row2-${index}`}
                className={styles["water-icon"]}
                src={filled ? water1 : water0}
                alt={`water ${index + 6}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Water;
