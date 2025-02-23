import React from "react";
import styles from "./CardFriend.module.scss";
import ChartDonut from "../chartdonut/ChartDonut";

function CardFriend({ friend, isSelected, onClick }) {
  const { friend_username, total_cal, goal_cal, avarta } = friend;

  // console.log("frirend---", friend[0]);
  return (
    <div
      className={`${styles.box_friend} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.leftside}>
        {/* <img src={avarta} alt="Friend Avatar" className={styles.avarta} /> */}
        <div className={styles.info}>
          <p style={{ fontWeight: "600", fontSize: "16px" }}>
            {friend_username}
          </p>
          <p>
            {total_cal}/{goal_cal} kcal
          </p>
        </div>
      </div>
      <div className={styles.rightside}>
        <ChartDonut value={total_cal} max={goal_cal} isSelected={isSelected} />
      </div>
    </div>
  );
}

export default CardFriend;
