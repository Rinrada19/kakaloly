import React from 'react';
import { useNavigate } from "react-router-dom";
//css
import styles from './Profilepage.module.scss'

//import compoentn and img
import imgprofile from "../../imgAll/img/imgprofile.webp"
import gobackicon from "../../imgAll/element/goback.png"
import facepro  from "../../imgAll/element/facepro.png"
import { users } from "../../test_mock/MockData"
//icon
import weighticon from './icon/weight.png';
import heighticon from './icon/heighticon.png';
import goalicon from './icon/goalicon.png';
import appleicon from './icon/appleicon.png';
import pillicon from './icon/pillicon.png';
import exiticon from './icon/exit.png';



const Profilepage = () => {
    const navigate = useNavigate();
    

  return (
    <>
    <div className={styles.wrapper}>
        <div className="container" style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
            <div className={styles.contents}>  
             {/* header */}
            <div className={styles.header}>
                <img onClick={() => navigate("/home")} src={gobackicon} className={styles.gobackicon}  alt="Go back" ></img>
                <h3 className={styles.namehead}>โปรไฟล์</h3>
                <div></div>
            </div>
            {/* ชื่อ อีเมล */}
            <div className={styles.info}> 
                <img src={imgprofile} alt='img' style={{width:"66px",border:"1px solid #ADADAD",borderRadius:"180px"}}></img>
                <div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"6px"}}>
                        <img src={facepro} alt='icon' style={{width:"17px",height:"16px"}}></img>
                        <p style={{color:"#915B43",fontWeight:"600"}}>น้ำหนึ่ง</p>
                    </div>
                    <p style={{color:"#747B82",fontWeight:"500"}}>ME@gmail.com</p>
                </div>
            </div>
            {/* เส้น */}
            <div className={styles.linebox}>
                 <div className={styles.line}>
                </div>
            </div>
            <div style={{color:"#915B43",fontWeight:"600",fontSize:"18px",marginBottom:"25px"}}>ข้อมูลส่วนตัว</div>
            
            {/* ข้อมูลส่วนตัว */}
            <div className='row g-0 gy-3'>
                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                            <div className={styles.insideleft}><img src={weighticon} className={styles.iconall} style={{width:"17px",height:"17px"}}></img></div>
                            <span style={{color:"#EF7430",}}>น้ำหนัก</span>
                        </div>
                        <div className={styles.contentright}>
                            <div style={{color:"#EF7430",fontWeight:"600"}}>{users[0]?.wight}</div> 
                            <div style={{color:"#EF7430",fontWeight:"500"}}>kg</div> 
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                        <div className={styles.insideleft}><img src={heighticon} className={styles.iconall} style={{width:"14px",height:"21px"}}></img></div>
                            <span style={{color:"#EF7430",}}>ส่วนสูง</span>
                        </div>
                        <div className={styles.contentright}>
                            <div style={{color:"#EF7430",fontWeight:"600"}}>{users[0]?.hight}</div> 
                            <div style={{color:"#EF7430",fontWeight:"500"}}>kg</div> 
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                        <div className={styles.insideleft}><img src={goalicon} className={styles.iconall} style={{width:"17px",height:"17px"}}></img></div>
                            <span style={{color:"#EF7430",}}>เป้าหมาย</span></div>
                        <div className={styles.contentright}>
                            <div style={{color:"#915B43",fontWeight:"400"}}>{users[0]?.goalweight}</div> 
                          
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                            <div className={styles.insideleft}><img src={appleicon} className={styles.iconall} style={{width:"17px",height:"19px"}}></img></div>
                            <span style={{color:"#EF7430",}}>ข้อจำกัดด้านอาหาร</span>
                        </div>
                        <div className={styles.contentright}>
                            <div style={{ color: "#915B43", fontWeight: "400" }}>
                                    <ul
                                        style={{
                                        paddingLeft: "20px",
                                        margin: "12px 0",
                                        display: "flex",
                                        flexDirection: "column",
                                        }}
                                    >
                                    {users[0]?.Food_restrictions.length ? (
                                    users[0].Food_restrictions.map((item, index) => (
                                        <li
                                        key={index}
                                        style={{
                                            listStyleType: "none", // ใช้ bullet point
                                            fontSize: "16px", // ขนาดข้อความปกติ
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"flex-end",
                                            gap:"6px"
                                        }}
                                        >
                                        {item}
                                        <span style={{ fontSize: "20px", marginRight: "6px" }}>•</span>
                                        </li>
                                    ))
                                    ) : (
                                    <li>
                                        ไม่มีข้อจำกัดอาหาร
                                    </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                            <div className={styles.insideleft}><img src={pillicon} className={styles.iconall} style={{width:"17px",height:"19px"}}></img></div>
                            <span style={{color:"#EF7430",}}>โรคประจำตัว</span>
                        </div>
                        <div className={styles.contentright}>
                            <div style={{ color: "#915B43", fontWeight: "400" }}>
                                    <ul
                                        style={{
                                        paddingLeft: "20px",
                                        margin: "12px 0",
                                        display: "flex",
                                        flexDirection: "column",
                                        }}
                                    >
                                    {users[0]?.Disease.length ? (
                                    users[0].Disease.map((item, index) => (
                                        <li
                                        key={index}
                                        style={{
                                            listStyleType: "none", // ใช้ bullet point
                                            fontSize: "16px", // ขนาดข้อความปกติ
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"flex-end",
                                            gap:"6px"
                                        }}
                                        >
                                        {item} 
                                        <span style={{ fontSize: "20px", marginRight: "6px" }}>•</span>
                                        </li>
                                    ))
                                    ) : (
                                    <li>
                                        ไม่มีข้อจำกัดอาหาร
                                    </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
             {/* ปุ้ม logout */}
            <div className={styles.logout}>
                <div className='col-12'>
                    <div className={styles.content}>
                        <div className={styles.contentleft}>
                            <div className={styles.insideleft}>
                                <img src={exiticon} className={styles.iconall} style={{width:"24px",height:"24px"}} />
                            </div>
                            <span style={{color:"#EF7430"}}>ออกจากระบบ</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
    </>
  );
};

export default Profilepage;
