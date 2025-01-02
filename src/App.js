// import React, { useState } from "react";
import React from "react";
import MealsSection from "./component/content-MealSection/MealsSection"
import "./styles/custom.scss"; 
import ProgressChart from "./component/content-CardSummary/cicle-chart/circle-chart";

// import { Home } from "./pages/home/Home";
import  NavigationBar  from "./component/navbar/NavigationBar";
import Header from "./component/headerUpper/Header";
import SummaryCard from "./component/content-CardSummary/SummaryCard";
import Water from "./component/content-Water/Water";


function App() {
  return (
    <div className="App row">
      <div>
        <Header />
      </div>

      <div className="d-flex justify-content-center align-items-cente"> 
        <SummaryCard/>
      </div >

      <div className="d-flex justify-content-center align-items-cente">
       <Water />
      </div>
     
   </div>
);
}
export default App;
