import React, { useState, useEffect, useRef } from "react";

const MentalWellnessPage = () => {
  const [gratitudeList, setGratitudeList] = useState(() => {
    const savedGratitude = localStorage.getItem("gratitudeList");
    return savedGratitude ? JSON.parse(savedGratitude) : [];
  });
  const [gratitudeInput, setGratitudeInput] = useState("");
  const [quote, setQuote] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [balloons, setBalloons] = useState([]);

  const addGratitude = () => {
    if (inputValue.trim()) {
      setBalloons((prev) => [...prev, inputValue]); // Add new entry
      setInputValue(""); // Clear input field
    }
  };
  const motivationalQuotes = [
    "Breathe in peace, breathe out stress.",
    "You are in control of your mind and body.",
    "Take a moment for yourself today.",
    "Rest your mind, and the rest will follow.",
  ];

  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  useEffect(() => {
    const breatheText = document.getElementById("breathe-text");
    let isBreathingIn = true;

    setInterval(() => {
      breatheText.textContent = isBreathingIn ? "Breathe In" : "Breathe Out";
      isBreathingIn = !isBreathingIn;
    }, 4000);
  }, []);

  const handleAddGratitude = () => {
    if (gratitudeInput.trim()) {
      const updatedList = [...gratitudeList, gratitudeInput];
      setGratitudeList(updatedList);
      localStorage.setItem("gratitudeList", JSON.stringify(updatedList));
      setGratitudeInput("");
    }
  };

  const handleDeleteGratitude = (index) => {
    const updatedList = gratitudeList.filter((_, i) => i !== index);
    setGratitudeList(updatedList);
    localStorage.setItem("gratitudeList", JSON.stringify(updatedList));
  };

  const [timeLeft, setTimeLeft] = useState(300); // Default to 5 min (300 sec)
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState(""); // Current sound
  const audioRef = useRef(null); // Ref for background audio
  const timerRef = useRef(null); // Ref for the timer interval

  // Start or Pause Timer
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset Timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(300); // Reset to 5 min default
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer Countdown
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playEndSound();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Format Time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Play End Timer Sound
  const playEndSound = () => {
    const endSound = new Audio("/health-wellness-portal/bell.mp3"); // Chime sound
    endSound.play();
  };

  // Play Background Music
  const playSound = (sound) => {
    setSelectedSound(sound);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (sound) {
      audioRef.current = new Audio(`/health-wellness-portal/${sound}.mp3`);
      audioRef.current.loop = true;
      audioRef.current.play();
    }
  };
  return (
    <div className="mental-wellness-page">
      <div className="hero-mental-wellness">
        <div className="heroo-left">
          <img
            src="/health-wellness-portal/meditation.png"
            alt="Mental Wellness"
            className="hero-image"
          />
        </div>
        <div className="heroo-right">
          <h1 className="heroo-title">Find Your Peace</h1>
          <p className="heroo-description">
            Discover tools to help you reduce stress, practice mindfulness, and
            stay inspired.
          </p>
          <button
            className="heroo-btn"
            onClick={() =>
              document
                .getElementById("breathe-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Do Meditation
          </button>
          <button
            className="heroo-btn"
            onClick={() =>
              document
                .getElementById("gratitude-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Daily Gratitude
          </button>
          <button
            className="heroo-btn"
            onClick={() =>
              document
                .getElementById("meditation-timer")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Meditate
          </button>
        </div>
      </div>
      <div id="inspiration-section" className="inspiration-section">
        <h2 className="inspiration-text">
          "Every day is a new beginning. Take a deep breath, smile, and start
          again."
        </h2>
      </div>
      <div id="breathe-section" className="breathe-section">
        <div className="breathe-circle">
          <div className="breathe-text" id="breathe-text">
            Breathe In
          </div>
        </div>
      </div>

      <div className="gratitude-section">
        <div className="gratitude-content">
          {/* Left Side - Explanation */}
          <div className="gratitude-explanation">
            <h2>Why Practice Gratitude?</h2>
            <p>
              Practicing gratitude can significantly improve your mental health
              and well-being. It helps you focus on the positive aspects of
              life, reducing stress and increasing happiness. By acknowledging
              what you're grateful for, you create a mindset of abundance and
              positivity.
            </p>
          </div>

          {/* Right Side - Input & Balloons */}
          <div className="gratitude-interactive">
            <h3>What Are You Grateful For Today?</h3>
            <div className="gratitude-input-container">
              <input
                type="text"
                placeholder="Enter something you're grateful for..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="gratitude-input"
              />
              <button onClick={addGratitude} className="gratitude-btn">
                Add
              </button>
            </div>
            <div className="balloons-container">
              {balloons.map((item, index) => (
                <div key={index} className="balloon">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="meditation-timer" id="meditation-timer">
        {/* Timer Section */}
        <h1 className="timer-header">Meditation Timer</h1>
        <div className="timer-circle">
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>

        {/* Controls */}
        <div className="timer-controls">
          <button onClick={toggleTimer} className="control-btn">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={resetTimer} className="control-btn reset">
            Reset
          </button>
          <button onClick={() => setTimeLeft(300)} className="control-btn">
            5 min
          </button>
          <button onClick={() => setTimeLeft(600)} className="control-btn">
            10 min
          </button>
          <button onClick={() => setTimeLeft(900)} className="control-btn">
            15 min
          </button>
        </div>

        {/* Sound Selector */}
        <div className="sound-selector">
          <h3>Choose Relaxing Sound:</h3>
          <div className="sound-buttons">
            <button
              className={`sound-btn ${selectedSound === "" ? "active" : ""}`}
              onClick={() => playSound("")}
            >
              🔇 None
            </button>
            <button
              className={`sound-btn ${
                selectedSound === "rain" ? "active" : ""
              }`}
              onClick={() => playSound("rain")}
            >
              🌧 Rain
            </button>
            <button
              className={`sound-btn ${
                selectedSound === "ocean" ? "active" : ""
              }`}
              onClick={() => playSound("ocean")}
            >
              🌊 Ocean
            </button>
            <button
              className={`sound-btn ${
                selectedSound === "forest" ? "active" : ""
              }`}
              onClick={() => playSound("forest")}
            >
              🌲 Forest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessPage;
