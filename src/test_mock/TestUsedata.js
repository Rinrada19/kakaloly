import React from "react";
import { meals, users } from "./MockData";

export const TestUseData = () => {
  return (
    <div className="container mt-4">
      <h2>Nutrition Summary</h2>
      <div className="row">
        {meals.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Meal: {item.foodName}</h5>
                <p className="card-text">
                  <strong>Calories:</strong> {item.calories} kcal
                </p>
                <p className="card-text">
                  <strong>Meal Type:</strong> {item.mealType}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {item.mealDate}
                </p>
                <p className="card-text">
                  <strong>Notes:</strong> {item.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>User Information</h2>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text">
                  <strong>Age:</strong> {user.age}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {user.address}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  {user.isVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
