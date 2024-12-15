import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Single CSS file for all styling
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "./components/Footer";
import BMICalculator from "./pages/BMICalculator";
import RecipeCards from "./pages/RecipeCards"; // Ensure the path is correct
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FitnessTipsPage from "./pages/FitnessTipsPage";
import FitnessTipDetailsPage from "./pages/FitnessTipDetailsPage";
import MentalWellnessPage from "./pages/MentalWellnessPage";
AOS.init();

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/recipes" element={<RecipeCards />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/fitness-tips" element={<FitnessTipsPage />} />
        <Route path="/fitness-tips/:id" element={<FitnessTipDetailsPage />} />
        <Route path="/mental-wellness" element={<MentalWellnessPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
