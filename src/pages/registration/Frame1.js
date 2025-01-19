// Frame1.js
import React from 'react';
import { Container, Title, Button ,Image } from './styles'; // นำเข้าจากไฟล์ styles.js

function Frame1({ nextStep }) {
  return (
    <Container>
      <Title>ข้อมูลส่วนตัว</Title>
      <Image src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-corgi-cartoon-png-image_2521598.jpg" alt="profile" />
      <Button onClick={nextStep}>ถัดไป</Button>
    </Container>
  );
}

export default Frame1;
