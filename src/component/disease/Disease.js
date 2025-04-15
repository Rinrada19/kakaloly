import React, { useState, useEffect } from "react";
import star from "../../imgAll/img/star.jpg";
import { useUser } from "../../api/UserContext";
import "./Diseasecss.scss"; // นำเข้าไฟล์ SCSS ปกติ

const Disease = () => {
  const { user } = useUser();

  let advice = "";

  if (Array.isArray(user?.congenital_disease)) {
    let adviceList = [];

    const knownDiseases = new Set();

    user.congenital_disease.forEach((disease) => {
      switch (disease) {
        case "โรคเบาหวาน":
          adviceList.push(
            "ควรหลีกเลี่ยงอาหารประเภท น้ำหวาน น้ำอัดลม น้ำผลไม้ น้ำผึ้ง ขนมไทย เบเกอรี่ ผลไม้กระป๋อง ผลไม้ดอง หรือผลไม้หวานจัดอื่นๆ"
          );
          knownDiseases.add(disease);
          break;
        case "โรคอ้วน":
          adviceList.push(
            "ควรทานอาหารให้หลากหลายในสัดส่วนที่เหมาะสมและหมั่นดูแลน้ำหนักตัว"
          );
          knownDiseases.add(disease);
          break;
        case "โรคหลอดเลือดสมองและหัวใจ":
          adviceList.push(
            "ควรทานอาหารที่มีเส้นใยสูง เช่น ผัก ธัญพืช ผลไม้ ข้าวซ้อมมือ ถั่ว และไขมันไม่อิ่มตัวจากน้ำมันรำข้าว น้ำมันมะกอก รวมถึงโปรตีนไขมันต่ำจากปลา เต้าหู้ และเนื้อสัตว์ไม่ติดมัน พร้อมวิตามินบี 6, บี 12 และกระเทียมเพื่อลดคอเลสเตอรอล."
          );
          knownDiseases.add(disease);
          break;
        case "โรคความดันโลหิตสูง":
          adviceList.push(
            "ควรลดการบริโภคเกลือโซเดียม อาหารที่มีรสจัด หลีกเลี่ยงอาหารหมักดอง อาหารกระป๋อง รวมถึงอาหารแปรรูปสำเร็จรูปที่มักมีเกลือในปริมาณสูง ในขณะเดียวกันควรเพิ่มการรับประทานอาหารที่เป็นแหล่งใยอาหารที่ดี"
          );
          knownDiseases.add(disease);
          break;
        case "โรคมะเร็ง":
          adviceList.push(
            "ควรทานอาหารให้ได้รับสารอาหารที่ครบถ้วนและหลากหลายในปริมาณที่เหมาะสม รับประทานอาหารที่ปรุงสุก"
          );
          knownDiseases.add(disease);
          break;
        default:
          break;
      }
    });

    // ถ้าไม่มีโรคที่ match กับ case ใดเลย
    if (adviceList.length === 0) {
      advice =
        "ควรทานอาหารครบ 5 หมู่ แต่ละหมู่ให้หลากหลายและหมั่นดูแลน้ำหนักตัว ทานข้าวเป็นอาหารหลัก";
    } else {
      advice = adviceList.join(" ");
    }
  } else {
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
