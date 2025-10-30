import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NFLWeather from "@/components/NFLWeather";
import React from "react";

const NFLWeatherPage = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-2xl pt-9 md:text-3xl md:pt-9 font-semibold text-center text-white mb-6">
        🏈 NFL 2025 Game Schedule & Live Weather Updates
      </h2>
      <NFLWeather />
      <Footer />
    </>
  );
};

export default NFLWeatherPage;
