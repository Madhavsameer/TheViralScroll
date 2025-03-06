import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-actions">
        <button onClick={() => navigate("/addblog")} className="admin-btn">Add Blog</button>
        <button onClick={() => navigate("/admin/manage-blogs")} className="admin-btn">Manage Blogs</button>
        <button onClick={() => navigate("/admin/insights")} className="admin-btn">View Insights</button>
        <button onClick={() => navigate("/admin/contact-messages")} className="admin-btn">View Contacts</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
