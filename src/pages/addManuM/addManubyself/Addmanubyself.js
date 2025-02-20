import React from "react";
import { useModal } from "../../../component/modal/ModalContext";
import styles from "./addmanubyself.module.scss"; 

import NavigationBar from "../../../component/navbar/NavigationBar";

function Addmanubyself() {
  const { isModalOpen, toggleModal } = useModal();

  const closeModalFromAnotherPage = () => {
    if (isModalOpen) {
      toggleModal(); // ปิด Modal จากหน้าอื่น
    }
  };

  return (
    <>
      <div className={styles.warpper}>
        <div className="container"> 
          Hi
        </div>
        <NavigationBar/>
      </div>
    </>
  );
}

export default Addmanubyself;
