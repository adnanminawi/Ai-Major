import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => navigate("/")}>
          <span className="navbar__logo-mark">M</span>
          <span className="navbar__logo-text">MajorMind</span>
        </button>

        <ul className="navbar__links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
        </ul>

        <button className="navbar__cta" onClick={() => navigate("/chat")}>
          Get started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;