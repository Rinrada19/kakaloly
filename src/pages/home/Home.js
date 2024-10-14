// src/pages/Home/Home.js

import React from "react";
import "./HomeStyle.scss"; // นำเข้าไฟล์ SCSS

export const Home = () => {
  return (
    <div className="home">
      {" "}
      {/* เพิ่ม className สำหรับการใช้สไตล์ */}
      <h1>Welcome to the Home Page!</h1>
      <p>This is a simple example of a home page using SCSS.</p>
    </div>
  );
};
