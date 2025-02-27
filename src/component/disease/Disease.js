import React, { useState, useEffect } from "react";
import star from "../../imgAll/img/star.jpg";
import { useUser } from "../../api/UserContext";
import "./Diseasecss.scss"; // นำเข้าไฟล์ SCSS ปกติ

const Disease = () => {
  const { user } = useUser(); // ใช้ข้อมูล user จาก Context
  console.log("userrr", user);
  console.log("userrr--", user.congenital_disease);

  let advice = "";

  // ตรวจสอบว่า user.congenital_disease เป็น array หรือไม่
  if (Array.isArray(user?.congenital_disease)) {
    const adviceList = user?.congenital_disease.map((disease) => {
      switch (disease) {
        case "โรคเบาหวาน":
          return "ควรหลีกเลี่ยงอาหารประเภท น้ำหวาน น้ำอัดลม น้ำผลไม้ น้ำผึ้ง ขนมไทย เบเกอรี่ ผลไม้กระป๋อง ผลไม้ดอง หรือผลไม้หวานจัดอื่นๆ";
        case "โรคอ้วน":
          return "ควรทานอาหารให้หลากหลายในสัดส่วนที่เหมาะสมและหมั่นดูแลน้ำหนักตัว";
        case "โรคหลอดเลือดสมองและหัวใจ":
          return "ควรทานอาหารที่มีเส้นใยสูง เช่น ผัก ธัญพืช ผลไม้ ข้าวซ้อมมือ ถั่ว และไขมันไม่อิ่มตัวจากน้ำมันรำข้าว น้ำมันมะกอก รวมถึงโปรตีนไขมันต่ำจากปลา เต้าหู้ และเนื้อสัตว์ไม่ติดมัน พร้อมวิตามินบี 6, บี 12 และกระเทียมเพื่อลดคอเลสเตอรอล.";
        case "โรคความดันโลหิตสูง":
          return "ควรลดการบริโภคเกลือโซเดียม อาหารที่มีรสจัด หลีกเลี่ยงอาหารหมักดอง อาหารกระป๋อง รวมถึงอาหารแปรรูปสำเร็จรูปที่มักมีเกลือในปริมาณสูง ในขณะเดียวกันควรเพิ่มการรับประทานอาหารที่เป็นแหล่งใยอาหารที่ดี";
        case "โรคมะเร็ง":
          return "ควรทานอาหารให้ได้รับสารอาหารที่ครบถ้วนและหลากหลายในปริมาณที่เหมาะสม รับประทานอาหารที่ปรุงสุก";
        default:
          return "ควรทานอาหารครบ 5 หมู่ แต่ละหมู่ให้หลากหลายและหมั่นดูแลน้ำหนักตัว ทานข้าวเป็นอาหารหลัก";
      }
    });

    // ใช้ join(" ") เพื่อรวมคำแนะนำด้วยเว้นวรรค
    advice = adviceList.join(" ");
  } else {
    // ถ้า congenital_disease ไม่ใช่ array หรือไม่มีข้อมูล
    advice =
      "ควรทานอาหารครบ 5 หมู่ แต่ละหมู่ให้หลากหลายและหมั่นดูแลน้ำหนักตัว ทานข้าวเป็นอาหารหลัก";
  }

  return (
    <div>
      <div className="container-recommend">
        <img className="star" src={star} alt="star icon" />
        <p>{advice}</p>
      </div>
    </div>
  );
};

export default Disease;
