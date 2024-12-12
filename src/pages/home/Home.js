// src/pages/Home/Home.js

import React from "react";
import "./HomeStyle.scss"; // นำเข้าไฟล์ SCSS
import { CameraComponent } from "../../components/camera/Camera";
import { UploadImage } from "../../components/uploadImage/UploadImage";
import { TestUseData } from "../../mockdata/TestUsedata";
import { Qna } from "../../mockdata/proptest/Qna";
export const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Home Page!</h1>
      <p>This is a simple example of a home page using SCSS.</p>
      <h1>สวัสดี</h1>
      <h1>น้ำหนึ่ง</h1>
      <CameraComponent />
      <UploadImage />
      <TestUseData />
      <Qna />
    </div>
  );
};
