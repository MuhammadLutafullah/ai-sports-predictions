import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NCAABSkeleton from "@/components/NCAABSkeleton";
import NCAABGameTable from "@/components/NCAABGameTable";
const NCAAB = () => {
  // const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  // const LEAGUE_ID = 2; // NCAA Football
  // const START_DATE = "2025-10-30"; // starting point
  // const DAYS_TO_FETCH = 15; // next 15 days

  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

  // // helper to get date strings in YYYY-MM-DD format
  // const getDateRange = (start, days) => {
  //   const dates = [];
  //   const base = new Date(start);
  //   for (let i = 0; i < days; i++) {
  //     const newDate = new Date(base);
  //     newDate.setDate(base.getDate() + i);
  //     dates.push(newDate.toISOString().split("T")[0]);
  //   }
  //   return dates;
  // };

  // useEffect(() => {
  //   const fetchSequentialGames = async () => {
  //     setLoading(true);
  //     const allGames = [];
  //     const dates = getDateRange(START_DATE, DAYS_TO_FETCH);

  //     try {
  //       for (const date of dates) {
  //         console.log(`Fetching games for ${date}...`);
  //         const res = await axios.get(
  //           `https://v1.american-football.api-sports.io/games?league=${LEAGUE_ID}&date=${date}`,
  //           {
  //             headers: { "x-apisports-key": API_KEY },
  //           }
  //         );

  //         if (res.data.response?.length) {
  //           allGames.push(...res.data.response);
  //         }

  //         // Delay between calls to avoid hitting rate limit (optional but recommended)
  //         await new Promise((resolve) => setTimeout(resolve, 500));
  //       }

  //       setGames(allGames);
  //     } catch (err) {
  //       console.error("Error fetching NCAAF games:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSequentialGames();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          👇🏀 Upcoming NCAAB Football Games
        </h2>
        <NCAABGameTable />
        {/* {loading ? (
          <NCAABSkeleton />
        ) : games.length > 0 ? (
          <div className="grid gap-6 max-h-[776px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 rounded-2xl p-2">
            {games.map((item) => (
              <div
                key={item.game.id}
                className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800 hover:shadow-xl hover:border-gray-700 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm">
                    {new Date(item.game.date.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {item.game.stage} - Week {item.game.week}
                  </p>
                </div>

                <div className="flex justify-between items-center py-4">
                  <div className="flex flex-col items-center w-1/3">
                    <img
                      src={item.teams.home.logo}
                      alt={item.teams.home.name}
                      className="w-20 h-20 rounded-full object-contain bg-gray-800 p-2 mb-3"
                    />
                    <p className="text-gray-200 font-semibold text-center text-sm">
                      {item.teams.home.name}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-1/3">
                    <span className="text-gray-300 font-bold text-xl mb-1">
                      {item.scores.home.total ?? "-"} :{" "}
                      {item.scores.away.total ?? "-"}
                    </span>
                    <p className="text-gray-400 text-xs mb-1">
                      {item.game.status?.long || "Scheduled"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.game.venue?.name || "Venue TBD"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-1/3">
                    <img
                      src={item.teams.away.logo}
                      alt={item.teams.away.name}
                      className="w-20 h-20 rounded-full object-contain bg-gray-800 p-2 mb-3"
                    />
                    <p className="text-gray-200 font-semibold text-center text-sm">
                      {item.teams.away.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6">
                  <img
                    src={item.league.logo}
                    alt={item.league.name}
                    className="w-5 h-5 object-contain"
                  />
                  <p className="text-gray-400 text-sm">
                    {item.league.name} ({item.league.country.name})
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No games found for this date.
          </p>
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default NCAAB;
