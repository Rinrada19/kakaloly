import React from "react";
import { useParams } from "react-router-dom";
import styles from "./MenuDetail.module.scss";
import { mockMenuData } from "../../../../../test_mock/Mockdata2";

//img icon
import backbutton from "../../../../../imgAll/icon/backgray.png";
import Freameicon from "../../../../../imgAll/element/Frameicon.png";
import carbonicon from "../../../../../imgAll/element/carboicon.png";
import oilicon from "../../../../../imgAll/element/oilicon.png";
import potienicon from "../../../../../imgAll/element/potienicon.png";





function MenuDetail() {
  const { id } = useParams(); // รับค่า id จาก URL
  const menu = mockMenuData.find((item) => item.id.toString() === id); // ค้นหาเมนูตาม id

  if (!menu) return <h2 style={{ textAlign: "center" }}>ไม่พบเมนู</h2>;

  return (
    <div className={styles.container}>
        <div className="container">
            <div className={styles.header}>
                <div><img 
                    src={backbutton} 
                    alt="Back"  
                    className={styles.backButton} 
                    onClick={() => window.history.back()} 
                /></div>
                <h1>{menu.name}</h1>
                <div></div>
            </div>

            
            <div className={styles.contentder}>
                        <img src={menu.image} alt={menu.icon} className={styles.image} />
                        {/* info เเคลลอรี่*/}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                                <img src={Freameicon} alt={menu.name} className={styles.imageicon}/>
                                <p className={styles.namecal}>แคลอรี่</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.calories} <span className={styles.unit}>kcal</span></p>
                            </div>
                        </div>
                        {/* info คาร์โบไฮเดรต */}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                                <img src={carbonicon} alt={menu.name} className={styles.imageicon} />
                                <p className={styles.namecal}>คาร์โบไฮเดรต</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.carbs} <span className={styles.unit}>g</span></p>
                            </div>
                        </div>
                        {/* info โปรตีน */}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                                <img src={potienicon} alt="protein" className={styles.imageicon} />
                                <p className={styles.namecal}>โปรตีน</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.protein} <span className={styles.unit}>g</span></p>
                            </div>
                        </div>
                        {/* info ไขมัน */}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                                <img src={oilicon} alt="fat" className={styles.imageicon} />
                                <p className={styles.namecal}>ไขมัน</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.fat} <span className={styles.unit}>g</span></p>
                            </div>
                        </div>
                        {/* info โซเดียม */}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                                <p className={styles.namecal}>โซเดียม</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.sodium} <span className={styles.unit}>mg</span></p>
                            </div>
                        </div>
                        {/* info น้ำตาล */}
                        <div className={styles.info}>
                            <div className={styles.nameinfo}>
                            
                                <p className={styles.namecal}>น้ำตาล</p>
                            </div>
                            <div>
                                <p className={styles.mount}>{menu.sugar} <span className={styles.unit}>g</span></p>
                            </div>
                        </div>
            </div>

            <div className={styles.buttoncontainer}>
                <button className={styles.button}>เพิ่มมื้ออาหาร</button>
             </div>
             <div style={{
                padding: "20px",
             }}>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took 
             </div>
            
            
        </div> 
    </div>
  );
}

export default MenuDetail;
