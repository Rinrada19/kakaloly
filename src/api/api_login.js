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
export const loginUser = async (data) => {
  try {
    const response = await API_URL.post("/users/login", data); // ใช้ตัวแปร API_URL และ route /users/login

    // ตรวจสอบว่า response มี token หรือไม่
    if (response.data.token) {
      // เก็บ token ใน localStorage
      localStorage.setItem("token", response.data.token);
      console.log("Token saved in localStorage:", response.data.token);
    }

    // ส่งข้อมูลผู้ใช้กลับ
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ", error);
    throw error;
  }
};
