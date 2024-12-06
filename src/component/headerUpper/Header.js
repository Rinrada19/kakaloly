import React from 'react';
import styles from './header.module.scss';  // นำเข้าไฟล์ SCSS Module

// import รูปมา
import icon__profile from '../../imgAll/icon/pofile-circle-outline.webp'
const Header = () =>{
    return(
        <header>
            <h1 className={styles.h1__header}>Kakalory</h1>
            <img src={icon__profile} alt= "Iconprofile" ></img>
        </header>
    );
}
export default Header;