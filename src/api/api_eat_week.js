import { API_URL } from "../api/main";

export const getEatWeek = async (data, token) => {
  try {
    const response = await API_URL.get("/eat_week", {
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
