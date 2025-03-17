import axios from "axios";

import { API_URL } from "../api/main";

export const forgotPassword = async (email) => {
  console.log("url", API_URL); // ตรวจสอบ URL ของ API
  try {
    // ใช้ API_URL.post แทน axios.post
    const response = await API_URL.post(
      "/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // ส่งข้อมูลข้อความจาก API
  } catch (error) {
    console.error("Error occurred during password reset request: ", error);
    throw error; // ส่งข้อผิดพลาดออกไป
  }
};

export const resetPassword = async (token, newPassword) => {
  console.log("url", API_URL); // ตรวจสอบ URL ของ API
  try {
    // ใช้ API_URL โดยตรงเพื่อเรียก reset password
    const response = await API_URL.post(
      "/reset-password", // เส้นทางสำหรับการรีเซ็ตรหัสผ่าน
      {
        token,
        new_password: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // ส่งข้อมูลจาก API
  } catch (error) {
    console.error("Error occurred during password reset: ", error);
    throw error; // ส่งข้อผิดพลาดออกไป
  }
};
