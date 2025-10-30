import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import NBAWeatherSkeleton from "./NBAWeatherSkeleton";

const NBAWeather = () => {
  const SPORTS_API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  const WEATHER_API_KEY = "abe3901572b1aeb9dd945080094d1898";
  const SEASON = 2025;
  const UPCOMING_DAYS = 2;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNBAWeatherData = async () => {
      setLoading(true);
      try {
        // Fetch all NBA games
        const res = await axios.get(
          `https://v2.nba.api-sports.io/games?season=${SEASON}`,
          {
            headers: { "x-apisports-key": SPORTS_API_KEY },
          }
        );

        const allGames = res.data.response;
        const today = dayjs();
        const limit = today.add(UPCOMING_DAYS, "day");

        // Filter upcoming games
        const upcomingGames = allGames.filter((game) => {
          const gameDate = dayjs(game.date.start);
          return gameDate.isAfter(today) && gameDate.isBefore(limit);
        });

        // Sort by date
        const sortedGames = upcomingGames.sort(
          (a, b) => new Date(a.date.start) - new Date(b.date.start)
        );

        // Fetch weather for each game's arena city
        const gamesWithWeather = await Promise.all(
          sortedGames.map(async (game) => {
            const city = game.arena?.city;
            if (!city) return { ...game, weather: null };

            try {
              const weatherRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
              );

              const w = weatherRes.data;
              return {
                ...game,
                weather: {
                  temp: w.main.temp,
                  condition: w.weather[0].main,
                  icon: w.weather[0].icon,
                },
              };
            } catch (err) {
              console.warn(`No weather data for ${city}`, err);
              return { ...game, weather: null };
            }
          })
        );

        setGames(gamesWithWeather);
      } catch (error) {
        console.error("Error fetching NBA games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNBAWeatherData();
  }, []);

  if (loading) return <NBAWeatherSkeleton />;

  if (games.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No upcoming NBA games found for the next {UPCOMING_DAYS} days.
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
              {dayjs(game.date.start).format("dddd, MMM D • h:mm A")}
            </p>

            {/* League Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://media.api-sports.io/basketball/leagues/12.png"
                alt="NBA"
                className="w-10 h-10 rounded-full object-contain"
              />
              <div>
                <p className="font-semibold text-gray-200">NBA</p>
                <p className="text-xs text-gray-500">
                  {game.stage ? `Stage ${game.stage}` : "Regular Season"}
                </p>
              </div>
            </div>

            {/* Teams */}
            <div className="flex justify-between items-center py-4">
              {/* Home team */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={game.teams.home.logo}
                  alt={game.teams.home.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {game.teams.home.name}
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
                  src={game.teams.visitors.logo}
                  alt={game.teams.visitors.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {game.teams.visitors.name}
                </p>
              </div>
            </div>

            {/* Arena + Weather */}
            <div className="text-center text-gray-400 mt-4">
              <p className="text-sm font-medium">
                {game.arena?.name || "Unknown Arena"}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {game.arena?.city || ""}
              </p>

              {game.weather ? (
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${game.weather.icon}.png`}
                    alt={game.weather.condition}
                    className="w-8 h-8"
                  />
                  <p className="text-sm text-gray-300">
                    {game.weather.temp}°C — {game.weather.condition}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-600">
                  Weather data unavailable
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NBAWeather;
