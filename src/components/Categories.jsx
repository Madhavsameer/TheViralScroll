import React, { useState } from "react";
import "../styles/Categories.css";
import blogsData from "../data/blogs.json";
import { FaLaptopCode, FaFootballBall, FaNewspaper, FaLandmark } from "react-icons/fa";

const categoryIcons = {
  Tech: <FaLaptopCode size={40} />, 
  Sports: <FaFootballBall size={40} />, 
  News: <FaNewspaper size={40} />, 
  Politics: <FaLandmark size={40} />,
};



const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extract unique categories from blogs
  const categories = [...new Set(blogsData.flatMap((blog) => blog.categories))];

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogsData.filter((blog) => blog.categories.includes(selectedCategory))
    : [];

  return (
    <section id="categories">
      <h2>Explore Categories</h2>
      <div className="category-cards">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {categoryIcons[category] || ""}
            <h3>{category}</h3>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="filtered-blogs">
          <h3>Blogs in {selectedCategory}</h3>
          <div className="blog-list">
            {filteredBlogs.map((blog) => (
              <div className="blog-card" key={blog.id}>
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
