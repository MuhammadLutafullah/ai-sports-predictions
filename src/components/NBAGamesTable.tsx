import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import NBAGameSkeleton from "./NBAGameSkeleton";

const NBAGamesTable = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://v2.nba.api-sports.io/games?season=2025";
  const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363"; // 🔑 Replace with your real key
  const CURRENT_DATE = dayjs(); // Dynamically use today's date

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: { "x-apisports-key": API_KEY },
        });
        const data = await res.json();

        if (data.response) {
          // ✅ Filter games from today onward
          const filtered = data.response.filter((g) =>
            dayjs(g.date.start).isAfter(CURRENT_DATE.subtract(1, "day"))
          );

          // ✅ Sort games by status (Not Started → In Play → Finished)
          const order = { 1: 0, 2: 1, 3: 2 };
          const sorted = filtered.sort(
            (a, b) => order[a.status.short] - order[b.status.short]
          );

          setGames(sorted);
        }
      } catch (err) {
        console.error("Error fetching NBA games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const formatDate = (dateStr) =>
    dayjs(dateStr).format("MMM DD, YYYY - h:mm A");

  if (loading) return <NBAGameSkeleton />;

  return (
    <>
      {games.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-lg bg-gray-900">
          <table className="min-w-full border-collapse text-sm lg:text-base text-gray-300 max-[800px]:text-[12px] max-[800px]:leading-[17px]">
            <thead className="bg-gray-800 text-gray-200 text-left">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Stage</th>
                <th className="px-3 py-2">Home Team</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Away Team</th>
                <th className="px-3 py-2">Arena</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {games.map((game) => (
                <tr
                  key={game.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
                >
                  {/* 🗓️ Date */}
                  <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                    {formatDate(game.date.start)}
                  </td>

                  {/* 🎯 Stage */}
                  <td className="px-3 py-2 text-gray-300">
                    <span className="block font-medium">
                      {game.stage ? `Stage ${game.stage}` : "Regular"}
                    </span>
                    <span className="text-gray-500 text-xs">Season</span>
                  </td>

                  {/* 🏠 Home Team */}
                  <td className="px-3 py-2 flex items-center gap-2">
                    <img
                      src={game.teams.home.logo}
                      alt={game.teams.home.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{game.teams.home.name}</span>
                  </td>

                  {/* 🔢 Score */}
                  <td className="px-3 py-2 font-bold text-gray-100 text-center">
                    {game.scores.home.points ?? "-"} :{" "}
                    {game.scores.visitors.points ?? "-"}
                  </td>

                  {/* 🏀 Away Team */}
                  <td className="px-3 py-2 flex items-center gap-2">
                    <img
                      src={game.teams.visitors.logo}
                      alt={game.teams.visitors.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{game.teams.visitors.name}</span>
                  </td>

                  {/* 🏟️ Arena */}
                  <td className="px-3 py-2 text-gray-400">
                    {game.arena?.name || "Unknown Arena"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {game.arena?.city || ""}
                    </span>
                  </td>

                  {/* ⏱️ Status */}
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        game.status.long === "Finished"
                          ? "bg-green-700/30 text-green-400"
                          : game.status.long === "Not Started"
                          ? "bg-blue-700/30 text-blue-400"
                          : "bg-yellow-700/30 text-yellow-400"
                      }`}
                    >
                      {game.status.long}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No NBA games found.</p>
      )}
    </>
  );
};

export default NBAGamesTable;
