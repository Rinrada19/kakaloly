import React, { createContext, useContext, useState, useEffect } from "react";

// สร้าง context สำหรับ user
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ตัวอย่างการใช้ useEffect เพื่อโหลดข้อมูลผู้ใช้เมื่อเริ่มต้น
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // จำลองการดึงข้อมูลผู้ใช้จาก API
      const fetchUser = async () => {
        try {
          // สมมุติว่ามี API ที่ดึงข้อมูลผู้ใช้ตาม token
          const response = await fetch("https://54.79.173.230:443/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await response.json();
          setUser(userData); // อัพเดทค่า user
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook สำหรับใช้ context
export const useUser = () => useContext(UserContext);
