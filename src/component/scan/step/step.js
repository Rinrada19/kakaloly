import React, { useState } from "react";
import CameraComponent from "../camera/camera";
import ShowDetail from "../showdetail/showdetail";
import FormMeal from "../formmeal/formmeal";
import Succesful from "../successful/successful";
import List from "../list/list";

const Step = ({ setShowCamera }) => {
  // ✅ รับ setShowCamera มา
  const [imageData, setImage] = useState(null);
  const [step, setStep] = useState(1);

  const handleImageTaken = (image) => {
    setImage(image);
    setStep(2);
  };

  return (
    <div className="step-container">
      {step === 1 && (
        <CameraComponent setImage={handleImageTaken} setStep={setStep} />
      )}
      {step === 2 && imageData && (
        <List imageData={imageData} setStep={setStep} />
      )}
      {step === 3 && imageData && (
        <ShowDetail imageData={imageData} setStep={setStep} />
      )}
      {step === 4 && imageData && (
        <FormMeal imageData={imageData} setStep={setStep} />
      )}
      {step === 5 && <Succesful setShowCamera={setShowCamera} />}{" "}
      {/* ✅ ส่ง setShowCamera */}
    </div>
  );
};

export default Step;
