import React from "react";
import styles from "./howto.module.scss";

import share from "../../imgAll/img/share.svg";
import sum from "../../imgAll/img/sum.svg";
import cameraicon from "../../imgAll/img/cameraicon.svg";
import star from "../../imgAll/img/star.jpg";

const Howto = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ❌
        </button>
        <div className={styles.howto_container}>
          <div className={styles.header}>
            <div className={styles.head}>
              <p>ยินดีต้อนรับสู่ Kakalory !</p>
            </div>
            <div className={styles.title}>
              <p>วิธีการใช้งานเบื้องต้น</p>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <div className={styles.section1_row1}>
                <img src={cameraicon} alt="camera icon" />
                <p className={styles.small_text}>
                  กดที่ปุ่มนี้ แล้วถ่ายรูปอาหารของคุณ <br />
                  จากนั้นจะแสดงรายละเอียดของอาหาร
                  <br />
                  ที่คุณทานแล้วกรอกรายละเอียดเพิ่มเติม
                  <br />
                  จากนั้นก็สำเร็จ
                </p>
              </div>
              <p className={styles.small_text}>
                โดย มี 10 เมนู ที่สามารถถ่ายด้วยรูปได้ ดังนี้
              </p>
              <p className={styles.small_text_menu}>
                ปูผัดผงกะหรี่, ทอดมัน, ไข่พะโล้, ผัดคะน้า, ต้มจืด, กุ้งเผา,
                <br /> ข้าวคลุกกะปิ,ก๋วยจั๊บ,ยำวุ้นเส้น, ไก่ย่าง
              </p>
            </div>

            <div className={styles.section}>
              <div className={styles.section2}>
                <p className={styles.small_text}>
                  กดตรงนี้ เพื่อดูสรุปประวัติการทานรายสัปดาห์!
                  <br /> ดูย้อนหลังว่าอาทิตย์นี้กินอะไรไปบ้าง
                </p>
                <img src={sum} alt="sum " />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.section1_row1}>
                <img src={share} alt="share " />
                <p className={styles.small_text}>
                  กดที่ปุ่มนี้ เพื่อเพิ่มเพื่อน <br />
                  ดูว่าเพื่อนกินอะไรบ้าง! อยากรู้ว่าเพื่อนกินอะไรวันนี้?
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.section1_row1}>
                <img src={star} alt="star " />
                <p className={styles.small_text}>
                  กดที่ปุ่มนี้ ในหน้า Profile เพื่อประเมิน
                  <br />
                  เว็ปแอปพลิเคชั่น
                </p>
              </div>
            </div>
            <div
              className={styles.section}
              style={{ paddingTop: "14px", paddingBottom: "14px" }}
            >
              <p style={{ fontSize: "16px" }}>
                คู่มือการใช้งาน{" "}
                <a
                  href="https://www.canva.com/design/DAGjf7fDj0c/nTPKVSIhP6QMSc3ul4vDog/view?utm_content=DAGjf7fDj0c&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf123a0c656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KakaLoLy
                </a>
              </p>{" "}
            </div>
          </div>
          <div className={styles.button_section}>
            <button onClick={onClose}>ใช้งานเลย!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howto;
