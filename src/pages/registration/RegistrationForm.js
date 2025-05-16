import React, { useState, useEffect } from "react";
import "../../styles/custom.scss";
import Frame1 from "./Frame1.js";
import Frame2 from "./Frame2.js";
import Frame3 from "./Frame3.js";
import Frame4 from "./Frame4.js";
import Frame5 from "./Frame5.js";
import Frame6 from "./Frame6.js";
import Frame7 from "./Frame7.js";
import Frame8 from "./Frame8.js"; // Frame8 (GoalSelection)
import Frame9 from "./Frame9.js";
import Frame10 from "./Frame10.js";
import Frame12 from "./Frame12.js";
import Frame11 from "./Frame11.js";
import { registerUser } from "../../api/api_register.js"; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietary_restriction: [],
    congenital_disease: [],
    goal: "",
    require_weight: "",
    physical_activity: "",
    // เพิ่มข้อมูลอื่นๆ ตามที่ต้องการ
  });

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage ที่เก็บไว้ในหน้า RegistrationPage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }));
      //console.log("email :", userData.email);
    }
  }, []);

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 9) {
        return 11; // Force navigation to step 11 when on step 9
      }
      return prevStep + 1;
    });
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 9) {
        return 8; // Force navigation to step 11 when on step 9
      }
      if (prevStep === 10) {
        return 8; // Force navigation to step 8 when on step 10
      }
      if (prevStep === 11) {
        return 8; // Force navigation to step 8 when on step 11
      }
      return prevStep > 1 ? prevStep - 1 : prevStep;
    });
  };

  useEffect(() => {
    // แสดงข้อมูลเมื่อเฟรม 11 ถูกแสดง
    if (currentStep === 11) {
      // console.log("ข้อมูลที่กรอกทั้งหมด:", formData);
    }
  }, [currentStep, formData]);

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async () => {
    const formDataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      gender: true,
      //gender: formData.gender, // ให้แน่ใจเป็น boolean
      age: parseInt(formData.age, 10),
      height: parseInt(formData.height, 10),
      weight: parseInt(formData.weight, 10),
      dietary_restriction: formData.dietary_restriction.length
        ? formData.dietary_restriction
        : ["ไม่มี"],
      congenital_disease: formData.congenital_disease.length
        ? formData.congenital_disease
        : ["ไม่มี"],
      physical_activity: formData.physical_activity.toLowerCase(), // แปลงเป็น lowercase
      goal: formData.goal,
      require_weight: formData.require_weight
        ? parseInt(formData.require_weight, 10)
        : parseInt(formData.weight, 10),
    };

    // console.log(
    //   "ข้อมูลที่จะส่งไปยัง API:",
    //   JSON.stringify(formDataToSend, null, 2)
    // );

    await sendToBackend(formDataToSend);
    alert("กรุณาเข้าสู่ระบบเพื่อเริ่มต้นใช้งาน");
    navigate("/");
  };

  // ฟังก์ชันเพื่อส่งข้อมูลไปยัง backend
  const sendToBackend = async (data) => {
    try {
      //console.log("ส่งข้อมูลไป backend:", data);
      //const response = await registerUser(data);
      // console.log("การสมัครสำเร็จ:", response);
    } catch (error) {
      console.error("การสมัครไม่สำเร็จ:", error);
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <Frame1
          nextStep={nextStep}
          prevStep={prevStep} // ควรส่ง prevStep ด้วย
          formData={formData}
          handleSubmit={handleSubmit} // ส่ง handleSubmit ไปที่ Frame1
        />
      )}

      {currentStep === 2 && (
        <Frame2
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 3 && (
        <Frame3
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 4 && (
        <Frame4
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 5 && (
        <Frame5
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 6 && (
        <Frame6
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 7 && (
        <Frame7
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 8 && (
        <Frame8
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 9 && (
        <Frame9
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 10 && (
        <Frame10
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 11 && (
        <Frame12
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
      {currentStep === 12 && (
        <Frame11 prevStep={prevStep} formData={formData} />
      )}
    </div>
  );
}

export default RegistrationForm;
