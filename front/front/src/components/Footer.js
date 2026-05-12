import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">M</span>
            <span className="footer__logo-text">MajorMind</span>
          </div>
          <p className="footer__tagline">
            AI-powered major recommendations<br />for Lebanese baccalaureate students.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <p className="footer__col-title">Navigate</p>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it works</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-title">Contact</p>
            <ul>
              <li><a href="mailto:support@majormind.ai">support@majormind.ai</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} MajorMind AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;