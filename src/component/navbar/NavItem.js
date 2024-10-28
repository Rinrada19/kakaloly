import React from 'react';
import "./stylescomponent.scss" ;


const NavItem = ({label,link,img,className}) => {
  return (
    <li className={className}> 
      <a href={link}>
        <img className="icon-img" src={img}></img>{label}
      </a>
    </li>
  );
}

export default NavItem;
