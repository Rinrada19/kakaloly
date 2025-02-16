import React from "react";
import "../bar-chart/weekbarchart.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

// 🔹 กำหนดข้อมูลแคลอรี่สำหรับแต่ละวัน (ดึงมาจาก object)
const caloriesData = {
    Monday: 900,
    Tuesday: 2200,
    Wednesday: 600,
    Thursday: 1500,
    Friday: 800,
    Saturday: 1800,
    Sunday: 1000
};

// ฟังก์ชันสร้างข้อมูลจาก object
const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);

        const dayName = weekDayNames[i]; // ชื่อเต็มของวัน (Monday, Tuesday, etc.)
        const caloriesValue = caloriesData[dayName] || 0; // ดึงค่าจาก object ถ้าไม่มีให้ใช้ 0

        weekDates.push({ 
            id: i,
            day: `${weekDays[i]}\n${day.getDate()}`, // S 11, M 12, ...
            calories: caloriesValue
        });
    }
    return weekDates;
};

const WeeklyBarChart = () => {
    const data = getWeekDates();

    return (
        <ResponsiveContainer width="90%" height={280}>
            <BarChart data={data}>
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
                                <text x={0} y={20} textAnchor="middle" fontSize={14} fontWeight="700" fill="#767676">
                                    {shortDay}
                                </text>
                                <text x={0} y={37} textAnchor="middle" fontSize={12} fill="#767676">
                                    {date}
                                </text>
                            </g>
                        );
                    }}
                />
                <YAxis />
               
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#767676" floodOpacity="0.2"/>
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
