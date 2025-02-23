import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./MenuDetail.module.scss";
import FormMeal from "../../../../../component/scan/formmeal/formmeal";

// img icon
import backbutton from "../../../../../imgAll/icon/backgray.png";
import Freameicon from "../../../../../imgAll/element/Frameicon.png";
import carbonicon from "../../../../../imgAll/element/carboicon.png";
import oilicon from "../../../../../imgAll/element/oilicon.png";
import potienicon from "../../../../../imgAll/element/potienicon.png";

function MenuDetail() {
  const { id } = useParams(); // รับค่า id จาก URL
  const location = useLocation();
  const { food } = location.state || {}; // ดึงข้อมูล food ที่ส่งมาจาก state

  const [step, setStep] = useState(1); // สเตตัสที่ใช้ในการควบคุมขั้นตอน

  console.log("foddddd--", food);
  // ถ้าไม่มีข้อมูลอาหาร
  if (!food) {
    return <div>ไม่พบข้อมูลอาหาร</div>;
  }

  const handleAddMeal = () => {
    // เปลี่ยนขั้นตอนเป็น 4 เมื่อเลือกเมนู
    setStep(4);
  };

  const { food_description } = food;

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <img
              src={backbutton}
              alt="Back"
              className={styles.backButton}
              onClick={() => window.history.back()}
            />
          </div>
          <h1>{food.food_name}</h1>{" "}
          {/* เปลี่ยนจาก menu.name เป็น food.food_name */}
          <div></div>
        </div>

        <div className={styles.contentder}>
          {/* info แคลอรี่ */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <img
                src={Freameicon}
                alt={food.food_name}
                className={styles.imageicon}
              />
              <p className={styles.namecal}>แคลอรี่</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.cal} <span className={styles.unit}>kcal</span>
              </p>
            </div>
          </div>
          {/* info คาร์โบไฮเดรต */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <img
                src={carbonicon}
                alt={food.food_name}
                className={styles.imageicon}
              />
              <p className={styles.namecal}>คาร์โบไฮเดรต</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.carb} <span className={styles.unit}>g</span>
              </p>
            </div>
          </div>
          {/* info โปรตีน */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <img
                src={potienicon}
                alt="protein"
                className={styles.imageicon}
              />
              <p className={styles.namecal}>โปรตีน</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.protein} <span className={styles.unit}>g</span>
              </p>
            </div>
          </div>
          {/* info ไขมัน */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <img src={oilicon} alt="fat" className={styles.imageicon} />
              <p className={styles.namecal}>ไขมัน</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.fat} <span className={styles.unit}>g</span>
              </p>
            </div>
          </div>
          {/* info โซเดียม */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <p className={styles.namecal}>โซเดียม</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.sodium} <span className={styles.unit}>mg</span>
              </p>
            </div>
          </div>
          {/* info น้ำตาล */}
          <div className={styles.info}>
            <div className={styles.nameinfo}>
              <p className={styles.namecal}>น้ำตาล</p>
            </div>
            <div>
              <p className={styles.mount}>
                {food.sugar} <span className={styles.unit}>g</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.buttoncontainer}>
          <button className={styles.button} onClick={handleAddMeal}>
            เพิ่มมื้ออาหาร
          </button>
        </div>
        <div style={{ padding: "20px" }}>{food_description}</div>
      </div>

      {/* ถ้า step เป็น 4 ให้แสดง FormMeal และส่ง selectedMenu */}
      {step === 4 && <FormMeal selectedMenu={food} setStep={setStep} />}
    </div>
  );
}

export default MenuDetail;
