import React from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function AgeInput({ nextStep, prevStep, formData, setFormData }) {
  const handleNextStep = () => {
    if (formData.age && !isNaN(formData.age) && formData.age > 0) {
      nextStep();
    } else {
      alert("กรุณากรอกอายุอีกครั้ง");
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
      <Title>กรุณากรอกอายุของคุณ</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <p
          style={{
            color: "#915B43",
            fontSize: "16px",
            margin: "0",
            letterSpacing: "0.5px",
          }}
        >
          กรุณากรอกอายุของคุณ
        </p>
        <Input
          type="number"
          value={formData.age} // ใช้ค่าอายุจาก formData
          onChange={(e) => setFormData({ ...formData, age: e.target.value })} // อัพเดตค่าอายุใน formData
        />
      </div>
      <Button onClick={handleNextStep} disabled={!formData.age}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default AgeInput;
