
import React from 'react';
import NavItem from './NavItem'; //เเท็ก a
import "./stylescomponent.scss" 


//นำรูปเข้ามา
import historyicon from '../../imgAll/icon/historyicon.webp';
import mainicon from '../../imgAll/icon/mainicon.webp';
import recipesicon from '../../imgAll/icon//recipesicon.webp';
import shareicon from '../../imgAll/icon//shareicon.webp';
import photoicon from '../../imgAll/icon//photoicon.webp';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <NavItem img={mainicon} label="หน้าเเรก" link="/" />
        <NavItem img={historyicon} label="ประวัติ" link="#" />
        <NavItem className="icon-photo" img={photoicon}link="/contact" />
        <NavItem img={recipesicon} label="เมนู" link="/contact" />
        <NavItem img={shareicon} label="เเชร์เพื่อน" link="/contact" />
      </ul>
    </nav>
  );
}
export default NavigationBar;



