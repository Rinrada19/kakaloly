// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

import "../../styles/custom.scss";

import { Link } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import NavigationBar  from "./component/navbar/NavigationBar";
import Header from "../../component/headerUpper/Header";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import Water from "../../component/content-Water/Water";
import MealsSection from "../../component/content-MealSection/MealsSection";

import { useUser } from "../../api/UserContext";
import { getUser } from "../../api/api_user";

function Home() {
  const { user, setUser } = useUser();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = {};
          const response = await getUser(data, token);
          if (Array.isArray(response) && response.length > 0) {
            setUser(response[0]); // อัปเดต user
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // ตั้งสถานะ loading เป็น false
        }
      } else {
        setLoading(false); // กรณีไม่มี token
      }
    };

    fetchUser();
  }, [token, setUser]);

  if (loading) {
    return (
      <div className="container">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div>
        <Link
          to="/Summarypage"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <SummaryCard />
        </Link>
      </div>
      <div>
        <MealsSection />
      </div>
      <div>
        <Water />
      </div>
    </div>
  );
}
export default Home;
