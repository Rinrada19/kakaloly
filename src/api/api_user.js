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
    // หากไม่ส่ง token มา ให้ดึงจาก localStorage
    const authToken = token || localStorage.getItem("token");

    // ตรวจสอบว่า authToken มีค่า หากไม่มีจะโยนข้อผิดพลาด
    if (!authToken) {
      throw new Error("Token is required to access this resource");
    }

    // ส่งคำขอ GET ไปยัง API พร้อมกับ headers ที่มี token และ params
    const response = await API_URL.get("/users", {
      headers: {
        Authorization: `Bearer ${authToken}`, // ใช้ token ที่ได้
      },
      params: data, // ข้อมูลที่ส่งผ่าน URL query string
    });

    // คืนค่าข้อมูลที่ได้รับจาก API
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ", error);

    // ตรวจสอบว่า error.response มีค่าและสถานะเป็น 401 หรือไม่
    if (error.response && error.response.status === 401) {
      alert("กรุณาเข้าสู่ระบบใหม่");

      // ลบ token ออกจาก localStorage
      localStorage.removeItem("token");

      // นำทางผู้ใช้ไปยังหน้า login
      window.location.href = "/"; // เปลี่ยนเป็นเส้นทางที่เหมาะสม
    }

    // หากเกิดข้อผิดพลาดอื่น ๆ ให้โยนข้อผิดพลาดต่อไป
    throw error;
  }
};
