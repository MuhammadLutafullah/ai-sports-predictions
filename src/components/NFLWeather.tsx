import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import NFLWeatherSkeleton from "./NFLWeatherSkeleton";

const NFLWeather = () => {
  const SPORTS_API_KEY = "a84b3d977d0172cbeb9c34b6ee9ec363";
  const WEATHER_API_KEY = "abe3901572b1aeb9dd945080094d1898";
  const LEAGUE_ID = 1; // NFL
  const SEASON = 2025;
  const UPCOMING_DAYS = 2;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      setLoading(true);
      try {
        // Fetch all NFL games
        const res = await axios.get(
          `https://v1.american-football.api-sports.io/games?league=${LEAGUE_ID}&season=${SEASON}`,
          {
            headers: { "x-apisports-key": SPORTS_API_KEY },
          }
        );

        const allGames = res.data.response;
        const today = dayjs();
        const upcomingLimit = today.add(UPCOMING_DAYS, "day");

        // Filter only upcoming games
        const upcomingGames = allGames.filter((item) => {
          const gameDate = dayjs(item.game.date.date);
          return gameDate.isAfter(today) && gameDate.isBefore(upcomingLimit);
        });

        // Sort by date
        const sortedGames = upcomingGames.sort(
          (a, b) => new Date(a.game.date.date) - new Date(b.game.date.date)
        );

        // Fetch weather data for each game venue
        const gamesWithWeather = await Promise.all(
          sortedGames.map(async (item) => {
            const city = item.game.venue?.city;
            if (!city) return { ...item, weather: null };

            try {
              const weatherRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
              );

              const weatherData = weatherRes.data;
              return {
                ...item,
                weather: {
                  temp: weatherData.main.temp,
                  condition: weatherData.weather[0].main,
                  icon: weatherData.weather[0].icon,
                },
              };
            } catch (err) {
              console.warn(`No weather data for ${city}`, err);
              return { ...item, weather: null };
            }
          })
        );

        setGames(gamesWithWeather);
      } catch (err) {
        console.error("Error fetching NFL games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingGames();
  }, []);

  if (loading) return <NFLWeatherSkeleton />;

  if (games.length === 0)
    return (
      <p className="text-center text-gray-500">
        No upcoming games in the next {UPCOMING_DAYS} days.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {games.map((item) => (
          <div
            key={item.game.id}
            className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 border border-gray-800 hover:bg-gray-800/60 transition-all"
          >
            {/* 🗓️ Date */}
            <p className="text-center text-gray-400 mb-4">
              {dayjs(item.game.date.date).format("dddd, MMM D • h:mm A")}
            </p>

            {/* League Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://media.api-sports.io/football/leagues/1.png"
                alt="NFL"
                className="w-10 h-10 rounded-full object-contain"
              />
              <div>
                <p className="font-semibold text-gray-200">NFL</p>
                <p className="text-xs text-gray-500">{item.game.week}</p>
              </div>
            </div>

            {/* Teams */}
            <div className="flex justify-between items-center py-4">
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={item.teams.home.logo}
                  alt={item.teams.home.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {item.teams.home.name}
                </p>
              </div>

              <div className="text-center w-1/3">
                <p className="text-xl font-bold text-gray-400 mb-1">VS</p>
                <p className="text-sm text-gray-500">{item.game.stage}</p>
                <p className="text-xs text-gray-600">
                  {item.game.status.short}
                </p>
              </div>

              <div className="flex flex-col items-center w-1/3">
                <img
                  src={item.teams.away.logo}
                  alt={item.teams.away.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm text-gray-300 text-center">
                  {item.teams.away.name}
                </p>
              </div>
            </div>

            {/* Venue + Weather */}
            <div className="text-center text-gray-400 mt-4">
              <p className="text-sm font-medium">
                {item.game.venue?.name || "Unknown Venue"}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {item.game.venue?.city || ""}
              </p>

              {item.weather ? (
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
                    alt={item.weather.condition}
                    className="w-8 h-8"
                  />
                  <p className="text-sm text-gray-300">
                    {item.weather.temp}°C — {item.weather.condition}
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

export default NFLWeather;
