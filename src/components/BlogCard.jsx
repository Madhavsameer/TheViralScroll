import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/BlogCard.css";

const BlogCard = ({ blogId }) => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", blogId);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          console.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  const handleViewDetails = () => {
    navigate(`/blog/${blog.slug}`); // Navigate using slug instead of Firestore ID
  };

  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
        <button onClick={handleViewDetails} className="btn btn-primary">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
