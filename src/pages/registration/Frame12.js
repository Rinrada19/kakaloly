// Frame1.js
import React from "react";
import { Container, Title, Button, Image } from "./styles"; // นำเข้าจากไฟล์ styles.js
import resummin from "../../imgAll/img/resummin.webp"; // นำเข้ารูปภาพ
import backbutton from "../../imgAll/icon/backbutton.webp";

function Frame1({ nextStep, prevStep, handleSubmit }) {
  return (
    <Container>
      <img
        src={backbutton}
        alt="Back"
        style={{
          width: "46px",
          height: "46px",
          position: "absolute",
          top: "30px",
          left: "30px",
          cursor: "pointer",
        }}
        onClick={prevStep}
      />
      <Title>ยืนยันข้อมูลส่วนตัว</Title>
      <Image
        src={resummin}
        alt="resub"
        style={{
          width: "450px",
          height: "auto",
          margin: "0 auto",
          display: "block",
          marginTop: "20px",
        }}
      />
      <Button onClick={handleSubmit}>กดยืนยัน</Button>
    </Container>
  );
}

export default Frame1;
