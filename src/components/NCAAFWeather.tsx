import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import NCAAFWeatherSkeleton from "./NCAAFWeatherSkeleton";

const NCAAFWeather = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://v1.american-football.api-sports.io/games?league=2&season=2025";
  const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";

  const CURRENT_DATE = dayjs();
  const NEXT_7_DAYS = CURRENT_DATE.add(7, "day");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: { "x-apisports-key": API_KEY },
        });
        const data = await res.json();

        if (data.response) {
          // ✅ Filter only games happening within the next 7 days
          const filteredGames = data.response.filter((item) => {
            const gameDate = dayjs(
              `${item.game.date.date} ${item.game.date.time}`
            );
            return (
              gameDate.isAfter(CURRENT_DATE) && gameDate.isBefore(NEXT_7_DAYS)
            );
          });

          // ✅ Sort by status + date
          const sortedGames = filteredGames.sort((a, b) => {
            const statusOrder = { NS: 1, "1H": 2, "2H": 2, FT: 3 };
            const aStatus = statusOrder[a.game.status.short] || 99;
            const bStatus = statusOrder[b.game.status.short] || 99;

            if (aStatus !== bStatus) return aStatus - bStatus;

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

  if (loading) return <NCAAFWeatherSkeleton />;

  return (
    <section className="py-8">
      {games.length === 0 ? (
        <p className="text-center text-gray-500">
          No games scheduled for the next 7 days.
        </p>
      ) : (
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {games.map((item) => {
              const date = new Date(item.game.date.date);
              const formattedDate = dayjs(date).format("MMM DD, YYYY");
              const formattedTime = dayjs(
                `${item.game.date.date} ${item.game.date.time}`
              ).format("h:mm A");

              // Placeholder weather for now
              const weather = {
                temp: "25°C",
                condition: "Sunny ☀️",
              };

              return (
                <div
                  key={item.game.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
                >
                  {/* Date */}
                  <div className="text-gray-400 text-sm mb-2">
                    {formattedDate} • {formattedTime}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Home */}
                    <div className="flex flex-col items-center">
                      <img
                        src={item.teams.home.logo}
                        alt={item.teams.home.name}
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-gray-200 text-sm text-center">
                        {item.teams.home.name}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="text-xl font-bold text-white">
                      {item.scores.home.total ?? "-"} :{" "}
                      {item.scores.away.total ?? "-"}
                    </div>

                    {/* Away */}
                    <div className="flex flex-col items-center">
                      <img
                        src={item.teams.away.logo}
                        alt={item.teams.away.name}
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-gray-200 text-sm text-center">
                        {item.teams.away.name}
                      </span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="text-gray-400 text-sm mb-3">
                    <strong className="text-gray-300">
                      {item.game.venue?.name || "Unknown Venue"}
                    </strong>
                    <br />
                    {item.game.venue?.city || ""}
                  </div>

                  {/* Weather */}
                  <div className="flex items-center justify-between text-sm bg-gray-800/60 rounded-lg p-2 mb-3">
                    <span className="text-gray-300">
                      {weather.condition} — {weather.temp}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.game.status.short === "FT"
                          ? "bg-green-700/30 text-green-400"
                          : item.game.status.short === "NS"
                          ? "bg-blue-700/30 text-blue-400"
                          : "bg-yellow-700/30 text-yellow-400"
                      }`}
                    >
                      {item.game.status.long}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default NCAAFWeather;
