import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HowItWorks.css";

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how" className="how">
      <div className="how__inner">
        <div className="how__header">
          <p className="how__label">The process</p>
          <h2 className="how__title">Three steps to clarity</h2>
        </div>

        <div className="how__steps">
          <div className="how__step">
            <div className="how__step-number">01</div>
            <div className="how__step-body">
              <h3 className="how__step-title">Start the chat</h3>
              <p className="how__step-desc">Open the AI assistant and answer a few questions about your baccalaureate section and grades.</p>
            </div>
          </div>

          <div className="how__step">
            <div className="how__step-number">02</div>
            <div className="how__step-body">
              <h3 className="how__step-title">Share your interests</h3>
              <p className="how__step-desc">Tell the assistant what subjects and fields genuinely interest you — this improves accuracy.</p>
            </div>
          </div>

          <div className="how__step">
            <div className="how__step-number">03</div>
            <div className="how__step-body">
              <h3 className="how__step-title">Get your matches</h3>
              <p className="how__step-desc">The ML model returns your top 3 major recommendations ranked by compatibility score.</p>
            </div>
          </div>
        </div>

        <div id="cta" className="how__cta">
          <p className="how__cta-label">Get started today</p>
          <h2 className="how__cta-title">Ready to find your major?</h2>
          <p className="how__cta-sub">Takes less than 3 minutes. No account needed.</p>
          <button className="how__cta-btn" onClick={() => navigate("/chat")}>
            Start your assessment
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;