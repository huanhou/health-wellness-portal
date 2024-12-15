import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FitnessTipDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [relatedTips, setRelatedTips] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]); // 👈 Every time the "id" changes, it scrolls to the top

  // 🔥 Fetch Fitness Tip Details
  useEffect(() => {
    axios
      .get(
        `https://healthportal20241215015916.azurewebsites.net/api/FitnessTips/${id}`
      )
      .then((response) => {
        setTip(response.data);
      });

    // 🔥 Fetch Related Tips
    axios
      .get(
        "https://healthportal20241215015916.azurewebsites.net/api/FitnessTips"
      )
      .then((response) => {
        const related = response.data
          .filter((t) => t.id !== parseInt(id))
          .slice(0, 3);
        setRelatedTips(related);
      });
  }, [id]);

  if (!tip) {
    return <p>Loading Fitness Tip...</p>;
  }

  return (
    <div className="fitness-tip-details-container">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">
        🡸 Back
      </button>

      {/* Hero Section */}
      <div className="fitness-tip-hero-section">
        <img
          src={tip.image}
          alt={tip.title}
          className="fitness-tip-hero-image"
        />
        <div className="fitness-tip-overlay">
          <h1 className="fitness-tip-title">{tip.title}</h1>
          <p className="fitness-tip-meta">
            {tip.date} • 👁️ {tip.views} views
          </p>
        </div>
      </div>

      {/* Fitness Level and Tags */}
      <div className="fitness-tip-tags-level-section">
        <span
          className={`fitness-level-badge ${tip.fitnessLevel.toLowerCase()}`}
        >
          {tip.fitnessLevel}
        </span>
        {tip.tags.map((tag, index) => (
          <span key={index} className="fitness-tip-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="fitness-tip-content">
        <p className="fitness-tip-intro">
          This fitness tip focuses on {tip.title.toLowerCase()}. Here we will
          discuss how you can effectively perform this routine and get the most
          out of it. Many people find this type of exercise beneficial for
          improving strength, flexibility, and cardiovascular health.
        </p>

        <h2 className="fitness-tip-section-title">How to Do This Tip</h2>
        <p className="fitness-tip-paragraph">
          To get started with {tip.title.toLowerCase()}, you need to prepare a
          few things. First, make sure you have a clear space to work out. If
          it's a yoga-related tip, you might want to grab a mat. Follow these
          step-by-step instructions:
        </p>
        <ul className="fitness-tip-steps-list">
          <li>Warm up your body with light cardio for 5 minutes.</li>
          <li>Follow each movement as shown in the instructions.</li>
          <li>Maintain proper form to avoid injury and get better results.</li>
        </ul>

        <h2 className="fitness-tip-section-title">Why It Works</h2>
        <p className="fitness-tip-paragraph">
          The main reason this workout is effective is due to its focus on{" "}
          {tip.tags[0].toLowerCase()} training. It targets multiple muscle
          groups at once, leading to increased calorie burn and improved overall
          fitness. Research shows that incorporating this type of training into
          your weekly routine can significantly enhance your strength and
          stamina.
        </p>

        <h2 className="fitness-tip-section-title">Benefits of {tip.title}</h2>
        <p className="fitness-tip-paragraph">
          Engaging in this type of workout can have numerous benefits. It can
          improve your heart health, boost your mood, and strengthen your
          muscles. Additionally, it requires minimal equipment, making it
          accessible for everyone.
        </p>
      </div>

      {/* Related Fitness Tips */}
      <div className="related-fitness-tips">
        <h2 className="related-tips-title">Related Fitness Tips</h2>
        <div className="related-tips-cards">
          {relatedTips.map((related) => (
            <div
              key={related.id}
              className="related-tip-card"
              onClick={() => navigate(`/fitness-tips/${related.id}`)}
            >
              <img
                src={related.image}
                alt={related.title}
                className="related-tip-image"
              />
              <h3 className="related-tip-title">{related.title}</h3>
              <button
                className="read-more-button"
                onClick={() => navigate(`/fitness-tips/${related.id}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessTipDetailsPage;
