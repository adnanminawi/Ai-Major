import React from "react";
import { FaBrain, FaClock, FaChartBar, FaHeart, FaDatabase, FaComments } from "react-icons/fa";
import "../styles/Features.css";

function Features() {
  return (
    <section id="features" className="features">
      <div className="features__inner">
        <div className="features__header">
          <p className="features__label">What we offer</p>
          <h2 className="features__title">Everything you need to choose your path</h2>
          <p className="features__subtitle">
            Built specifically for Lebanese baccalaureate students navigating university admissions.
          </p>
        </div>

        <div className="features__grid">
          <div className="features__card">
            <div className="features__icon"><FaBrain /></div>
            <h3 className="features__card-title">Multi-section support</h3>
            <p className="features__card-desc">Handles LS, GS, and ES sections with accurate ability calculations for each.</p>
          </div>

          <div className="features__card">
            <div className="features__icon"><FaClock /></div>
            <h3 className="features__card-title">Instant results</h3>
            <p className="features__card-desc">Get your top 3 major recommendations with confidence scores in under a second.</p>
          </div>

          <div className="features__card">
            <div className="features__icon"><FaChartBar /></div>
            <h3 className="features__card-title">ML-powered prediction</h3>
            <p className="features__card-desc">A trained machine learning model processes your grades, section, and interests to rank majors.</p>
          </div>

          <div className="features__card">
            <div className="features__icon"><FaHeart /></div>
            <h3 className="features__card-title">Interest-aware</h3>
            <p className="features__card-desc">Your personal interests are factored into the recommendation, not just your grades.</p>
          </div>

          <div className="features__card">
            <div className="features__icon"><FaDatabase /></div>
            <h3 className="features__card-title">Full history saved</h3>
            <p className="features__card-desc">Every assessment is stored — students, grades, interests, and recommendations recorded.</p>
          </div>

          <div className="features__card">
            <div className="features__icon"><FaComments /></div>
            <h3 className="features__card-title">Chat-driven flow</h3>
            <p className="features__card-desc">The entire assessment runs through a conversational chatbot — no forms, no friction.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;