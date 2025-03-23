import React, { createContext, useContext, useState, useEffect } from "react";

// สร้าง context สำหรับ user
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // กำหนดสถานะสำหรับ user, loading, error, และ remainingTime
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null); // สำหรับเก็บเวลาที่เหลือจนกว่าจะหมดอายุ

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // จำลองการตรวจสอบ token ว่ายังไม่หมดอายุ
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      const currentTime = Date.now() / 1000; // เวลาปัจจุบันในหน่วยวินาที

      if (decodedToken.exp < currentTime) {
        // ถ้า token หมดอายุให้ลบออกจาก localStorage
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        return;
      }

      // คำนวณเวลาที่เหลือจนกว่าจะหมดอายุ
      const timeLeft = decodedToken.exp - currentTime; // เวลาที่เหลือในหน่วยวินาที
      setRemainingTime(Math.max(0, Math.floor(timeLeft / 60))); // แปลงเป็นนาที (ปัดเศษลง)
      // console.log("remainingTime", remainingTime);
      // จำลองการดึงข้อมูลผู้ใช้จาก API
      const fetchUser = async () => {
        try {
          const response = await fetch("https://kakalolyapi.org/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          setUser(userData); // อัพเดทค่า user
        } catch (error) {
          setError(error.message); // เก็บข้อความ error
        } finally {
          setLoading(false); // อัพเดทสถานะว่าโหลดเสร็จแล้ว
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook สำหรับใช้ context
export const useUser = () => useContext(UserContext);
