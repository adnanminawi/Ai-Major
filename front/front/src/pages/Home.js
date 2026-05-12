import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <Features />
      <HowItWorks />
      
    </main>
  );
}

export default Home;