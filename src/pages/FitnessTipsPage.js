import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FitnessTipsPage = () => {
  const [fitnessTips, setFitnessTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch Fitness Tips API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://healthportal20241215015916.azurewebsites.net/api/FitnessTips"
        );
        // Exclude tips with IDs 6, 7, and 9
        const filteredTips = response.data.filter(
          (tip) => tip.id !== 6 && tip.id !== 7 && tip.id !== 9
        );
        setFitnessTips(filteredTips);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fitness tips:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll to Main Section
  const scrollToMain = () => {
    const section = document.getElementById("main-content");
    section.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="fitness-tips-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Achieve Your Fitness Goals</h1>
          <p>
            Discover tips, workouts, and routines tailored to every fitness
            level.
          </p>
          <button className="cta-button" onClick={scrollToMain}>
            Explore Tips
          </button>
        </div>
      </section>
      <section className="bottom-section">
        <div className="text-section">
          <h3>Stay Motivated</h3>
          <p>Explore inspiring GIFs and keep your energy up!</p>
        </div>
        <div className="gif-scroll">
          <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGYzeGxtMGx4bWswajBzdTl4MnZya3N1eW44eWhyZ2lyNGhid3hxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2eN0NkCvhjxqo/giphy.gif"
            alt="Fitness GIF"
          />
          <img
            src="https://media.giphy.com/media/dB5IAEzRvi3W3R2t16/giphy.gif?cid=790b7611izmdzh5i8za0ax1mch1vmh6kzbvxdvoswd81wui7&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Stretching GIF"
          />
          <img
            src="https://media.giphy.com/media/HdK972OCf3ahy/giphy.gif?cid=790b7611izmdzh5i8za0ax1mch1vmh6kzbvxdvoswd81wui7&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
          <img
            src="https://media.giphy.com/media/WqmYGa2LjQlTG/giphy.gif?cid=ecf05e47cu2v3yg7jwkq381udrsrnki5mcxk2yirtiisi1z3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
          <img
            src="https://media.giphy.com/media/rCKsmeMtsDL3tdp1AB/giphy.gif?cid=ecf05e47upzu440qaa5mpyluowuo8zh02mypvp89qpzdzgfp&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
          <img
            src="https://media.giphy.com/media/MW9s5soksSzEreFE9h/giphy.gif?cid=790b76117bxice2g73p2hz17qngwxtkbvo86jeyp8m38kbsk&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
          <img
            src="https://media.giphy.com/media/HdK972OCf3ahy/giphy.gif?cid=790b7611izmdzh5i8za0ax1mch1vmh6kzbvxdvoswd81wui7&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
          <img
            src="https://media.giphy.com/media/cM1axtlW4w6M1Q9m2H/giphy.gif?cid=790b76117bxice2g73p2hz17qngwxtkbvo86jeyp8m38kbsk&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Workout GIF"
          />
        </div>
      </section>
      {/* Main Content */}
      <section id="main-content" className="main-content">
        <div className="content-container">
          {/* Left Side: Cards */}
          <div className="cards-container">
            {fitnessTips
              .filter((tip) => tip.id !== 6 && tip.id !== 10 && tip.id !== 9) // Remove IDs 6, 7, 9
              .map((tip) => (
                <div className="tip-card" key={tip.id}>
                  <div className="card-image">
                    <img src={tip.image} alt={tip.title} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-title">{tip.title}</h2>
                    <p className="card-tags">
                      {tip.tags.map((tag, index) => (
                        <span key={index} className="card-tag">
                          {tag}
                        </span>
                      ))}
                    </p>
                    <p className="card-description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                    <button
                      className="read-more-btn"
                      onClick={() => navigate(`/fitness-tips/${tip.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Side: Videos */}
          <div className="videos-section">
            <h3>Fitness Videos</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/2qWoegDcHMI?si=JENFf0VOjISZvUqe"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/l93XQBRlOL4?si=lJ8FXiGkaA8VQ8AR"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/YvrKIQ_Tbsk?si=C2d-ul9WgeOyHsRH"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/z7EewP9k_7w?si=z1JRmpMWfJHGIHcP"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/VVyEjBHiZOo?si=GJWwBdlJRvl8mJto"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Bottom Section: GIFs */}
    </div>
  );
};

export default FitnessTipsPage;
