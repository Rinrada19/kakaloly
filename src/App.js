import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../src/pages/login&register/Loginpage";
import RegistrationForm from "../src/pages/registration/RegistrationForm"; // ต้องเป็น RegistrationForm
import Home from "../src/pages/home/Home"; // เพิ่ม Home ที่นี่

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/home" element={<Home />} /> {/* เพิ่มเส้นทางสำหรับ Home */}
      </Routes>
    </Router>
  );
}

export default App;
