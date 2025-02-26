import React from "react";
import { Container, Title, Button } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function GenderSelection({ nextStep, prevStep, formData, setFormData }) {
  const handleGenderSelection = (selectedGender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };

  const handleNextStep = () => {
    if (formData.gender !== undefined) {
      nextStep(); // ไปยังขั้นตอนถัดไป
    } else {
      alert("Please select your gender"); // แจ้งเตือนหากยังไม่เลือกเพศ
    }
  };

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
      <Title>เพศของคุณ</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Button
          onClick={() => handleGenderSelection(true)} // true = Male
          style={{
            width: "267px",
            height: "40px",
            backgroundColor: formData.gender === true ? "#FF7F32" : "#FBF3E6",
            border: formData.gender === true ? "none" : "1px solid #915B43",
            color: formData.gender === true ? "#FFF" : "#915B43",
          }}
        >
          ชาย
        </Button>
        <Button
          onClick={() => handleGenderSelection(false)} // false = Female
          style={{
            width: "267px",
            height: "40px",
            backgroundColor: formData.gender === false ? "#FF7F32" : "#FBF3E6",
            border: formData.gender === false ? "none" : "1px solid #915B43",
            color: formData.gender === false ? "#FFF" : "#915B43",
          }}
        >
          หญิง
        </Button>
      </div>
      <Button onClick={handleNextStep} disabled={formData.gender === undefined}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default GenderSelection;
