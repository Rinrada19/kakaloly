// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

// export const registerUser = async (data) => {
//   try {
//     const response = await axios.post(
//       "http://127.0.0.1:5000/users/register", // ตรวจสอบว่า URL ตรงนี้ถูกต้อง
//       data
//     );
//     return response.data;
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการสมัคร: ", error);
//     throw error;
//   }
// };

export const registerUser = async (data) => {
  try {
    const response = await API_URL.post("/users/register", data); // ส่งข้อมูลผู้ใช้ไปยัง API
    // ตรวจสอบว่า response มี token หรือไม่
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      // console.log("Token saved in localStorage:", response.data.token);
    }

    return response.data; // ส่งข้อมูลกลับ
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลงทะเบียน: ", error); // แสดงข้อผิดพลาด
    throw error; // ส่งข้อผิดพลาดออกไป
  }
};
