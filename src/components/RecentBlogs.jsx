import React from "react";
import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import "../styles/RecentBlogs.css";

const RecentBlogs = () => {
  // Sort blogs by date (latest first) and take the top 5
  const recentBlogs = [...blogsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="recent-blogs-container">
      <h2>Recent Blogs</h2>
      <div className="recent-blogs">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
