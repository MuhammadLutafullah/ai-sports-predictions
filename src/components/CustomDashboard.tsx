import React from "react";
import {
  FaFutbol,
  FaUserAlt,
  FaCloudSun,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import Navbar from "./Navbar";
import { Footer } from "react-day-picker";

const CustomDashboard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden text-white  px-4 py-10">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Header */}
        <h1 className="text-3xl md:text-7xl  text-center font-bold leading-tight  bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
          AI Sports Prediction Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-6xl text-center py-4 mx-auto">
          Real-time predictive analytics for{" "}
          <span className="text-primary font-semibold">NBA</span>,{" "}
          <span className="text-primary font-semibold">NFL</span>,{" "}
          <span className="text-primary font-semibold">NCAAF</span>,{" "}
          <span className="text-primary font-semibold">NCAAB</span>, and{" "}
          <span className="text-primary font-semibold">WNBA</span>. Trained on
          historical data, our AI models use live stats and weather conditions
          to predict game outcomes with remarkable precision.
        </p>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Live Games */}
          <div className="glass border border-border/40 rounded-2xl p-6 shadow-lg hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaFutbol className="text-primary" /> Live Game
            </h2>
            <p className="text-gray-300 mb-2">🏀 Lakers vs Celtics</p>
            <p className="text-sm text-gray-400">Status: In Progress</p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full w-[68%] animate-pulse"></div>
            </div>
            <div className="mt-6 text-sm text-gray-400 flex justify-between">
              <p>2nd Quarter</p>
              <p>Time: 08' 42"</p>
            </div>
            <p className="text-muted-foreground text-xs mt-3 italic">
              “Momentum is shifting — Team A gaining pace with dynamic plays.”
            </p>
          </div>

          {/* AI Prediction Circles */}
          <div className="glass border border-border/40 rounded-2xl p-6 shadow-lg hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BsBarChartFill className="text-primary" /> AI Prediction
            </h2>

            <div className="flex items-center justify-around mt-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold shadow-inner">
                  35%
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Team A</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-gray-400">
                  10%
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Draw</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold shadow-inner">
                  55%
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Team B</p>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 italic">
              Based on machine learning pattern recognition & real-time metrics.
            </p>
          </div>

          {/* AI Confidence */}
          <div className="glass border border-border/40 rounded-2xl p-6 shadow-lg hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300 flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaUserAlt className="text-primary" /> AI Confidence
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Predicted Winner: Team B
            </p>
            <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-3">
              87%
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Confidence Level
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Derived from 10,000+ historical matches.
            </p>
          </div>
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-6xl">
          {/* Weather Condition */}
          <div className="glass border border-border/40 rounded-2xl p-6 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCloudSun className="text-primary" /> Weather Insights
            </h2>
            <p className="text-muted-foreground text-sm">
              Weather affects performance in{" "}
              <span className="text-primary font-medium">NFL</span> &{" "}
              <span className="text-primary font-medium">NCAAF</span>.
              Integrated with{" "}
              <span className="text-primary font-medium">OpenWeather API</span>{" "}
              for dynamic adjustments in predictive outcomes.
            </p>
            <div className="mt-4 flex justify-between text-muted-foreground text-sm">
              <p>🌡️ Temp: 22°C</p>
              <p>💨 Wind: 12 km/h</p>
              <p>☁️ Cloudy</p>
            </div>
          </div>

          {/* Model Training Info */}
          <div className="glass border border-border/40 rounded-2xl p-6 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaBrain className="text-primary" /> Model Intelligence
            </h2>
            <p className="text-muted-foreground text-sm">
              Our AI is trained on{" "}
              <span className="text-primary font-medium">five seasons</span> of
              game data, evaluating player stats, fatigue levels, and matchup
              histories to enhance outcome predictions.
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              The model evolves continuously — improving with each live update.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-2 flex items-center justify-center gap-2">
            <FaChartLine className="text-primary" /> “Where data meets the
            thrill of the game.”
          </p>
          <p className="text-gray-500 text-xs">
            ⚡ Powered by AI Sports Engine & OpenWeather
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomDashboard;
