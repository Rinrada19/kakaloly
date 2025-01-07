import React from 'react';
import "../../styles/custom.scss"; 
import HeaderSum from './component/header/HeaderSum';
import Weight from '../../component/summay-Weight/Weight';
import ButtonSumDandW from './component/ButtonSumDandW/ButtonSumDandW';


function Summarypage() {
  return (
  
        <div className='container'>
          <HeaderSum/> 
          <ButtonSumDandW/>
          <Weight/>
  
        </div>

  );
}

export default Summarypage;
