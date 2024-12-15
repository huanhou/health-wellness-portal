import React from "react";
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaSmile,
  FaPrayingHands,
  FaClipboardList,
} from "react-icons/fa";

function MentalWellnessHighlight() {
  return (
    <section className="mental-wellness-highlight-section">
      <div className="wellness-image"></div>
      <div className="wellness-content">
        <h2 className="wellness-title">Transform Your Mental Wellness</h2>
        <p className="wellness-subtitle">
          Unlock the secrets to a healthier, happier you:
        </p>
        <ul className="wellness-list">
          <li>
            <FaBrain className="fa-icona" />{" "}
            <strong>Mindfulness Exercises:</strong> Harness the power of the
            present moment with guided practices.
          </li>
          <li>
            <FaSmile className="fa-icona" /> <strong>Stress Management:</strong>{" "}
            Discover proven techniques to stay calm and focused in any
            situation.
          </li>
          <li>
            <FaPrayingHands className="fa-icona" />{" "}
            <strong>Meditation Guides:</strong> Elevate your inner peace with
            easy-to-follow meditation steps.
          </li>
          <li>
            <FaClipboardList className="fa-icona" />{" "}
            <strong>Interactive Tools:</strong> Try personalized breathing
            exercises and gratitude journaling.
          </li>
        </ul>
        <Link to="/mental-wellness" className="explore-button">
          Start Your Journey →
        </Link>
      </div>
    </section>
  );
}

export default MentalWellnessHighlight;
