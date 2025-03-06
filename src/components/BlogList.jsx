import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        setBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog.id} blogId={blog.id} />)
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default Blogs;
