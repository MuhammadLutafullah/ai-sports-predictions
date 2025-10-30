import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NFLSkeleton from "@/components/NFLSkeleton";
import NFLGamesTable from "@/components/NFLGamesTable";

const NFL = () => {
  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  // const LEAGUE_ID = 1;
  // const DAYS_AHEAD = 15; // number of days to fetch

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     setLoading(true);
  //     const allGames = [];

  //     const today = new Date();
  //     const dateList = Array.from({ length: DAYS_AHEAD }, (_, i) => {
  //       const date = new Date(today);
  //       date.setDate(today.getDate() + i);
  //       return date.toISOString().split("T")[0]; // YYYY-MM-DD
  //     });

  //     try {
  //       for (const date of dateList) {
  //         const res = await axios.get(
  //           `https://v1.american-football.api-sports.io/games?league=${LEAGUE_ID}&date=${date}`,
  //           {
  //             headers: {
  //               "x-apisports-key": API_KEY,
  //             },
  //           }
  //         );

  //         if (res.data.response.length > 0) {
  //           allGames.push(...res.data.response);
  //         }
  //       }

  //       setGames(allGames);
  //     } catch (err) {
  //       console.error("Error fetching games:", err);
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
          🏈 NFL 2025 Season Schedule
        </h2>
        <NFLGamesTable />
      </div>
      {/* <div className="p-6 max-w-5xl mx-auto max-h-[776px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white">
            🏈 Upcoming NFL Games
          </h1>

          {[...Array(2)].map((_, index) => (
            <NFLSkeleton key={index} />
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
          🏈 Upcoming NFL Games
        </h1>

        {games.length === 0 ? (
          <p className="text-center text-gray-400">
            No upcoming games found for the next {DAYS_AHEAD} days.
          </p>
        ) : (
          games.map((item) => {
            const { game, league, teams } = item;

            // Format the date nicely (e.g. October 28, 2025)
            const formattedDate = new Date(game.date.date).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <div className="card-main-otr">
                <div
                  key={game.id}
                  className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  {/* 🗓️ Game Date */}
                  <div className="text-center mb-4">
                    <p className="text-lg font-semibold text-gray-300">
                      📅 {formattedDate}
                    </p>
                  </div>

                  {/* League Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={league.logo}
                      alt={league.name}
                      className="w-10 h-10"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{league.name}</h2>
                      <p className="text-sm text-gray-400">
                        Season: {league.season} • {game.stage} ({game.week})
                      </p>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="flex justify-between items-center py-4">
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
                    </div>

                    {/* Center Info */}
                    <div className="text-center w-1/3">
                      <p className="text-gray-400 mb-2 text-lg font-semibold">
                        VS
                      </p>
                      <p className="text-sm text-gray-300">
                        {game.status.long} — {game.date.time}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {game.venue.name}, {game.venue.city}
                      </p>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center w-1/3">
                      <img
                        src={teams.away.logo}
                        alt={teams.away.name}
                        className="w-20 h-20 mb-2"
                      />
                      <p className="text-lg font-medium text-center">
                        {teams.away.name}
                      </p>
                    </div>
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

export default NFL;
