import React, { useState, useEffect } from "react";
import NavItem from "./NavItem"; // เเท็ก a
import styles from "./navigationbarcss.module.scss";
import Step from "../scan/step/step"; // นำเข้า Step.js

//icon  img
import historyicon from "../../imgAll/icon/historyicon.webp";
import mainicon from "../../imgAll/icon/mainicon.webp";
import recipesicon from "../../imgAll/icon/recipesicon.webp";
import shareicon from "../../imgAll/icon/shareicon.webp";
import photoicon from "../../imgAll/icon/photoicon.webp";

const NavigationBar = () => {
  const [showCamera, setShowCamera] = useState(false); // สร้าง state สำหรับแสดงหรือซ่อน CameraComponent

  // ✅ ใช้ useEffect เพื่อป้องกันการเลื่อน
  useEffect(() => {
    if (showCamera) {
      document.body.classList.add("no-scroll"); // ปิดการเลื่อน
    } else {
      document.body.classList.remove("no-scroll"); // คืนค่าเดิม
    }

    return () => {
      document.body.classList.remove("no-scroll"); // ล้างค่าเมื่อ component unmount
    };
  }, [showCamera]);

  // เมื่อคลิกที่ไอคอน จะทำให้ CameraComponent แสดงขึ้น
  const handleIconClick = () => {
    setShowCamera(true);
  };

  // เมื่อคลิกที่ overlay หรือพื้นหลังนอก CameraComponent จะปิดกล้อง
  const closeCamera = () => {
    setShowCamera(false);
  };

  return (
    <nav>
      <ul className={styles.navcion}>
        <NavItem img={mainicon} label="หน้าเเรก" link="/Home" />
        <NavItem img={historyicon} label="ประวัติ" link="/historypage" />
        <NavItem
          img={photoicon}
          className={styles["icon-photo"]}
          onClick={handleIconClick} // เมื่อคลิกที่ไอคอนจะเปิดกล้อง
        />

        {/* ถ้า showCamera เป็น true จะแสดง Step */}
        {showCamera && (
          <>
            {/* Overlay คลุมเต็มหน้าจอ เมื่อคลิกที่นี้จะปิดกล้อง */}
            <div className={styles.overlay} onClick={closeCamera}></div>
            <div className={styles["section-container"]}>
              <Step setShowCamera={setShowCamera} />{" "}
              {/* ส่ง setShowCamera ให้ Step.js */}
            </div>
          </>
        )}

        <NavItem img={recipesicon} label="เมนู" link="/Manupage" />
        <NavItem img={shareicon} label="เเชร์เพื่อน" link="/friendpage" />
      </ul>
    </nav>
  );
};

export default NavigationBar;
