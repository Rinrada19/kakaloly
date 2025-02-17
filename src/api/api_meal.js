import { API_URL } from "../api/main";

export const getMeal = async (data, token) => {
  try {
    const response = await API_URL.get("/meals/today", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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
    // console.log("Error Response:", errorResponse); // แสดงรายละเอียดของข้อผิดพลาดจากเซิร์ฟเวอร์
    throw error;
  }
};

export const getMealDate = async (date) => {
  try {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage
    if (!token) {
      throw new Error("Token is required to access this resource");
    }

    // ถ้า date ไม่ได้ถูกส่งเข้ามา ให้ใช้วันที่ปัจจุบัน
    const currentDate = date || new Date().toISOString().split("T")[0]; // ใช้วันที่ปัจจุบันถ้าไม่มีกำหนด

    // console.log("Using date:", currentDate);

    const response = await API_URL.get("/meals/by_date", {
      params: { date: currentDate }, // ส่ง date ใน query parameter
      headers: {
        Authorization: `Bearer ${token}`, // ส่ง token ใน headers
      },
    });
    // console.log("data ======", response.data);
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู: ", error);

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

    throw error; // โยน error ต่อ
  }
};
