import React from "react";
import styles from "./SearchMenu.module.scss"; 
import searchIcon from "../../../../imgAll/element/searchMenuIcon.png"; 

function SearchMenu({ setSearchQuery }) {
  return (
    <div className={styles.searchMenu}>
      <div className={styles.inputWrapper}>
        <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search . . ." 
          className={styles.searchInput} 
          onChange={(e) => setSearchQuery(e.target.value)} // อัปเดตค่าค้นหา
        />
      </div>
    </div>
  );
}

export default SearchMenu;
