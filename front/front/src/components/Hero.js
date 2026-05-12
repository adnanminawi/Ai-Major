import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">AI-powered guidance</div>

          <h1 className="hero__title">
            Find the major<br />
            <span className="hero__title-accent">built for you</span>
          </h1>

          <p className="hero__description">
            MajorMind analyzes your academic profile, grades, and interests
            to recommend the university major where you'll thrive most.
          </p>

          <div className="hero__actions">
            <button className="hero__btn-primary" onClick={() => navigate("/chat")}>
              Start your assessment
            </button>
            <button className="hero__btn-ghost" onClick={() => navigate("/chat")}>
              Try the chatbot
            </button>
          </div>

          <div className="hero__trust">
            <span>Supports LS · GS · ES sections</span>
            <span className="hero__trust-dot" />
            <span>Results in seconds</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-avatar">AI</div>
              <div>
                <p className="hero__card-name">Your Recommendations</p>
                <p className="hero__card-sub">Based on your profile</p>
              </div>
            </div>

            <div className="hero__card-bars">
              <div className="hero__bar-row">
                <div className="hero__bar-label">
                  <span>Computer Science</span>
                  <span className="hero__bar-score">92%</span>
                </div>
                <div className="hero__bar-track">
                  <div className="hero__bar-fill" style={{ width: "92%", background: "#4F6EF7" }} />
                </div>
              </div>

              <div className="hero__bar-row">
                <div className="hero__bar-label">
                  <span>Biomedical Science</span>
                  <span className="hero__bar-score">78%</span>
                </div>
                <div className="hero__bar-track">
                  <div className="hero__bar-fill" style={{ width: "78%", background: "#6B8EFA" }} />
                </div>
              </div>

              <div className="hero__bar-row">
                <div className="hero__bar-label">
                  <span>Physics</span>
                  <span className="hero__bar-score">61%</span>
                </div>
                <div className="hero__bar-track">
                  <div className="hero__bar-fill" style={{ width: "61%", background: "#A5B8FC" }} />
                </div>
              </div>
            </div>

            <div className="hero__card-footer">
              <div className="hero__card-tag">Top match</div>
              <span className="hero__card-result">Computer Science</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;