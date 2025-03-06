import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/ManageBlogs.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setBlogs(blogs.filter((blog) => blog.id !== id));
        alert("Blog deleted successfully.");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="manage-blogs-container">
      <h2>Manage Blogs</h2>
      {loading ? <p>Loading blogs...</p> : (
        blogs.length > 0 ? (
          <ul className="blog-list">
            {blogs.map((blog) => (
              <li key={blog.id} className="blog-item">
                <span>{blog.title}</span>
                <div className="actions">
                  <button onClick={() => navigate(`/blog/${blog.slug}`)}>View</button>
                  <button onClick={() => handleDelete(blog.id)} className="delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p>No blogs found.</p>
      )}
    </div>
  );
};

export default ManageBlogs;
