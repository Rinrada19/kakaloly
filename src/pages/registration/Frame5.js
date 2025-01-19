import React, { useState } from 'react';
import { Container, Title, Button } from './styles';
import backbutton from '../../imgAll/icon/backbutton.webp';

function FoodRestrictionSelection({ nextStep, prevStep, formData, setFormData }) {
  const [noneSelected, setNoneSelected] = useState(false); // สถานะของปุ่ม "ไม่มี"

  const handleRestrictionSelection = (selectedRestriction) => {
    if (noneSelected) {
      setNoneSelected(false); // รีเซ็ตสถานะของปุ่ม "ไม่มี" เมื่อเลือกข้อจำกัดอื่น ๆ
      setFormData({ ...formData, restrictions: [selectedRestriction] }); // กำหนดให้มีแค่ข้อจำกัดที่เลือกใหม่
    } else {
      setFormData((prevData) => {
        const updatedRestrictions = prevData.restrictions.includes(selectedRestriction)
          ? prevData.restrictions.filter((restriction) => restriction !== selectedRestriction)
          : [...prevData.restrictions, selectedRestriction];
        return { ...prevData, restrictions: updatedRestrictions };
      });
    }
  };

  const handleNoneSelection = () => {
    setNoneSelected(true); // เมื่อกด "ไม่มี" ให้ตั้งสถานะเป็น true
    setFormData({ ...formData, restrictions: [] }); // รีเซ็ตการเลือกทั้งหมด
  };

  const handleNextStep = () => {
    if (formData.restrictions.length > 0 || noneSelected) {
      nextStep();
    } else {
      alert("Please select at least one food restriction");
    }
  };

  return (
    <Container>
      <img 
        src={backbutton} 
        alt="Back" 
        style={{
          width: '46px',
          height: '46px',
          position: 'absolute',
          top: '30px',
          left: '30px',
          cursor: 'pointer',
        }}
        onClick={prevStep}
      />
      <div>
        <Title>ข้อจำกัดด้านอาหาร</Title>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#ABABAB',
          marginTop: '-10px',
          textAlign: 'center',
        }}>เช่นแพ้นม</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        {['แพ้อาหารทะเล', 'แพ้นม', 'แพ้ไข่', 'แพ้แป้งสาลีและกลูเต็น', 'แพ้ถั่วตระกูล', 'มังสวิรัติ'].map((item) => (
          <Button
            key={item}
            onClick={() => handleRestrictionSelection(item)}
            style={{
              width: '267px',
              height: '40px',
              backgroundColor: formData.restrictions.includes(item) && !noneSelected ? '#FF7F32' : '#FBF3E6',
              border: formData.restrictions.includes(item) && !noneSelected ? 'none' : '1px solid #915B43',
              color: formData.restrictions.includes(item) && !noneSelected ? '#FFF' : '#915B43',
            }}
          >
            {item}
          </Button>
        ))}
        {/* ปุ่ม "ไม่มี" */}
        <Button
          onClick={handleNoneSelection}
          style={{
            width: '267px',
            height: '40px',
            backgroundColor: noneSelected ? '#FF7F32' : '#FBF3E6',
            border: noneSelected ? 'none' : '1px solid #915B43',
            color: noneSelected ? '#FFF' : '#915B43',
          }}
        >
          ไม่มี
        </Button>
      </div>
      <Button onClick={handleNextStep} disabled={formData.restrictions.length === 0 && !noneSelected}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default FoodRestrictionSelection;
