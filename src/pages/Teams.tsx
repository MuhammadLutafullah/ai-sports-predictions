import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Teams = () => {
  const [selectedLeague, setSelectedLeague] = useState("NBA");

  const teamsData = [
    {
      rank: 1,
      name: "Celtics",
      record: "42-15",
      elo: 1847,
      streak: "W5",
      change: "up",
    },
    {
      rank: 2,
      name: "Lakers",
      record: "40-17",
      elo: 1825,
      streak: "W3",
      change: "up",
    },
    {
      rank: 3,
      name: "Warriors",
      record: "38-19",
      elo: 1802,
      streak: "L2",
      change: "down",
    },
    {
      rank: 4,
      name: "Bucks",
      record: "39-18",
      elo: 1798,
      streak: "W1",
      change: "same",
    },
    {
      rank: 5,
      name: "Nuggets",
      record: "37-20",
      elo: 1785,
      streak: "W4",
      change: "up",
    },
    {
      rank: 6,
      name: "Heat",
      record: "36-21",
      elo: 1772,
      streak: "L1",
      change: "down",
    },
    {
      rank: 7,
      name: "Suns",
      record: "35-22",
      elo: 1758,
      streak: "W2",
      change: "up",
    },
    {
      rank: 8,
      name: "76ers",
      record: "34-23",
      elo: 1745,
      streak: "L3",
      change: "down",
    },
  ];

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-secondary" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Team Rankings
            </span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered ELO ratings and performance analytics for all teams
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Power Rankings</h2>
          </div>
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select league" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NBA">NBA</SelectItem>
              <SelectItem value="NFL">NFL</SelectItem>
              <SelectItem value="Premier League">Premier League</SelectItem>
              <SelectItem value="La Liga">La Liga</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6 glass border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4">Rank</th>
                  <th className="text-left py-4 px-4">Team</th>
                  <th className="text-center py-4 px-4">Record</th>
                  <th className="text-center py-4 px-4">ELO Rating</th>
                  <th className="text-center py-4 px-4">Streak</th>
                  <th className="text-center py-4 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {teamsData.map((team, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {team.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-lg font-bold">
                          {team.name.charAt(0)}
                        </div>
                        <span className="font-semibold">{team.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 font-mono">
                      {team.record}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge
                        variant="outline"
                        className="border-primary text-primary"
                      >
                        {team.elo}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          team.streak.startsWith("W")
                            ? "bg-secondary/20 text-secondary"
                            : "bg-destructive/20 text-destructive"
                        }
                      >
                        {team.streak}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      {getChangeIcon(team.change)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass border-border/50">
            <h3 className="font-semibold mb-2 text-primary">Highest ELO</h3>
            <p className="text-3xl font-bold">1847</p>
            <p className="text-sm text-muted-foreground mt-1">Celtics</p>
          </Card>
          <Card className="p-6 glass border-border/50">
            <h3 className="font-semibold mb-2 text-secondary">
              Longest Streak
            </h3>
            <p className="text-3xl font-bold">W5</p>
            <p className="text-sm text-muted-foreground mt-1">Celtics</p>
          </Card>
          <Card className="p-6 glass border-border/50">
            <h3 className="font-semibold mb-2 text-primary">Most Improved</h3>
            <p className="text-3xl font-bold">+127</p>
            <p className="text-sm text-muted-foreground mt-1">
              Nuggets (Last 30 days)
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teams;
