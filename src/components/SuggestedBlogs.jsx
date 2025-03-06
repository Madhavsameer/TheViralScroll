import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/SuggestedBlogs.css";

const SuggestedBlogs = ({ currentBlog }) => {
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const allBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Filter blogs with the same category as the current blog (excluding itself)
        const filteredBlogs = allBlogs
          .filter((blog) => blog.category === currentBlog.category && blog.id !== currentBlog.id)
          .slice(0, 4); // Show up to 4 suggested blogs

        setSuggestedBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching suggested blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentBlog) {
      fetchSuggestedBlogs();
    }
  }, [currentBlog]);

  return (
    <div className="suggested-blogs-container">
      <h2>Suggested Blogs</h2>
      <div className="suggested-blogs">
        {loading ? (
          <p>Loading suggested blogs...</p>
        ) : suggestedBlogs.length > 0 ? (
          suggestedBlogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
        ) : (
          <p>No similar blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedBlogs;