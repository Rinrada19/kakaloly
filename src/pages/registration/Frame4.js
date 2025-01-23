import React from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function HeightWeightForm({ nextStep, prevStep, formData, setFormData }) {
  const handleNextStep = () => {
    if (
      formData.height &&
      !isNaN(formData.height) &&
      formData.height > 0 &&
      formData.weight &&
      !isNaN(formData.weight) &&
      formData.weight > 0
    ) {
      nextStep();
    } else {
      alert("Please enter valid height and weight");
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
      <Title>ส่วนสูงและน้ำหนักของคุณ</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
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
            ส่วนสูง (เซนติเมตร)
          </p>
          <Input
            type="number"
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
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
            น้ำหนัก (กิโลกรัม)
          </p>
          <Input
            type="number"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </div>
      </div>

      <Button
        onClick={handleNextStep}
        disabled={!formData.height || !formData.weight}
      >
        ถัดไป
      </Button>
    </Container>
  );
}

export default HeightWeightForm;
