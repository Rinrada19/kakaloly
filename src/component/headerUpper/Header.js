import React, { useState, useEffect } from "react";
//import { users } from "../../test_mock/MockData";
import styles from "./header.module.scss"; // นำเข้าไฟล์ SCSS Module
import { useUser } from "../../api/UserContext";
import { Link } from "react-router-dom";
import imgprofile from "../../imgAll/img/man.png";
import imgprofile2 from "../../imgAll/img/woman.png";
import Howto from "../howto/howto";
//import icon__profile from "../../imgAll/icon/person-circle-outline.png";

import { FaStar } from "react-icons/fa"; // ใช้ไอคอนดาวจาก react-icons
import { FaLightbulb } from "react-icons/fa"; // 🔹 นำเข้าไอคอนหลอดไฟ
import Loading from "../loader/loading";
const Header = () => {
  const { user } = useUser(); // ใช้ข้อมูล user จาก Context
  const googleFormLink = "https://forms.gle/xxxxxxxxxxxx";
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        display: "flex",
      }}
    >
      <div className="header__left">
        <h1 className={styles.h1__header}>Kakaloly</h1>
        <p className={styles.nameCustomer1}>
          สวัสดีคุณ{" "}
          <>
            {user ? (
              <span className={styles.nameCustomer}>{user.username}</span>
            ) : (
              <Loading />
            )}
          </>
        </p>
      </div>

      <div className={styles.header__right}>
        {/* 🔹 ปุ่มเปิด Modal */}
        <button
          className={styles.howto}
          title="ให้คะแนนแอป"
          onClick={() => setIsModalOpen(true)}
        >
          <FaLightbulb size={24} color="#FFD700" />
        </button>
        {/* 🔹 ไอคอนโปรไฟล์ */}
        <Link
          to="/Profilepage"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={user ? imgprofile : imgprofile2} // เช็คว่า user เป็น true หรือ false
            alt="Iconprofile"
            className={styles.icon__person}
          />
        </Link>
      </div>
      <Howto isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};
export default Header;
