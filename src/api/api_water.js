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
    // console.log("Error Response:", errorResponse); // แสดงรายละเอียดของข้อผิดพลาดจากเซิร์ฟเวอร์
    throw error;
  }
};

export const updateWaterIntake = async (data) => {
  // ตรวจสอบให้แน่ใจว่า water_amount และ water_intake_id มีค่า
  if (
    data === undefined ||
    data.water_amount === undefined ||
    data.water_intake_id === undefined
  ) {
    console.error("Invalid data: ", data);
    throw new Error("Missing water_intake_id or water_amount");
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token is missing. Please login.");
  }

  try {
    // ส่งข้อมูลอัปเดตน้ำที่ดื่ม
    const response = await API_URL.put("/water-intake", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("Water intake updated:", response.data);
    return response.data;
  } catch (error) {
    // ตรวจสอบข้อผิดพลาดจาก API
    if (error.response) {
      console.error("Error Response:", error.response.data); // แสดงข้อมูลที่ตอบกลับจาก API
      alert("Error updating water intake: " + error.response.data.message); // แสดงข้อความแสดงข้อผิดพลาด
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("No response from server.");
    } else {
      console.error("Error details:", error.message);
      alert("An error occurred: " + error.message);
    }
    throw error;
  }
};

export const postWater = async (waterAmount) => {
  try {
    // ตรวจสอบว่า waterAmount เป็นตัวเลขที่ถูกต้อง
    if (typeof waterAmount !== "number" || waterAmount <= 0) {
      throw new Error("Invalid water amount provided");
    }

    // ดึง token จาก localStorage
    const token = localStorage.getItem("token");

    // ตรวจสอบว่า token มีอยู่หรือไม่
    if (!token) {
      throw new Error("Token is required to access this resource");
    }

    // เรียก API ด้วย POST และส่ง headers และ body ที่มีเฉพาะ water_amount
    const response = await API_URL.post(
      "/water-intake",
      { water_amount: waterAmount }, // ส่งแค่ค่า water_amount
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
