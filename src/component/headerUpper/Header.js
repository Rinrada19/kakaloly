import React, { useState, useEffect } from "react";
//import { users } from "../../test_mock/MockData";
import styles from "./header.module.scss"; // นำเข้าไฟล์ SCSS Module
import { useUser } from "../../api/UserContext";
import { Link } from "react-router-dom";
import imgprofile from "../../imgAll/img/man.png";
import imgprofile2 from "../../imgAll/img/woman.png";
//import icon__profile from "../../imgAll/icon/person-circle-outline.png";
import Loading from "../loader/loading";
const Header = () => {
  const { user } = useUser(); // ใช้ข้อมูล user จาก Context

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
export default Header;
