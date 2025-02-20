import React from "react";
import "./showdetailcss.scss"; // สร้างไฟล์ CSS สำหรับสไตล์
import dinner_dining from "../../../imgAll/icon/dinner_dining.svg";
import Barley from "../../../imgAll/icon/Barley.svg";
import calorie from "../../../imgAll/icon/calorie.svg";
import egg from "../../../imgAll/icon/egg.svg";
import Kawaii_Steak from "../../../imgAll/icon/Kawaii_Steak.svg";

const ShowDetail = ({ imageData, selectedMenu, setStep }) => {
  // ดึงข้อมูลจาก selectedMenu
  const { food_name, cal, carb, protein, fat } = selectedMenu || {}; // ใช้ default value เป็น null เพื่อป้องกันข้อผิดพลาด

  return (
    <div className="detail-container">
      <div className="hearder">
        <img src={dinner_dining} className="header-icon" alt="dinner" />
        <span>{food_name || "ชื่ออาหาร"}</span>
      </div>
      {/* <div className="img-container">
        <img src={imageData} alt="Taken photo" className="img-food" />
      </div> */}
      <div className="detail-section">
        <div className="row-item-cal">
          <div className="title-cal">
            <img src={calorie} alt="calorie icon" />
            <span>แคลลอรี่</span>
          </div>
          <span>{cal || "0"} กิโลแคลอรี่</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={Barley} alt="carbs icon" />
            <span>คาร์โบไฮเดรต</span>
          </div>
          <span>{carb || "0"} กรัม</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={Kawaii_Steak} alt="protein icon" />
            <span>โปรตีน</span>
          </div>
          <span>{protein || "0"} กรัม</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={egg} alt="fat icon" />
            <span>ไขมัน</span>
          </div>
          <span>{fat || "0"} กรัม</span>
        </div>
      </div>
      <div className="button-container">
        <button className="next-button" onClick={() => setStep(4)}>
          ไป Step 4
        </button>
      </div>
    </div>
  );
};

export default ShowDetail;
