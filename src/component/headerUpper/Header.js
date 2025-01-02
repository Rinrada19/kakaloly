import React from 'react';
import { users } from "../test_mock/MockData";
import styles from './header.module.scss';  // นำเข้าไฟล์ SCSS Module

// import รูปมา
import icon__profile from '../../imgAll/icon/person-circle-outline.jpg'
const Header = () => {
    const item = users[0]; // เลือกผู้ใช้คนแรกจาก array
    return(
        <div className='container'>
        <header className= {styles.container }>
            <div className="header__left">
                <h1 className= {styles.h1__header} >Kakalory</h1>
                <p className = {styles.nameCustomer1}>สวัสดีคุณ <span className = {styles.nameCustomer} > {item.name} </span></p>
            </div>
            
            <img src={icon__profile} alt= "Iconprofile" className= {styles.icon__person} ></img>
        </header>
        </div>
    );
}
export default Header;