import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ส่ง token จาก localStorage ไปยัง Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        // ตรวจสอบว่า Service Worker ได้รับการควบคุมแล้ว
        if (navigator.serviceWorker.controller) {
          const token = localStorage.getItem("token");
          if (token) {
            navigator.serviceWorker.controller.postMessage({ token });
          }
        }
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

// หากต้องการเริ่มวัดประสิทธิภาพในแอปของคุณ
reportWebVitals();
serviceWorkerRegistration.register();
