// Frame1.js
import React from 'react';
import { Container, Title, Button, Image } from './styles'; // นำเข้าจากไฟล์ styles.js
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import finishregis from '../../imgAll/img/finishregis.webp';

function Frame1() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const handleButtonClick = () => {
    navigate('/home'); // เปลี่ยนหน้าไปยัง Home
  };
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

      <Image src={finishregis} alt="profile"/>
      <Button onClick={handleButtonClick} style={{
        width: '267px',
       
      }}>เข้าสู่หน้าหลัก</Button>
    </Container>
  );
}

export default Frame1;
