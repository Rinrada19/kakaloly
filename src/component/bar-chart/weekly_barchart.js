import React from "react";
import "../bar-chart/weekbarchart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ฟังก์ชันแปลงข้อมูลจาก API ให้เป็นรูปแบบที่เหมาะสมสำหรับกราฟ
const transformDataForChart = (eatWeek) => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(day.getDate() - day.getDay() + i); // กำหนดวันเริ่มต้นสัปดาห์

    const dayName = weekDayNames[i];
    const caloriesValue =
      eatWeek.find((item) => item.date === day.toISOString().split("T")[0])
        ?.calories || 0;

    weekDates.push({
      id: i,
      day: `${weekDays[i]}\n${day.getDate()}`, // S 11, M 12, ...
      calories: caloriesValue,
    });
  }

  return weekDates;
};

const WeeklyBarChart = ({ data }) => {
  const transformedData = transformDataForChart(data);

  return (
    <ResponsiveContainer width="90%" height={280}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis
          dataKey="day"
          tickLine={true}
          axisLine={true}
          height={80}
          interval={0}
          tick={({ x, y, payload }) => {
            const [shortDay, date] = payload.value.split("\n");
            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={20}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight="700"
                  fill="#767676"
                >
                  {shortDay}
                </text>
                <text
                  x={0}
                  y={37}
                  textAnchor="middle"
                  fontSize={12}
                  fill="#767676"
                >
                  {date}
                </text>
              </g>
            );
          }}
        />
        <YAxis />
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="2"
              dy="2"
              stdDeviation="3"
              floodColor="#767676"
              floodOpacity="0.2"
            />
          </filter>
        </defs>
        <Bar
          dataKey="calories"
          fill="#FFA500"
          radius={[30, 30, 30, 30]}
          barSize={10}
          filter="url(#shadow)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyBarChart;
