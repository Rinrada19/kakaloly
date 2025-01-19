import React, { useState } from "react";
import styles from "../../pages/login&register/custom.module.scss"; 
import "../../styles/custom.scss"; 
// import { FormControl } from '@mui/base/FormControl';
import { TextField, Button, Box, Typography } from "@mui/material";
import ToggleButton from "../login&register/ButtonLoginandRegister/ToggleButton";

//img
import imgfood1 from '../../imgAll/img/imgfood1.webp'


function Loginpage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={styles.container} 
     style={{backgroundColor:"#FFF2EA"}}>
         {/* img */}
        <div className={styles.div1}>
          <img src={imgfood1} className={styles.responsiveimg1}></img>
        </div>
        <div className="rightcolumn">
            {/* welcome and Header */}
            <div className={styles.div2}>
              <h3 className={styles.wellcome}>Welcome</h3>
              <h3 className={styles.wellcome}>To <span className={styles.kakaloryhead}>Kakalory</span ></h3>
              <img src={imgfood1} className={styles.responsiveimg}></img>
            </div> 
            {/* content form */}
            <div  className={styles.div3}>
                <ToggleButton onSelect={(tab) => setActiveTab(tab)} />
                {activeTab === "login" ? (
                <div className={styles.loginform}>
                        {/* ใส่ฟอร์ม login */}
                            {/* ชื่อผู้ใช้งาน */}

                    <div className={styles.formfield}>
                          <p style={{
                            color:"#915B43",
                            fontWeight:"600",
                            letterSpacing:"0.5px",
                            marginBottom:"4px",
                            width:"267px",
                          
                            paddingLeft:"6px"
                          }}>ชื่อผู้ใช้</p>

                          <TextField
                          variant="outlined"
                          fullWidth
                          placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                          sx={{
                            marginBottom: "6px",
                            borderRadius: "20px",
                            width: "100%", // กำหนดความกว้าง
                            height: "36px", // กำหนดความสูง
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                              height: "36px", // ปรับความสูงของ input
                            },
                            "& fieldset": {
                              borderColor: "#915B43", // สีปกติของ border
                            },
                              }}
                          InputProps={{
                            style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                          }}
                          />
                    </div>
                          {/* รหัสผ่าน */}
                    <div className={styles.formfield}>
                          <p style={{
                            color:"#915B43",
                            fontWeight:"600",
                            letterSpacing:"0.5px",
                            marginBottom:"4px",
                            paddingLeft:"6px"
                          }}>รหัสผ่าน</p>

                          <TextField
                          variant="outlined"
                          fullWidth
                          placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                          sx={{
                            marginBottom: "6px",
                            borderRadius: "20px",
                            width: "100%", // กำหนดความกว้าง
                            height: "36px", // กำหนดความสูง
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                              height: "36px", // ปรับความสูงของ input
                            },
                            "& fieldset": {
                              borderColor: "#915B43", // สีปกติของ border
                            },
                              }}
                          InputProps={{
                            style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                          }}
                          />
                    </div>

                          {/* ปุ่มเข้าสู่ระบบ */}
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              fontFamily: "'FC Minimal', sans-serif",
                              backgroundColor: "#4A8854",
                              marginTop: "50px",
                              padding: "10px 0",
                              borderRadius: "50px",
                              textTransform: "none",
                              fontSize: "16px",
                              fontWeight:"400",
                              letterSpacing:"1px"
                            }}
                          >
                            เข้าสู่ระบบ
                          </Button>

                      </div>
                    ) : (
                <div>
                <div className={styles.loginform}
                >
                {/* ใส่ฟอร์ม Register */}
                {/* ชื่อผู้ใช้ */}
                <div className={styles.formfield}>
                          <p style={{
                            color:"#915B43",
                            fontWeight:"600",
                            letterSpacing:"0.5px",
                            marginBottom:"4px",
                            width:"267px",
                            paddingLeft:"6px"
                          }}>ชื่อผู้ใช้</p>

                          <TextField
                          variant="outlined"
                          fullWidth
                          placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                          sx={{
                            marginBottom: "6px",
                            borderRadius: "20px",
                            width: "100%", // กำหนดความกว้าง
                            height: "36px", // กำหนดความสูง
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                              height: "36px", // ปรับความสูงของ input
                            },
                            "& fieldset": {
                              borderColor: "#915B43", // สีปกติของ border
                            },
                              }}
                          InputProps={{
                            style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                          }}
                          />
                </div>
                {/* อีเมล */}
                <div className={styles.formfield}>
                          <p style={{
                            color:"#915B43",
                            fontWeight:"600",
                            letterSpacing:"0.5px",
                            marginBottom:"4px",
                            width:"267px",
                            paddingLeft:"6px"
                          }}>อีเมล</p>

                          <TextField
                          variant="outlined"
                          fullWidth
                          placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                          sx={{
                            marginBottom: "6px",
                            borderRadius: "20px",
                            width: "100%", // กำหนดความกว้าง
                            height: "36px", // กำหนดความสูง
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                              height: "36px", // ปรับความสูงของ input
                            },
                            "& fieldset": {
                              borderColor: "#915B43", // สีปกติของ border
                            },
                              }}
                          InputProps={{
                            style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                          }}
                          />
                </div>
                {/* รหัสผ่าน */}
                <div className={styles.formfield}>
                      <p style={{
                        color:"#915B43",
                        fontWeight:"600",
                        letterSpacing:"0.5px",
                        marginBottom:"4px",
                        width:"267px",
                        paddingLeft:"6px"
                      }}>รหัสผ่าน</p>

                      <TextField
                      variant="outlined"
                      fullWidth
                      placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                      sx={{
                        marginBottom: "6px",
                        borderRadius: "20px",
                        width: "100%", // กำหนดความกว้าง
                        height: "36px", // กำหนดความสูง
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                          height: "36px", // ปรับความสูงของ input
                        },
                        "& fieldset": {
                          borderColor: "#915B43", // สีปกติของ border
                        },
                          }}
                      InputProps={{
                        style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                      }}
                      />
                </div>
                {/* ยืนยันรหัสผ่าน */}
                <div className={styles.formfield}>
                      <p style={{
                        color:"#915B43",
                        fontWeight:"600",
                        letterSpacing:"0.5px",
                        marginBottom:"4px",
                        width:"267px",
                        paddingLeft:"6px"
                      }}>ยืนยันรหัสผ่าน</p>

                        <TextField
                        variant="outlined"
                        fullWidth
                        placeholder=" " // ใช้ placeholder เป็นข้อความว่าง
                        sx={{
                          marginBottom: "6px",
                          borderRadius: "20px",
                          width: "100%", // กำหนดความกว้าง
                          height: "36px", // กำหนดความสูง
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "20px", // ปรับ border-radius ของช่องกรอก
                            height: "36px", // ปรับความสูงของ input
                          },
                          "& fieldset": {
                            borderColor: "#915B43", // สีปกติของ border
                          },
                            }}
                        InputProps={{
                          style: { borderRadius: "20px",fontSize: "16px", color: "gray" }, // ปรับ border-radius ซ้ำใน InputProps
                        }}
                        />
                          
                </div> 
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      fontFamily: "'FC Minimal', sans-serif",
                      backgroundColor: "#4A8854",
                      marginTop: "35px",
                      padding: "10px 0",
                      borderRadius: "50px",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight:"400",
                      letterSpacing:"1px"
                    }}
                    >
                    สมัครสมาชิก
                  </Button>
                  </div>
                </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default Loginpage;
