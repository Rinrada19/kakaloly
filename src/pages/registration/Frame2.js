import React, { useState } from 'react';
import { Container, Title, Button } from './styles';
import backbutton from '../../imgAll/icon/backbutton.webp';

function GenderSelection({ nextStep, prevStep, formData, setFormData }) {
  const handleGenderSelection = (selectedGender) => {
    setFormData({ ...formData, gender: selectedGender });
  };

  const handleNextStep = () => {
    if (formData.gender) {
      nextStep();
    } else {
      alert("Please select your gender");
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
      <Title>เพศของคุณ</Title>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <Button
          onClick={() => handleGenderSelection('Male')}
          style={{
            width: '267px',
            height: '40px',
            backgroundColor: formData.gender === 'Male' ? '#FF7F32' : '#FBF3E6',
            border: formData.gender === 'Male' ? 'none' : '1px solid #915B43',
            color: formData.gender === 'Male' ? '#FFF' : '#915B43',
          }}
        >
          ชาย
        </Button>
        <Button
          onClick={() => handleGenderSelection('Female')}
          style={{
            width: '267px',
            height: '40px',
            backgroundColor: formData.gender === 'Female' ? '#FF7F32' : '#FBF3E6',
            border: formData.gender === 'Female' ? 'none' : '1px solid #915B43',
            color: formData.gender === 'Female' ? '#FFF' : '#915B43',
          }}
        >
          หญิง
        </Button>
      </div>
      <Button onClick={handleNextStep} disabled={!formData.gender}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default GenderSelection;
