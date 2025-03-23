import React from "react";
import style from "./navitem.module.scss";

const NavItem = ({ label, link, img, className, onClick }) => {
  return (
    <li className={className} onClick={onClick}>
      <a href={link}>
        <img className={style.icon_img} src={img} alt="icon" />
        {label}
      </a>
    </li>
  );
};

export default NavItem;
