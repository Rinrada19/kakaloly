// import React, { useState } from "react";
import React from "react";
import "./styles/custom.scss"; 


// import { Home } from "./pages/home/Home";
// import NavigationBar  from "./component/navbar/NavigationBar";
import Header from "./component/headerUpper/Header";
import SummaryCard from "./component/content-CardSummary/SummaryCard";
import Water from "./component/content-Water/Water";
import MealsSection from "./component/content-MealSection/MealsSection"

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div className="d-flex justify-content-center align-items-cente"> 
        <SummaryCard/>
      </div >

      <div className="d-flex justify-content-center align-items-cente"> 
        <MealsSection/>
      </div >

      <div className="d-flex justify-content-center align-items-cente">
       <Water />
      </div>
     
   </div>
);
}
export default App;
