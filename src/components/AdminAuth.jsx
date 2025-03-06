import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminAuth.css";

const AdminAuth = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = "Srpan@070223"; // Change this or use Firebase Auth
    
    if (password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect Password. Access Denied.");
    }
  };

  return (
    <div className="admin-auth-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminAuth;
