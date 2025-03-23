import React, { useState, useEffect, useRef } from "react"; // ✅ เพิ่ม useRef
import styles from "./MenuPage.module.scss";
// import "../../styles/custom.scss";

import { useNavigate } from "react-router-dom";
import FilterButton from "./component/FilterButton";
import back from "../../imgAll/element/goback.png";
import searchIcon from "../../imgAll/element/searchMenuIcon.png";
import foodicon from "../../imgAll/element2/ad_food.jpg";
import foodiconActive from "../../imgAll/element2/ad_foodactive.jpg";
import wateractive from "../../imgAll/element2/ad_wateractive.jpg";
import watericon from "../../imgAll/element2/ad_water.jpg";
import ad_snackactive from "../../imgAll/element2/ad_snackactive.png";
import ad_snack from "../../imgAll/element2/ad_snack.jpg";
import ad_time from "../../imgAll/element2/ad_time.jpg";
import ad_timeactive from "../../imgAll/element2/ad_timeactive.png";
import ad_book from "../../imgAll/element2/ad_book.png";
import ad_bookactive from "../../imgAll/element2/ad_bookactive.png";

import { getFood } from "../../api/api_food";
import { getManuitem } from "../../api/api_manuitem";

const MenuPage = ({ setStep, step, setSelectedMenu, selectedMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState("อาหาร");
  const [foods, setFoods] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorytwo, setSelectedCategorytwo] = useState("อาหาร");
  const isMounted = useRef(true);

  useEffect(() => {
    // console.log("🚀 ค่า step ที่ตรวจสอบ:", step); // ตรวจสอบค่า step
    // console.log("📌 selectedMenu ใน useEffect: ", selectedMenu); // ตรวจสอบค่า selectedMenu
    if (step === 4 && selectedMenu) {
      // console.log("🔥 ค่าที่จะส่งไป FormMeal: ", selectedMenu);
      setStep(4); // ที่นี่คุณต้องการให้ `setStep(4)` ไปที่หน้าของ `FormMeal`
    }
  }, [step, selectedMenu]);

  useEffect(() => {
    let isMounted = true; // ✅ ป้องกันการอัปเดตหลัง unmount

    const fetchFoodData = async () => {
      const token = localStorage.getItem("token"); // ✅ ดึง token
      if (!token) {
        //   console.error("❌ ไม่มี token");
        setError("ไม่พบ token กรุณาเข้าสู่ระบบใหม่");
        setLoading(false);
        return;
      }

      // console.log("🔑 Token ที่ใช้:", token); // ✅ Debug Log

      // ✅ ข้อมูลที่ต้องส่งไป API
      const data = {
        userId: localStorage.getItem("userId") || "", // สมมติว่าต้องการ userId
        otherParam: "some_value", // เปลี่ยนค่าตามต้องการ
      };

      // console.log("📦 ส่งค่าไป API:", data); // ✅ Debug Log

      try {
        const [foodData, manuItemData] = await Promise.all([
          getFood(data, token),
          getManuitem(data, token),
        ]);

        if (isMounted) {
          // console.log("✅ ดึงข้อมูลสำเร็จ!", { foodData, manuItemData }); // ✅ Debug Log
          setFoods(foodData);
          setMenuItems(manuItemData);
        }
      } catch (error) {
        if (isMounted) {
          //    console.error("❌ Error fetching data:", error);
          setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู");
        }
      } finally {
        if (isMounted) {
          // console.log("🛑 โหลดข้อมูลเสร็จแล้ว");
          setLoading(false);
        }
      }
    };

    fetchFoodData();

    return () => {
      isMounted = false; // ✅ Cleanup function
    };
  }, []);

  const filteredFoods = foods.filter(
    (food) =>
      food?.food_category === selectedCategory &&
      food?.food_name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  const filteredFoodstwo = menuItems.filter(
    (foodssa) =>
      foodssa?.food_category === selectedCategorytwo &&
      foodssa?.food_name
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "")
  );

  const handleGoToStep1 = () => {
    setStep(1);
  };
  const handleGoToStep8 = () => {
    // console.log("✅ Going to step 8");
    setStep(8);
  };
  const handleNavigate = (item) => {
    setSelectedMenu(item); // อัปเดต selectedMenu
    setStep(4); // เปลี่ยน step เป็น 4
  };

  return (
    <div
      className={styles.menu_page}
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div className={styles.menu_page_header}>
        <img
          src={back}
          className={styles.gobackicon}
          onClick={handleGoToStep1}
          alt="search"
        />
        <div className={styles.menu_page_header_text}>
          <input
            type="text"
            placeholder="Search . . ."
            className={styles.searchinput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={searchIcon} alt="Search Icon" className={styles.icon} />
        </div>
      </div>

      <div className={styles.containerfillter}>
        <FilterButton
          icon={foodicon}
          activeIcon={foodiconActive}
          label="อาหาร"
          isActive={selectedCategory === "อาหาร"}
          onClick={() => setSelectedCategory("อาหาร")}
          iconStyle={{ width: "20px", height: "20px" }}
        />
        <FilterButton
          icon={watericon}
          activeIcon={wateractive}
          label="เครื่องดื่ม"
          isActive={selectedCategory === "เครื่องดื่ม"}
          onClick={() => setSelectedCategory("เครื่องดื่ม")}
          iconStyle={{ width: "13px", height: "17px" }}
        />
        <FilterButton
          icon={ad_snack}
          activeIcon={ad_snackactive}
          label="ของว่าง"
          isActive={selectedCategory === "ของหวาน"}
          onClick={() => setSelectedCategory("ของหวาน")}
          iconStyle={{ width: "16px", height: "17px" }}
        />
      </div>

      <div className={styles.containerfillter1}>
        <FilterButton
          icon={ad_time}
          activeIcon={ad_timeactive}
          label="ล่าสุด"
          isActive={selectedCategory === "ล่าสุด"}
          onClick={() => setSelectedCategory("ล่าสุด")}
          iconStyle={{ width: "20px", height: "20px" }}
        />
        <div className={styles.foodfilter1}></div>
        <FilterButton
          icon={ad_book}
          activeIcon={ad_bookactive}
          label="ที่บันทึก"
          isActive={selectedCategory === "ที่บันทึก"}
          onClick={() => setSelectedCategory("ที่บันทึก")}
          iconStyle={{ width: "13px", height: "16px" }}
        />
      </div>

      <div className={styles.wrappercontent}>
        {filteredFoods.length > 0
          ? filteredFoods.map((item) => (
              <div
                className={styles.boxcontent}
                key={item.id || item.food_name}
              >
                <button
                  className={styles.button_add}
                  onClick={() => handleNavigate(item)} // เรียก handleNavigate เมื่อคลิก
                >
                  {item.food_name}
                </button>
              </div>
            ))
          : selectedCategory !== "ที่บันทึก" && (
              <p>ไม่มีรายการที่ตรงกับการค้นหา</p>
            )}
      </div>
      {selectedCategory === "ที่บันทึก" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ padding: "0px 10px", width: "100%" }}>
            <button className={styles.addmenu} onClick={() => setStep(8)}>
              สร้างเมนูอาหาร
            </button>
          </div>
          <div
            className={styles.containerfillter}
            style={{ marginBottom: "30px", marginTop: "20px" }}
          >
            <FilterButton
              icon={foodicon}
              activeIcon={foodiconActive}
              label="อาหาร"
              isActive={selectedCategorytwo === "อาหาร"}
              onClick={() => setSelectedCategorytwo("อาหาร")}
              iconStyle={{ width: "20px", height: "20px" }}
            />
            <FilterButton
              icon={watericon}
              activeIcon={wateractive}
              label="เครื่องดื่ม"
              isActive={selectedCategorytwo === "เครื่องดื่ม"}
              onClick={() => setSelectedCategorytwo("เครื่องดื่ม")}
              iconStyle={{ width: "13px", height: "17px" }}
            />
            <FilterButton
              icon={ad_snack}
              activeIcon={ad_snackactive}
              label="ของว่าง"
              isActive={selectedCategorytwo === "ของหวาน"}
              onClick={() => setSelectedCategorytwo("ของหวาน")}
              iconStyle={{ width: "16px", height: "17px" }}
            />
          </div>
          <div className={styles.wrappercontent}>
            {filteredFoodstwo.length > 0
              ? filteredFoodstwo.map((item) => (
                  <div className={styles.boxcontent} key={item.item_id}>
                    <button
                      className={styles.button_add}
                      onClick={() => handleNavigate(item)}
                    >
                      {item.food_name}
                    </button>
                  </div>
                ))
              : selectedCategory !== "ที่บันทึก" && (
                  <p>ไม่มีรายการที่ตรงกับการค้นหา</p>
                )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
