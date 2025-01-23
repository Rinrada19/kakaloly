import React, { useState } from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function WeightGoalInput({ nextStep, prevStep, formData, setFormData }) {
  const [require_weight, setRequireWeight] = useState("");
  const [error, setError] = useState(""); // เก็บข้อความแจ้งเตือน

  const handleNextStep = () => {
    setFormData({ ...formData, require_weight }); // เก็บ require_weight ลง formData
    nextStep();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const maxWeightLoss = formData.weight; // ใช้น้ำหนักจาก formData

    if (value > maxWeightLoss) {
      setError(
        `กรุณากรอกตัวเลขไม่เกินน้ำหนักปัจจุบัน (${maxWeightLoss} กิโลกรัม)`
      );
    } else if (value <= 0) {
      setError("กรุณากรอกตัวเลขที่มากกว่า 0");
    } else {
      setError("");
    }

    setRequireWeight(value);
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
      <Title style={{ lineHeight: "1.7" }}>
        เป้าหมายของคุณ
        <br />
        จำนวนน้ำหนักที่ต้องการลด
        <br />
        (กิโลกรัม)
      </Title>
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
          น้ำหนักปัจจุบัน: {formData.weight} กิโลกรัม
          <br />
          กรุณากรอกตัวเลขไม่เกินน้ำหนักปัจจุบัน
        </p>
        <Input
          type="number"
          value={require_weight}
          onChange={handleInputChange}
        />
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              margin: "0",
              letterSpacing: "0.5px",
            }}
          >
            {error}
          </p>
        )}
      </div>
      <Button onClick={handleNextStep} disabled={!require_weight || error}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default WeightGoalInput;
