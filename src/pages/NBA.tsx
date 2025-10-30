import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import NBASkeleton from "@/components/NBASkeleton";
import NBAGamesTable from "@/components/NBAGamesTable";
const NBA = () => {
  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  // const DAYS_TO_FETCH = 15; // ✅ Number of days to fetch schedule dynamically

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     setLoading(true);

  //     const today = new Date();
  //     const allGames = [];

  //     try {
  //       for (let i = 0; i < DAYS_TO_FETCH; i++) {
  //         const date = new Date(today);
  //         date.setDate(today.getDate() + i);

  //         const formattedDate = date.toISOString().split("T")[0];

  //         const res = await axios.get(
  //           `https://v2.nba.api-sports.io/games?date=${formattedDate}`,
  //           {
  //             headers: { "x-apisports-key": API_KEY },
  //           }
  //         );

  //         if (res.data.response?.length > 0) {
  //           allGames.push(...res.data.response);
  //         }
  //       }

  //       setGames(allGames);
  //     } catch (err) {
  //       console.error("Error fetching NBA games:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGames();
  // }, []);
  // if (loading)
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          🏀 NBA 2025 Season Schedule
        </h2>
        <NBAGamesTable />
      </div>

      {/* <div className="p-6 max-w-5xl mx-auto max-h-[776px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-transparent our-custom">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white">
            🏀 Upcoming NBA Games
          </h1>
          {[...Array(3)].map((_, index) => (
            <NBASkeleton key={index} />
          ))}
        </div> */}
      <Footer />
    </>
  );
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto max-h-[776px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <h1 className="text-3xl font-semibold text-center mb-8 text-white">
          🏀 Upcoming NBA Games
        </h1>

        {games.length === 0 ? (
          <p className="text-center text-gray-400">
            No NBA games found for this date.
          </p>
        ) : (
          games.map((game) => {
            const { id, arena, teams, scores, status, date } = game;

            const formattedDate = new Date(date.start).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            const isFinished = status.long === "Finished";

            return (
              <div
                key={id}
                className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                {/* 🗓️ Game Date */}
                <div className="text-center mb-4">
                  <p className="text-lg font-semibold text-gray-300">
                    📅 {formattedDate}
                  </p>
                </div>

                {/* Teams Section */}
                <div className="flex justify-between items-center py-4">
                  {/* Visitor Team */}
                  <div className="flex flex-col items-center w-1/3">
                    <img
                      src={teams.visitors.logo}
                      alt={teams.visitors.name}
                      className="w-20 h-20 mb-2"
                    />
                    <p className="text-lg font-medium text-center">
                      {teams.visitors.name}
                    </p>
                    {isFinished && (
                      <p className="text-xl font-bold mt-2 text-gray-300">
                        {scores.visitors.points}
                      </p>
                    )}
                  </div>

                  {/* Center Info */}
                  <div className="text-center w-1/3">
                    <p className="text-gray-400 mb-2 text-lg font-semibold">
                      VS
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isFinished ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {status.long}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {arena.name}, {arena.city}
                    </p>
                  </div>

                  {/* Home Team */}
                  <div className="flex flex-col items-center w-1/3">
                    <img
                      src={teams.home.logo}
                      alt={teams.home.name}
                      className="w-20 h-20 mb-2"
                    />
                    <p className="text-lg font-medium text-center">
                      {teams.home.name}
                    </p>
                    {isFinished && (
                      <p className="text-xl font-bold mt-2 text-gray-300">
                        {scores.home.points}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
};

export default NBA;
