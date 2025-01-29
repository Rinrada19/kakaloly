import React from "react";
import "../content-NutritionalDetails/NutritionalDetails.scss";
import DonutChart from "../content-NutritionalDetails/Donutchart/Donutchart";

function NutritionalDetails({ nutritionData }) {
  return (
    <div className="wapperNutri">
      <div>
        <p className="Headnutri">รายละเอียดโภชนาการ</p>
        <DonutChart nutritionData={nutritionData} />
      </div>
    </div>
  );
}
export default NutritionalDetails;
