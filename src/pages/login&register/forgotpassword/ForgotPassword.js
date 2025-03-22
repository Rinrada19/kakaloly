import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../api/api_forgetpass";
import "../../../styles/custom.scss"; // ใช้งาน global SCSS
import styles from "./FogotPassword.module.scss"; // ใช้ SCSS Modules

import goback from "../../../imgAll/element/goback.png";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await forgotPassword(email);
      setMessage(data.message || "กรุณาตรวจสอบอีเมลของคุณ");
    } catch (error) {
      setMessage(
        "เกิดข้อผิดพลาด: " +
          (error.response?.data?.message || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center", // ตรงกลางแนวนอน (X)
        alignItems: "center", // ตรงกลางแนวตั้ง (Y)
        height: "100vh", // เต็มจอ
        overflow: "hidden", // ป้องกันการเลื่อน
      }}
    >
      <div className={styles.forgotPasswordContainer}>
        <img
          src={goback}
          alt="Go Back"
          style={{ width: "10px", height: "18px" }}
          onClick={() => navigate("/")} // กลับไปหน้า Home ("/")
        />
        <p className={styles.forgotPasswordTitle}>คุณลืมรหัสผ่าน?</p>
        <p style={{ textAlign: "center", marginBottom: "16px" }}>
          ป้อนอีเมล
          แล้วเราจะส่งลิงก์ไปให้เพื่อให้คุณกลับเข้าสู่ระบบบัญชีผู้ใช้ของคุณได้
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="กรอกอีเมลของคุณ"
            className={styles.input} // ใช้ SCSS ปรับแต่ง
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              fontFamily: "sans-serif",
              marginBottom: "16px",
            }}
          />
          <div>
            <button
              type="submit"
              variant="contained"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "กำลังโหลด..." : "ส่งลิงก์สำหรับรีเซ็ตรหัสผ่าน"}
            </button>
          </div>
        </form>
        {message && (
          <Typography
            variant="body2"
            className={`${styles.message} ${
              message.includes("ข้อผิดพลาด")
                ? styles.errorMessage
                : styles.successMessage
            }`}
          >
            {message}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
