import React, { useState } from 'react';
import "../../styles/custom.scss"; 
import Frame1 from './Frame1.js';
import Frame2 from './Frame2.js';
import Frame3 from './Frame3.js';
import Frame4 from './Frame4.js';
import Frame5 from './Frame5.js';
import Frame6 from './Frame6.js';
import Frame7 from './Frame7.js';
import Frame8 from './Frame8.js';  // Frame8 (GoalSelection)
import Frame9 from './Frame9.js';
import Frame10 from './Frame10.js';
import Frame12 from './Frame12.js';
import Frame11 from './Frame11.js';

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '', 
    height: '', 
    weight: '', 
    restrictions: [],
    healthConditions: [],
    // เพิ่มข้อมูลอื่นๆ ตามที่ต้องการ
  });

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
  
      }if (prevStep === 11) {
        return 8; // Force navigation to step 8 when on step 11
      }
      return prevStep > 1 ? prevStep - 1 : prevStep;
    });
  };

  return (
    <div>
      {currentStep === 1 && <Frame1 nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 2 && <Frame2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
      {currentStep === 3 && <Frame3 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 4 && <Frame4 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 5 && <Frame5 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 6 && <Frame6 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 7 && <Frame7 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 8 && <Frame8 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep}/>}
      {currentStep === 9 && <Frame9 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {currentStep === 10 && <Frame10 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
      {currentStep === 11 && <Frame12 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
      {currentStep === 12 && <Frame11 prevStep={prevStep} formData={formData} />}
    </div>
  );
}

export default RegistrationForm;
