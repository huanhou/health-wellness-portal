import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecipesPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  // 🔥 Fetch Recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://healthportal20241215015916.azurewebsites.net/api/Recipes"
        );
        setRecipes(response.data);
        setFilteredRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load recipes. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  // State to track active category and filtered recipes

  // Categories list with names and image URLs/icons
  const categories = [
    { name: "Dessert", image: "/health-wellness-portal/dessert.jpg" },
    { name: "Salad", image: "/health-wellness-portal/salad.jpg" },
    { name: "Main Course", image: "/health-wellness-portal/maincourse.jpg" },
    { name: "Healthy", image: "/health-wellness-portal/healthy.jpg" },
    { name: "Soup", image: "/health-wellness-portal/soup.jpg" },
    { name: "Breakfast", image: "/health-wellness-portal/breakfast.jpg" },
    { name: "All", image: "/health-wellness-portal/healthy.jpg" },
  ];

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilteredRecipes(recipes); // Show all recipes
    } else {
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered); // Filter by category
    }
  };

  // 🔥 Update the Filter Function
  const handleFilter = (filter) => {
    setActiveFilter(filter); // Highlight the selected filter button
    let filtered = recipes;

    if (filter !== "All") {
      filtered = filtered.filter((recipe) => recipe.tags.includes(filter));
    }

    // 🔥 Apply the active search query, if any
    if (searchQuery) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery)
          )
      );
    }

    setFilteredRecipes(filtered);
  };

  // 🔥 Update the Search Function
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    let filtered = recipes;

    // 🔥 Filter by title, tags, and ingredients
    filtered = filtered.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
    );

    // 🔥 Apply the active filter, if any
    if (activeFilter !== "All") {
      filtered = filtered.filter((recipe) =>
        recipe.tags.includes(activeFilter)
      );
    }

    setFilteredRecipes(filtered);
  };

  const scrollLeft = (id) => {
    document.getElementById(id).scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <h1 className="recipes-title">Healthy Recipes</h1>
        <p className="recipes-subtitle">
          Find recipes based on your preferences and enjoy healthy meals!
        </p>
      </header>

      <div className="search-filter-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for recipes by ingredient, name, or tag..."
          className="search-input"
        />
        <div className="filter-buttons">
          {["Vegan", "Vegetarian", "Gluten-Free", "All"].map((filter) => (
            <button
              key={filter}
              className={`filter-button ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {searchQuery && (
        <div className="all-recipes-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div className="recipe-tag">{recipe.tags[0]}</div>
                <div className="prep-time">
                  <i className="fa fa-clock"></i> {recipe.prep_time}
                </div>
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <button
                  className="see-recipe-button"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  See Recipe
                </button>
              </div>
            ))
          ) : (
            <p className="no-results-message">No recipes found</p>
          )}
        </div>
      )}

      {["Vegetarian", "Vegan", "Gluten-Free"].map((category) => (
        <div className="category-section" key={category}>
          <h2 className="category-title">{category} Recipes</h2>
          <div className="scroll-container">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(category)}
            >
              &lt;
            </button>

            <div className="horizontal-scroll" id={category}>
              {recipes.filter((recipe) => recipe.tags.includes(category))
                .length > 0 ? (
                recipes
                  .filter((recipe) => recipe.tags.includes(category))
                  .map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-image"
                      />
                      <div className="recipe-tag">{recipe.tags[0]}</div>
                      <div className="prep-time">
                        <i className="fa fa-clock"></i> {recipe.prep_time}
                      </div>
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      <button
                        className="see-recipe-button"
                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                      >
                        See Recipe
                      </button>
                    </div>
                  ))
              ) : (
                <p className="no-recipes-message">No recipes available</p>
              )}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scrollRight(category)}
            >
              &gt;
            </button>
          </div>
        </div>
      ))}
      {/* Categories Div */}
      {/* Categories Section */}
      <div className="categories-section">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category-circle ${
              activeCategory === category.name ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      {/* Filtered Recipes Section */}
      <div className="filtered-recipes-section">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <div className="recipe-tag">{recipe.category}</div>
              <div className="prep-time">
                <i className="fa fa-clock"></i> {recipe.prep_time}
              </div>
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <button
                className="see-recipe-button"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                See Recipe
              </button>
            </div>
          ))
        ) : (
          <p className="no-results-message">
            No recipes found in this category
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
