import React from "react";
import styles from "./CardFriend.module.scss";
import ChartDonut from "../chartdonut/ChartDonut";

function CardFriend({ frirend, isSelected, onClick }) {
  const { name, consumed, goal, avarta } = frirend;  

  return (
    <div 
      className={`${styles.box_friend} ${isSelected ? styles.selected : ""}`} 
      onClick={onClick}
    >
      <div className={styles.leftside}>
        <img src={avarta} alt="Friend Avatar" className={styles.avarta} />
        <div className={styles.info}>
          <p style={{ fontWeight: "600", fontSize: "16px" }}>{name}</p>
          <p>{consumed}/{goal} kcal</p>
        </div>
      </div>
      <div className={styles.rightside}>
        <ChartDonut value={consumed} max={goal} isSelected={isSelected}/>
      </div>
    </div>
  );
}

export default CardFriend;
