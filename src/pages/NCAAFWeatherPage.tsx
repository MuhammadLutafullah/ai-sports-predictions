import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NCAAFWeather from "@/components/NCAAFWeather";
import React from "react";

const NCAAFWeatherPage = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-2xl pt-9 md:text-3xl md:pt-9 font-semibold text-center text-white mb-6">
        🏈 NCAAF 2025 — Upcoming Week’s Games & Weather Conditions
      </h2>
      <NCAAFWeather />
      <Footer />
    </>
  );
};

export default NCAAFWeatherPage;
