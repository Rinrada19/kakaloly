import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from './ModalContext';
import NavigationBar from '../navbar/NavigationBar';

import styles from './Modal.module.scss';

const Modal = () => {
  const { isModalOpen, closeModal } = useModal();
  const navigate = useNavigate();

  const goToNextPage = (page) => {
    closeModal();  // ปิด Modal
    navigate(page);  // ไปยังหน้าใหม่
  };

  return (
    <div>
      {isModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button onClick={closeModal} className={styles.closeButton}>X</button>
            {/* เพิ่มปุ่มหรือเนื้อหาของ Modal ที่นี่ */}
            <button onClick={() => goToNextPage('/addmanubyself')}>ไปที่ AddManuBySelf</button>
            </div>
          {/* แสดง NavigationBar ในขณะที่ Modal เปิดอยู่ */}
          <NavigationBar />
        </div>
      )}
    </div>
  );
};

export default Modal;
