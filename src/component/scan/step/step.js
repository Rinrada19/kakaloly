import React, { useState } from "react";
import CameraComponent from "../camera/camera";
import ShowDetail from "../showdetail/showdetail";
import FormMeal from "../formmeal/formmeal";
import Succesful from "../successful/successful";
import List from "../list/list";
import Close from "../successful/close";

const Step = ({ setShowCamera }) => {
  const [imageData, setImage] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [completedMenus, setCompletedMenus] = useState([]);

  const handleImageTaken = (image) => {
    setImage(image);
    setStep(2);
  };
  const handleFormCompletion = () => {
    if (!imageData) {
      // ✅ ถ้าไม่มีรูป ให้ปิดกล้องได้เลย
      setShowCamera(false);
      return;
    }

    if (selectedMenu) {
      setCompletedMenus([...completedMenus, selectedMenu]);
      setSelectedMenu(null);
    }

    // ✅ แก้ไขให้ตรวจสอบว่า imageData ไม่ว่างก่อน
    if (completedMenus.length === 0 && imageData) {
      console.log("จำนวนเมนู", completedMenus.length);
      console.log("จำนวนเมนู+1", completedMenus.length + 1);
      alert("กรุณาเลือกเมนูให้ครบ");
    } else if (imageData && selectedMenu) {
      setStep(2);
    } else {
      setShowCamera(false);
    }
  };

  return (
    <div className="step-container">
      {step === 1 && (
        <CameraComponent
          setImage={handleImageTaken}
          setStep={setStep}
          setImageData={setImage} // ส่งฟังก์ชันนี้ไปยัง CameraComponent
        />
      )}
      {step === 2 && imageData && (
        <List
          imageData={imageData}
          setStep={setStep}
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          completedMenus={completedMenus}
          setCompletedMenus={setCompletedMenus} // ส่ง selectedMenu ไปให้ List
        />
      )}
      {step === 3 && imageData && selectedMenu && (
        <ShowDetail
          imageData={imageData}
          selectedMenu={selectedMenu}
          setStep={setStep}
        />
      )}
      {step === 4 && imageData && selectedMenu && (
        <FormMeal
          imageData={imageData}
          selectedMenu={selectedMenu}
          setStep={setStep}
        />
      )}
      {step === 5 && <Succesful setShowCamera={handleFormCompletion} />}
      {step === 6 && <Close />}
    </div>
  );
};

export default Step;
