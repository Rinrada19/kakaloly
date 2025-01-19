// Frame1.js
import React from 'react';
import { Container, Title, Button ,Image } from './styles'; // นำเข้าจากไฟล์ styles.js
import finishregis from '../../imgAll/img/finishregis.webp';
function Frame1({ nextStep }) {
  return (
    <Container style={{
        backgroundColor: '#FFFFFF'
    }}>
     <Title style={{
      lineHeight: '1.5',
     }}>
        ยินดีด้วย<br />สมัคสมาชิก
        <span style={{ 
            color: '#FF7F32'
             }}> <br />สำเร็จ</span>
    </Title>

      <Image src={finishregis} alt="profile" />
      <Button onClick={nextStep} style={{
        width: '267px',
       
      }}>เข้าสู่หน้าหลัก</Button>
    </Container>
  );
}

export default Frame1;
