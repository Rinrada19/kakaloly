import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Scan } from "../../../api/api_scan"; // เรียก API Scan
import styles from "./camera.module.scss";

import gallery from "../../../imgAll/icon/gallery.svg";
import menu_book from "../../../imgAll/icon/menu_book.svg";
import takephoto from "../../../imgAll/icon/take_photo.svg";

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
    <div className={styles["camera-container"]}>
      <div className={styles["video-container"]}>
        <Camera ref={cameraRef} facingMode="environment" />
      </div>

      <div className={styles["controls"]}>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={styles["gallery-btn"]}
        >
          <img
            src={gallery}
            alt="Gallery icon"
            className={styles["gallery-icon"]}
          />
          <p className={styles["gallery-label"]}>คลังภาพ</p>
        </div>

        <div onClick={takePhoto} className={styles["divtake_photo"]}>
          <img src={takephoto} alt="icon" className={styles["take_photo"]} />
        </div>

        <div onClick={() => setStep(7)} className={styles["menu_book-btn"]}>
          <img
            src={menu_book}
            alt="menu_book icon"
            className={styles["menu_book-icon"]}
          />
          <p className={styles["menu_book-label"]}>เมนู</p>
        </div>

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
