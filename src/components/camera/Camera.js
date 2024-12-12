import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";

export const CameraComponent = () => {
  const [source, setSource] = useState("");
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  // เปิดกล้อง
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoRef.current.srcObject = stream;
  };

  // ถ่ายภาพ
  const capturePhoto = () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    // ตั้งค่า canvas
    const context = photoRef.current.getContext("2d");
    photoRef.current.width = width;
    photoRef.current.height = height;

    // วาดภาพจาก video ไปยัง canvas
    context.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = photoRef.current.toDataURL("image/png");
    setSource(dataUrl);
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <div className="w-100">
        <h5>Capture your image</h5>
        {/* วิดีโอแสดงภาพจากกล้อง */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <Button variant="primary" onClick={startCamera} className="mt-2">
          เปิดกล้อง
        </Button>
        <Button variant="success" onClick={capturePhoto} className="mt-2">
          ถ่ายภาพ
        </Button>

        {/* แสดงผลภาพที่ถ่าย */}
        {source && (
          <div
            className="mt-2"
            style={{ maxWidth: "100%", maxHeight: "auto", margin: "10px" }}
          >
            <h5>ภาพที่ถ่าย:</h5>
            <img
              src={source}
              alt="snap"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        {/* canvas สำหรับวาดภาพจาก video */}
        <canvas ref={photoRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};
