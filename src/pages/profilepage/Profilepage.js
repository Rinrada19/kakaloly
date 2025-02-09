import React from 'react';
import styles from './Profilepage.module.scss'
//css

import NavigationBar from "../../component/navbar/NavigationBar"
import gobackicon from "../../imgAll/element/goback.png"


const Profilepage = () => {

  return (
    <>
    <div className={styles.wrapper}>
        <div className="container">
            <div className={styles.header}>
                <img src={gobackicon} className={styles.gobackicon}></img>
                <h3 className={styles.namehead}>โปรไฟล์</h3>
                <div></div>
            </div>
            <div className={styles.info}>
                <img></img>
                <div>
                    <p>น้ำหนึ่ง</p>
                    <p>ME@gmail.com</p>
                </div>
            </div>       
        </div>
    </div>
    <NavigationBar />
    </>
  );
};

export default Profilepage;
