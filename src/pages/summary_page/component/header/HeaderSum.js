import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import styles from "./header.module.scss"; // นำเข้าไฟล์ SCSS Module
import { useUser } from "../../../../api/UserContext";

import icon__profile from "../../../../imgAll/icon/person-circle-outline.png";
import goback from "../../../../imgAll/element/goback.png";
import imgprofile from "../../../../imgAll/img/man.png";
import imgprofile2 from "../../../../imgAll/img/woman.png";
const HeaderSum = ({ link, title = "ภาพรวม" }) => {
  const { user } = useUser(); // ใช้ข้อมูล user จาก Context

  // รับ prop `link` และ `title`
  return (
    <header className={styles.container}>
      <div className="header__left">
        <h1 className={styles.h1__header}>Kakalory</h1>
        <div className={styles.go__back}>
          {/* ใช้ Link เพื่อกำหนดเส้นทาง */}
          <Link to={link}>
            <img src={goback} className={styles.go__backicon} alt="Go Back" />
          </Link>
          <span
            style={{
              marginLeft: "20px",
              fontSize: "18px",
              color: "#915B43",
            }}
          >
            {title} {/* ใช้ prop title สำหรับชื่อ */}
          </span>
        </div>
      </div>
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
    </header>
  );
};

export default HeaderSum;
