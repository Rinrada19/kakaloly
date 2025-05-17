import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

//import axios from "axios";

// export const loginUser = async (formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/login`, formData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data; // ส่งข้อมูลที่ได้รับจาก backend กลับไป
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการสมัคร:", error);
//     throw error;
//   }
// };
// eslint-disable-next-line no-unused-vars

// export const loginUser = async (data) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/users/login", // ตรวจสอบว่า URL นี้ถูกต้องและ backend รองรับ
//       data
//     );
//     return response.data;
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการสมัคร: ", error);
//     throw error;
//   }
// };
// export const loginUser = async (data) => {
//   try {
//     const response = await API_URL.post("/users/login", data); // ใช้ตัวแปร API_URL และ route /users/login

//     // ตรวจสอบว่า response มี token หรือไม่
//     if (response.data.token) {
//       // เก็บ token ใน localStorage
//       localStorage.setItem("token", response.data.token);
//       console.log("Token saved in localStorage:", response.data.token);
//     }

//     // ส่งข้อมูลผู้ใช้กลับ
//     return response.data;
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ", error);
//     throw error;
//   }
// };

import axios from "axios";

// ฟังก์ชันที่ส่งคำขอ login

export const loginUser = async (data) => {
  try {
    // เรียก API login
    const response = await axios.post(
      "http://54.79.173.230:5000
/users/login", // แก้ URL
      data,
      {
        withCredentials: true, // ส่ง cookies หรือ session credentials
      }
    );

    // ตรวจสอบว่า response มี data ที่ต้องการหรือไม่
    if (response && response.data) {
      // console.log("Login successful:", response.data);

      // เก็บ token ลงใน localStorage
      const token = response.data.token; // สมมติว่า token มาจาก response.data.token
      if (token) {
        localStorage.setItem("token", token); // เก็บ token ใน localStorage
        // console.log("Token saved:", token);
      }

      return response.data; // คืนค่าข้อมูลที่ได้จากการเข้าสู่ระบบ
    } else {
      throw new Error("No data received from login");
    }
  } catch (error) {
    // console.error(
    //   "Login error:",
    //   error.response ? error.response.data : error.message
    // );

    // ถ้ามี response ข้อผิดพลาดจาก API ให้แสดงผลลัพธ์ที่ได้รับ
    if (error.response) {
      if (error.response.status === 401) {
        // console.error("Invalid credentials, please check your login details.");
      }
      return {
        error: error.response.data || "An error occurred during login.",
      };
    } else if (error.request) {
      // console.error("No response received from server:", error.request);
      return { error: "Server did not respond. Please try again later." };
    } else {
      // console.error("Unexpected error:", error.message);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }
};
