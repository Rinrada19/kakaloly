import React, { useState, useEffect } from "react";
import { Container, Title, Button } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function GoalSelection({
  nextStep,
  prevStep,
  setCurrentStep,
  formData,
  setFormData,
}) {
  const [goal, setGoal] = useState(formData.goal || ""); // Initialize with formData

  useEffect(() => {
    setGoal(formData.goal || ""); // Update state when formData changes
  }, [formData]);

  const handleGoalSelection = (selectedGoal) => {
    setGoal(selectedGoal);
    setFormData({ ...formData, goal: selectedGoal }); // Update formData with selected goal
  };

  const handleNextStep = () => {
    if (goal === "รักษาน้ำหนัก") {
      setCurrentStep(11); // Go directly to Frame 11
    } else if (goal === "ลดน้ำหนัก") {
      setCurrentStep(9); // Go directly to Frame 9
    } else if (goal === "เพิ่มน้ำหนัก") {
      setCurrentStep(10); // Go directly to Frame 10
    } else {
      alert("กรุณาเลือกเป้าหมาย");
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
      <div>
        <Title>เป้าหมายของคุณ</Title>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#ABABAB",
            marginTop: "-10px",
            textAlign: "center",
          }}
        >
          เลือกเป้าหมายที่คุณต้องการ
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {["ลดน้ำหนัก", "รักษาน้ำหนัก", "เพิ่มน้ำหนัก"].map((item) => (
          <Button
            key={item}
            onClick={() => handleGoalSelection(item)}
            style={{
              width: "267px",
              height: "40px",
              backgroundColor: goal === item ? "#FF7F32" : "#FBF3E6",
              border: goal === item ? "none" : "1px solid #915B43",
              color: goal === item ? "#FFF" : "#915B43",
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <Button onClick={handleNextStep} disabled={!goal}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default GoalSelection;
