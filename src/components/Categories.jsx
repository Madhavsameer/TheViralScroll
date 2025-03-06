import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Categories.css";
import { FaRunning, FaFire, FaLaptopCode, FaLandmark, FaGlobe } from "react-icons/fa";

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
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const fetchedBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(fetchedBlogs);

        // Extract unique categories from blogs
        const uniqueCategories = ["All", ...new Set(fetchedBlogs.map((blog) => blog.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs based on category
  const filteredBlogs =
    selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory);

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
        {loading ? (
          <p>Loading blogs...</p>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
        ) : (
          <p>No blogs available in this category</p>
        )}
      </div>
    </div>
  );
};

export default Categories;