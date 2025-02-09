import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../src/pages/login&register/Loginpage";
import RegistrationForm from "../src/pages/registration/RegistrationForm"; // ต้องเป็น RegistrationForm
import Home from "../src/pages/home/Home"; // เพิ่ม Home ที่นี่
import Historypage from "../src/pages/history_page/Historypage";
import Summarypage from "../src/pages/summary_page/Summarypage";
import Manupage from "../src/pages/manu_page/Manupage";
import MenuDetail from "../src/pages/manu_page/component/manuCard/manudetail/ManuDetail"
import Friendpage from "../src/pages/Friend_page/Friendpage";
import Profilepage from "../src/pages/profilepage/Profilepage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Loginpage/>} />
          <Route path="/RegistrationForm" element={<RegistrationForm/>} />
          <Route path="/home" element={<Home/>} /> {/* เพิ่มเส้นทางสำหรับ Home */}
          <Route path="/Summarypage" element={<Summarypage />} /> {/* เพิ่มเส้นทางสำหรับ Home */}
          <Route path="/historypage" element={<Historypage />} />
          <Route path="/Manupage" element={< Manupage/>} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/friendpage" element={<Friendpage/>} /> 
          <Route path="/Profilepage" element={<Profilepage/>} />
        </Routes>
    </Router>
  );
}

export default App;