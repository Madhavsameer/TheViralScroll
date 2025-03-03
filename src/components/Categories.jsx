import React, { useState } from "react";
import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import "../styles/Categories.css";
import { FaRunning, FaFire, FaLaptopCode, FaLandmark, FaGlobe } from "react-icons/fa"; // Import icons

// Map categories to FontAwesome icons
const categoryIcons = {
  All: <FaGlobe />,
  Sports: <FaRunning />,
  Trending: <FaFire />,
  Tech: <FaLaptopCode />,
  Politics: <FaLandmark />,
};

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(blogsData.map((blog) => blog.category))];

  // Filter blogs based on category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogsData
      : blogsData.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="categories-container">
      <h1>Browse by Category</h1>
      
      {/* Category Cards */}
      <div className="category-cards">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-card ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            <div className="category-icon">{categoryIcons[category] || <FaGlobe />}</div>
            <p>{category}</p>
          </div>
        ))}
      </div>

      {/* Blog List */}
      <div className="blog-container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs available in this category</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
