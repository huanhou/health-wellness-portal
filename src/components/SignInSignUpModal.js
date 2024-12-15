import React, { useState } from "react";
import axios from "axios";

const SignInSignUpModal = ({ onClose, setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Sign In
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 **Sign-Up Function (POST)**
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://healthportal20241215015916.azurewebsites.net/api/Users",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Sign Up Successful:", response.data);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userToken", response.data.id); // Store user ID
      setIsLoggedIn(true);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Sign-Up Error:", error);
      setError("Failed to register user. User may already exist.");
    }
  };

  // 🔥 **Sign-In Function (GET)**
  const handleSignIn = async () => {
    try {
      const response = await axios.get(
        "https://healthportal20241215015916.azurewebsites.net/api/Users"
      );

      // Check if user exists with matching email and password
      const user = response.data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        console.log("Sign In Successful:", user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userToken", user.id); // Store user ID as token
        setIsLoggedIn(true);
        onClose(); // Close modal on success
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Sign-In Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="switch-mode">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUpModal;
