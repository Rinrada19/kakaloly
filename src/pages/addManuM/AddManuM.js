import React from "react";
import { useNavigate } from "react-router-dom";

function AddManuM() {
  const navigate = useNavigate(); 

  const goToAddmanubyself = () => {
    navigate("/addmanubyself"); // นำทางไปที่หน้า Addmanubyself
  };

  return (
    <div>
      <button onClick={goToAddmanubyself}>ไปที่xxx AddManuBySelf</button>
    </div>
  );
}

export default AddManuM;
