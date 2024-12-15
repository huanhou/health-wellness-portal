// BMI Calculator Page Component
import React, { useState } from "react";

const BMICalculator = () => {
  // States for user input
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  // BMI Calculation Logic
  const calculateBMI = () => {
    if (!height || !weight) return;
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({
      bmi,
      category,
      weight,
      height,
      age,
      gender,
    });

    // Scroll to results
    const resultsDiv = document.getElementById("bmi-results");
    if (resultsDiv) {
      resultsDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bmi-calculator-container">
      {/* Header Section */}
      <header className="bmi-header">
        <h1>Body Mass Index (BMI) Calculator</h1>
        <p>
          Calculate your BMI using your weight and height. BMI is a widely used
          metric to assess body fat based on an individual&apos;s weight and
          height.
        </p>
      </header>

      <div className="bmi-content">
        {/* Form Section */}
        <div className="bmi-form">
          <h2>Calculate BMI</h2>
          <p>Add your data to get started</p>

          <div className="gender-selection">
            <button
              className={`gender-button ${gender === "Male" ? "active" : ""}`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              className={`gender-button ${gender === "Female" ? "active" : ""}`}
              onClick={() => setGender("Female")}
            >
              Female
            </button>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in cm"
            />
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight in kg"
            />
          </div>

          <button className="calculate-button" onClick={calculateBMI}>
            Check BMI Report
          </button>
        </div>

        {/* BMI Details Section */}
        {result && (
          <div className="bmi-results">
            <h2>BMI Range Bar</h2>
            <div className="bmi-range-bar">
              {/* Marker with constrained position */}
              <div
                className="bmi-marker"
                style={{
                  left: result
                    ? `${Math.min(
                        Math.max(((result.bmi - 10) / 40) * 100, 0),
                        100
                      )}%`
                    : "0%",
                }}
              ></div>
              <span className="underweight">Underweight</span>
              <span className="normal">Normal</span>
              <span className="overweight">Overweight</span>
              <span className="obese">Obese</span>
            </div>

            <h3>BMI Calculation Result</h3>
            <p>Age: {result.age}</p>
            <p>Gender: {result.gender}</p>
            <p>
              Weight: {result.weight} kg, Height: {result.height} cm
            </p>
            <p>BMI: {result.bmi}</p>
            <p>Category: {result.category}</p>
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="bmi-info">
        <h2>How BMI is Calculated</h2>
        <p>The BMI is calculated using the following formula:</p>
        <p>
          <strong>BMI = Weight (kg) / [Height (m)]²</strong>
        </p>
        <p>
          To use the formula, measure your weight in kilograms and your height
          in meters. Square your height and divide your weight by the squared
          height.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>FAQ</h2>
        <details>
          <summary>What is BMI?</summary>
          <p>
            BMI is a metric used to assess body fat based on weight and height.
          </p>
        </details>
        <details>
          <summary>How is BMI calculated?</summary>
          <p>
            It is calculated using the formula BMI = Weight (kg) / [Height
            (m)]².
          </p>
        </details>
        <details>
          <summary>What are the BMI categories?</summary>
          <p>Categories include Underweight, Normal, Overweight, and Obese.</p>
        </details>
      </div>
    </div>
  );
};

export default BMICalculator;
