import React, { useState, useEffect } from "react";
import styles from "./Water.module.scss";
import minus from "../../imgAll/element/minus.png";
import waterelement from "../../imgAll/element/waterelement.png";
import plus from "../../imgAll/element/plus.png";
import water1 from "../../imgAll/element/water1.png";
import water0 from "../../imgAll/element/water0.png";
import { updateWaterIntake } from "../../api/api_water";
import { postWater } from "../../api/api_water";

const Water = ({ waterData, token }) => {
  const [glasses, setGlasses] = useState(Array(12).fill(false));

  const [showPopup, setShowPopup] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);

  const handleCreate = () => {
    setShowPopup(true); // แสดง Popup
  };

  const handleConfirmAdd = async () => {
    const filledGlassesCount = Number(inputAmount); // แปลงค่าเป็นตัวเลข

    // ตรวจสอบว่าเป็นตัวเลขที่ถูกต้องหรือไม่
    if (isNaN(filledGlassesCount) || filledGlassesCount <= 0) {
      //  console.error("Invalid water amount provided");
      return;
    }

    const dataToSend = { water_amount: filledGlassesCount };
    console.log("dataToSend", dataToSend); // ตรวจสอบค่าก่อนส่ง

    try {
      // ส่งข้อมูลไปที่ API
      await postWater(filledGlassesCount); // ส่งแค่ค่า filledGlassesCount
      setShowPopup(false);
    } catch (error) {
      // console.error("Error updating water intake:", error);
    }
  };

  useEffect(() => {
    if (waterData && waterData.water_amount !== undefined) {
      const filledGlasses = Array(12).fill(false);
      for (let i = 0; i < waterData.water_amount; i++) {
        if (i < 12) filledGlasses[i] = true;
      }
      setGlasses(filledGlasses);
      console.log("waterData:", waterData);
      console.log("Updated glasses:", filledGlasses);
    } else {
      console.error("Invalid waterData:", waterData);
      setGlasses(Array(12).fill(false)); // Set to 0 glasses if data is invalid
    }
  }, [waterData]);

  const handleAdd = async () => {
    const index = glasses.indexOf(false);
    if (index !== -1) {
      const newGlasses = [...glasses];
      newGlasses[index] = true;
      setGlasses(newGlasses);

      const filledGlassesCount = newGlasses.filter((filled) => filled).length;

      console.log("Added water: ", newGlasses);
      console.log("Number of glasses with water: ", filledGlassesCount);

      try {
        if (waterData && waterData.water_intake_id) {
          const dataToSend = {
            water_amount: filledGlassesCount,
            water_intake_id: waterData.water_intake_id, // เพิ่ม water_intake_id
          };
          await updateWaterIntake(dataToSend);
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("Error updating water intake:", error);
      }
    }
  };

  const handleRemove = async () => {
    const index = glasses.lastIndexOf(true);
    if (index !== -1) {
      const newGlasses = [...glasses];
      newGlasses[index] = false;
      setGlasses(newGlasses);

      const remainingWaterCount = newGlasses.filter(Boolean).length;
      console.log("Removed water: ", newGlasses);
      console.log("Number of glasses with water: ", remainingWaterCount);

      try {
        if (waterData && waterData.water_intake_id) {
          const dataToSend = {
            water_amount: remainingWaterCount,
            water_intake_id: waterData.water_intake_id, // เพิ่ม water_intake_id
          };
          await updateWaterIntake(dataToSend);
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("Error updating water intake:", error);
      }
    } else {
      try {
        if (waterData && waterData.water_intake_id) {
          const dataToSend = {
            water_amount: 0,
            water_intake_id: waterData.water_intake_id, // เพิ่ม water_intake_id
          };
          await updateWaterIntake(dataToSend);
        } else {
          console.error("No valid waterData or water_intake_id available");
        }
      } catch (error) {
        console.error("Error updating water intake:", error);
      }
    }
  };

  return (
    <div className={styles["wrapper-water"]}>
      {/* ถ้ามีข้อมูลน้ำดื่ม (waterData) ให้แสดงผลน้ำดื่ม */}
      {waterData ? (
        <>
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
              <span>
                {waterData ? "ปริมาณน้ำที่ดื่ม" : "เพิ่มน้ำดื่มวันนี้"}
              </span>
            </div>
            <img
              className={styles["plus-icon"]}
              src={plus}
              alt="plus"
              onClick={handleAdd}
            />
          </div>

          <div className={styles["count-water"]}>
            {/* Row 1 */}
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
            {/* Row 2 */}
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
        </>
      ) : (
        // ถ้าไม่มีข้อมูลน้ำดื่มแสดงปุ่มเพิ่ม
        <div className={styles["add-water-button"]}>
          <button onClick={handleCreate}>เพิ่มน้ำดื่มวันนี้</button>
        </div>
      )}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles["popup-water-container"]}>
            <div className={styles["popup-water-header"]}>
              <h3>เพิ่มปริมาณน้ำดื่ม</h3>
              <button
                onClick={() => setShowPopup(false)}
                className={styles["close-button"]}
              >
                <span className={styles["close-icon"]}>×</span>
              </button>
            </div>
            <div className={styles["popup-water-body"]}>
              <div className={styles["popup-water-body-firstrow"]}>
                <img className={styles["water-icon"]} src={water1} />
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="กรอกจำนวน (แก้ว)"
                />
              </div>

              <button onClick={handleConfirmAdd}>ยืนยัน</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Water;
