import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NCAAFSkeleton from "@/components/NCAAFSkeleton";
import NCAAFGamesTable from "@/components/NCAAFGamesTable";

const NCAAF = () => {
  // const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  // const LEAGUE_ID = 2; // NCAA Football
  // const DAYS_TO_FETCH = 15; // number of days of schedule

  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     setLoading(true);
  //     const allGames = [];

  //     try {
  //       const startDate = new Date("2025-10-29");

  //       for (let i = 0; i < DAYS_TO_FETCH; i++) {
  //         const date = new Date(startDate);
  //         date.setDate(startDate.getDate() + i);

  //         const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
  //         console.log("Fetching games for:", formattedDate);

  //         const res = await axios.get(
  //           `https://v1.american-football.api-sports.io/games?league=${LEAGUE_ID}&date=${formattedDate}`,
  //           {
  //             headers: { "x-apisports-key": API_KEY },
  //           }
  //         );

  //         // append daily games if found
  //         if (res.data.response?.length > 0) {
  //           allGames.push(...res.data.response);
  //         }
  //       }

  //       setGames(allGames);
  //     } catch (err) {
  //       console.error("Error fetching 15-day NCAAF schedule:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGames();
  // }, []);
  return (
    <>
      <Navbar />
      <div className=" p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          🏈 Upcoming NCAAF Games
        </h2>

        <NCAAFGamesTable />
      </div>

      <Footer />
    </>
  );
};

export default NCAAF;
