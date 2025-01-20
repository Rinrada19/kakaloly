import React, { useState } from "react";
import './water.scss';

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
            newGlasses[index] = true; // เปลี่ยนแก้วว่างเป็นมีน้ำ
            setGlasses(newGlasses);
        }
    };

    const handleRemove = () => {
        const index = glasses.lastIndexOf(true); // หาแก้วสุดท้ายที่มีน้ำ
        if (index !== -1) {
            const newGlasses = [...glasses];
            newGlasses[index] = false; // เปลี่ยนแก้วที่มีน้ำกลับเป็นว่าง
            setGlasses(newGlasses);
        }
    };

    return (
        <div>
        <div className="wrapper-water">
            <div className="header">
                <img
                    className="minus-icon"
                    src={minus}
                    alt="minus"
                    onClick={handleRemove}
                />
                <div>
                    <img className="watericon" src={waterelement} alt="water element" />
                    <span>ปริมาณน้ำที่ดื่ม</span>
                </div>
                <img
                    className="plus-icon"
                    src={plus}
                    alt="plus"
                    onClick={handleAdd}
                />
            </div>
            <div className="count-water">
                {/* แถวที่ 1 */}
                <div className="row">
                    {glasses.slice(0, 6).map((filled, index) => (
                        <img
                            key={`row1-${index}`}
                            className="water-icon"
                            src={filled ? water1 : water0}
                            alt={`water ${index}`}
                        />
                    ))}
                </div>
                {/* แถวที่ 2 */}
                <div className="row">
                    {glasses.slice(6, 12).map((filled, index) => (
                        <img
                            key={`row2-${index}`}
                            className="water-icon"
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
