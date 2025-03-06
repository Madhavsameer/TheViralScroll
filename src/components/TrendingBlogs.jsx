import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import "../styles/TrendingBlogs.css";

const TrendingBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const trendingQuery = query(collection(db, "blogs"), where("trending", "==", true), limit(3));
        const querySnapshot = await getDocs(trendingQuery);
        setTrendingBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching trending blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingBlogs();
  }, []);

  return (
    <div className="trending-container">
      <h2>🔥 Trending Blogs</h2>
      <div className="trending-blogs">
        {loading ? (
          <p>Loading trending blogs...</p>
        ) : trendingBlogs.length > 0 ? (
          trendingBlogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
        ) : (
          <p>No trending blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingBlogs;