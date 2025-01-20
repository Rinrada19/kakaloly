import React, { useState } from "react";
import styles from "../../pages/login&register/custom.module.scss"; 
import "../../styles/custom.scss"; 
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import ToggleButton from "../login&register/ButtonLoginandRegister/ToggleButton";

//img
import imgfood1 from '../../imgAll/img/imgfood1.webp'

function Loginpage() {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนหน้า

  const handleLogin = () => {
    // ตรวจสอบข้อมูลก่อน
    if (password.length < 8) {
      alert("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }

    if (password !== confirmPassword) {
      alert("การยืนยันรหัสผ่านต้องตรงกับรหัสผ่าน");
      return;
    }

    if (!email.includes("@")) {
      alert("อีเมลต้องมี @");
      return;
    }

    // ถ้าผ่านการตรวจสอบทั้งหมดแล้ว
    navigate("/RegistrationForm");
  };

  return (
    <div className={styles.container} style={{backgroundColor:"#FFF2EA"}}>
      {/* img */}
      <div className={styles.div1}>
        <img src={imgfood1} className={styles.responsiveimg1} />
      </div>
      <div className="rightcolumn">
        {/* welcome and Header */}
        <div className={styles.div2}>
          <h3 className={styles.wellcome}>Welcome</h3>
          <h3 className={styles.wellcome}>To <span className={styles.kakaloryhead}>Kakalory</span></h3>
          <img src={imgfood1} className={styles.responsiveimg} />
        </div> 
        {/* content form */}
        <div className={styles.div3}>
          <ToggleButton onSelect={(tab) => setActiveTab(tab)} />
          {activeTab === "login" ? (
            <div className={styles.loginform}>
              {/* ฟอร์ม Login */}
              <div className={styles.formfield}>
                <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", width:"267px", paddingLeft:"6px" }}>ชื่อผู้ใช้</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                  sx={{
                    marginBottom: "6px",
                    borderRadius: "20px",
                    width: "100%",
                    height: "36px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      height: "36px",
                    },
                    "& fieldset": {
                      borderColor: "#915B43",
                    },
                  }}
                  InputProps={{
                    style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                  }}
                />
              </div>
              {/* รหัสผ่าน */}
              <div className={styles.formfield}>
                <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", paddingLeft:"6px" }}>รหัสผ่าน</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  sx={{
                    marginBottom: "6px",
                    borderRadius: "20px",
                    width: "100%",
                    height: "36px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      height: "36px",
                    },
                    "& fieldset": {
                      borderColor: "#915B43",
                    },
                  }}
                  InputProps={{
                    style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                  }}
                />
              </div>
              {/* ปุ่มเข้าสู่ระบบ */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
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
              {/* ฟอร์ม Register */}
              <div className={styles.loginform}>
                <div className={styles.formfield}>
                  <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", width:"267px", paddingLeft:"6px" }}>ชื่อผู้ใช้</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=" "
                    sx={{
                      marginBottom: "6px",
                      borderRadius: "20px",
                      width: "100%",
                      height: "36px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "36px",
                      },
                      "& fieldset": {
                        borderColor: "#915B43",
                      },
                    }}
                    InputProps={{
                      style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                    }}
                  />
                </div>
                {/* อีเมล */}
                <div className={styles.formfield}>
                  <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", width:"267px", paddingLeft:"6px" }}>อีเมล</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    sx={{
                      marginBottom: "6px",
                      borderRadius: "20px",
                      width: "100%",
                      height: "36px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "36px",
                      },
                      "& fieldset": {
                        borderColor: "#915B43",
                      },
                    }}
                    InputProps={{
                      style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                    }}
                  />
                </div>
                {/* รหัสผ่าน */}
                <div className={styles.formfield}>
                  <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", width:"267px", paddingLeft:"6px" }}>รหัสผ่าน</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    sx={{
                      marginBottom: "6px",
                      borderRadius: "20px",
                      width: "100%",
                      height: "36px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "36px",
                      },
                      "& fieldset": {
                        borderColor: "#915B43",
                      },
                    }}
                    InputProps={{
                      style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                    }}
                  />
                </div>
                {/* ยืนยันรหัสผ่าน */}
                <div className={styles.formfield}>
                  <p style={{ color:"#915B43", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"4px", width:"267px", paddingLeft:"6px" }}>ยืนยันรหัสผ่าน</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=" "
                    sx={{
                      marginBottom: "6px",
                      borderRadius: "20px",
                      width: "100%",
                      height: "36px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "36px",
                      },
                      "& fieldset": {
                        borderColor: "#915B43",
                      },
                    }}
                    InputProps={{
                      style: { borderRadius: "20px", fontSize: "16px", color: "gray" },
                    }}
                  />
                </div> 
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleLogin}
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
