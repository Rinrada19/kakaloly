import { API_URL } from "../api/main"; // นำเข้า API_URL ที่ตั้งค่าไว้ใน mainApi.js

export const getEatToDay = async () => {
  try {
    // ดึง token จาก localStorage
    const token = localStorage.getItem("token");
    // console.log("TOKENNNNN ---------", token);
    // ตรวจสอบว่า token มีอยู่หรือไม่
    if (!token) {
      throw new Error("Token is required to access this resource");
    }

    // ดึงวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    // console.log("Token from localStorage:", token); // ดูว่า token มีค่าหรือไม่

    // เรียก API ด้วย POST และส่ง headers และ body
    const response = await API_URL.post(
      "/eat_today",
      { date: currentDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Header:", {
    //   Authorization: `Bearer ${token}`,
    // });

    // ตรวจสอบ response และ return ข้อมูล
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโภชนาการที่ทานวันนี้:", error);

    // จัดการข้อผิดพลาดเพิ่มเติม
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Token is invalid or expired, please refresh the token.");
      }
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error details:", error.message);
    }

    throw error;
  }
};
