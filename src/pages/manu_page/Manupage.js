import React, { useState } from "react";
import styles from "./Manupage.module.scss"; 
import "../../styles/custom.scss"; 

import NavigationBar from "../../component/navbar/NavigationBar";
import SearchMenu from "./component/searchMenu/SearchMenu";
import ManuCard from "./component/manuCard/ManuCard.js";
import Gobackhead from "../../component/component-history/gobackhead";

function Manupage() {
  const [searchQuery, setSearchQuery] = useState(""); // เก็บค่าค้นหา

  return (
    <>
      <div className={styles.wapper}>
        <div className="container"> 
          <div className={styles.box}><Gobackhead text="เมนูอาหาร" link="/home"/></div>  
          <div style={{marginBottom:"20px"}}><SearchMenu setSearchQuery={setSearchQuery} /> {/* ส่งฟังก์ชันอัปเดตค่า */}</div>   
         
          <ManuCard searchQuery={searchQuery} /> {/* ส่งค่าค้นหาไปที่ ManuCard */}
        </div>
        <NavigationBar/>
      </div>
    </>
  );
}

export default Manupage;
