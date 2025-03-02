import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import TrendingBlogs from "./TrendingBlogs";
import blogsData from "../data/blogs.json";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  
  useEffect(() => {
    const sortedBlogs = [...blogsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestBlogs(sortedBlogs.slice(0, 3)); // Fetch latest 3 blogs
  }, []);

  return (
    <section id="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>
          <p>Explore insightful articles, tutorials, and trending topics in technology.</p>
          <Link to="/blogs" className="explore-btn">Explore Blogs</Link>
        </div>
      </div>
      
      <TrendingBlogs />

      <div className="latest-blogs">
        <h2>Latest Blogs</h2>
        <div className="blog-list">
          {latestBlogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img src={blog.image} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <Link to={`/blog/${blog.id}`}>Read More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
