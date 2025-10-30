import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import NCAAFGameSkeleton from "./NCAAFGameSkeleton";

const NCAAFGamesTable = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://v1.american-football.api-sports.io/games?league=2&season=2025";
  const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: { "x-apisports-key": API_KEY },
        });
        const data = await res.json();

        if (data.response) {
          // ✅ Sort games by status + date
          const sortedGames = data.response.sort((a, b) => {
            const statusOrder = { NS: 1, "1H": 2, "2H": 2, FT: 3 };

            const aStatus = statusOrder[a.game.status.short] || 99;
            const bStatus = statusOrder[b.game.status.short] || 99;

            // First, sort by status (upcoming -> live -> finished)
            if (aStatus !== bStatus) return aStatus - bStatus;

            // Then sort by date (soonest first)
            const aDate = dayjs(`${a.game.date.date} ${a.game.date.time}`);
            const bDate = dayjs(`${b.game.date.date} ${b.game.date.time}`);
            return aDate - bDate;
          });

          setGames(sortedGames);
        }
      } catch (err) {
        console.error("Error fetching NCAAF games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <NCAAFGameSkeleton />;

  const formatDate = (dateObj) =>
    dayjs(`${dateObj.date} ${dateObj.time}`).format("MMM DD, YYYY - h:mm A");

  return (
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
              {/* Date */}
              <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                {new Date(item.game.date.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              {/* Stage / Week */}
              <td className="px-3 py-2 text-gray-300">
                <span className="block font-medium">{item.game.stage}</span>
                <span className="text-gray-500 text-xs">{item.game.week}</span>
              </td>

              {/* Home Team */}
              <td className="px-3 py-2 flex items-center gap-2">
                <img
                  src={item.teams.home.logo}
                  alt={item.teams.home.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{item.teams.home.name}</span>
              </td>

              {/* Score */}
              <td className="px-3 py-2 font-bold text-gray-100 text-center">
                {item.scores.home.total ?? "-"} :{" "}
                {item.scores.away.total ?? "-"}
              </td>

              {/* Away Team */}
              <td className="px-3 py-2 flex items-center gap-2">
                <img
                  src={item.teams.away.logo}
                  alt={item.teams.away.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{item.teams.away.name}</span>
              </td>

              {/* Venue */}
              <td className="px-3 py-2 text-gray-400">
                {item.game.venue?.name || "Unknown Venue"}
                <br />
                <span className="text-xs text-gray-500">
                  {item.game.venue?.city || ""}
                </span>
              </td>

              {/* Status */}
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
  );
};

export default NCAAFGamesTable;
