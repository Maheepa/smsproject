import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import CSS for styling

export default function Logout() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        alert("Failed to log out. Try again.");
      });
  };

  return (
    <div className="logout-container">
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
  );
}
