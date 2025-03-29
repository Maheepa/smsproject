import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth from your setup
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; // Import styles
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setSuccessMessage("Login successful! Redirecting..."); // Set success message
      setTimeout(() => {
        navigate('/pages/student'); // Navigate after delay
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className='background-containerl'>
      <div className="login-container">
        <h2>{user ? "Welcome" : "Login "}</h2>

        {successMessage && <div className="alert success">{successMessage}</div>} {/* Success Alert */}
        {error && <div className="alert error">{error}</div>} {/* Error Alert */}

        {user ? (
          <div>
            <p>Logged in as: {user.email}</p>
          </div>
        ) : (
          <div className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
