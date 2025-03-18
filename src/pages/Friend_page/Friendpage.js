import React, { useEffect, useState } from "react";
import styles from "./Friend.module.scss";
import "../../styles/custom.scss";

import NavigationBar from "../../component/navbar/NavigationBar";
import Gobackhead from "../../component/component-history/gobackhead";
//import { frirend } from "../../../src/test_mock/Mockdata2";
import CardFriend from "./component/cardFrieds/CardFriend";

//element
import foodfriend from "../../imgAll/element/morningfriend.webp";
import snackicon from "../../imgAll/element/snackicon.webp";
import drinkicon from "../../imgAll/element/drinkicon.webp";
import addfriend from "../../imgAll/element/addfriend.webp";

import { createFriend } from "../../api/api_friend";
import { getFriend } from "../../api/api_friend";
import { getFriendInfo } from "../../api/api_friend";
import { useUser } from "../../api/UserContext";
import { getUser } from "../../api/api_user";

function Friendpage() {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [error, setError] = useState(null); // สถานะสำหรับข้อผิดพลาด
  const { user, setUser } = useUser();
  const token = localStorage.getItem("token");

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
          console.error("Error fetching user data:", error);
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

  useEffect(() => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage

    const fetchFriend = async () => {
      setLoading(true); // เปิดสถานะโหลดก่อนดึงข้อมูล
      try {
        const friendData = await getFriend({}, token); // เรียก API
        // console.log("friendData----", friendData);

        if (Array.isArray(friendData)) {
          setFriends(friendData); // ตั้งค่าข้อมูลเพื่อน
        } else {
          console.error("API response is not an array:", friendData);
          setError("ข้อมูลที่ได้รับไม่ถูกต้อง");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเพื่อน:", error);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลเพื่อน");
      } finally {
        setLoading(false); // ปิดสถานะโหลด
      }
    };

    fetchFriend();
  }, []); // รันเพียงครั้งเดียวเมื่อโหลดหน้า

  const [friendDataInfo, setFriendData] = useState(null); // สร้าง state เพื่อเก็บข้อมูลที่ได้รับ

  const [friendUsername, setFriendUsername] = useState("");
  const [errorAddfriend, setErrorAddfriend] = useState(""); // เก็บข้อความ error จาก API
  const [success, setSuccess] = useState(""); // เก็บข้อความเมื่อสำเร็จ
  const handleAddFriend = async () => {
    setErrorAddfriend(""); // ✅ เคลียร์ error ก่อน

    if (!friendUsername) {
      alert("กรุณากรอกชื่อผู้ใช้ของเพื่อน");
      return;
    }

    const response = await createFriend(friendUsername);
    // console.log("📌 API Response:", response);
    // console.log("📌 response?.error:", response?.error);

    if (friendUsername === user.username) {
      // ✅ เช็คว่าเป็น username ตัวเอง
      setErrorAddfriend("คุณไม่สามารถเพิ่มตัวเองเป็นเพื่อนได้");
      return;
    }
    if (response?.error) {
      // console.log("📌 พบ error จาก API:", response.error);
      setErrorAddfriend(response.error); // ✅ แสดง error
      return; // ❌ ไม่ให้ alert "เพิ่มเพื่อนสำเร็จ!"
    }

    if (response) {
      setSuccess("เพิ่มเพื่อนสำเร็จ!");
      setFriendUsername(""); // ✅ เคลียร์ input
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage

    if (selectedFriendId) {
      const fetchFriendData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await getFriendInfo({ id: selectedFriendId }, token);
          setFriendData(response.meals); // เก็บข้อมูลใน state
          // console.log("fetchFriendData", response); // แสดงผลข้อมูลที่ได้รับ
        } catch (err) {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
          console.error("Error fetching friend data", err);
        } finally {
          setLoading(false);
        }
      };

      fetchFriendData();
    }
  }, [selectedFriendId]); // คอยฟังการเปลี่ยนแปลงของ selectedFriendId

  // ในภายนอก useEffect สามารถใช้ friendData ได้เลย เช่น
  useEffect(() => {
    if (friendDataInfo) {
      // console.log("Friend data outside useEffect:", friendDataInfo);
    }
  }, [friendDataInfo]); // เมื่อ friendData อัปเดต ให้แสดงผลภายนอก useEffect

  // ฟังก์ชันเปิด/ปิด modal
  // const handleSelectFriend = (id) => {
  //   setSelectedFriendId((prevId) => (prevId === id ? null : id));
  // };
  const handleSelectFriend = (id) => {
    // console.log("Selected friend id:", id); // ตรวจสอบว่าเลือกเพื่อนแล้วหรือยัง
    setSelectedFriendId(id);
  };

  // ฟังก์ชันปิด modal เมื่อลูกค้าคลิกข้างนอก
  const handleCloseModal = () => {
    setSelectedFriendId(null);
  };
  const [showModal, setShowModal] = useState(false);

  // const totalFoodCal = friendDataInfo
  //   .filter((meal) => meal.type === "อาหาร")
  //   .reduce((total, meal) => total + meal.cal, 0);

  //  console.log ("frienddddd", friends);
  return (
    <>
      {/* ส่วนหัวมีheader วันที่ เเอดเพื่อน */}
      <div className={styles.wrapper}>
        <div className="container">
          <Gobackhead text="เพื่อนของฉัน" link="/home" />
          {/* วันที่เเสดง */}
          <p className={styles.date}>
            วันที่,{" "}
            {new Date().toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="row g-3">
            {/* Add friend */}
            <div
              className="col-12 d-flex justify-content-end"
              style={{
                margin: "0 -25px",
              }}
            >
              {/* รูปปุ่มเพิ่มเพื่อน */}

              <img
                src={addfriend}
                className={styles.addfriend}
                alt="Add friend"
                onClick={() => setShowModal(true)}
                style={{ cursor: "pointer" }}
              />

              {showModal && ( // ตรวจสอบว่า showModal เป็น true ก่อนแสดง
                <div
                  className={styles.backdrop}
                  onClick={() => setShowModal(false)}
                >
                  <div
                    className={styles.modal_content}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={styles.modalclose_header}
                      style={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                        style={{ filter: "invert(0.5)" }}
                      ></button>
                    </div>
                    <div className={styles.modal_header}>
                      <h5
                        className="modal-title"
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#ABABAB",
                          marginBottom: "15px",
                          paddingLeft: "5px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        เพิ่มเพื่อน
                      </h5>
                    </div>
                    <div className={styles.modal_body}>
                      <h5>{user.username}</h5>
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "14px",
                            color: "#ABABAB",
                          }}
                        >
                          username ของฉัน
                        </p>
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: "#A4A4A4",
                          }}
                        >
                          {user.username}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#ABABAB",
                          marginBottom: "5px",
                        }}
                      >
                        ค้นหาเพื่อนของคุณ
                      </p>
                      <div>
                        <input
                          style={{
                            fontSize: "14px",
                            letterSpacing: "0.5px",
                            height: "38px",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="กรอกชื่อผู้ใช้เพื่อน"
                          value={friendUsername}
                          onChange={(e) => setFriendUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    {errorAddfriend && (
                      <p style={{ color: "red" }}>{errorAddfriend}</p>
                    )}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <div className="modal-footer">
                      {/* <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        ปิด
                      </button> */}
                      <button
                        type="button"
                        className={styles.buttonfriend}
                        onClick={handleAddFriend}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {friends.map((friend) => (
              <div key={friend.friend_id} className="col-12">
                <CardFriend
                  friend={friend}
                  isSelected={selectedFriendId === friend.friend_id}
                  onClick={() => handleSelectFriend(friend.friend_id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Backdrop คลุม modal */}

        {selectedFriendId && (
          <div className={styles.backdrop} onClick={handleCloseModal}>
            <div
              className={styles.modalContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="container p-3 d-flex flex-column justify-content-center "
                style={{ marginTop: "20px" }}
              >
                {selectedFriendId && (
                  <div className="selected-friend-details">
                    {/* ตรวจสอบว่าเพื่อนที่เลือกมีข้อมูลตรงกับ selectedFriendId หรือไม่ */}
                    {friends.filter(
                      (friend) => friend.friend_id === selectedFriendId
                    ).length > 0 ? ( // ถ้ามีเพื่อนที่ตรงกับ selectedFriendId
                      friends
                        .filter(
                          (friend) => friend.friend_id === selectedFriendId
                        )
                        .map((friend) => (
                          <div
                            key={friend.friend_id}
                            className="row d-flex justify-content-center align-items-center text-center w-100"
                          >
                            <div className="col-12 pb-2">
                              <img
                                src={friend.avarta}
                                alt={friend.username}
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  border: "1px solid black",
                                }}
                              />
                            </div>
                            <div className="col-12 d-flex justify-content-between align-items-baseline ps-4 pe-4 pb-4">
                              <h1 style={{ color: "#EF7430" }}>
                                {friend.friend_username}
                              </h1>
                              <p style={{ color: "#EF7430" }}>
                                {friend.total_cal}
                                <span style={{ color: "#ABABAB" }}>
                                  /{friend.goal_cal}
                                </span>
                                <span
                                  style={{ fontSize: "16px", color: "#ABABAB" }}
                                >
                                  {" "}
                                  kcal
                                </span>
                              </p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p>ไม่พบข้อมูลของเพื่อนที่เลือก</p> // ถ้าไม่มีข้อมูลเพื่อนที่ตรงกับ selectedFriendId
                    )}
                  </div>
                )}
                {friendDataInfo &&
                Array.isArray(friendDataInfo) &&
                friendDataInfo.length > 0 ? (
                  <div>
                    {/* คำนวณค่า kcal ของประเภทอาหารและของหวาน */}
                    <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                      <div className={styles.wrappercard}>
                        <div className={styles.box1}>
                          <img
                            src={foodfriend}
                            alt="description"
                            className={styles.elementicon}
                          />
                          <p style={{ color: "#915B43" }}>อาหาร</p>
                        </div>
                        <div className={styles.box2}>
                          <p style={{ color: "#EF7430" }}>
                            {friendDataInfo
                              .filter((item) => item.type === "อาหาร")
                              .reduce(
                                (total, item) => total + item.cal,
                                0
                              )}{" "}
                            <span style={{ color: "#ABABAB" }}>kcal</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* คำนวณค่า kcal ของประเภทของหวาน */}
                    <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                      <div className={styles.wrappercard}>
                        <div className={styles.box1}>
                          <img
                            src={snackicon}
                            alt="description"
                            className={styles.elementicon}
                          />
                          <p style={{ color: "#915B43" }}>ของหวาน</p>
                        </div>
                        <div className={styles.box2}>
                          <p style={{ color: "#EF7430" }}>
                            {friendDataInfo
                              .filter((item) => item.type === "ของหวาน")
                              .reduce(
                                (total, item) => total + item.cal,
                                0
                              )}{" "}
                            <span style={{ color: "#ABABAB" }}>kcal</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 d-flex justify-content-between align-items-baseline ps-2 pe-2">
                      <div className={styles.wrappercard}>
                        <div className={styles.box1}>
                          <img
                            src={drinkicon}
                            alt="description"
                            className={styles.elementicon}
                          />
                          <p style={{ color: "#915B43" }}>เครื่องดื่ม</p>
                        </div>
                        <div className={styles.box2}>
                          <p style={{ color: "#EF7430" }}>
                            {friendDataInfo
                              .filter((item) => item.type === "เครื่องดื่ม")
                              .reduce(
                                (total, item) => total + item.cal,
                                0
                              )}{" "}
                            <span style={{ color: "#ABABAB" }}>kcal</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>ไม่พบข้อมูลมื้ออาหาร</p>
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
