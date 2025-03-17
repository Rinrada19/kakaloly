import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material"; // ใช้ Material UI สำหรับ UI components
import { forgotPassword } from "../../../api/api_forgetpass"; // นำเข้าฟังก์ชัน forgotPassword

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(""); // สถานะสำหรับอีเมล
  const [loading, setLoading] = useState(false); // สถานะการโหลด
  const [message, setMessage] = useState(""); // สถานะสำหรับข้อความแสดงผล

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // อัปเดตอีเมลเมื่อมีการกรอก
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มการโหลด
    setMessage(""); // เคลียร์ข้อความเก่า

    try {
      // เรียกใช้ฟังก์ชัน forgotPassword
      const data = await forgotPassword(email);
      setMessage(data.message || "กรุณาตรวจสอบอีเมลของคุณ"); // แสดงข้อความสำเร็จจาก API
    } catch (error) {
      setMessage(
        "เกิดข้อผิดพลาด: " +
          (error.response?.data?.message || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้")
      ); // แสดงข้อความข้อผิดพลาด
    } finally {
      setLoading(false); // เสร็จสิ้นการโหลด
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Typography
        variant="h5"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        ลืมรหัสผ่าน
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="อีเมล"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          required
          sx={{ marginBottom: "16px" }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          disabled={loading}
        >
          {loading ? "กำลังโหลด..." : "ส่งคำขอ"}
        </Button>
      </form>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("ข้อผิดพลาด") ? "error" : "success"}
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
