import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import "../styles/RecentBlogs.css";

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const blogsQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(5));
        const querySnapshot = await getDocs(blogsQuery);
        setRecentBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBlogs();
  }, []);

  return (
    <div className="recent-blogs-container">
      <h2>Recent Blogs</h2>
      <div className="recent-blogs">
        {loading ? (
          <p>Loading recent blogs...</p>
        ) : recentBlogs.length > 0 ? (
          recentBlogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
        ) : (
          <p>No recent blogs available</p>
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;