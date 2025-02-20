import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

export const addMeal = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token is required to access this resource");
    }

    // ตรวจสอบว่า data มีข้อมูลครบถ้วนหรือไม่
    if (!data.food_name || !data.user_id) {
      throw new Error("Missing required fields: food_name or user_id");
    }
    // console.log("Data being sent: ใน api", data); // ตรวจสอบข้อมูลที่ส่งไป
    const response = await API_URL.post("/meals", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // console.log("Token saved in localStorage:", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
    throw error;
  }
};
