import React from "react";
import styles from "./ManuCard.module.scss"; 
import "../../../../styles/custom.scss";
import { Link } from "react-router-dom";

import { mockMenuData } from "../../../../test_mock/Mockdata2.js";

function ManuCard({ searchQuery }) {
  const filteredMenu = mockMenuData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`container ${styles.menuContainer}`}>
      <div className="row">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div key={item.id} className="col-6 col-sm-4 col-lg-3 g-3">
              <Link to={`/menu/${item.id}`}> {/* อันนี้เป็น link ที่จะเชื่อมไปเเต่ละเมนู */}
                <div className={styles.card}> {/* card เเต่ละอัน เเสดงตามอาหารใน mock */}
                  <img src={item.image} alt={item.name} className={styles.image} />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.calories}>
                      <span className={styles.caloriesValue}>{item.calories}</span> 
                      <span style={{color:"#EF7430"}}> ·</span> Calories
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", marginTop:"20px" }}>ไม่พบเมนูที่ค้นหา</p>
        )}
      </div>
    </div>
  );
}

export default ManuCard;
