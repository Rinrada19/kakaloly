import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Scan } from "../../../api/api_scan"; // เรียก API Scan
import "./cameracss.scss";

import gallery from "../../../imgAll/icon/gallery.svg";
import menu_book from "../../../imgAll/icon/menu_book.svg";
import take_photo from "../../../imgAll/icon/take_photo.svg";

const CameraComponent = ({ setImage, setStep, setImageData }) => {
  const cameraRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (image) => {
    try {
      const response = await Scan(image); // ส่งไฟล์ภาพไปให้ Scan
      if (response) {
        // console.log("ข้อมูลที่ได้จาก API:", response); // ตรวจสอบข้อมูลที่ได้
        setImageData(response); // ส่งข้อมูลที่ได้ไปยัง Step
        setStep(2); // ไปยัง Step 2
      } else {
        // console.log("ไม่พบข้อมูลจาก API");
      }
    } catch (error) {
      // console.log("ไม่มีเมนูนี้");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // แสดงรูปที่เลือก
      handleUpload(file); // อัปโหลดรูปไป API
    }
  };
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        setImage(photo); // เก็บภาพที่ถ่าย

        // ตรวจสอบว่า photo เป็น base64 หรือไฟล์
        if (photo) {
          const imageFile = await fetch(photo)
            .then((res) => res.blob()) // แปลงจาก base64 เป็นไฟล์
            .then(
              (blob) => new File([blob], "photo.jpg", { type: "image/jpeg" })
            );

          await handleUpload(imageFile); // อัปโหลดรูปไป API
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการถ่ายรูป", error);
        alert("ไม่สามารถถ่ายรูปได้");
      }
    }
  };

  return (
    <div className="camera-container">
      <div className="video-container">
        <Camera ref={cameraRef} facingMode="environment" />
      </div>

      <div className="controls">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="gallery-btn"
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

        <button onClick={() => setStep(2)} className="menu_book-btn">
          <img
            src={menu_book}
            alt="menu_book icon"
            className="menu_book-icon"
          />
          <span className="menu_book-label">เมนู</span>
        </button>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};

export default CameraComponent;
