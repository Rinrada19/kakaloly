import React from 'react';

const NavItem = ({label,link,img,className}) => {
  return (
    <li className={className}>
      <a href={link}>
        <img className="icon_img" src={img} alt='icon'></img>{label}
      </a>
    </li>
  );
}

export default NavItem;
