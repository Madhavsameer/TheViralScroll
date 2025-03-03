import React, { useState } from "react";
import { useParams } from "react-router-dom";
import blogsData from "../data/blogs.json";
import "../styles/BlogDetails.css";
import RecentBlogs from "./RecentBlogs";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  const [currentImage, setCurrentImage] = useState(0);

  if (!blog) {
    return <h2>Blog Not Found</h2>;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % blog.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + blog.images.length) % blog.images.length);
  };

  return (<>
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <div className="image-slider">
        <button onClick={prevImage} className="slider-btn">{"<"}</button>
        <img
          src={require(`../assets/${blog.images[currentImage]}`)}
          alt={blog.title}
          className="blog-detail-image"
        />
        <button onClick={nextImage} className="slider-btn">{">"}</button>
      </div>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>Date:</strong> {blog.date}</p>
      <p>{blog.description}</p>
    </div>
    <RecentBlogs/>
    </>
  );
};

export default BlogDetails;
