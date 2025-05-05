import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.scss";
import backgray from "../../../../imgAll/icon/backgray.png";

function Calendar({ onDateSelect }) {
  const today = new Date();

  // ดึงวันที่ที่เลือกจาก localStorage ถ้ามี
  const savedSelectedDate = localStorage.getItem("selectedDate");
  const initialSelectedDate = savedSelectedDate
    ? new Date(savedSelectedDate)
    : today;

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [highlightedDay, setHighlightedDay] = useState(initialSelectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [direction, setDirection] = useState("");

  const generateDays = (centerDate) => {
    const baseDate = new Date(
      centerDate.getFullYear(),
      centerDate.getMonth(),
      centerDate.getDate()
    );
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const [days, setDays] = useState(generateDays(today));

  useEffect(() => {
    const today = new Date();
    const savedSelectedDate = localStorage.getItem("selectedDate");

    if (savedSelectedDate) {
      const savedDate = new Date(savedSelectedDate);
      // หากวันที่ที่เก็บไว้ไม่ใช่วันนี้ ให้รีเซ็ต selectedDate เป็นวันนี้
      if (savedDate.toDateString() !== today.toDateString()) {
        setSelectedDate(today); // รีเซ็ตไปที่วันที่ปัจจุบัน
      } else {
        setSelectedDate(savedDate); // ถ้าใช่ก็ใช้วันที่ใน localStorage
      }
    } else {
      setSelectedDate(today); // ถ้าไม่มีวันที่เก็บไว้ให้ใช้วันนี้
    }
  }, []); // ใส่ [] เพื่อให้ useEffect เรียกครั้งเดียวเมื่อ component mount

  useEffect(() => {
    // อัปเดตวันต่างๆ ที่แสดงในปฏิทิน
    setDays(generateDays(selectedDate));

    // เซฟวันที่ที่เลือกใน localStorage
    localStorage.setItem("selectedDate", selectedDate.toISOString());
  }, [selectedDate]); // จะทำงานเมื่อ selectedDate เปลี่ยนแปลง

  const handlePreviousDays = () => {
    setDirection("left");
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 5);
    setSelectedDate(newDate);
  };

  const handleNextDays = () => {
    setDirection("right");
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 5);
    setSelectedDate(newDate);
  };

  const getShortMonth = (date) => {
    return date.toLocaleString("th-TH", { month: "short" });
  };

  const handleDateSelect = (day) => {
    const normalizedDay = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );
    setSelectedDate(normalizedDay);
    setHighlightedDay(normalizedDay);

    const selectedDateString = `${normalizedDay.getFullYear()}-${(
      normalizedDay.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${normalizedDay
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    onDateSelect(selectedDateString);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div>
          <img
            src={backgray}
            className={styles.backbutton}
            alt="left"
            onClick={handlePreviousDays}
          />
        </div>
        <div
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={styles.mouth}
        >
          {selectedDate.toLocaleString("th-TH", { month: "long" })}
        </div>
        <div>
          <img
            src={backgray}
            className={styles.backbutton2}
            alt="right"
            onClick={handleNextDays}
          />
        </div>
      </div>

      <div
        className={`${styles.daysRow} ${
          direction === "left" ? styles["daysRow-moving-left"] : ""
        } ${direction === "right" ? styles["daysRow-moving-right"] : ""}`}
      >
        {days.map((day, index) => {
          const isHighlighted =
            highlightedDay &&
            day.getDate() === highlightedDay.getDate() &&
            day.getMonth() === highlightedDay.getMonth() &&
            day.getFullYear() === highlightedDay.getFullYear();

          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();
          return (
            <button
              key={index}
              style={{
                backgroundColor: isHighlighted ? "#EF7430" : "#F1E0D6",
                color: isHighlighted ? "#FFFFFF" : "#000000",
                width: "52px",
                height: "83px",
                borderRadius: "30px",
                margin: "0px 10px",
                border: isToday ? "2px solid #EF7430" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleDateSelect(day)}
            >
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                {day.getDate()}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  marginTop: "-4px",
                }}
              >
                {getShortMonth(day)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
