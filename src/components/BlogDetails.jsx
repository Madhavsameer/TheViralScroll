import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../styles/BlogDetails.css";
import SuggestedBlogs from './SuggestedBlogs';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogBySlug = async () => {
      try {
        const blogsQuery = query(collection(db, "blogs"), where("slug", "==", slug));
        const querySnapshot = await getDocs(blogsQuery);
        
        if (!querySnapshot.empty) {
          setBlog(querySnapshot.docs[0].data()); // Get the first matching document
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog by slug:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogBySlug();
  }, [slug]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!blog) return <p className="error">Blog Not Found</p>;

  return (
    <div className="blog-details-container">
      <h2 className="blog-title">{blog.title}</h2>
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
      <p className="blog-description">{blog.description}</p>
      <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
      <p className="blog-date"><strong>Date:</strong> {blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date available"}</p>
      {blog.tags && blog.tags.length > 0 && (
        <p className="blog-tags">
          <strong>Tags:</strong> {blog.tags.join(", ")}
        </p>
      )}
      <div className="blog-content">{blog.content}</div>
      <SuggestedBlogs/>
    </div>
  );
};

export default BlogDetails;
