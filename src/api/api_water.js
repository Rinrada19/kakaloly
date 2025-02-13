// import { API_URL } from "../api/main";
// import axios from "axios";

// export const getWaterIntake = async (token) => {
//   try {
//     const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

//     const response = await API_URL.get("/water-intake", {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { date: today },
//     });

//     if (response.status === 200 && response.data) {
//       console.log("✅ มีข้อมูลน้ำดื่ม:", response.data);
//       return response.data;
//     }

//     if (response.status === 201) {
//       console.warn("⚠️ ไม่มีข้อมูลน้ำดื่มสำหรับวันนี้:", response.data.message);
//       return null; // หรือจะคืน object ว่าง `{}` แล้วแต่การใช้งาน
//     }

//     console.warn("⚠️ Unexpected response:", response);
//     return null;
//   } catch (error) {
//     console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลน้ำดื่ม:", error);

//     if (error.response) {
//       console.warn("⚠️ Response Status:", error.response.status);
//       console.warn("⚠️ Response Data:", error.response.data);
//     }

//     return null;
//   }
// };

// export const updateWaterIntake = async (water_amount) => {
//   if (
//     water_amount === undefined ||
//     typeof water_amount !== "number" ||
//     water_amount <= 0
//   ) {
//     throw new Error(
//       "Invalid data provided. Please provide a valid water amount."
//     );
//   }

//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("Token is missing. Please login.");
//   }

//   try {
//     const response = await axios.put(
//       "http://127.0.0.1:5000/water-intake",
//       { water_amount }, // ส่งข้อมูลแค่ water_amount
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Water intake updated/created:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating water intake:", error);

//     // ตรวจสอบข้อผิดพลาดจากการตอบกลับของ API
//     if (error.response) {
//       console.error("Error Response:", error.response.data);
//     } else {
//       console.error("Error Message:", error.message);
//     }

//     throw error; // เพิ่มข้อผิดพลาดให้กับผู้เรียกใช้
//   }
// };
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
      "http:/54.79.173.230:5000/water-intake",
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
    // console.error("Error updating water intake:", error);
    // // ตรวจสอบข้อผิดพลาดจาก API
    // if (error.response) {
    //   console.error("Error Response:", error.response.data);
    // }
    // throw error;
  }
};
