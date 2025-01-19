import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mockData } from '../../../../../test_mock/MockData'; // ดึงข้อมูลจาก MockData.js

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  // สมมติว่าต้องการแสดงข้อมูลแรกใน mockData
  const { carbohydrates, protein, fat } = mockData[0];

  // คำนวณผลรวมการบริโภคและเป้าหมายทั้งหมด
  const totalConsumed = carbohydrates.consumed + protein.consumed + fat.consumed;
  const totalTarget = carbohydrates.target + protein.target + fat.target;

  // คำนวณเปอร์เซ็นต์การบริโภคจากผลรวมทั้งหมด
  const carbPercentage = Math.floor((carbohydrates.consumed / totalConsumed) * 100);
  const proteinPercentage = Math.floor((protein.consumed / totalConsumed) * 100);
  const fatPercentage = Math.floor((fat.consumed / totalConsumed) * 100);

  // ตั้งค่าข้อมูลสำหรับ Doughnut Chart
  const data = {
    labels: ['Carbohydrates', 'Protein', 'Fat'],
    datasets: [
      {
        label: 'Nutrient Consumption',
        data: [carbPercentage, proteinPercentage, fatPercentage],
        backgroundColor: [
          'rgb(243, 126, 31)', // สีสำหรับคาร์โบไฮเดรต
          'rgb(254, 184, 0)', // สีสำหรับโปรตีน
          'rgb(253, 70, 0)', // สีสำหรับไขมัน
        ],
        hoverOffset: 4,
        borderRadius: 10, // เพิ่ม border radius
      },
    ],
  };

  // ตัวเลือกสำหรับการแสดงผล
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ซ่อน legend ดั้งเดิม
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '80%', // ขนาดของรูตรงกลาง
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '26px', // ระยะห่างระหว่างกราฟและรายละเอียด
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Chart */}
      <div style={{ maxWidth: '130px' }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* Details */}
      <div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              justifyContent: 'space-between', // ให้มีการจัดตำแหน่งให้พอดีกัน
            }}
          >
            <span
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: 'rgb(243, 126, 31)',
                display: 'inline-block',
                borderRadius: '4px', // เปลี่ยนเป็นสี่เหลี่ยมที่มี borderRadius 4px
              }}
            ></span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginRight: '4px',
                color: '#915B43',
                width:'20px',
                marginLeft:"10px"
              }}
            >
              {carbPercentage}
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#915B43',
                minWidth: '20px', // ให้ % อยู่ตรงกัน
              }}
            >
              %
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '6px',
                color: '#915B43',
                minWidth: '80px', // เพิ่ม minWidth ให้ชื่อสารอาหารเท่ากัน
              }}
            >
              คาร์โบไฮเดรต
            </span>
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: 'rgb(254, 184, 0)',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            ></span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginRight: '4px',
                color: '#915B43',
                width:'20px',
                marginLeft:"10px"
              }}
            >
              {proteinPercentage}
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#915B43',
                minWidth: '20px',
              }}
            >
              %
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '6px',
                color: '#915B43',
                minWidth: '80px',
              }}
            >
              โปรตีน
            </span>
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: 'rgb(253, 70, 0)',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            ></span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginRight: '4px',
                color: '#915B43',
                width:'20px',
                marginLeft:"10px"
              }}
            >
              {fatPercentage}
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#915B43',
                minWidth: '20px',
              }}
            >
              %
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '6px',
                color: '#915B43',
                minWidth: '80px',
              }}
            >
              ไขมัน
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DonutChart;
