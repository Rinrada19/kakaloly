import React, { useState } from "react";
import "./ToggleButton.scss"; // ไฟล์ CSS สำหรับสไตล์

function ToggleButton({ onSelect }) {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelect(tab); // ส่งข้อมูลไปยัง parent
  };

  return (
    <div className="toggle-button">
      <div
        className="indicator"
        style={{
          transform: `translateX(${activeTab === "login" ? "0" : "100%"})`,
        }}
      ></div>
      <button
        className={`tab ${activeTab === "login" ? "active" : ""}`}
        onClick={() => handleTabClick("login")}
      >
        Login
      </button>
      <button
        className={`tab ${activeTab === "register" ? "active" : ""}`}
        onClick={() => handleTabClick("register")}
      >
        Register
      </button>
    </div>
  );
}

export default ToggleButton;
