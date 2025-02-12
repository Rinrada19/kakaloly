import React from "react";
//scss
import styles from './Sumweekpage.module.scss'

//import
import ButtonSumDandW from '../component/ButtonSumDandW/ButtonSumDandW'


const WeeklySummary = () => {
    return (
        <div className={styles.custombackground}>
             <div className='container' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                 <ButtonSumDandW/>
             </div>
        </div>
    );
};

export default WeeklySummary;