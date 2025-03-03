import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import "../styles/BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  return (
    <div className="blog-list">
      <h1>Latest Blogs</h1>
      <div className="blog-container">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
