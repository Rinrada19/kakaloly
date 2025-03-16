import React from "react";
import styles from "./FilterButton.module.scss";

const FilterButton = ({ icon, activeIcon, label, isActive, onClick, iconStyle, style }) => {
    return (
      <div
        className={`${styles.foodfilter} ${isActive ? styles.active : ""}`}
        onClick={onClick}
        style={style} // ✅ รับ style ที่ส่งมา
      >
        <img
          src={isActive ? activeIcon : icon}
          className={`${styles.iconelement} ${isActive ? styles.activeIcon : ""}`}
          alt={label}
          style={iconStyle}
        />
        <h6 className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
          {label}
        </h6>
      </div>
    );
  };

export default FilterButton;
