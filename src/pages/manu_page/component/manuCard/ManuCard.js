import React from "react";
import styles from "./ManuCard.module.scss";
import "../../../../styles/custom.scss";
import { useNavigate } from "react-router-dom";

//import { mockMenuData } from "../../../../test_mock/Mockdata2.js";

function ManuCard({ foods }) {
  const navigate = useNavigate(); // สร้าง instance ของ navigate

  const handleNavigate = (item) => {
    navigate(`/menu/${item.food_id}`, { state: { food: item } }); // ส่งข้อมูล food ไปใน state
  };

  return (
    <div className={`container ${styles.menuContainer}`}>
      <div className="row">
        {foods.map((item) => (
          <div key={item.food_id} className="col-6 col-sm-4 col-lg-3 g-3">
            {" "}
            {/* แบ่ง Column */}
            <div
              className={styles.card}
              onClick={() => handleNavigate(item)} // เมื่อคลิกจะไปยังหน้า MenuDetail
            >
              <div>
                <img
                  src={`/img/imgfood/${item.food_id}.webp`} // ใช้ public folder
                  alt={item.food_name}
                  className={styles.image}
                  onError={(e) => (e.target.src = "/images/default-food.jpg")} // ถ้ารูปหาย ให้ใช้ default
                />
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{item.food_name}</h3>
                <p className={styles.calories}>
                  <span className={styles.caloriesValue}>
                    {Math.floor(item.cal)}
                  </span>{" "}
                  <span style={{ color: "#EF7430" }}>·</span> kcal
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManuCard;
