import axios from "axios";
import { API_URL } from "../api/main"; // นำเข้า api ที่ตั้งค่าไว้ใน mainApi.js

export const Scan = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await API_URL.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log("ข้อมูลที่ได้รับจาก API:", response.data); // ตรวจสอบข้อมูลที่ได้รับจาก API

    if (response.data) {
      return response.data; // ส่งข้อมูลที่ได้รับกลับไป
    } else {
      throw new Error("ไม่มีข้อมูลจาก API");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปโหลด:", error);
    // if (error.response) {
    //   console.log("ข้อผิดพลาดจาก API:", error.response.data);
    // } else {
    //   console.log("ข้อผิดพลาดจากเครือข่าย:", error.message);
    // }
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};
