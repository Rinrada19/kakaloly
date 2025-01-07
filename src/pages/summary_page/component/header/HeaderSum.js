import React from 'react';
import styles from './header.module.scss';  // นำเข้าไฟล์ SCSS Module
// import { users } from "../../../../test_mock/MockData";


// import รูปมา
import icon__profile from '../../../../imgAll/icon/person-circle-outline.png'
import goback from "../../../../imgAll/element/goback.png"

const HeaderSum = () => {
    return(
        <header className= {styles.container }>
            <div className="header__left">
                <h1 className= {styles.h1__header}>Kakalory</h1>
                <div className= {styles.go__back}>
                    <img src={goback} className={styles.go__backicon} alt="Go Back">
                    </img>
                    <span style={{ marginLeft: "20px",fontSize: "18px",color:"#915B43" }}>ภาพรวม</span>
                </div>
                {/* <p className = {styles.nameCustomer1}>สวัสดีคุณ <span className = {styles.nameCustomer} > {item.name} </span></p> */}
            </div>
            <img src={icon__profile} alt= "Iconprofile" className= {styles.icon__person} ></img>
        </header>
       
    );
}
export default HeaderSum;