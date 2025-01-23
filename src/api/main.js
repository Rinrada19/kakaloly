import axios from "axios";

// กำหนดค่าเริ่มต้นสำหรับ axios
export const API_URL = axios.create({
  baseURL: "http://127.0.0.1:5000", // เปลี่ยน URL ให้ตรงกับ API ของคุณ
  timeout: 10000, // Timeout 10 วินาที
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
