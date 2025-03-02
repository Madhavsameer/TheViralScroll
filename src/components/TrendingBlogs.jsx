import React, { useEffect, useState } from "react";
import "../styles/TrendingBlogs.css";
import { Link } from "react-router-dom";
import blogsData from "../data/blogs.json";

const TrendingBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    setTrendingBlogs(blogsData.slice(0, 3)); // Display top 3 trending blogs
  }, []);

  return (
    <div className="trending-blogs">
      <h2>🔥 Trending Blogs</h2>
      <div className="trending-list">
        {trendingBlogs.map((blog) => (
          <div className="trending-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <Link to={`/blog/${blog.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingBlogs;
