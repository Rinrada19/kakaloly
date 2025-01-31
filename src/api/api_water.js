import { API_URL } from "../api/main";
import axios from "axios";

export const getWaterIntake = async (token) => {
  try {
    // สร้างวันที่ในรูปแบบ yyyy-mm-dd
    const today = new Date();
    const date = today.toISOString().split("T")[0]; // ได้ค่าในรูปแบบ "2025-01-14"

    const response = await API_URL.get("/water-intake", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date }, // ส่งพารามิเตอร์ date เป็นวันปัจจุบัน
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลน้ำดื่ม: ", error);
    const errorResponse = await error.response?.text();
    console.log("Error Response:", errorResponse); // แสดงรายละเอียดของข้อผิดพลาดจากเซิร์ฟเวอร์
    throw error;
  }
};

export const updateWaterIntake = async (data) => {
  // ตรวจสอบให้แน่ใจว่า water_amount มีค่า (สามารถเป็น 0 ได้)
  if (data === undefined || data.water_amount === undefined) {
    console.error("Invalid data: ", data);
    throw new Error("Invalid data provided.");
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token is missing. Please login.");
  }

  try {
    // ส่งข้อมูลอัปเดตน้ำที่ดื่ม
    const response = await axios.put(
      "http://127.0.0.1:5000/water-intake",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Water intake updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating water intake:", error);
    // ตรวจสอบข้อผิดพลาดจาก API
    if (error.response) {
      console.error("Error Response:", error.response.data);
    }
    throw error;
  }
};
