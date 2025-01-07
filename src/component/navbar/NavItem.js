import React from 'react';

const NavItem = ({label,link,img,className}) => {
  return (
    <li className={className}>
      <a href={link}>
        <img className="icon-img" src={img} alt='icon'></img>{label}
      </a>
    </li>
  );
}

export default NavItem;
