// src/pages/Home/Home.js

import React from "react";
// import Home1 from "./Home1"
import "./HomeStyle.scss"; // นำเข้าไฟล์ SCSS

const Home1 = ({nameproduct,price}) => {
  return (
      <>
      <h1>Nameproduct: {nameproduct}</h1> 
      <h2>Price: {price}</h2> 
      </>
      // เเสดงว่า <h1> Name </h1>
  )
}

const Tranformer = () => {
  const data = [
    { name: "Nvd", price: 200 },
    { name: "SMCI", price: 150 },
    { name: "AMAZON", price: 600 }
  ];

  return (
    <>
      {data.slice(2).map((item, index) => {
        return (
          <ul key={index}> {/* ใช้ index + 1 เพื่อเริ่ม key จาก 1 */}
            <li>ลำดับที่: {index + 1}</li> {/* ลำดับจาก 1 ขึ้นไป */}
            <li>ชื่อ: {item.name}</li>
            <li>ราคา: {item.price} หน่วย</li>
          </ul>
        );
      })}
    </>
  );
};



export const Home = () => {
  return (
    <>
    <Home1 nameproduct = "water"  price="15"/>
    <Home1 nameproduct = "snack"  price="20"/>
    <Home1 nameproduct = "candy"  price="10"/>
    <Tranformer/>
    </>
  );
};
export default Home


