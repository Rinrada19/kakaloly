import React from 'react';
import styles from '../component-history/header.module.scss';

// import
import goback from "../../imgAll/element/goback.png"
function Gobackhead({ text }) {
    return (
      <div className={styles.container}>
          <div className={styles.go__back}>
              <img src={goback} className={styles.go__backicon} alt="Go Back" />
              <span style={{ marginLeft: "24px", fontSize: "24px", color: "#915B43",fontWeight:"600" }}>{text}</span>
          </div>
      </div>
    );
  }

export default Gobackhead;
  


