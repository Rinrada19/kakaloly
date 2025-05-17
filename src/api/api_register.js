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
    console.log("data api (ก่อนส่ง):", data); // ดูข้อมูลก่อนส่ง

    const response = await axios.post(
      " http://54.79.173.230:5000/users/register", // ตรวจสอบ URL ให้ถูกต้อง
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      //console.log("Token saved in localStorage:", response.data.token);
    }

    return response.data;
  } catch (error) {
    // if (error.response) {
    //   console.error("Error response data:", error.response.data);
    //   console.error("Error response status:", error.response.status);
    // } else if (error.request) {
    //   console.error("Error request:", error.request);
    // } else {
    //   console.error("Error message:", error.message);
    // }
    throw error;
  }
};
