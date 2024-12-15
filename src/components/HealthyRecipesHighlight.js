import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaCarrot, FaBreadSlice } from "react-icons/fa";

function HealthyRecipesHighlight() {
  return (
    <section className="healthy-recipes-highlight-section">
      <h2>Healthy Recipes</h2>

      <div className="recipes-category-container">
        <article className="category-card">
          <div className="icon-wrapper">
            <FaLeaf className="fa-icon" />
          </div>
          <h3>Vegetarian Recipes</h3>
          <img
            src="https://avatars.mds.yandex.net/i?id=e650c0ec9317b0989914c9866acabe039bf812f2-9871210-images-thumbs&n=13"
            alt="Vegetarian Recipes"
            className="category-image"
          />
          <div className="info-inline">
            <p>10 Recipes</p>
            <Link to="/recipes" className="category-button">
              Show All
            </Link>
          </div>
        </article>

        <article className="category-card">
          <div className="icon-wrapper">
            <FaCarrot className="fa-icon" />
          </div>
          <h3>Vegan Recipes</h3>
          <img
            src="https://avatars.mds.yandex.net/i?id=f2189adb690ff7a5d936bf2e27de03b693c4c839-4935395-images-thumbs&n=13"
            alt="Vegan Recipes"
            className="category-image"
          />
          <div className="info-inline">
            <p>8 Recipes</p>
            <Link to="/recipes" className="category-button">
              Show All
            </Link>
          </div>
        </article>

        <article className="category-card">
          <div className="icon-wrapper">
            <FaBreadSlice className="fa-icon" />
          </div>
          <h3>Gluten-Free Recipes</h3>
          <img
            src="https://avatars.mds.yandex.net/i?id=754d2333cd967937104f7763949b4787c72a04fe-4054771-images-thumbs&n=13"
            alt="Gluten-Free Recipes"
            className="category-image"
          />
          <div className="info-inline">
            <p>6 Recipes</p>
            <Link to="/recipes" className="category-button">
              Show All
            </Link>
          </div>
        </article>
      </div>

      <Link to="/recipes" className="view-all-recipes-button">
        View All Recipes →
      </Link>
    </section>
  );
}

export default HealthyRecipesHighlight;
