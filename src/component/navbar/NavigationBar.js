import React from 'react';
import { useModal } from '../modal/ModalContext';
import NavItem from './NavItem';
import "./navigationbarcss.scss";

import historyicon from '../../imgAll/icon/historyicon.webp';
import mainicon from '../../imgAll/icon/mainicon.webp';
import recipesicon from '../../imgAll/icon/recipesicon.webp';
import shareicon from '../../imgAll/icon/shareicon.webp';
import photoicon from '../../imgAll/icon/photoicon.webp';

const NavigationBar = () => {
  const { openModal } = useModal(); // ใช้ openModal เพื่อเปิด Modal

  return (
    <nav>
      <ul>
        <NavItem img={mainicon} label="หน้าเเรก" link="/Home" />
        <NavItem img={historyicon} label="ประวัติ" link="/historypage" />
        <li onClick={openModal} className="icon_photo">
          <img src={photoicon} alt="Add Manu" />
        </li>
        <NavItem img={recipesicon} label="เมนู" link="/Manupage" />
        <NavItem img={shareicon} label="เเชร์เพื่อน" link="/friendpage" />
      </ul>
    </nav>
  );
};

export default NavigationBar;
