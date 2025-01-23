// import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

// export const getUser = async (data) => {
//   try {
//     const response = await API_URL.get("/users", data); // ใช้ตัวแปร API_URL และ route /users/login
//     return response.data;
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ", error);
//     throw error;
//   }
// };

import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

export const getUser = async (data, token) => {
  try {
    const response = await API_URL.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`, // เพิ่ม token ใน Authorization header
      },
      params: data, // ข้อมูลที่ส่งผ่าน URL query string
    });
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ", error);
    throw error;
  }
};
