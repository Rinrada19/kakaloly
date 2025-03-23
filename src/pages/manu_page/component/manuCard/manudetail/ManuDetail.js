import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./MenuDetail.module.scss";
import FormMeal45 from "../../../../../component/scan/formmeal/formmeal4.5";

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
  const [step, setStep] = useState(0);
  // สเตตัสที่ใช้ในการควบคุมขั้นตอน

  // console.log("🟢Showfood", food);
  // ถ้าไม่มีข้อมูลอาหาร
  if (!food) {
    return <div>ไม่พบข้อมูลอาหาร</div>;
  }

  const handleAddMeal = () => {
    // เปลี่ยนขั้นตอนเป็น 4 เมื่อเลือกเมนู
    setStep(4.5);
  };

  const { food_description } = food;

  return (
    <div className={styles.container}>
      <div
        className="container"
        style={{
          paddingBottom: "40px",
          height: "100%",
          backgroundColor: "#FFF2EA",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flexGrow: "1" }}>
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
            <div
              className="row"
              style={{ padding: "0 40px", marginBottom: "30px" }}
            >
              <img
                className={styles.imgdetail}
                src={`/img/imgfood/${food.food_id}.webp`} // ใช้ public folder
                alt={food.food_name}
              />
            </div>
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
            <div className={styles.container_description}>
              <div className={styles.description_food}>{food_description}</div>
            </div>
          </div>
        </div>

        <div className={styles.buttoncontainer}>
          <button className={styles.button} onClick={handleAddMeal}>
            เพิ่มมื้ออาหาร
          </button>
        </div>
        {/* ถ้า step เป็น 4 ให้แสดง FormMeal และส่ง selectedMenu */}
        {step === 4.5 && (
          <>
            <FormMeal45 selectedMenu={food} setStep={setStep} />
            <div className={styles.overlay} onClick={() => setStep(0)}></div>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuDetail;
