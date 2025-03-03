import React from "react";
import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import "../styles/TrendingBlogs.css";

const TrendingBlogs = () => {
  // Filter top 3 trending blogs
  const trendingBlogs = blogsData.filter((blog) => blog.trending).slice(0, 3);

  return (
    <div className="trending-container">
      <h2>🔥 Trending Blogs</h2>
      <div className="trending-blogs">
        {trendingBlogs.length > 0 ? (
          trendingBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No trending blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingBlogs;
