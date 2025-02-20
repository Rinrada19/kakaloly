import React, { useState } from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";
//import { users } from "../../test_mock/MockData"; // นำเข้า MockData

function WeightGoalInputup({ nextStep, prevStep, formData, setFormData }) {
  //const [user] = useState(users[0]); // ดึงข้อมูลผู้ใช้คนแรก
  const [require_weight, setrequire_weight] = useState(""); // น้ำหนักที่ต้องการเพิ่ม
  const [error, setError] = useState(""); // เก็บข้อความแจ้งเตือน

  const handleNextStep = () => {
    setFormData({ ...formData, require_weight }); // เก็บ require_weight ลง formData
    nextStep();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const currentWeight = formData.weight; // น้ำหนักปัจจุบันของผู้ใช้
    const maxWeightGain = formData.weight * 3; // สมมติค่าขีดจำกัดน้ำหนักสูงสุด (ปรับได้ตามต้องการ)

    if (value <= currentWeight) {
      setError(
        `กรุณากรอกตัวเลขมากกว่าน้ำหนักปัจจุบัน (${currentWeight} กิโลกรัม)`
      );
    } else if (value > maxWeightGain) {
      setError(
        `กรุณากรอกตัวเลขไม่เกินน้ำหนักเป้าหมายสูงสุด (${maxWeightGain} กิโลกรัม)`
      );
    } else {
      setError("");
    }

    setrequire_weight(value);
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
        จำนวนน้ำหนักที่ต้องการเพิ่ม
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
          น้ำหนักปัจจุบัน:{formData.weight} กิโลกรัม
          <br />
          กรุณากรอกตัวเลขมากกว่าน้ำหนักปัจจุบัน
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

export default WeightGoalInputup;
