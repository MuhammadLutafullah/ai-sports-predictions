import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import NCAABWeatherSkeleton from "./NCAABWeatherSkeleton";

const NCAABWeather = () => {
  const API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  const LEAGUE_ID = 116; // NCAAB
  const SEASON = "2024-2025";
  const UPCOMING_DAYS = 7;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v1.basketball.api-sports.io/games?league=${LEAGUE_ID}&season=${SEASON}`,
          {
            headers: {
              "x-apisports-key": API_KEY,
            },
          }
        );

        const data = await response.json();
        const allGames = data.response || [];

        const today = dayjs();
        const sevenDaysLater = today.add(UPCOMING_DAYS, "day");

        // Filter for games in the next 7 days
        const upcomingGames = allGames.filter((game) => {
          const gameDate = dayjs(game.date);
          return gameDate.isAfter(today) && gameDate.isBefore(sevenDaysLater);
        });

        // Sort games by date ascending
        const sortedGames = upcomingGames.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setGames(sortedGames);
      } catch (error) {
        console.error("Error fetching NCAAB games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingGames();
  }, []);

  if (loading) return <NCAABWeatherSkeleton />;

  if (games.length === 0)
    return (
      <p className="text-center text-gray-500">
        No upcoming NCAAB games in the next 7 days.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 border border-gray-800 hover:bg-gray-800/60 transition-all"
          >
            {/* 🗓️ Date */}
            <p className="text-center text-gray-400 mb-4">
              {dayjs(game.date).format("dddd, MMM D • h:mm A")}
            </p>

            {/* Teams */}
            <div className="flex justify-between items-center py-4">
              {/* Home team */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={game.teams.home?.logo}
                  alt={game.teams.home?.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {game.teams.home?.name}
                </p>
              </div>

              {/* VS */}
              <div className="text-center w-1/3">
                <p className="text-xl font-bold text-gray-400 mb-1">VS</p>
                <p className="text-sm text-gray-500">{game.stage}</p>
                <p className="text-xs text-gray-600">{game.status.short}</p>
              </div>

              {/* Away team */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={game.teams.away?.logo}
                  alt={game.teams.away?.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {game.teams.away?.name}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="text-center text-gray-400 mt-4">
              <p className="text-sm font-medium">
                {game.arena?.name || "Unknown Venue"}
              </p>
              <p className="text-xs text-gray-500">{game.city || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NCAABWeather;
