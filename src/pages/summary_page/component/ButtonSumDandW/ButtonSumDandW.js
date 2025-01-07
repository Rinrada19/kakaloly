import React, { useState } from 'react';
import styles from '../ButtonSumDandW/ButtonSumDandW.module.scss'; // นำเข้าไฟล์ SCSS Module

const ButtonSumDandW = () => {
    const [activeButton, setActiveButton] = useState('button1'); // เก็บสถานะของปุ่มที่ถูกเลือก

    const handleClick = (buttonName) => {
        setActiveButton(buttonName); // กำหนดปุ่มที่ถูกเลือก
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.wapper} ${
                    activeButton === 'button1' ? styles.active : ''
                }`} // เพิ่ม class active ถ้า activeButton === 'button1'
                onClick={() => handleClick('button1')} // กดแล้วเลือกปุ่ม 1
            >
                สรุปรายวัน
            </div>
            <div
                className={`${styles.wapper2} ${
                    activeButton === 'button2' ? styles.active : ''
                }`} // เพิ่ม class active ถ้า activeButton === 'button2'
                onClick={() => handleClick('button2')} // กดแล้วเลือกปุ่ม 2
            >
                น้ำหนักปัจจุบัน
            </div>
        </div>
    );
};

export default ButtonSumDandW;
