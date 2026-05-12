import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            <iframe
              title="MajorMind AI Assistant"
              src="https://landbot.online/v3/H-3416884-3HVGL5JN81NR47N1/index.html"
              style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
            />
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;