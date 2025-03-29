import React, { useState } from "react";
import { Container, Title, Button, Input } from "./styles";
import backbutton from "../../imgAll/icon/backbutton.webp";

function HeightWeightForm({ nextStep, prevStep, formData, setFormData }) {
  const [errors, setErrors] = useState({ height: "", weight: "" });

  const validateHeight = (value) => {
    const height = parseFloat(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, height: "กรุณากรอกส่วนสูงของคุณ" }));
    } else if (isNaN(height) || height < 100 || height > 250) {
      setErrors((prev) => ({
        ...prev,
        height: "กรุณากรอกส่วนสูงที่ถูกต้อง (100-250 ซม.)",
      }));
    } else {
      setErrors((prev) => ({ ...prev, height: "" }));
    }
  };

  const validateWeight = (value) => {
    const weight = parseFloat(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, weight: "กรุณากรอกน้ำหนักของคุณ" }));
    } else if (isNaN(weight) || weight < 20 || weight > 300) {
      setErrors((prev) => ({
        ...prev,
        weight: "กรุณากรอกน้ำหนักที่ถูกต้อง (20-300 กก.)",
      }));
    } else {
      setErrors((prev) => ({ ...prev, weight: "" }));
    }
  };

  const handleNextStep = () => {
    if (
      !errors.height &&
      !errors.weight &&
      formData.height &&
      formData.weight
    ) {
      nextStep();
    } else {
      alert("กรุณากรอกส่วนสูงและน้ำหนักให้ถูกต้อง");
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
          gap: "20px",
        }}
      >
        {/* ส่วนสูง */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
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
            value={formData.height || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, height: value });
              validateHeight(value);
            }}
          />
          {errors.height && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.height}
            </p>
          )}
        </div>

        {/* น้ำหนัก */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
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
            value={formData.weight || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, weight: value });
              validateWeight(value);
            }}
          />
          {errors.weight && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.weight}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleNextStep}
        disabled={
          !formData.height ||
          !formData.weight ||
          !!errors.height ||
          !!errors.weight
        }
        style={{
          opacity:
            !formData.height ||
            !formData.weight ||
            !!errors.height ||
            !!errors.weight
              ? 0.5
              : 1,
          cursor:
            !formData.height ||
            !formData.weight ||
            !!errors.height ||
            !!errors.weight
              ? "not-allowed"
              : "pointer",
        }}
      >
        ถัดไป
      </Button>
    </Container>
  );
}

export default HeightWeightForm;
