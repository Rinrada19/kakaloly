import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import "./cameracss.scss"; // สร้างไฟล์ CSS สำหรับสไตล์

import gallery from "../../../imgAll/icon/gallery.svg";
import menu_book from "../../../imgAll/icon/menu_book.svg";
import take_photo from "../../../imgAll/icon/take_photo.svg";

const CameraComponent = ({ setImage, setStep }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(true); // state สำหรับการแสดง/ซ่อนกล้อง
  const cameraRef = useRef(null);
  const fileInputRef = useRef(null);

  // ฟังก์ชันถ่ายรูป
  const takePhoto = async () => {
    console.log("ถ่ายรูป...");
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        console.log("รูปที่ถ่าย:", photo); // ตรวจสอบว่าได้รับผลลัพธ์จากการถ่ายรูป
        setImage(photo); // ส่งภาพที่ถ่ายไปยัง Step 2
        setStep(2); // เปลี่ยนขั้นตอนเป็น Step 2
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการถ่ายรูป", error);
      }
    }
  };

  // ฟังก์ชันเลือกไฟล์จากคลังภาพ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // อัพโหลดรูปจากคลัง
        setStep(2); // เปลี่ยนขั้นตอนเป็น Step 2
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="camera-container">
      {/* ถ้ากล้องยังแสดงอยู่จะแสดง Camera */}
      <div className="video-container">
        {isCameraVisible && (
          <Camera
            ref={cameraRef}
            facingMode="environment" // ตั้งค่ากล้องให้ใช้กล้องหลัง
          />
        )}
      </div>

      {/* ปุ่มถ่ายรูปและปุ่มปิดกล้อง */}
      <div className="controls">
        <button
          className="gallery-btn"
          onClick={() => fileInputRef.current?.click()} // คลิกที่ input file เมื่อกดปุ่ม
        >
          <img src={gallery} alt="Gallery icon" className="gallery-icon" />
          <span className="gallery-label">คลังภาพ</span>
        </button>

        <button onClick={takePhoto} className="take_photo-btn">
          <img
            src={take_photo}
            alt="take_photo icon"
            className="take_photo-icon"
          />
        </button>

        <button
          onClick={() => setIsCameraVisible(false)}
          className="menu_book-btn"
        >
          <img
            src={menu_book}
            alt="menu_book icon"
            className="menu_book-icon"
          />
          <span className="menu_book-label">เมนู</span>
        </button>

        {/* เพิ่ม input file ที่ซ่อน */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef} // เชื่อมโยงกับ ref
        />
      </div>
    </div>
  );
};

export default CameraComponent;
