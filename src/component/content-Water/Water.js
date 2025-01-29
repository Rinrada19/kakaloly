import React, { useState } from "react";
import styles from "./Water.module.scss";

import minus from "../../imgAll/element/minus.png";
import waterelement from "../../imgAll/element/waterelement.png";
import plus from "../../imgAll/element/plus.png";
import water1 from "../../imgAll/element/water1.png";
import water0 from "../../imgAll/element/water0.png";

const Water = () => {
    const [glasses, setGlasses] = useState(Array(12).fill(false)); // สร้างแก้ว 12 แก้ว

    const handleAdd = () => {
        const index = glasses.indexOf(false); // หาแก้วว่างตัวแรก
        if (index !== -1) {
            const newGlasses = [...glasses];
            newGlasses[index] = true; // เปลี่นแก้วว่างเป็นมีน้ำ
            setGlasses(newGlasses);
        }
    };

    const handleRemove = () => {
        const index = glasses.lastIndexOf(true); // หาแก้วสุดท้ายที่มีน้ำ
        if (index !== -1) {
            const newGlasses = [...glasses];
            newGlasses[index] = false; // เปลี่นแก้วที่มีน้ำกลับเป็นว่าง
            setGlasses(newGlasses);
        }
    };

    return (
        <div>
        <div className={styles["wrapper-water"]}>
            <div className={styles.header}>
                <img
                    className={styles["minus-icon"]}
                    src={minus}
                    alt="minus"
                    onClick={handleRemove}
                />
                <div>
                    <img className={styles.watericon} src={waterelement} alt="water element" />
                    <span>ปริมาณน้ำที่ดื่ม</span>
                </div>
                <img
                    className={styles["plus-icon"]}
                    src={plus}
                    alt="plus"
                    onClick={handleAdd}
                />
            </div>
            <div className={styles["count-water"]}>
                {/* แถวที่ 1 */}
                <div className={styles.row}>
                    {glasses.slice(0, 6).map((filled, index) => (
                        <img
                            key={`row1-${index}`}
                            className={styles["water-icon"]}
                            src={filled ? water1 : water0}
                            alt={`water ${index}`}
                        />
                    ))}
                </div>
                {/* แถวที่ 2 */}
                <div className={styles.row}>
                    {glasses.slice(6, 12).map((filled, index) => (
                        <img
                            key={`row2-${index}`}
                            className={styles["water-icon"]}
                            src={filled ? water1 : water0}
                            alt={`water ${index + 6}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Water;
