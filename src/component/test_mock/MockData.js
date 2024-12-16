// mockdata.js

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    address: "123 Main St, Springfield",
    phone: "555-1234",
    isVerified: true,
  },
];

export const dailyNutrition = [
  {
    date: "2024-12-12",
    calories: 450, // แคลอรีที่กินไป
    exercise: 200, // แคลอรีที่เผาผลาญจากการออกกำลังกาย
    goal: 1750, // เป้าหมายแคลอรีสุทธิ
    protein: 34,
    carbs: 49,
    fats: 10.5,
    goalprotein: 80,
    goalcarbs: 300,
    goalfats: 120,
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
