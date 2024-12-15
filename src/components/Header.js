import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SignInSignUpModal from "./SignInSignUpModal"; // Import the modal component

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // State for opening modal
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  // 🔥 Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <Link to="/">
            Health & <span className="highlight">Wellness</span>{" "}
            <span className="black">Portal</span>
          </Link>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        <nav className={`nav-list ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/fitness-tips">Fitness Tips</NavLink>
            </li>
            <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/mental-wellness">Mental Wellness</NavLink>
            </li>

            <li>
              <NavLink
                to="/bmi"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                BMI Calculator
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => setIsModalOpen(true)} // Open the modal when clicked
                  className="auth-button"
                >
                  Sign In / Sign Up
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {isModalOpen && (
        <SignInSignUpModal
          onClose={() => setIsModalOpen(false)} // Close the modal
          setIsLoggedIn={setIsLoggedIn} // Update the login state
        />
      )}
    </>
  );
}

export default Header;
