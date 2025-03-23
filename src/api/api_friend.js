import { API_URL } from "../api/main";

import axios from "axios"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

export const getFriend = async (data, token) => {
  try {
    const response = await API_URL.get("/friend_info", {
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
    // console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู: ", error);
    const errorResponse = await error.response?.text();
    // console.log("Error Response:", errorResponse); // แสดงรายละเอียดของข้อผิดพลาดจากเซิร์ฟเวอร์
    throw error;
  }
};

export const getFriendInfo = async (data, token) => {
  try {
    // รับค่าจาก data สำหรับ id
    const { id } = data;

    const response = await API_URL.get(`/friend_info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data, // ส่ง data เพิ่มเติมใน params ถ้ามี
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    // console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู: ", error.message || error);

    // เช็คว่า error.response มีค่าหรือไม่
    if (error.response) {
      const errorResponse = await error.response.text();
      // console.log("Error Response:", errorResponse); // แสดงรายละเอียดของข้อผิดพลาดจากเซิร์ฟเวอร์
    } else {
      // console.log("Error Message:", error.message); // แสดงข้อความของข้อผิดพลาดที่ไม่ได้มาจากการตอบกลับ
    }

    throw error;
  }
};

export const createFriend = async (friend_username) => {
  try {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage
    if (!token) {
      throw new Error("Token ไม่พบ กรุณาเข้าสู่ระบบ");
    }

    const response = await API_URL.post(
      "/friend",
      { friend_username }, // ส่ง username ใน body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ส่ง Token ไปด้วย
        },
      }
    );

    // console.log("ข้อมูลที่ได้รับจาก API:", response.data);
    return response.data;
  } catch (error) {
    // console.error("📌 เกิดข้อผิดพลาด:", error);

    if (error.response) {
      // console.log("📌 API Error Response:", error.response.data);
      return { error: error.response.data?.error || "เกิดข้อผิดพลาดบางอย่าง" }; // ✅ คืนค่า error
    }

    return { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" }; // ✅ กรณีไม่มี response
  }
};
