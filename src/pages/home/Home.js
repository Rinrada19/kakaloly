// import React, { useState } from "react";
import React from "react";

import "../../styles/custom.scss"; 

import { Link } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import NavigationBar  from "./component/navbar/NavigationBar";
import Header from "../../component/headerUpper/Header";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import Water from "../../component/content-Water/Water";
import MealsSection from "../../component/content-MealSection/MealsSection";
import NavigationBar from "../../component//navbar/NavigationBar";


function Home() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#FFF2EA", // พื้นหลังทั้งหมดของหน้า
          minHeight: "100vh", // ให้ครอบคลุมทั้งความสูงของหน้า
        }}
      >
        <div
          className="container"
          style={{
            position: "relative",
            paddingBottom: "150px",
            paddingTop: "30px",
            // backgroundColor: "transparent", // หรือสีที่แตกต่างจากพื้นหลังหลัก
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <Header />
          </div>
          <div>
            <Link to="/Summarypage"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginBottom: "40px",
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
        <NavigationBar />
      </div>
    </>
  );
}

export default Home;


