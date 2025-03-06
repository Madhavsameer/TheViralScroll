import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import BlogCard from "./BlogCard";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const allBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Filter blogs based on search query (title or description)
        const matchedBlogs = allBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(query) ||
            blog.description.toLowerCase().includes(query)
        );

        setFilteredBlogs(matchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      <div className="search-results">
        {loading ? (
          <p>Loading search results...</p>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;