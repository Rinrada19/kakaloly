import React, { useState, useEffect } from 'react';
import { Container, Title, Button } from './styles';
import backbutton from '../../imgAll/icon/backbutton.webp';

function HealthConditionSelection({ nextStep, prevStep, formData, setFormData }) {
  const [noneSelected, setNoneSelected] = useState(false); // สถานะของปุ่ม "ไม่มี"

  // Set initial conditions from formData when the component mounts or formData changes
  useEffect(() => {
    if (formData.healthConditions && formData.healthConditions.length > 0) {
      setNoneSelected(formData.healthConditions.includes("ไม่มี"));
    }
  }, [formData]);

  const handleConditionSelection = (selectedCondition) => {
    if (noneSelected) {
      setNoneSelected(false); // รีเซ็ตสถานะของปุ่ม "ไม่มี" เมื่อเลือกโรคอื่น ๆ
      setFormData({ ...formData, healthConditions: [selectedCondition] }); // กำหนดให้มีแค่โรคที่เลือกใหม่
    } else {
      setFormData((prevData) => {
        const updatedConditions = prevData.healthConditions.includes(selectedCondition)
          ? prevData.healthConditions.filter((condition) => condition !== selectedCondition)
          : [...prevData.healthConditions, selectedCondition];
        return { ...prevData, healthConditions: updatedConditions };
      });
    }
  };

  const handleNoneSelection = () => {
    setNoneSelected(true); // เมื่อกด "ไม่มี" ให้ตั้งสถานะเป็น true
    setFormData({ ...formData, healthConditions: ["ไม่มี"] }); // รีเซ็ตการเลือกทั้งหมด
  };

  const handleNextStep = () => {
    if (formData.healthConditions.length > 0 || noneSelected) {
      nextStep(); // ส่งข้อมูลไปยังขั้นตอนถัดไป
    } else {
      alert("Please select at least one health condition");
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
        <Title>โรคประจำตัว</Title>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#ABABAB',
          marginTop: '-10px',
          textAlign: 'center',
        }}>เลือกโรคที่คุณมี</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        {['โรคเบาหวาน', 'โรคอ้วน', 'โรคหลอดเลือดสมองและหัวใจ', 'โรคความดันโลหิตสูง', 'โรคมะเร็ง'].map((item) => (
          <Button
            key={item}
            onClick={() => handleConditionSelection(item)}
            style={{
              width: '267px',
              height: '40px',
              backgroundColor: formData.healthConditions.includes(item) && !noneSelected ? '#FF7F32' : '#FBF3E6',
              border: formData.healthConditions.includes(item) && !noneSelected ? 'none' : '1px solid #915B43',
              color: formData.healthConditions.includes(item) && !noneSelected ? '#FFF' : '#915B43',
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
      <Button onClick={handleNextStep} disabled={formData.healthConditions.length === 0 && !noneSelected}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default HealthConditionSelection;
