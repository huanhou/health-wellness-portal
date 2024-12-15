import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

function FitnessTipsHighlight() {
  const [fitnessTips, setFitnessTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1️⃣ Fetch the data from the new API link
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://healthportal20241215015916.azurewebsites.net/api/FitnessTips"
        );
        setFitnessTips(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load fitness tips. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading Fitness Tips...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="fitness-tips-highlight-section">
      <h2>Fitness Tips</h2>

      <div className="scroll-controls">
        <button
          onClick={() =>
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
          className="scroll-button left-arrow"
        >
          ←
        </button>
        <button
          onClick={() =>
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
          className="scroll-button right-arrow"
        >
          →
        </button>
      </div>

      <div className="scroll-container">
        {fitnessTips.slice(0, 5).map((tip) => {
          // Handle the tags parsing logic
          let tags = [];
          try {
            tags = Array.isArray(tip.tags)
              ? tip.tags
              : tip.tags.split(",").map((tag) => tag.trim());
          } catch (error) {
            tags = [];
          }

          return (
            <article className="card" key={tip.id}>
              <figure className="card-image">
                <img src={tip.image} alt={tip.title} />
              </figure>
              <div className="card-header">
                <h3>{tip.title}</h3>
                <p className="description">{tip.description}</p>
                <div className="card-info">
                  <span className="fitness-level">{tip.fitnessLevel}</span>
                  {tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                <div className="card-meta card-meta--views">
                  <FaEye style={{ color: "#888" }} /> {tip.views} Views
                </div>
                <div className="card-meta card-meta--date">
                  <FaCalendarAlt style={{ color: "#888" }} /> {tip.date}
                </div>
                <Link
                  to={`/fitness-tips/${tip.id}`}
                  className="read-more-button"
                >
                  Read More
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <Link to="/fitness-tips" className="view-more-button">
        View More Fitness Tips →
      </Link>
    </section>
  );
}

export default FitnessTipsHighlight;
