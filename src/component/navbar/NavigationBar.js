
import React from 'react';
import NavItem from './NavItem'; //เเท็ก a
import "./navigationbarcss.scss" 



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
        <NavItem img={mainicon} label="หน้าเเรก" link="/Home" />
        <NavItem img={historyicon} label="ประวัติ" link="/historypage" />
        <NavItem img={photoicon} className="icon-photo" link="/contact" />
        <NavItem img={recipesicon} label="เมนู" link="/Manupage" />
        <NavItem img={shareicon} label="เเชร์เพื่อน" link="/contact" />
      </ul>
    </nav>
  );
}
export default NavigationBar;



