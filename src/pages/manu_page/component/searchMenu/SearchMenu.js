import React from "react";
import styles from "./SearchMenu.module.scss"; // นำเข้าไฟล์ SCSS
import searchIcon from "../../../../imgAll/element/searchMenuIcon.png"; // นำเข้าไอคอน

function SearchMenu({ searchQuery, setSearchQuery }) {
  return (
    <div className={styles.searchMenu}>
      {/* กล่องที่ครอบไอคอนและ input */}
      <div className={styles.inputWrapper}>
        <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search . . ."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // อัพเดตค่า searchQuery
        />
      </div>
    </div>
  );
}

export default SearchMenu;
