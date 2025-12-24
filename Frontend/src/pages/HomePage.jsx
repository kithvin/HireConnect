import React from "react";
import HomePageNavbar from "../component/HomePageNavbar";
import Herosection from "../component/Herosection";
import FeatureSection from "../component/FeatureSection";
import ChatBot from "../component/ChatBot";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-black via-slate-900 to-gray-900 min-h-screen">
      <HomePageNavbar />
      <Herosection />
      <FeatureSection />
      <ChatBot />
    </div>
  );
}

export default HomePage;