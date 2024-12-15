import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const RecipeDetailsPage = ({ recipes }) => {
  const { id } = useParams(); // Get recipe ID from the URL
  const navigate = useNavigate(); // For navigating back
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://healthportal20241215015916.azurewebsites.net/api/Recipes/${id}`
        );
        const data = await response.json();
        setRecipe(data);

        // Fetch related recipes dynamically based on category
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // State to store the recipe details
  const [recipe, setRecipe] = useState(null);

  if (!recipe) {
    return <p>Loading recipe details...</p>; // Loading state
  }

  return (
    <div className="recipe-details-container">
      <button className="back-btn-recipe-details" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {/* Top Section */}
      <div className="recipe-details-top-section">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-details-main-image"
        />

        <div className="recipe-details-info-section">
          <h1 className="recipe-details-title">{recipe.title}</h1>

          <div className="recipe-details-info">
            <span className="recipe-details-info-item">
              <i className="fas fa-clock"></i> {recipe.prep_time}
            </span>
            <span className="recipe-details-info-item">
              <i className="fas fa-fire"></i> {recipe.nutrition.calories} cal
            </span>
            <span className="recipe-details-tag">{recipe.tags.join(", ")}</span>
          </div>

          <p className="recipe-details-description">{recipe.description}</p>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-instructions-container">
          <div className="recipe-details-instructions">
            <h2>Instructions</h2>
            {recipe.instructions.map((step, index) => (
              <div key={index} className="instruction-step">
                <span className="step-number">{index + 1}</span>
                <p className="recipe-instruction-step">{step}</p>
              </div>
            ))}
          </div>
          <div className="recipe-details-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="recipe-ingredient-item">
                  <input type="checkbox" id={`ingredient-${index}`} />
                  <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Nutrition Info */}
      <div className="recipe-details-nutrition">
        <h2>Nutrition Information</h2>
        <div className="nutrition-grid-recipe">
          <div className="nutrition-item-recipe">
            <span className="emoji">🔥</span>
            <p>Calories</p>
            <p>{recipe.nutrition.calories} cal</p>
          </div>
          <div className="nutrition-item-recipe">
            <span className="emoji">🍗</span>
            <p>Protein</p>
            <p>{recipe.nutrition.protein}g</p>
          </div>
          <div className="nutrition-item-recipe">
            <span className="emoji">🍞</span>
            <p>Carbs</p>
            <p>{recipe.nutrition.carbs}g</p>
          </div>
          <div className="nutrition-item-recipe">
            <span className="emoji">🧈</span>
            <p>Fats</p>
            <p>{recipe.nutrition.fat}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
