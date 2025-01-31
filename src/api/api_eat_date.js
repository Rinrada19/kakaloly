import { useState, useEffect } from "react";
import { API_URL } from "../api/main";

export const getEatDate = async (date) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is required to access this resource");
    }

    // ถ้า date ไม่ได้ถูกส่งเข้ามา ให้ใช้วันที่ปัจจุบัน
    const currentDate = date || new Date().toISOString().split("T")[0];

    console.log("Using date:", currentDate);

    const response = await API_URL.post(
      "/eat_today",
      { date: currentDate }, // ส่งวันที่ไปใน body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโภชนาการที่ทานวันนี้:", error);

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
