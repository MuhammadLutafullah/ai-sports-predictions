import React, { useEffect, useState } from "react";
import axios from "axios";
import NFLGamesTableSkeleton from "./NFLGamesTableSkeleton";

const NFLGamesTable = () => {
  const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  const LEAGUE_ID = 1; // NFL
  const SEASON = 2025;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://v1.american-football.api-sports.io/games?league=${LEAGUE_ID}&season=${SEASON}`,
          {
            headers: { "x-apisports-key": API_KEY },
          }
        );

        const allGames = res.data.response;

        // 🕒 Sort by status & date
        const sortedGames = allGames.sort((a, b) => {
          const statusOrder = {
            NS: 1, // Not Started → top
            "1Q": 2,
            "2Q": 2,
            "3Q": 2,
            "4Q": 2, // In progress (live)
            HT: 2,
            OT: 2,
            LIVE: 2,
            FT: 3,
            AOT: 3,
            PEN: 3, // Finished → bottom
          };

          const aStatus = statusOrder[a.game.status.short] || 4;
          const bStatus = statusOrder[b.game.status.short] || 4;

          if (aStatus !== bStatus) {
            return aStatus - bStatus;
          }

          // If same status, sort by date
          return new Date(a.game.date.date) - new Date(b.game.date.date);
        });

        setGames(sortedGames);
      } catch (err) {
        console.error("Error fetching NFL games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      {loading ? (
        <NFLGamesTableSkeleton />
      ) : games.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-lg bg-gray-900">
          <table className="min-w-full border-collapse text-sm lg:text-base text-gray-300 max-[800px]:text-[12px] max-[800px]:leading-[17px]">
            <thead className="bg-gray-800 text-gray-200 text-left">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Stage / Week</th>
                <th className="px-3 py-2">Home Team</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Away Team</th>
                <th className="px-3 py-2">Venue</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {games.map((item) => (
                <tr
                  key={item.game.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
                >
                  <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(item.game.date.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="px-3 py-2 text-gray-300">
                    <span className="block font-medium">{item.game.stage}</span>
                    <span className="text-gray-500 text-xs">
                      {item.game.week}
                    </span>
                  </td>

                  <td className="px-3 py-2 flex items-center gap-2">
                    <img
                      src={item.teams.home.logo}
                      alt={item.teams.home.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{item.teams.home.name}</span>
                  </td>

                  <td className="px-3 py-2 font-bold text-gray-100 text-center">
                    {item.scores.home.total ?? "-"} :{" "}
                    {item.scores.away.total ?? "-"}
                  </td>

                  <td className="px-3 py-2 flex items-center gap-2">
                    <img
                      src={item.teams.away.logo}
                      alt={item.teams.away.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{item.teams.away.name}</span>
                  </td>

                  <td className="px-3 py-2 text-gray-400">
                    {item.game.venue?.name || "Unknown Venue"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {item.game.venue?.city || ""}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.game.status.short === "FT"
                          ? "bg-green-700/30 text-green-400"
                          : item.game.status.short === "NS"
                          ? "bg-blue-700/30 text-blue-400"
                          : "bg-yellow-700/30 text-yellow-400"
                      }`}
                    >
                      {item.game.status.long}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No NFL games found.</p>
      )}
    </>
  );
};

export default NFLGamesTable;
