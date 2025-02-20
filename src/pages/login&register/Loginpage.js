import React, { useState } from "react";
import styles from "../../pages/login&register/custom.module.scss";
import "../../styles/custom.scss";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import ToggleButton from "../login&register/ButtonLoginandRegister/ToggleButton";
//import { registerUser } from "../../api/api_register.js"; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
import { loginUser } from "../../api/api_login.js"; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง

//img
import imgfood1 from "../../imgAll/img/imgfood1.webp";

function Loginpage() {
  const [activeTab, setActiveTab] = useState("login");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนหน้า
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  // const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] =
    useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState(""); // เพิ่ม state สำหรับเก็บข้อความผิดพลาด

  const handleInputUsernameChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username") {
      // console.log(`Sending request with data: {username: '${value}'}`);
      const isUsernameAvailable = await checkUsernameAvailability(value);
      if (isUsernameAvailable !== true) {
        setUsernameErrorMessage(isUsernameAvailable); // แสดงข้อความผิดพลาดในฟอร์ม
      } else {
        setUsernameErrorMessage(""); // เคลียร์ข้อความผิดพลาดเมื่อข้อมูลถูกต้อง
      }
    }
  };

  // const handleInputEmailChange = async (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  //   if (name === "email") {
  //     const emailValue = value.trim();

  //     // ตรวจสอบว่าอีเมลมี @ หรือไม่
  //     if (!emailValue.includes("@")) {
  //       setEmailErrorMessage("อีเมลต้องมี @");
  //       return;
  //     }

  //     try {
  //       // console.log(`🔍 Checking email availability for: ${emailValue}`);
  //       const isEmailAvailable = await checkEmailAvailability(emailValue);
  //       // console.log("✅ API Response:", isEmailAvailable);

  //       // ตรวจสอบค่าที่ได้รับจาก API
  //       if (isEmailAvailable === false) {
  //         setEmailErrorMessage("อีเมลนี้ถูกใช้ไปแล้ว");
  //       } else if (typeof isEmailAvailable === "string") {
  //         setEmailErrorMessage(isEmailAvailable); // ใช้ข้อความที่ API ส่งมา
  //       } else {
  //         setEmailErrorMessage(""); // อีเมลใช้ได้ ไม่มี error
  //       }
  //     } catch (error) {
  //       console.error("❌ Error checking email:", error);
  //       setEmailErrorMessage("เกิดข้อผิดพลาดในการตรวจสอบอีเมล");
  //     }
  //   }
  // };
  // const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");
  // const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const passwordValue = value.trim();

    // ตรวจสอบความยาวของรหัสผ่าน
    if (passwordValue.length < 8) {
      setPasswordErrorMessage("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
    } else {
      setPasswordErrorMessage(""); // เคลียร์ข้อความเมื่อรหัสผ่านถูกต้อง
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const confirmPasswordValue = value.trim();
    const passwordValue = formData.password.trim();

    // ตรวจสอบความตรงกันของรหัสผ่านและการยืนยันรหัสผ่าน
    if (confirmPasswordValue !== passwordValue) {
      setconfirmPasswordErrorMessage("การยืนยันรหัสผ่านต้องตรงกับรหัสผ่าน");
    } else {
      setconfirmPasswordErrorMessage(""); // เคลียร์ข้อความเมื่อยืนยันรหัสผ่านถูกต้อง
    }
  };

  const checkUsernameAvailability = async (username) => {
    const res = await fetch("http://54.79.173.230:5000/users/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const result = await res.json();
    return result.available || result.message;
  };

  // const checkEmailAvailability = async (email) => {
  //   const res = await fetch("http://54.79.173.230:5000/users/check-email", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   });
  //   const result = await res.json();
  //   return result.available || result.message;
  // };

  const handleLogin = async (event) => {
    event.preventDefault();

    // ตรวจสอบการกรอกข้อมูล
    if (!formData.username || !formData.password) {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API เพื่อทำการล็อกอิน
      const response = await loginUser(formData);

      // ตรวจสอบว่าได้รับข้อมูลจาก API หรือไม่

      if (response.error) {
        throw new Error(
          response.error.message || "รหัสหรือชื่อผู้ใช้ไม่ถูกต้อง"
        );
      }

      // console.log("ผลการล็อกอิน:", response);
      alert("ล็อกอินสำเร็จ");

      // ล็อกอินสำเร็จจึงเปลี่ยนหน้า
      navigate("/Home");
    } catch (error) {
      console.error("การล็อกอินไม่สำเร็จ:", error);
      alert(error.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // ตรวจสอบข้อมูลก่อน
    // if (formData.password && formData.password.length < 8) {
    //   alert("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
    //   return;
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   alert("การยืนยันรหัสผ่านต้องตรงกับรหัสผ่าน");
    //   return;
    // }

    // if (!formData.email.includes("@")) {
    //   alert("อีเมลต้องมี @");
    //   return;
    // }

    // เก็บข้อมูลพื้นฐาน เช่น อีเมล
    const userData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };
    localStorage.setItem("userData", JSON.stringify(userData)); // เก็บข้อมูลใน localStorage
    // console.log(userData);
    // ถ้าผ่านการตรวจสอบทั้งหมดแล้ว
    navigate("/RegistrationForm"); // นำทางไปยังหน้าลงทะเบียน
  };

  return (
    <div className={styles.container} style={{ backgroundColor: "#FFF2EA" }}>
      {/* img */}
      <div className={styles.div1}>
        <img src={imgfood1} className={styles.responsiveimg1} alt="imgfood1" />
      </div>
      <div className="rightcolumn">
        {/* welcome and Header */}
        <div className={styles.div2}>
          <h3 className={styles.wellcome}>Welcome</h3>
          <h3 className={styles.wellcome}>
            To <span className={styles.kakaloryhead}>Kakalory</span>
          </h3>
          <img src={imgfood1} className={styles.responsiveimg} alt="imgfood1" />
        </div>
        {/* content form */}
        <div className={styles.div3}>
          <ToggleButton onSelect={(tab) => setActiveTab(tab)} />
          {activeTab === "login" ? (
            <form onSubmit={handleLogin}>
              <div className={styles.loginform}>
                {/* ฟอร์ม Login */}
                <div className={styles.formfield}>
                  <p
                    style={{
                      color: "#915B43",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                      width: "267px",
                      paddingLeft: "6px",
                    }}
                  >
                    ชื่อผู้ใช้
                  </p>
                  <TextField
                    name="username"
                    variant="outlined"
                    fullWidth
                    value={formData.username}
                    onChange={handleInputChange}
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
                      style: {
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "gray",
                      },
                    }}
                  />
                </div>
                {/* รหัสผ่าน */}
                <div className={styles.formfield}>
                  <p
                    style={{
                      color: "#915B43",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                      paddingLeft: "6px",
                    }}
                  >
                    รหัสผ่าน
                  </p>
                  <TextField
                    name="password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                      style: {
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "gray",
                      },
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
                    marginTop: "30px",
                    padding: "10px 0",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "400",
                    letterSpacing: "1px",
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <form onSubmit={handleRegister}>
                {/* ฟอร์ม Register *********************************************************************************************/}
                <div className={styles.loginform}>
                  <div className={styles.formfield}>
                    <p
                      style={{
                        color: "#915B43",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                        width: "267px",
                        paddingLeft: "6px",
                      }}
                    >
                      ชื่อผู้ใช้
                    </p>
                    <TextField
                      name="username"
                      variant="outlined"
                      fullWidth
                      value={formData.username}
                      onChange={handleInputUsernameChange}
                      placeholder=" "
                      sx={{
                        marginBottom: "6px",
                        borderRadius: "20px",
                        width: "100%",
                        height: "36px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "36px",
                          borderColor: usernameErrorMessage ? "red" : "#915B43",
                        },
                        "& fieldset": {
                          borderColor: usernameErrorMessage ? "red" : "#915B43",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "20px",
                          fontSize: "16px",
                          color: usernameErrorMessage ? "red" : "gray", // เปลี่ยนสีข้อความให้เป็นแดงเมื่อมีข้อผิดพลาด
                        },
                      }}
                    />
                    {usernameErrorMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {usernameErrorMessage}
                      </p>
                    )}
                  </div>
                  {/* อีเมล
                  <div className={styles.formfield}>
                    <p
                      style={{
                        color: "#915B43",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                        width: "267px",
                        paddingLeft: "6px",
                      }}
                    >
                      อีเมล
                    </p>
                    <TextField
                      name="email"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleInputEmailChange}
                      placeholder=" "
                      sx={{
                        marginBottom: "6px",
                        borderRadius: "20px",
                        width: "100%",
                        height: "36px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "36px",
                          // เปลี่ยนสีกรอบเมื่อมีข้อผิดพลาด
                          borderColor: emailErrorMessage ? "red" : "#915B43",
                        },
                        "& fieldset": {
                          // เปลี่ยนสีกรอบให้แดงเมื่อมีข้อผิดพลาด
                          borderColor: emailErrorMessage ? "red" : "#915B43",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "20px",
                          fontSize: "16px",
                          color: emailErrorMessage ? "red" : "gray", // เปลี่ยนสีข้อความให้เป็นแดงเมื่อมีข้อผิดพลาด
                        },
                      }}
                    />
                    {emailErrorMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {emailErrorMessage}
                      </p>
                    )}
                  </div> */}

                  {/* รหัสผ่าน */}
                  <div className={styles.formfield}>
                    <p
                      style={{
                        color: "#915B43",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                        width: "267px",
                        paddingLeft: "6px",
                      }}
                    >
                      รหัสผ่าน
                    </p>
                    <TextField
                      name="password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
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
                          borderColor: PasswordErrorMessage ? "red" : "#915B43",
                        },
                      }}
                    />
                    {PasswordErrorMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {PasswordErrorMessage}
                      </p>
                    )}
                  </div>

                  <div className={styles.formfield}>
                    <p
                      style={{
                        color: "#915B43",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                        width: "267px",
                        paddingLeft: "6px",
                      }}
                    >
                      ยืนยันรหัสผ่าน
                    </p>
                    <TextField
                      name="confirmPassword"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleConfirmPasswordChange}
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
                          borderColor: confirmPasswordErrorMessage
                            ? "red"
                            : "#915B43",
                        },
                      }}
                    />
                    {confirmPasswordErrorMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {confirmPasswordErrorMessage}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    sx={{
                      fontFamily: "'FC Minimal', sans-serif",
                      backgroundColor: "#4A8854",
                      marginTop: "35px",
                      padding: "10px 0",
                      borderRadius: "50px",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "400",
                      letterSpacing: "1px",
                    }}
                  >
                    สมัครสมาชิก
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
