// Frame1.js
import React from "react";
import { Container, Title, Button, Image } from "./styles"; // นำเข้าจากไฟล์ styles.js
import information from "../../imgAll/img/information.jpg";
function Frame1({ nextStep }) {
  return (
    <Container>
      <Title>ข้อมูลส่วนตัว</Title>
      <Image src={information} alt="profile" />

      <Button onClick={nextStep}>ถัดไป</Button>
    </Container>
  );
}

export default Frame1;
