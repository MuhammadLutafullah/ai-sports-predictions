import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NBAWeather from "@/components/NBAWeather";
import React from "react";

const NBAWeatherPage = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-2xl pt-9 md:text-3xl md:pt-9 font-semibold text-center text-white mb-6">
        🏀 NBA 2025 Game Schedule & Weather Conditions
      </h2>

      <NBAWeather />
      <Footer />
    </>
  );
};

export default NBAWeatherPage;
