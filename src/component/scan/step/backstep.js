import React from "react";

function HeaderBackstep({ setStep }) {
  // ฟังก์ชันย้อนกลับที่ใช้ setStep
  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // ลดค่า step ลง
  };

  return (
    <header style={styles.header}>
      <button onClick={handleBack} style={styles.backButton}>
        &#8592; ย้อนกลับ
      </button>
    </header>
  );
}

// สไตล์ที่ใช้ภายในคอมโพเนนต์
const styles = {
  header: {
    padding: "10px 20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  backButton: {
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#007bff",
    zIndex: 2000,
  },
};

export default HeaderBackstep;
