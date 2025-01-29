import React from "react";
import styles from "./SearchMenu.module.scss"; // นำเข้าไฟล์ SCSS
import searchIcon from "../../../../imgAll/element/searchMenuIcon.png"; // นำเข้าไอคอน

function SearchMenu() {
  return (
    <div className={styles.searchMenu}>
      {/* กล่องที่ครอบไอคอนและ input */}
      <div className={styles.inputWrapper}>
        <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} />
        <input 
          
          type="text" 
          placeholder="Search . . ." 
          className={styles.searchInput} 
        />
      </div>
    </div>
  );
}

export default SearchMenu;
