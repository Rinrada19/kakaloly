
import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

export const postManuitem = async (data, token) => {
  try {
    if (!token) {
      throw new Error("Token ไม่พบ กรุณาเข้าสู่ระบบ");
    }

    const response = await API_URL.post(
      "/menu-items",
      data, // ส่งข้อมูลเมนูใน body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("ข้อมูลที่ได้รับจาก API:", response.data);
    return response.data;
  } catch (error) {
    console.error("📌 เกิดข้อผิดพลาด:", error);

    if (error.response) {
      console.log("📌 API Error Response:", error.response.data);
      return { error: error.response.data?.error || "เกิดข้อผิดพลาดบางอย่าง" };
    }

    return { error: "ไม่สามารถเชื่อมต่อ API ได้" };
  }
};

export const getManuitem = async (data, token) => {
  try {
    const response = await API_URL.get("/menu-items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู: ", error);
    const errorResponse = await error.response?.text();
    console.log("Error Response:", errorResponse);
    return { error: error.message || "ไม่สามารถเชื่อมต่อ API ได้" };
  }
};
