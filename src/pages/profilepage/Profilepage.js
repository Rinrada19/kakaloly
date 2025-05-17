import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//css
import styles from "./Profilepage.module.scss";

//import compoentn and img
import imgprofile from "../../imgAll/img/man.png";
import imgprofile2 from "../../imgAll/img/woman.png";
import gobackicon from "../../imgAll/element/goback.png";
import facepro from "../../imgAll/element/facepro.png";
import { users } from "../../test_mock/MockData";

//icon
import weighticon from "./icon/weight.png";
import heighticon from "./icon/heighticon.png";
import goalicon from "./icon/goalicon.png";
import appleicon from "./icon/appleicon.png";
import pillicon from "./icon/pillicon.png";
import exiticon from "./icon/exit.png";
import star from "../../imgAll/img/star.jpg";
import { getUser } from "../../api/api_user";
import { useUser } from "../../api/UserContext";

const Profilepage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

  const token = localStorage.getItem("token");
  // console.log("Token from localStorage:", token); // ตรวจสอบว่า token ถูกดึงออกมาหรือไม่

  // ดึงข้อมูล user จาก API
  useEffect(() => {
    const fetchUser = async () => {
      // console.log("Token from useEffect:", token);
      if (token) {
        try {
          const data = {};
          const response = await getUser(data, token); // ตรวจสอบว่า token มีค่าหรือไม่
          if (Array.isArray(response) && response.length > 0) {
            setUser(response[0]);
          }
        } catch (error) {
          //  console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // console.log("Token is missing");
        setLoading(false); // หรือสามารถนำผู้ใช้ไปที่หน้า login ได้
      }
    };

    fetchUser();
  }, [token, setUser]);
  // console.log(user);

  const handleLogout = () => {
    localStorage.clear(); // Clears all data in localStorage
    sessionStorage.clear(); // Clears all data in sessionStorage
    navigate("/");
  };
  // console.log("userrr", user);
  return (
    <>
      {user ? (
        <div className={styles.wrapper}>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <div className={styles.contents}>
              {/* header */}
              <div className={styles.header}>
                <img
                  onClick={() => navigate("/home")}
                  src={gobackicon}
                  className={styles.gobackicon}
                  alt="Go back"
                ></img>
                <h3 className={styles.namehead}>โปรไฟล์</h3>
                <div></div>
              </div>
              {/* icon ชื่อ อีเมล */}
              <div className={styles.info}>
                <img
                  src={user ? imgprofile : imgprofile2} // เช็คว่า user เป็น true หรือ false
                  alt="Iconprofile"
                  className={styles.icon__person}
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={facepro}
                      alt="icon"
                      style={{ width: "17px", height: "16px" }}
                    ></img>
                    <p style={{ color: "#915B43", fontWeight: "600" }}>
                      {user.username}
                    </p>
                  </div>
                  <p style={{ color: "#747B82", fontWeight: "500" }}>
                    {user.email}
                  </p>
                </div>
              </div>
              {/* เส้น */}
              <div className={styles.linebox}>
                <div className={styles.line}></div>
              </div>
              <div
                style={{
                  color: "#915B43",
                  fontWeight: "600",
                  fontSize: "18px",
                  marginBottom: "25px",
                }}
              >
                ข้อมูลส่วนตัว
              </div>

              {/* ข้อมูลส่วนตัว */}
              <div className="row g-0 gy-3">
                <div className="col-12">
                  <div className={styles.content}>
                    <div className={styles.contentleft}>
                      <div className={styles.insideleft}>
                        <img
                          src={weighticon}
                          className={styles.iconall}
                          style={{ width: "17px", height: "17px" }}
                        ></img>
                      </div>
                      <span style={{ color: "#EF7430" }}>น้ำหนัก</span>
                    </div>
                    <div className={styles.contentright}>
                      <div style={{ color: "#EF7430", fontWeight: "600" }}>
                        {user.weight}
                      </div>
                      <div style={{ color: "#EF7430", fontWeight: "500" }}>
                        kg
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className={styles.content}>
                    <div className={styles.contentleft}>
                      <div className={styles.insideleft}>
                        <img
                          src={heighticon}
                          className={styles.iconall}
                          style={{ width: "14px", height: "21px" }}
                        ></img>
                      </div>
                      <span style={{ color: "#EF7430" }}>ส่วนสูง</span>
                    </div>
                    <div className={styles.contentright}>
                      <div style={{ color: "#EF7430", fontWeight: "600" }}>
                        {user.height}
                      </div>
                      <div style={{ color: "#EF7430", fontWeight: "500" }}>
                        kg
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className={styles.content}>
                    <div className={styles.contentleft}>
                      <div className={styles.insideleft}>
                        <img
                          src={goalicon}
                          className={styles.iconall}
                          style={{ width: "17px", height: "17px" }}
                        ></img>
                      </div>
                      <span style={{ color: "#EF7430" }}>เป้าหมาย</span>
                    </div>
                    <div className={styles.contentright}>
                      <div style={{ color: "#915B43", fontWeight: "400" }}>
                        {user.goal}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className={styles.content}>
                    <div className={styles.contentleft}>
                      <div className={styles.insideleft}>
                        <img
                          src={appleicon}
                          className={styles.iconall}
                          style={{ width: "17px", height: "19px" }}
                        ></img>
                      </div>
                      <span style={{ color: "#EF7430" }}>
                        ข้อจำกัดด้านอาหาร
                      </span>
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
                          {(user?.dietary_restriction || []).length > 0 ? (
                            user.dietary_restriction.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  listStyleType: "none",
                                  fontSize: "16px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                  gap: "6px",
                                }}
                              >
                                {item}
                                <span
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "6px",
                                  }}
                                >
                                  •
                                </span>
                              </li>
                            ))
                          ) : (
                            <li>ไม่มีข้อจำกัดอาหาร</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className={styles.content}>
                    <div className={styles.contentleft}>
                      <div className={styles.insideleft}>
                        <img
                          src={pillicon}
                          className={styles.iconall}
                          style={{ width: "17px", height: "19px" }}
                        ></img>
                      </div>
                      <span style={{ color: "#EF7430" }}>โรคประจำตัว</span>
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
                          {(user?.congenital_disease || []).length > 0 ? (
                            user.congenital_disease.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  listStyleType: "none", // ใช้ bullet point
                                  fontSize: "16px", // ขนาดข้อความปกติ
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                  gap: "6px",
                                }}
                              >
                                {item}
                                <span
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "6px",
                                  }}
                                >
                                  •
                                </span>
                              </li>
                            ))
                          ) : (
                            <li>ไม่มีข้อจำกัดอาหาร</li>
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
              <div className="col-12">
                <div className={styles.content}>
                  <div className={styles.contentleft}>
                    <div className={styles.insideleft}>
                      <img
                        src={exiticon}
                        className={styles.iconall}
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                    <span
                      style={{ color: "#EF7430", cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      ออกจากระบบ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>ไม่พบข้อมูลผู้ใช้</p>
      )}
    </>
  );
};

export default Profilepage;
