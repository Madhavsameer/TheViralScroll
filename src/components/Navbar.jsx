import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import blogsData from "../data/blogs.json"; // Importing blog data

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle Search Functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">MyBlog</div>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Search on Enter key
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
