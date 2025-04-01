import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AddBlog.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin"); // Redirect to admin login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [trending, setTrending] = useState(false);
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [scheduleDate, setScheduleDate] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Auto-generate slug based on title
  const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !author || !category || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        slug: generateSlug(title), // Slug based on title
        description,
        author,
        category,
        trending,
        image,
        tags: tags.split(",").map((tag) => tag.trim()),
        content,
        featured,
        visibility,
        scheduleDate: scheduleDate || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      alert("Blog Added Successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  if (!isAuthenticated) {
    return null; // Prevent UI from rendering until authentication is checked
  }

  return (
    <div className="add-blog-container">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => { 
            setTitle(e.target.value); 
            setSlug(generateSlug(e.target.value)); // Auto-generate slug when title changes
          }}
          required
        />
        <input
          type="text"
          placeholder="Slug (auto-generated)"
          value={slug}
          disabled
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <textarea
          placeholder="Full Blog Content"
          value={content}
          onChange={(e) => { 
            setContent(e.target.value); 
            setWordCount(e.target.value.split(" ").length); // Word count update
          }}
          required
          className="blog-content-textarea"
        />
        <p>Word Count: {wordCount}</p>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && <img src={image} alt="Blog Preview" className="blog-preview" />}
        <label>
          Trending: <input type="checkbox" checked={trending} onChange={(e) => setTrending(e.target.checked)} />
        </label>
        <label>
          Featured: <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        </label>
        <label>
          Visibility:
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label>
          Schedule Date:
          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-btn">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
