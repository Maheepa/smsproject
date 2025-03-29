import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";



export default function Admin() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser); // Store the logged-in user's details
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  return (
    <div>
      <Navbar />
      
      <div className="admin-container">
        <h2>Admin Dashboard</h2>
        
        <div className="user-info">
          <h3>Logged-in User:</h3>
          {user ? (
            <p><strong>Email:</strong> {user.email}</p>
          ) : (
            <p>No user is logged in</p>
          )}
        </div>
      </div>
    </div>
  );
}
