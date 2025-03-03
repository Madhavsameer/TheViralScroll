import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const handleViewDetails = () => {
    navigate(`/blog/${blog.id}`);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % blog.images.length);
  };

  return (
    <div className="blog-card">
      <img
        src={require(`../assets/${blog.images[currentImage]}`)}
        alt={blog.title}
        className="blog-image"
        onClick={nextImage}
      />
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
