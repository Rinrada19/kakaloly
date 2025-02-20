import React from 'react';
import { Link } from 'react-router-dom'; // ใช้ Link สำหรับการนำทางใน React Router
import styles from '../component-history/header.module.scss';

// import
import goback from "../../imgAll/element/goback.png";

function Gobackhead({ text, link }) {
    return (
      <div className={styles.container}>
          <div className={styles.go__back}>
              {/* ถ้าใส่ link ให้ใช้ <Link> ถ้าไม่ใส่ก็แค่ <div> */}
              {link ? (
                  <Link to={link}>
                      <img src={goback} className={styles.go__backicon} alt="Go Back" />
                  </Link>
              ) : (
                  <img src={goback} className={styles.go__backicon} alt="Go Back" />
              )}
              <span
                  style={{
                      marginLeft: "24px",
                      fontSize: "24px",
                      color: "#915B43",
                      fontWeight: "600",
                  }}
              >
                  {text}
              </span>
          </div>
      </div>
    );
}

export default Gobackhead;
