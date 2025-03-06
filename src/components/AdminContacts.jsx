import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/AdminContacts.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        setContacts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="admin-contacts-container">
      <h2>Contact Messages</h2>
      {loading ? <p>Loading messages...</p> : (
        contacts.length > 0 ? (
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact.id} className="contact-item">
                <strong>{contact.name}</strong> ({contact.email})
                <p>{contact.message}</p>
                <small>Received: {new Date(contact.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : <p>No contact messages found.</p>
      )}
    </div>
  );
};

export default AdminContacts;
