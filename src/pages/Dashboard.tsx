import { useState } from "react";
import Navigation from "@/components/Navigation";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Filter, Calendar, Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGamesData } from "@/hooks/useGamesData";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [selectedLeague, setSelectedLeague] = useState("all");

  // Get today's date and 7 days from now for the date range
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const {
    data: games = [],
    isLoading,
    error,
  } = useGamesData({
    from: today,
    to: nextWeek,
  });

  const filteredGames =
    selectedLeague === "all"
      ? games
      : games.filter((game) => game.leagueName === selectedLeague);

  // Get unique leagues for filter
  const leagues = Array.from(new Set(games.map((g) => g.leagueName)));

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Sports Predictions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced machine learning models analyzing thousands of data points
            to predict game outcomes with unprecedented accuracy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl glass border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-primary">73.8%</span>
            </div>
            <p className="text-sm text-muted-foreground">Model Accuracy</p>
          </div>
          <div className="p-6 rounded-xl glass border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-secondary" />
              <span className="text-3xl font-bold text-secondary">
                {games.length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Games Analyzed</p>
          </div>
          <div className="p-6 rounded-xl glass border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Filter className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Live
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Real-time Updates</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Games</h2>
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by league" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              {leagues.map((league) => (
                <SelectItem key={league} value={league}>
                  {league}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">
              Failed to load games. Please try again.
            </p>
          </div>
        )}

        {/* Games Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                homeWinProb={game.model?.homeWinProb || 50}
                awayWinProb={game.model?.awayWinProb || 50}
                date={game.date}
                time={game.time}
                league={game.leagueName}
                edge={game.edge ? Math.round(game.edge.home * 100) : undefined}
              />
            ))}
          </div>
        )}

        {filteredGames.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No games found for the selected league
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
