import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import TrendingBlogs from "./TrendingBlogs";



const Home = () => {
  
  
 
  return (
    <section id="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>
          <p>Explore insightful articles, tutorials, and trending topics in technology.</p>
          <Link to="/blogs" className="explore-btn">Explore Blogs</Link>
        </div>
      </div>
      <TrendingBlogs/>

      

     
      
    </section>
  );
};

export default Home;
