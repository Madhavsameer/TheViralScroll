import React from "react";
import { useParams } from "react-router-dom";
import blogsData from "../data/blogs.json";
import "../styles/BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog Not Found</h2>;
  }

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>Date:</strong> {blog.date}</p>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetails;
