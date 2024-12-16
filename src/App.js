// import React, { useState } from "react";
import React from "react";
import MealsSection from "./component/content-MealSection/MealsSection"
import "./styles/custom.scss"; 

// import { Home } from "./pages/home/Home";
import  NavigationBar  from "./component/navbar/NavigationBar";
import Header from "./component/headerUpper/Header";
import SummaryCard from "./component/content-CardSummary/SummaryCard";


function App() {
  return (
    <div className="App">
      <div>
        <MealsSection />
      </div>
    </div>
  );
}
export default App;
