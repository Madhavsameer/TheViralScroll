import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <section id="contact">
      <div className="contact__info">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out for any inquiries or feedback.</p>
      </div>
      
      <div className="contact__form">
        <h3>Get in Touch</h3>
        {success && <p className="success-message">Message sent successfully!</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
