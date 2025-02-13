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

    if (!authToken) {
      throw new Error("Token is required to access this resource");
    }

    const response = await API_URL.get("/users", {
      headers: {
        Authorization: `Bearer ${authToken}`, // ใช้ token ที่ได้
      },
      params: data, // ข้อมูลที่ส่งผ่าน URL query string
    });

    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ", error);

    if (error.response && error.response.status === 401) {
      // ถ้า token หมดอายุ หรือไม่ถูกต้อง ให้รีไดเรกต์ผู้ใช้ไปยังหน้า login
      alert("Token หมดอายุ กรุณาเข้าสู่ระบบใหม่");
      // อาจจะทำการลบ token ออกจาก localStorage
      localStorage.removeItem("token");

      // นำทางผู้ใช้ไปหน้า login
      window.location.href = "/"; // เปลี่ยนเป็นเส้นทางที่เหมาะสม
    }

    throw error; // ส่งข้อผิดพลาดต่อไป
  }
};
