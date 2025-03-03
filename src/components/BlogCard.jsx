import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Date:</strong> {blog.date}</p>
        <button onClick={handleViewDetails} className="btn btn-primary">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
