// mockdata.js
//ที่จะเเก้ไข
//1.goal เอาความสูง น้ำหนัก กิจกรรม อายุ หรือเรียกว่า TDEE
//2.พวกสารอาหาร เเคล ต่างๆ เอามาจากอาหาร meals เเล้วมาคำนวณค่าต่างๆเเทน เดวคุยกับน้ำ 
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    address: "123 Main St, Springfield",
    phone: "555-1234",
    isVerified: true,
    wight: 70 , // ** เพิ่มมาใหม่
    hight: 181, // ** เพิ่มมาใหม่
    BMI: 21.5,
    statusBMI: "สุขภาพดี",
  },
];

export const LimitNutrition = [
  {
   limitsodium: 2300,
   limitsugar: 50,
  },
];


export const dailyNutrition = [
  {
    date: "2024-12-12",
    calories: 450, // แคลอรีที่กินไป
    exercise: 200, // แคลอรีที่เผาผลาญจากการออกกำลังกาย
    goal: 1750, // เป้าหมายแคลอรีสุทธิ  // อาจจะไม่ใช้ค่านี้ เเต่จะเอามาจากการคำนวณน้ำหนังส่วนสูงกิจกรรม 
    protein: 15, // พวกค่าโภชการต่างๆก็จะเอาออก เเล้วเอาข้อมูลตรงอาหาร ex. กะเพรา 200 carb + อื่นๆ เเทน 
    carbs: 150,
    fats: 40,
    goalprotein: 80,
    goalcarbs: 300,
    goalfats: 120,
    sodium: 1200,
    sugar:60,
    water:6,
  },
  {
    date: "2024-12-11",
    calories: 120,
    exercise: 100,
    goal: 1630,
    protein: 4,
    carbs: 20,
    fats: 2,
    goalprotein: 80,
    goalcarbs: 210,
    goalfats: 100,
  },
];


export const meals = [
  {
    mealId: "M001",
    userId: 1,
    foodName: "Pad Thai",
    calories: 400,
    mealType: "Lunch",
    mealDate: "2024-01-15",
    notes: "Added extra peanuts and lime",
    by_date: "7 กันยายน"
  },
  {
    mealId: "M001",
    userId: 1,
    foodName: "Ga pioa",
    calories: 450,
    mealType: "Lunch",
    mealDate: "2024-01-15",
    notes: "Added extra peanuts and lime",
  },
  {
    mealId: "M002",
    userId: 2,
    foodName: "Som Tum",
    calories: 200,
    mealType: "Dinner",
    mealDate: "2024-01-16",
    notes: "No sugar added",
  },
  {
    mealId: "M003",
    userId: 1,
    foodName: "Khao Man Gai",
    calories: 450,
    mealType: "Breakfast",
    mealDate: "2024-01-17",
    notes: "Extra sauce",
  },
  {
    mealId: "M003",
    userId: 1,
    foodName: " Fried rice",
    calories: 350,
    mealType: "Breakfast",
    mealDate: "2024-01-17",
    notes: "Extra sauce",
  },
];

export const mockData = [
  {
    carbohydrates: { consumed:300, target: 300 },
    protein: { consumed: 80, target: 80 },
    fat: { consumed: 120, target: 120 },
  },
];