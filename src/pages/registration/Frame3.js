import React, { useState } from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function AgeInput({ nextStep, prevStep, formData, setFormData }) {
  const [error, setError] = useState("");

  const validateAge = (value) => {
    const age = parseInt(value, 10);
    if (!value) {
      setError("กรุณากรอกอายุของคุณ");
    } else if (isNaN(age) || age <= 0 || age > 120) {
      setError("กรุณากรอกอายุที่ถูกต้อง (1-120 ปี)");
    } else {
      setError("");
    }
  };

  const handleNextStep = () => {
    if (formData.age && !error) {
      nextStep();
    } else {
      setError("กรุณากรอกอายุที่ถูกต้อง");
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
          value={formData.age || ""}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, age: value });
            validateAge(value);
          }}
        />
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
            {error}
          </p>
        )}
      </div>
      <Button
        onClick={handleNextStep}
        disabled={!formData.age || !!error} // ปิดปุ่มถ้ายังไม่ได้กรอกอายุหรือมี error
        style={{
          opacity: !formData.age || !!error ? 0.5 : 1, // ทำให้ปุ่มดูจางเมื่อ disabled
          cursor: !formData.age || !!error ? "not-allowed" : "pointer",
        }}
      >
        ถัดไป
      </Button>
    </Container>
  );
}

export default AgeInput;
