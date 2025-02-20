import React from "react";

const NavItem = ({ label, link, img, className, onClick }) => {
  return (
    <li className={className} onClick={onClick}>
      <a href={link}>
        <img className="icon-img" src={img} alt="icon" />
        {label}
      </a>
    </li>
  );
};

export default NavItem;
