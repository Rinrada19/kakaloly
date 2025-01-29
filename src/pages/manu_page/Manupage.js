// import React, { useState } from "react";
import React from "react";

import styles from "./Manupage.module.scss"; 
import "../../styles/custom.scss"; 

// import { Link } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import NavigationBar  from "./component/navbar/NavigationBar";
import NavigationBar from "../../component//navbar/NavigationBar";
import SearchMenu from "./component/searchMenu/SearchMenu"
import ManuCard from "./component/manuCard/ManuCard.js"


function Manupage() {
  return (
    <>
      <div className={styles.wapper}>
        <div className="container"> 
        {/* content All */}
        <h1>เมนูอาหาร</h1>
        <SearchMenu/>
        <ManuCard/>


          
        </div>
        <NavigationBar/>
      </div>
    </>
  );
}

export default Manupage;


