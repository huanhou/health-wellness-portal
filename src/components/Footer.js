import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-logo">Health & Wellness Portal</h3>
        <p>Your companion for a healthier, happier life.</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul className="footer-links">
          <li>
            <Link to="/fitnesstips">Fitness Tips</Link>
          </li>
          <li>
            <Link to="/recipes">Healthy Recipes</Link>
          </li>
          <li>
            <Link to="/mental-wellness">Mental Wellness</Link>
          </li>
          <li>
            <Link to="/bmi">BMI Calculator</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <FaFacebook className="fa-icon" />
          <FaTwitter className="fa-icon" />
          <FaInstagram className="fa-icon" />
        </div>
        <p>
          Contact Us:{" "}
          <a href="mailto:email@healthwellness.com">email@healthwellness.com</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
