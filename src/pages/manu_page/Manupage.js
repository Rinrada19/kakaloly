import React, { useState } from "react";
import styles from "./Manupage.module.scss"; 
import "../../styles/custom.scss"; 

import NavigationBar from "../../component/navbar/NavigationBar";
import SearchMenu from "./component/searchMenu/SearchMenu";
import ManuCard from "./component/manuCard/ManuCard.js";

function Manupage() {
  const [searchQuery, setSearchQuery] = useState(""); // เก็บค่าค้นหา

  return (
    <>
      <div className={styles.wapper}>
        <div className="container"> 
          <h1 style={{
            marginBottom: "35px",
          }}>เมนูอาหาร</h1>
          <SearchMenu setSearchQuery={setSearchQuery} /> {/* ส่งฟังก์ชันอัปเดตค่า */}
          <ManuCard searchQuery={searchQuery} /> {/* ส่งค่าค้นหาไปที่ ManuCard */}
        </div>
        <NavigationBar/>
      </div>
    </>
  );
}

export default Manupage;
