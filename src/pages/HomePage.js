import React from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import FitnessTipsHighlight from "../components/FitnessTipsHighlight";
import HealthyRecipesHighlight from "../components/HealthyRecipesHighlight";
import MentalWellnessHighlight from "../components/MentalWellnessHighlight";

function HomePage() {
  AOS.init(); // Initialize AOS animations

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-left" data-aos="fade-right">
          <h1 className="hero-title">Transform Your Health</h1>
          <p className="hero-subtext">
            Explore personalized fitness tips, healthy recipes, and mental
            wellness resources to achieve your goals.
          </p>
          <Link to="/bmi" className="btn">
            Check Your BMI
          </Link>
        </div>

        <div className="hero-right">
          <div className="message-box" data-aos="fade-up">
            <p className="message-main">“Transform Your Mental Wellness”</p>
            <p className="message-sub">
              Elevate your inner peace with easy-to-follow meditation steps.
            </p>
          </div>
          <div className="message-box shifted" data-aos="fade-up">
            <p className="message-main">
              “Unlock the secrets to a healthier, happier you”
            </p>
            <p className="message-sub">
              Try personalized breathing exercises and gratitude journaling.
            </p>
          </div>
          <Link to="/mental-wellness" className="btn join-forum-btn">
            Open Mental Wellness
          </Link>
        </div>
      </section>

      <FitnessTipsHighlight />
      <HealthyRecipesHighlight />
    </div>
  );
}

export default HomePage;
