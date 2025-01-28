import React  from "react";
import '../content-NutritionalDetails/NutritionalDetails.scss'
import DonutChart from '../content-NutritionalDetails/Donutchart/Donutchart'

function NutritionalDetails() {
    return(
        <div className="wapperNutri">
            <div>
                <p className="Headnutri">รายละเอียดโภชนาการ</p>
                <DonutChart/>
            </div>
        </div>
    )
}
export default NutritionalDetails;