import React, { useState } from "react";
import styles from "./Friend.module.scss";
import "../../styles/custom.scss"; 

import NavigationBar from "../../component/navbar/NavigationBar";
import Gobackhead from "../../component/component-history/gobackhead";
import { frirend } from "../../../src/test_mock/Mockdata2"; 
import CardFriend from "./component/cardFrieds/CardFriend";

//element
import foodfriend from "../../imgAll/element/morningfriend.webp";
import snackicon from "../../imgAll/element/snackicon.webp";
import drinkicon from "../../imgAll/element/drinkicon.webp";
import addfriend from "../../imgAll/element/addfriend.webp";

function Friendpage() {
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  // ฟังก์ชันเปิด/ปิด modal
  const handleSelectFriend = (id) => {
    setSelectedFriendId((prevId) => (prevId === id ? null : id)); 
  };

  // ฟังก์ชันปิด modal เมื่อลูกค้าคลิกข้างนอก
  const handleCloseModal = () => {
    setSelectedFriendId(null);
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ส่วนหัวมีheader วันที่ เเอดเพื่อน */}
      <div className={styles.wrapper} style={{ backgroundColor: "#FBF3E6" }}>
        <div className="container" style={{ height: "100vh", paddingTop: "30px" }}> 
          <Gobackhead text="เพื่อนของฉัน" link="/home" /> 
          {/* วันที่เเสดง */}
          <p className={styles.date}>
              วันที่, {new Date().toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
          
          <div className="row g-3">

          {/* Add friend */}
          <div className="col-12 d-flex justify-content-end"
          style={{
            margin:"0 -25px"
          }}>
           {/* รูปปุ่มเพิ่มเพื่อน */}
           
            <img
              src={addfriend}
              className={styles.addfriend}
              alt="Add friend"
              onClick={() => setShowModal(true)} 
              style={{ cursor: "pointer" }}
            />

            {showModal && (  // ตรวจสอบว่า showModal เป็น true ก่อนแสดง
              <div className={styles.backdrop} onClick={() => setShowModal(false)}>
                <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                  <div style={{
                    display:"flex",
                    justifyContent:"end",
                    marginRight:"-20px"
                  }}>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} style={{filter: "invert(0.5)"}}></button>
                  </div>
                  <div className={styles.modal_header}>
                    <h5 className="modal-title" style={{fontSize:"16px",fontWeight:"600",color:"#ABABAB",marginBottom:"15px",paddingLeft:"5px"}}>เพิ่มเพื่อน</h5>
                    
                  </div>
                  <div className={styles.modal_body}>
                    <h5>น้ำหนึ่ง</h5>
                    <div>
                       <p style={{fontWeight:"400",fontSize:"14px",color:"#ABABAB"}}>ID ของฉัน</p>
                       <p style={{fontWeight:"600",fontSize:"16px",color:"#A4A4A4"}}>6458-12485-1585</p>
                    </div>
                  </div>
                  <div>
                    <p style={{fontWeight:"600",fontSize:"16px",color:"#ABABAB"}}>ค้นหาเพื่อนของคุณ</p>
                    <div> 
                      <input className={styles.input} placeholder="ใส่ ID เพื่อนของคุณ"></input>
                    </div>
                    <button className={styles.buttonfriend}>ยืนยัน</button>
                   
                  </div>
                  {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>ปิด</button>
                    <button type="button" className="btn btn-primary">ยืนยัน</button>
                  </div> */}
                </div>
              </div>
            )}



          </div>
            {frirend.map((item) => (
              <div key={item.id} className="col-12">
                <CardFriend 
                  frirend={item} 
                  isSelected={selectedFriendId === item.id} 
                  onClick={() => handleSelectFriend(item.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Backdrop คลุม modal */}
        {selectedFriendId && (
          <div className={styles.backdrop} onClick={handleCloseModal}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className="container p-3 d-flex flex-column justify-content-center align-items-center" style={{
              marginTop:'20px'
            }}>
                {frirend.map((friend) => 
                  friend.id === selectedFriendId && (
                    <div key={friend.id} className="row d-flex justify-content-center align-items-center text-center w-100">
                      <div className="col-12 pb-2">
                        <img 
                          src={friend.avarta} 
                          alt={friend.name} 
                          className="img-fluid rounded-circle"
                          style={{ width: "70px", height: "70px", objectFit: "cover" , border: "1px solid black" }}
                        />
                      </div>
                      {/* ชื่อ เเละ เเคลที่กินเเละจำนวนเเคลที่ต้องกิน */}
                      <div className="col-12 d-flex justify-content-between align-items-baseline ps-4 pe-4 pb-4">
                        <h1 style={{color:"#EF7430"}}>{friend.name}</h1>
                        <p style={{color:"#EF7430"}}>{friend.consumed}<span style={{color:"#ABABAB"}}>/{friend.goal}</span> 
                        <span style={{fontSize:"16px",color:"#ABABAB"}}> kcal</span></p>
                      </div>

                      {/* ตัว อาหาร ของหวาน เครื่องดื่ม */}
                    <div className={styles.cardAll}>
                      <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                         <div className={styles.wrappercard}> 
                          <div className={styles.box1}>
                            <img src={foodfriend} alt="description" className={styles.elementicon}/>
                            <p style={{color:"#915B43"}}>อาหาร</p>
                          </div>
                          <div className={styles.box2}>
                            <p style={{color:"#EF7430"}}>{friend.foodAll} <span style={{color:"#ABABAB"}}>kcal</span></p>
                          </div>
                         </div>
                      </div>

                      <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                         <div className={styles.wrappercard}> 
                          <div className={styles.box1}>
                            <img src={snackicon} alt="description" className={styles.elementicon}/>
                            <p style={{color:"#915B43"}}>ของว่าง</p>
                          </div>
                          <div className={styles.box2}>
                            <p style={{color:"#EF7430"}}>{friend.snackAll} <span style={{color:"#ABABAB"}}>kcal</span></p>
                          </div>
                         </div>
                      </div>

                      <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                         <div className={styles.wrappercard}> 
                          <div className={styles.box1}>
                            <img src={drinkicon} alt="description" className={styles.elementicon}/>
                            <p style={{color:"#915B43"}}>เครื่องดื่ม</p>
                          </div>
                          <div className={styles.box2}>
                            <p style={{color:"#EF7430"}}>{friend.drinkAll} <span style={{color:"#ABABAB"}}>kcal</span></p>
                          </div>
                         </div>
                      </div>
                   </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <NavigationBar />
      </div>
    </>
  );
}

export default Friendpage;
