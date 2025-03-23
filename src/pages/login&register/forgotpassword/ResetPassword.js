import React, { useState } from "react";
import { useParams } from "react-router-dom"; // นำเข้า useParams
import { resetPassword } from "../../../api/api_forgetpass";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // นำเข้าไอคอน

import styles from "../custom.module.scss";

const ResetPassword = () => {
  const { token } = useParams(); // ดึง token จาก URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน

  const handleResetPassword = async () => {
    try {
      // เรียกฟังก์ชัน resetPassword ที่ต้องใช้ token และ newPassword
      const data = await resetPassword(token, newPassword); // เรียกฟังก์ชันที่คุณสร้าง
      setMessage(data.message || "รีเซ็ตรหัสผ่านสำเร็จ");
    } catch (error) {
      setMessage(
        "เกิดข้อผิดพลาด: " +
          (error.response?.data?.message || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้")
      );
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <div className="card shadow-sm p-4">
        <h5 className="card-title text-center mb-4">รีเซ็ตรหัสผ่าน</h5>
        {/* <p className="text-center mb-4">Token: {token}</p> */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            กรุณากรอกรหัสผ่านใหม่
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"} // ถ้า showPassword เป็น true ให้แสดงรหัสผ่าน
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)} // สลับการแสดงรหัสผ่าน
            >
              {showPassword ? (
                <FaEyeSlash className={styles.iconshowpassword} />
              ) : (
                <FaEye className={styles.iconshowpassword} />
              )}
            </button>
          </div>
        </div>
        <button
          type="button"
          className={`btn w-100 ${loading ? "disabled" : ""}`} // เอาคลาส btn-primary ออก
          onClick={handleResetPassword}
          disabled={loading}
          style={{
            backgroundColor: "#EF7430",
            borderColor: "#EF7430",
            color: "#fff",
          }} // กำหนดสีเอง
        >
          {loading ? "กำลังโหลด..." : "รีเซ็ตรหัสผ่าน"}
        </button>

        {message && (
          <div
            className={`mt-3 alert ${
              message.includes("ข้อผิดพลาด") ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
