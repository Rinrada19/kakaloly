import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import styles from "../ButtonSumDandW/ButtonSumDandW.module.scss";

const ButtonSumDandW = () => {
    const navigate = useNavigate();
    const location = useLocation(); // ตรวจสอบ path ปัจจุบัน

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/Summarypage", { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <div className={styles.container}>
            <div
                className={`${styles.wapper} 
                            ${location.pathname === "/Summarypage" ? styles.active : ""}`} 
                onClick={() => navigate("/Summarypage")} 
            >
                สรุปรายวัน
            </div>
            <div
                className={`${styles.wapper2} 
                            ${location.pathname === "/weeklysummary" ? styles.active : ""}`} 
                onClick={() => navigate("/weeklysummary")} 
            >
                สรุปรายสัปดาห์
            </div>
        </div>
    );
};

export default ButtonSumDandW;
