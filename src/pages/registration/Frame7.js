import React, { useState, useEffect } from "react";
import { Container, Title, Button } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function PhysicalActivitySelection({
  nextStep,
  prevStep,
  formData,
  setFormData,
}) {
  const [physical_activity, setPhysicalActivity] = useState(
    formData.physical_activity || ""
  ); // Initialize with formData

  useEffect(() => {
    setPhysicalActivity(formData.physical_activity || ""); // Update state when formData changes
  }, [formData]);

  const activityLevels = [
    {
      label: "นั่งทำงานอยู่กับที่",
      value: "Sedentary",
      description:
        "กิจกรรมที่ไม่เคลื่อนไหว เช่น นั่งทำงาน, ดูทีวี, หรือใช้คอมพิวเตอร์",
    },
    {
      label: (
        <>
          ออกกำลังกาย หรือเล่นกีฬา แบบเบาๆ <br /> 1-3 วันต่อสัปดาห์
        </>
      ),
      value: "Light",
      description:
        "กิจกรรมเบาๆ เช่น เดิน, โยคะ, หรือปั่นจักรยานช้าๆ 1-3 วันต่อสัปดาห์",
    },
    {
      label: "ออกกำลังกาย หรือเล่นกีฬา ความหนักปานกลาง 3-5 วันต่อสัปดาห์",
      value: "Moderate",
      description:
        "กิจกรรมที่มีความหนักปานกลาง เช่น วิ่ง, ว่ายน้ำ, หรือปั่นจักรยานในระดับปานกลาง 3-5 วันต่อสัปดาห์",
    },
    {
      label: "ออกกำลังกาย หรือเล่นกีฬา ความหนักสูง 6-7 วันต่อสัปดาห์",
      value: "High",
      description:
        "กิจกรรมที่มีความหนักสูง เช่น วิ่งเร็ว, โยคะเข้มข้น, หรือฝึกซ้อมกีฬา 6-7 วันต่อสัปดาห์",
    },
    {
      label:
        "ออกกำลังกาย หรือเล่นกีฬาหนัก แบบการซ้อมเพื่อแข่งขัน เป็นประจำทุกวัน",
      value: "Very High",
      description:
        "กิจกรรมที่มีความเข้มข้นสูงสุด เช่น การซ้อมหรือแข่งขันกีฬาแบบเต็มที่ทุกวัน",
    },
  ];

  const handleActivitySelection = (selectedActivity) => {
    setPhysicalActivity(selectedActivity);
    setFormData({ ...formData, physical_activity: selectedActivity }); // Update formData with selected activity level
  };

  const handleNextStep = () => {
    if (physical_activity) {
      nextStep();
    } else {
      alert("กรุณาเลือกระดับกิจกรรมทางกายภาพ");
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
        <Title>กิจกรรมทางกายภาพ</Title>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#ABABAB",
            marginTop: "-10px",
            textAlign: "center",
          }}
        >
          เลือกระดับกิจกรรมของคุณ
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {activityLevels.map(({ label, value, description }) => (
          <Button
            key={value}
            onClick={() => handleActivitySelection(value)}
            title={description} // ใช้คำอธิบายในการแสดง Tooltip
            style={{
              height: "75px",
              width: "280px",
              fontSize: value === "Very High" ? "12px" : "14px",
              backgroundColor:
                physical_activity === value ? "#FF7F32" : "#FBF3E6",
              border:
                physical_activity === value ? "none" : "1px solid #915B43",
              color: physical_activity === value ? "#FFF" : "#915B43",
              textAlign: "center",
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      <Button onClick={handleNextStep} disabled={!physical_activity}>
        ถัดไป
      </Button>
    </Container>
  );
}

export default PhysicalActivitySelection;
