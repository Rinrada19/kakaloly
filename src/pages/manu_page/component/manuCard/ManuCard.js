import React from "react";
import styles from "./ManuCard.module.scss";
import "../../../../styles/custom.scss";

//import { mockMenuData } from "../../../../test_mock/Mockdata2.js";

function ManuCard({ foods }) {
  return (
    <div className={`container ${styles.menuContainer}`}>
      <div className="row">
        {foods.map((item) => (
          <div key={item.food_id} className="col-6 col-sm-4 col-lg-3 g-3">
            {" "}
            {/* แบ่ง Column */}
            <div className={styles.card}>
              <img
                src={
                  item.image ||
                  "https://www.shutterstock.com/image-vector/food-icon-lunch-fork-knife-260nw-399958996.jpg"
                }
                alt={item.name}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3 className={styles.name}>{item.food_name}</h3>
                <p className={styles.calories}>
                  <span className={styles.caloriesValue}>{item.cal}</span>{" "}
                  <span style={{ color: "#EF7430" }}>·</span> Calories
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
