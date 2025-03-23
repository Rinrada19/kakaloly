import React, { useState } from "react";
import styles from "./CreateMenu.module.scss";

import FilterButton from "../component/FilterButton"; //ปุ้มหมวดหมู่
import back from "../../../imgAll/element/goback.png";
import foodicon from "../../../imgAll/element2/ad_food.jpg";
import foodiconActive from "../../../imgAll/element2/ad_foodactive.jpg";
import { postManuitem } from "../../../api/api_manuitem"; // import API function
// import wateractive from "../../../imgAll/element2/ad_wateractive.jpg";
// import watericon from "../../../imgAll/element2/ad_water.jpg";
// import ad_snackactive from "../../../imgAll/element2/ad_snackactive.png";
// import ad_snack from "../../../imgAll/element2/ad_snack.jpg";

const CreateMenu = ({ setStep }) => {
  const [selectedCategory, setSelectedCategory] = useState("อาหาร"); // เก็บหมวดหมู่ที่ถูกเลือก
  const [menuData, setMenuData] = useState({
    food_name: "",
    food_description: "",
    food_category: "",
    cal: "",
    fat: "",
    carb: "",
    protein: "",
    sugar: "",
    sodium: "",
    ingredient: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     console.log("Token from useEffect:", token);
  //     if (token) {
  //       try {
  //         const data = {};
  //         const response = await getUser(data, token); // ตรวจสอบว่า token มีค่าหรือไม่
  //         if (Array.isArray(response) && response.length > 0) {
  //           setUser(response[0]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       console.log("Token is missing");
  //       setLoading(false); // หรือสามารถนำผู้ใช้ไปที่หน้า login ได้
  //     }
  //   };

  //   fetchUser();
  // }, [token, setUser]);

  const token = localStorage.getItem("token");

  const handleCreateMenu = async () => {
    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (!menuData.food_name || !menuData.cal || !menuData.fat) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API
      const response = await postManuitem(menuData, token);
      // console.log("Response from API:", response);

      if (response.error) {
        alert("เกิดข้อผิดพลาด: " + response.error);
      } else {
        alert("เมนูถูกสร้างเรียบร้อยแล้ว!");
        setStep(7); // ไปยังขั้นตอนถัดไปหลังจากเพิ่มเมนูสำเร็จ

        // รีเซ็ตค่า input
        setMenuData({
          food_name: "",
          cal: "",
          fat: "",
        });
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการสร้างเมนู");
    }
  };

  const handleGoToStep7 = () => {
    // console.log("✅ Going to step 7");
    setStep(7);
  };

  return (
    <div
      className={styles.createMenu}
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* contentAll */}
      <div>
        {/* header fillter */}
        <div
          className={styles.containerfillter}
          style={{ marginBottom: "30px" }}
        >
          <img
            src={back}
            className={styles.gobackicon}
            onClick={handleGoToStep7}
            alt="search"
          />
          <div className={styles.boxcontainerfillter}>
            <FilterButton
              icon={foodicon}
              activeIcon={foodiconActive}
              label="สร้างเมนูใหม่ของคุณ"
              isActive={selectedCategory === "อาหาร"}
              onClick={() => setSelectedCategory("อาหาร")}
            />
          </div>
        </div>
        <div className={styles.containerinput}>
          {selectedCategory === "อาหาร" && (
            <FoodForm menuData={menuData} onInputChange={handleInputChange} />
          )}
          {/* {selectedCategory === "เครื่องดื่ม" && <DrinkForm menuData={menuData} onInputChange={handleInputChange} />}
              {selectedCategory === "ของว่าง" && <SnackForm menuData={menuData} onInputChange={handleInputChange} />} */}
        </div>
        {/* form input */}
      </div>

      <div style={{ width: "100%", padding: "0px 26px" }}>
        <button className={styles.createbut} onClick={handleCreateMenu}>
          สร้างเมนูใหม่
        </button>
      </div>
    </div>
  );
};

const FoodForm = ({ menuData, onInputChange }) => {
  return (
    <div className={styles.containerinput}>
      <div style={{ position: "relative", width: "100%", padding: "0px 26px" }}>
        {/* ชื่อเมนู */}
        <div>
          <input
            name="food_name"
            onChange={onInputChange}
            value={menuData.food_name || ""}
            type="text"
            placeholder="ชื่อเมนู"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          {/* เเคลอรี่ */}
          <input
            name="cal"
            onChange={onInputChange}
            type="text"
            value={menuData.cal || ""}
            placeholder="เเคลอรี่"
            className={styles.input}
            style={{ marginBottom: "30px" }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "15%",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (Kcal)
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {/* ไขมัน */}
          <input
            name="fat"
            onChange={onInputChange}
            type="text"
            value={menuData.fat || ""}
            placeholder="ไขมัน"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "10PX",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (กรัม)
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {/* คาร์โบไฮเดรต */}
          <input
            name="carb"
            onChange={onInputChange}
            value={menuData.carb || ""}
            type="text"
            placeholder="คาร์โบไฮเดรต"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "10PX",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (กรัม)
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {/* protein */}
          <input
            name="protein"
            onChange={onInputChange}
            value={menuData.protein || ""}
            type="text"
            placeholder="โปรตีน"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "10px",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (กรัม)
          </div>
        </div>
        {/* description */}
        <input
          name="food_description"
          onChange={onInputChange}
          type="text"
          value={menuData.food_description || ""}
          placeholder="คำอธิบาย"
          className={styles.input}
          style={{ marginBottom: "10px" }}
        />
        {/* ประเภท/หมวดหมู่ */}
        <div className={styles.custom_select_wrapper}>
          <select
            name="food_category"
            onChange={onInputChange}
            value={menuData.food_category || ""}
            className={styles.custom_select}
            style={{ marginBottom: "10px" }}
          >
            <option value="">เลือกประเภท/หมวดหมู่</option>
            <option value="อาหาร">อาหาร</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
            <option value="ของว่าง">ของว่าง</option>
          </select>
        </div>

        {/* น้ำตาล */}
        <div style={{ position: "relative" }}>
          <input
            name="sugar"
            onChange={onInputChange}
            type="text"
            value={menuData.sugar || ""}
            placeholder="น้ำตาล"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "10px",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (กรัม)
          </div>
        </div>
        {/* โซเดียม */}
        <div style={{ position: "relative" }}>
          <input
            name="sodium"
            onChange={onInputChange}
            value={menuData.sodium || ""}
            type="text"
            placeholder="โซเดียม"
            className={styles.input}
            style={{ marginBottom: "10px" }}
          />
          <div // ใช้ React Component ที่คุณสร้างเอง
            style={{
              position: "absolute",
              right: "15px",
              top: "10px",
              color: "#915B43",
              fontSize: "16px",
              zIndex: "1000",
              letterSpacing: "0.5px",
            }}
          >
            (กรัม)
          </div>
        </div>
        {/* ส่วนผสม */}
        <input
          name="ingredient"
          onChange={onInputChange}
          value={menuData.ingredient || ""}
          type="text"
          placeholder="ส่วนผสม"
          className={styles.input}
          style={{ marginBottom: "30px" }}
        />
      </div>
      {/* {step === 7 && <MenuPage setStep={setStep} />} */}
    </div>
  );
};

// const DrinkForm = ({ menuData, onInputChange }) => {
//   return (
//     <div className={styles.containerinput}>
//     <div style={{ position: "relative", width: "100%" ,padding: "0px 26px"}}>
//       <div>
//           <input
//           name="food_name"
//           onChange={onInputChange}
//           value={ menuData.food_name || ""}
//           type="text"
//           placeholder="ชื่อเมนู"
//           className={styles.input}
//           style={{marginBottom: "10px"}}
//         />
//       </div>
//       <div style={{position: "relative"}}>
//         <input
//           name="calories"
//           onChange={onInputChange}
//           value={ menuData.calories || ""}
//           type="text"
//           placeholder="เเคลอรี่"
//           className={styles.input}
//           style={{marginBottom: "30px"}}
//         />
//         <div // ใช้ React Component ที่คุณสร้างเอง
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "15%",
//             color: "#915B43",
//             fontSize: "16px",
//             zIndex: "1000",
//             letterSpacing:"0.5px"
//           }}
//         >(Kcal)</div>
//       </div>
//       <div style={{position: "relative"}}>
//       <input
//         name="fat"
//         onChange={onInputChange}
//         value={ menuData.carbs || ""}
//         type="text"
//         placeholder="คาร์โบไฮเดรต"
//         className={styles.input}
//         style={{marginBottom: "10px"}}
//       />
//       <div // ใช้ React Component ที่คุณสร้างเอง
//         style={{
//           position: "absolute",
//           right: "15px",
//           top: "10PX",
//           color: "#915B43",
//           fontSize: "16px",
//           zIndex: "1000",
//           letterSpacing:"0.5px"
//         }}
//       >(กรัม)</div>
//       </div>
//       <div style={{position: "relative"}}>
//         <input
//           name="protein"
//           onChange={onInputChange}
//           value={ menuData.protein || ""}
//           type="text"
//           placeholder="โปรตีน"
//           className={styles.input}
//           style={{marginBottom: "30px"}}
//         />
//         <div // ใช้ React Component ที่คุณสร้างเอง
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "10px",
//             color: "#915B43",
//             fontSize: "16px",
//             zIndex: "1000",
//             letterSpacing:"0.5px"
//           }}
//         >(กรัม)
//         </div>
//       </div>

//     </div>
//   </div>
//   );
// };

// // 📌 ฟอร์มสำหรับ "ของว่าง"
// const SnackForm = ({ menuData, onInputChange }) => {
//   return (
//     <div className={styles.containerinput}>
//       <div style={{ position: "relative", width: "100%" ,padding: "0px 26px"}}>
//         <div>
//             <input
//             name="food_name"
//             value={ menuData.food_name || ""}
//             type="text"
//             placeholder="ชื่อเมนู"
//             className={styles.input}
//             style={{marginBottom: "10px"}}
//           />
//         </div>
//         <div style={{position: "relative"}}>
//           <input
//             name="calories"
//             value={ menuData.calories || ""}
//             type="text"
//             placeholder="เเคลอรี่"
//             className={styles.input}
//             style={{marginBottom: "30px"}}
//           />
//           <div // ใช้ React Component ที่คุณสร้างเอง
//             style={{
//               position: "absolute",
//               right: "15px",
//               top: "15%",
//               color: "#915B43",
//               fontSize: "16px",
//               zIndex: "1000",
//               letterSpacing:"0.5px"
//             }}
//           >(Kcal)</div>
//         </div>
//         <div style={{position: "relative"}}>
//         <input
//           name="fat"
//           value={ menuData.fat || ""}
//           type="text"
//           placeholder="ไขมัน"
//           className={styles.input}
//           style={{marginBottom: "10px"}}
//         />
//         <div // ใช้ React Component ที่คุณสร้างเอง
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "10PX",
//             color: "#915B43",
//             fontSize: "16px",
//             zIndex: "1000",
//             letterSpacing:"0.5px"
//           }}
//         >(กรัม)</div>
//         </div>
//         <div style={{position: "relative"}}>
//         <input
//           name="carbs"
//           value={ menuData.carbs || ""}
//           type="text"
//           placeholder="คาร์โบไฮเดรต"
//           className={styles.input}
//           style={{marginBottom: "10px"}}
//         />
//         <div // ใช้ React Component ที่คุณสร้างเอง
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "10PX",
//             color: "#915B43",
//             fontSize: "16px",
//             zIndex: "1000",
//             letterSpacing:"0.5px"
//           }}
//         >(กรัม)</div>
//         </div>
//         <div style={{position: "relative"}}>
//           <input
//             name="protein"
//             value={ menuData.protein || ""}
//             type="text"
//             placeholder="โปรตีน"
//             className={styles.input}
//             style={{marginBottom: "30px"}}
//           />
//           <div // ใช้ React Component ที่คุณสร้างเอง
//             style={{
//               position: "absolute",
//               right: "15px",
//               top: "10px",
//               color: "#915B43",
//               fontSize: "16px",
//               zIndex: "1000",
//               letterSpacing:"0.5px"
//             }}
//           >(กรัม)</div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CreateMenu;
