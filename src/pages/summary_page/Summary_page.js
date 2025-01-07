import React from 'react';
import HeaderSum from './component/header/HeaderSum';
import Weight from '../../component/summay-Weight/Weight';
import ButtonSum_DandW from '../../pages/summary_page/component/button_sumdayandweek/ButtonSum_DandW';


function Summary_page() {
  return (
      <body style={{
        background: "#FFF2EA"
      }}>
        <div className='container'>
          <HeaderSum/> 
          <ButtonSum_DandW/>
          <Weight/>
         
        </div>
      </body>
  
  );
}

export default Summary_page;
