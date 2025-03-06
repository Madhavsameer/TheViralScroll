import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/ViewInsights.css";

const ViewInsights = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [categoryCount, setCategoryCount] = useState({});
  const [trendingBlogs, setTrendingBlogs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogs = querySnapshot.docs.map((doc) => doc.data());

        setTotalBlogs(blogs.length);
        setTrendingBlogs(blogs.filter((blog) => blog.trending).length);

        const categoryData = {};
        blogs.forEach((blog) => {
          if (categoryData[blog.category]) {
            categoryData[blog.category]++;
          } else {
            categoryData[blog.category] = 1;
          }
        });

        setCategoryCount(categoryData);
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="view-insights-container">
      <h2>Blog Insights</h2>
      {loading ? <p>Loading insights...</p> : (
        <div className="insights">
          <p><strong>Total Blogs:</strong> {totalBlogs}</p>
          <p><strong>Trending Blogs:</strong> {trendingBlogs}</p>
          <h3>Blogs Per Category</h3>
          <ul>
            {Object.entries(categoryCount).map(([category, count]) => (
              <li key={category}>{category}: {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewInsights;
