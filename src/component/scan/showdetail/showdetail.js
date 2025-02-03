import React from "react";
import "./showdetailcss.scss"; // สร้างไฟล์ CSS สำหรับสไตล์
import dinner_dining from "../../../imgAll/icon/dinner_dining.svg";
import Barley from "../../../imgAll/icon/Barley.svg";
import cal from "../../../imgAll/icon/cal.svg";
import egg from "../../../imgAll/icon/egg.svg";
import Kawaii_Steak from "../../../imgAll/icon/Kawaii_Steak.svg";

const ShowDetail = ({ imageData, setStep }) => {
  return (
    <div className="detail-container">
      <div className="hearder">
        <img src={dinner_dining} className="header-icon" />
        <span>กระเพราหมูสับ</span>
      </div>
      <div className="img-container">
        <img src={imageData} alt="Taken photo" className="img-food" />
      </div>
      <div className="detail-section">
        <div className="row-item-cal">
          <div className="title-cal">
            <img src={cal} />
            <span>แคลลอรี่</span>
          </div>
          <span>sadsaddsa: {""}g</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={Barley} />
            <span>คาร์โบไฮเดรต</span>
          </div>
          <span>sadsaddsa: {""}g</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={Kawaii_Steak} />
            <span>โปรตีน</span>
          </div>
          <span>sadsaddsa: {""}g</span>
        </div>
        <div className="row-item">
          <div className="title">
            <img src={egg} />
            <span>ไขมัน</span>
          </div>
          <span>sadsaddsa: {""}g</span>
        </div>
      </div>
      <div className="button-container">
        <button className="next-button" onClick={() => setStep(4)}>
          ไป Step 3
        </button>
      </div>
    </div>
  );
};

export default ShowDetail;
