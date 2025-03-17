import React from "react";
import styles from "./CardFriend.module.scss";
import ChartDonut from "../chartdonut/ChartDonut";
import cheese from "../../../../imgAll/imgfood_friendpage/cheeese.webp";
import bread from "../../../../imgAll/imgfood_friendpage/brand.webp";
import chicken from "../../../../imgAll/imgfood_friendpage/chicken.webp";
import eggs from "../../../../imgAll/imgfood_friendpage/eggs.webp";
import hotdog from "../../../../imgAll/imgfood_friendpage/hotdog.webp";
import lemon from "../../../../imgAll/imgfood_friendpage/lemon.webp";
import tomato from "../../../../imgAll/imgfood_friendpage/tomato.webp";

const foodImages = [cheese, bread, chicken, eggs, hotdog, lemon, tomato];

function CardFriend({ friend, isSelected, onClick }) {
  const { friend_username, total_cal, goal_cal, avarta } = friend;

  // เลือกรูปแบบสุ่มถ้าไม่มี avarta
  const randomImage = foodImages[Math.floor(Math.random() * foodImages.length)];
  const avatarSrc = avarta || randomImage;

  return (
    <div
      className={`${styles.box_friend} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.leftside}>
        <img src={avatarSrc} alt="Friend Avatar" className={styles.avarta} />
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
