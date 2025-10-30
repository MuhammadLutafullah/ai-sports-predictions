import Navbar from "@/components/Navbar";
import React from "react";
import NCAABWeather from "@/components/NCAABWeather";
import Footer from "@/components/Footer";

const NCAABWeatherPage = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-2xl pt-9 md:text-3xl md:pt-9 font-semibold text-center text-white mb-6">
        🏀 NCAAB Upcoming Games (Next 7 Days)
      </h2>
      <NCAABWeather />
      <Footer />
    </>
  );
};

export default NCAABWeatherPage;
