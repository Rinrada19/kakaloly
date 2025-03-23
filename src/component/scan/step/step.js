import React, { useState } from "react";
import CameraComponent from "../camera/camera";
import ShowDetail from "../showdetail/showdetail";
import FormMeal45 from "../formmeal/formmeal4.5";
import FormMeal from "../formmeal/formmeal";
import Succesful from "../successful/successful";
import List from "../list/list";
import Close from "../successful/close";
import MenuPage from "../MenuPage"; // เรียก MenuPage
import CreateMenu from "../createManu/CreateMenu"; // นำเข้าไฟล์ CreateMenu
import { useEffect } from "react"; // ✅ เพิ่ม useEffect

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
      // console.log("จำนวนเมนู", completedMenus.length);
      // console.log("จำนวนเมนู+1", completedMenus.length + 1);
      alert("กรุณาเลือกเมนูให้ครบ");
    } else if (imageData && selectedMenu) {
      setStep(2);
    } else {
      setShowCamera(false);
    }
  };
  useEffect(() => {
    // console.log("🟢 ค่า step ที่รับมาใน Step.js:", step);
    // console.log("🟢 ค่า step ที่รับมาใน selectedMenu:", selectedMenu);
  }, [step]);
  // console.log("🔄 [RENDER] Step.js รีเรนเดอร์ UI พร้อมค่า step:", step);
  // console.log("🔄 [RENDER] Step.js รีเรนเดอร์ UI พร้อมค่า selectedMenu:", step);
  const [, forceUpdate] = useState();

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
      {/* {step === 4 && imageData && selectedMenu && (
        <FormMeal
          imageData={imageData}
          selectedMenu={selectedMenu}
          setStep={setStep}
        />
      )}  อันของ ลูกน้ำ*/}
      {step === 4 && selectedMenu && (
        <>
          {/* {console.log("เเล้วส่งมาที่นี้อีกรอบ:", step)} */}
          <FormMeal selectedMenu={selectedMenu} setStep={setStep} />
        </>
      )}
      {step === 4.5 && selectedMenu && (
        <>
          {/* {console.log("เเล้วส่งมาที่นี้อีกรอบ:", step)} */}
          <FormMeal45 selectedMenu={selectedMenu} setStep={setStep} />
        </>
      )}
      {step === 5 && <Succesful setShowCamera={handleFormCompletion} />}
      {step === 6 && <Close />}
      {step === 7 && (
        <MenuPage
          setStep={setStep}
          step={step}
          setSelectedMenu={setSelectedMenu} // ส่ง setSelectedMenu
          selectedMenu={selectedMenu} // ส่ง selectedMenu
        />
      )}

      {step === 8 && <CreateMenu setStep={setStep} />}
    </div>
  );
};

export default Step;
