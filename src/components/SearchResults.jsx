import React from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filter blogs based on search query (title or description)
  const filteredBlogs = blogsData.filter(
    (blog) => 
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query)
  );

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      <div className="search-results">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
