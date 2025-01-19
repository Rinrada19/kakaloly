import React, { useState, useEffect } from 'react';
import { Container, Title, Button } from './styles';
import backbutton from '../../imgAll/icon/backbutton.webp';

function PhysicalActivitySelection({ nextStep, prevStep, formData, setFormData }) {
  const [activityLevel, setActivityLevel] = useState(formData.activityLevel || ''); // Initialize with formData

  useEffect(() => {
    setActivityLevel(formData.activityLevel || ''); // Update state when formData changes
  }, [formData]);

  const handleActivitySelection = (selectedActivity) => {
    setActivityLevel(selectedActivity);
    setFormData({ ...formData, activityLevel: selectedActivity }); // Update formData with selected activity level
  };

  const handleNextStep = () => {
    if (activityLevel) {
      nextStep();
    } else {
      alert("Please select your physical activity level");
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
        <Title>กิจกรรมทางกายภาพ</Title>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#ABABAB',
          marginTop: '-10px',
          textAlign: 'center',
        }}>เลือกระดับกิจกรรมของคุณ</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {[
          ['นั่งทำงานอยู่กับที่'], 
          ['ออกกำลังกาย หรือเล่นกีฬา', 'แบบเบาๆ 1-3 วันต่อสัปดาห์'], 
          ['ออกกำลังกาย หรือเล่นกีฬา', 'ความหนักปานกลาง 3-5 วันต่อสัปดาห์'], 
          ['ออกกำลังกาย หรือเล่นกีฬา', 'ความหนักสูง 6-7 วันต่อสัปดาห์'], 
          ['ออกกำลังกาย หรือเล่นกีฬาหนัก', 'แบบการซ้อมเพื่อแข่งขัน เป็นประจำทุกวัน']
        ].map((lines, index) => {
          const isSpecialButton = lines.join(' ') === 'ออกกำลังกาย หรือเล่นกีฬาหนัก แบบการซ้อมเพื่อแข่งขัน เป็นประจำทุกวัน';
          const isSelected = activityLevel === lines.join(' ');

          return (
            <Button
              key={index}
              onClick={() => handleActivitySelection(lines.join(' '))}
              style={{
                height: '75px',
                width: '280px',
                fontSize: isSpecialButton ? '12px' : '14px',
                backgroundColor: isSelected ? '#FF7F32' : '#FBF3E6',
                border: isSelected ? 'none' : '1px solid #915B43',
                color: isSelected ? '#FFF' : '#915B43',
                textAlign: 'center',
              }}
            >
              {lines.map((line, i) => (
                <span key={i}>
                  {line.split(/(\d+-\d+)/).map((part, idx) => {
                    const isNumber = /\d+-\d+/.test(part); // Check if it's the number range part
                    return (
                      <span
                        key={idx}
                        style={{
                          color: isNumber && !isSelected ? '#EF7430' : isNumber && isSelected ? '#000000' : undefined, // Change color for number range
                        }}
                      >
                        {part}
                      </span>
                    );
                  })}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </Button>
          );
        })}
      </div>
      <Button onClick={handleNextStep} disabled={!activityLevel}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default PhysicalActivitySelection;
