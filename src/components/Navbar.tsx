import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  ArrowRight,
  Home,
  TrendingUp,
  Info,
  Menu,
  X,
  ChevronDown,
  CloudSun,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const leagues = ["NFL", "NBA", "NCAAF", "NCAAB", "WNBA"];
  const weatherOptions = [
    "NFL Weather",
    "NBA Weather",
    "NCAAF Weather",
    "NCAAB Weather",
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="border-b border-border/50 glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:text-lg xs:text-base">
            SportAI Predictor
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden min-[1024px]:flex items-center space-x-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>

          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition flex items-center"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>

          {/* Games Dropdown */}
          <div className="relative group">
            <p className="text-muted-foreground hover:text-foreground transition cursor-pointer flex items-center gap-1 mb-0">
              <Trophy className="w-4 h-4" />
              Games
            </p>
            <div className="absolute left-0 opacity-0 invisible top-8 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-[27px]">
              <ul className="list-none bg-black rounded-md shadow-lg min-w-[180px] py-2">
                {leagues.map((league) => (
                  <li
                    key={league}
                    onClick={() => navigate(`/games/${league.toLowerCase()}`)}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2 cursor-pointer"
                  >
                    {league}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weather Dropdown */}
          <div className="relative group">
            <p className="text-muted-foreground hover:text-foreground transition cursor-pointer flex items-center gap-1 mb-0">
              <CloudSun className="w-4 h-4" />
              Weather
            </p>
            <div className="absolute left-0 opacity-0 invisible top-8 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-[27px]">
              <ul className="list-none bg-black rounded-md shadow-lg min-w-[200px] py-2">
                {weatherOptions.map((option) => {
                  const path = option.toLowerCase().replace(" ", "-");
                  return (
                    <li
                      key={option}
                      onClick={() => navigate(`/${path}`)}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2 cursor-pointer"
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Link
            to="/performance"
            className="text-muted-foreground hover:text-foreground transition flex items-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </Link>

          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground transition flex items-center"
          >
            <Info className="w-4 h-4 mr-2" />
            About
          </Link>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden min-[1024px]:flex items-center space-x-3">
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-primary to-secondary text-white"
            >
              Logout
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                Login
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex min-[1024px]:hidden text-muted-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="flex min-[1024px]:hidden bg-black border-t border-border/30">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>

            {/* Dashboard Link */}
            <li>
              <Link
                to="/dashboard"
                className="flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </li>

            {/* Games Accordion */}
            <li>
              <div
                className="flex items-center justify-between cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => setGamesOpen(!gamesOpen)}
              >
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Games
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    gamesOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {gamesOpen && (
                <ul className="pl-6 mt-2 space-y-1">
                  {leagues.map((league) => (
                    <li
                      key={league}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => {
                        navigate(`/games/${league.toLowerCase()}`);
                        setMenuOpen(false);
                      }}
                    >
                      {league}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Weather Accordion */}
            <li>
              <div
                className="flex items-center justify-between cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => setWeatherOpen(!weatherOpen)}
              >
                <span className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4" />
                  Weather
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    weatherOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {weatherOpen && (
                <ul className="pl-6 mt-2 space-y-1">
                  {weatherOptions.map((option) => {
                    const path = option.toLowerCase().replace(" ", "-");
                    return (
                      <li
                        key={option}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => {
                          navigate(`/${path}`);
                          setMenuOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* Performance */}
            <li>
              <Link
                to="/performance"
                className="flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                to="/about"
                className="flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </li>

            {/* Auth Button */}
            <li className="pt-2">
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                    Login
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
