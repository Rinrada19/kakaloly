import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import backgray from '../../../../imgAll/icon/backgray.png';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDay, setHighlightedDay] = useState(new Date().getDate());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [direction, setDirection] = useState(''); // เก็บทิศทางของการเลื่อน
  const today = new Date();

  const generateDays = (baseDate) => {
    const days = [];
    const startDay = new Date(baseDate);
    const todayDate = today.getDate();

    if (baseDate.getTime() === today.getTime()) {
      for (let i = 0; i < 5; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        days.push(day);
      }
    } else {
      startDay.setDate(startDay.getDate() - Math.floor(5 / 2));
      let index = 0;
      while (days.length < 5) {
        const day = new Date(startDay);
        day.setDate(startDay.getDate() + index);
        if (day.getDate() === todayDate) {
          days.unshift(day);
        } else {
          days.push(day);
        }
        index++;
      }
    }

    return days;
  };

  const [days, setDays] = useState(generateDays(today));

  useEffect(() => {
    setDays(generateDays(selectedDate));
  }, [selectedDate]);

  const handlePreviousDays = () => {
    setDirection('left'); // เลื่อนซ้าย
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 5);
    setSelectedDate(newDate);
    setHighlightedDay(null);
  };

  const handleNextDays = () => {
    setDirection('right'); // เลื่อนขวา
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 5);
    setSelectedDate(newDate);
    setHighlightedDay(null);
  };

  const getShortMonth = (date) => {
    return date.toLocaleString('th-TH', { month: 'short' });
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
        <div onClick={() => setIsCalendarOpen(!isCalendarOpen)} className={styles.mouth}>
          {selectedDate.toLocaleString('th-TH', { month: 'long' })}
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

      {/* Days Row */}
      <div className={`${styles.daysRow} ${direction === 'left' ? styles['daysRow-moving-left'] : ''} ${direction === 'right' ? styles['daysRow-moving-right'] : ''}`}>
        {days.map((day, index) => {
          const isHighlighted = highlightedDay === day.getDate() && day.getMonth() === selectedDate.getMonth();
          const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

          return (
            <button
              key={index}
              style={{
                backgroundColor: isHighlighted ? '#EF7430' : '#F1E0D6',
                color: isHighlighted ? '#FFFFFF' : '#000000',
                width: '52px',
                height: '83px',
                borderRadius: '30px',
                margin: '0px 10px',
                border: isToday ? '2px solid #EF7430' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={isHighlighted ? styles.selected : ''}
              onClick={() => setHighlightedDay(day.getDate())}
            >
              <span style={{ fontSize: '22px', fontWeight: 'bold' }}>{day.getDate()}</span>
              <span style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '-4px' }}>
                {getShortMonth(day)}
              </span>
            </button>
          );
        })}
      </div>

      {isCalendarOpen && (
        <div className={styles.calendarPopup}>
          <p>แสดงปฏิทินเต็มรูปแบบที่นี่</p>
        </div>
      )}
    </div>
  );
}

export default Calendar;
