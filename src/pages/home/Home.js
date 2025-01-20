// import React, { useState } from "react";
import React from "react";
import "../../styles/custom.scss"; 


// import { Home } from "./pages/home/Home";
// import NavigationBar  from "./component/navbar/NavigationBar";
import Header from "../../component/headerUpper/Header";
import SummaryCard from "../../component/content-CardSummary/SummaryCard";
import Water from "../../component/content-Water/Water";
import MealsSection from "../../component/content-MealSection/MealsSection"

function Home() {
  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div > 
        <SummaryCard/>
      </div >
      <div > 
        <MealsSection/>
      </div >
      <div>
       <Water />
      </div>
   </div>
);
}
export default Home;
