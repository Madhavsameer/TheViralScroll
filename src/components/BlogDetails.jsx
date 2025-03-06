import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/BlogDetails.css";
import SuggestedBlogs from "./SuggestedBlogs";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(""); // Store username
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogBySlug = async () => {
      try {
        const blogsQuery = query(collection(db, "blogs"), where("slug", "==", slug));
        const querySnapshot = await getDocs(blogsQuery);

        if (!querySnapshot.empty) {
          const blogDoc = querySnapshot.docs[0];
          setBlog(blogDoc.data());
          setBlogId(blogDoc.id);
          setLikes(blogDoc.data().likes || 0);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog by slug:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogBySlug();
  }, [slug]);

  // Fetch comments in real-time
  useEffect(() => {
    if (blogId) {
      const commentsRef = collection(db, "blogs", blogId, "comments");
      const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [blogId]);

  // Handle Like Button Click
  const handleLike = async () => {
    if (blogId) {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, { likes: likes + 1 });
      setLikes(likes + 1);
    }
  };

  // Handle Adding a New Comment (with Username)
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return; // Ensure both fields are filled

    try {
      await addDoc(collection(db, "blogs", blogId, "comments"), {
        userName, // Store username
        text: newComment,
        timestamp: new Date().toISOString(),
      });

      setNewComment(""); // Clear input after submission
      setUserName(""); // Clear username input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!blog) return <p className="error">Blog Not Found</p>;

  return (
    <div className="blog-details-container">
      <h2 className="blog-title">{blog.title}</h2>
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
      <p className="blog-description">{blog.description}</p>
      <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
      <p className="blog-date"><strong>Date:</strong> {blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date available"}</p>
      {blog.tags && blog.tags.length > 0 && (
        <p className="blog-tags">
          <strong>Tags:</strong> {blog.tags.join(", ")}
        </p>
      )}
      <div className="blog-content">{blog.content}</div>

      {/* Like Button */}
      <div className="like-section">
        <button className="like-btn" onClick={handleLike}>👍 Like ({likes})</button>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <strong>{comment.userName}</strong> {/* Display username */}
                <p>{comment.text}</p>
                <small>{new Date(comment.timestamp).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>

      <SuggestedBlogs />
    </div>
  );
};

export default BlogDetails;
