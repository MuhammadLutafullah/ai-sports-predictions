import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  AlertCircle,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GameDetails = () => {
  const { id } = useParams();
  const { data: gameData, isLoading, error } = useGameDetails(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-[400px] rounded-xl" />
            <Skeleton className="h-[300px] rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !gameData) {
    return (
      <div className="min-h-screen bg-background">
        {/* <Navigation /> */}
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-2xl font-bold mb-2">Game Not Found</h2>
            <p className="text-muted-foreground">
              Unable to load game details. Please try again.
            </p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const recentForm = {
    home: ["W", "W", "L", "W", "W"],
    away: ["L", "W", "W", "L", "L"],
  };

  const odds = [
    {
      bookmaker: "DraftKings",
      home: gameData.odds?.home || 1.52,
      away: gameData.odds?.away || 2.65,
    },
    {
      bookmaker: "FanDuel",
      home: (gameData.odds?.home || 1.52) + 0.03,
      away: (gameData.odds?.away || 2.65) - 0.1,
    },
    {
      bookmaker: "BetMGM",
      home: (gameData.odds?.home || 1.52) - 0.02,
      away: (gameData.odds?.away || 2.65) + 0.05,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <Card className="p-8 mb-8 glass border-border/50">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary" className="bg-muted/50">
              {gameData.leagueName}
            </Badge>
            <Badge
              variant="outline"
              className="border-secondary text-secondary"
            >
              {gameData.confidence}% Confidence
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                {gameData.homeTeamLogo ? (
                  <img
                    src={gameData.homeTeamLogo}
                    alt={gameData.homeTeam}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  gameData.homeTeam.charAt(0)
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">{gameData.homeTeam}</h2>
              <div className="text-4xl font-bold text-primary">
                {gameData.model?.homeWinProb || 50}%
              </div>
              <p className="text-sm text-muted-foreground">Win Probability</p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VS
              </p>
              <p className="text-muted-foreground">{gameData.date}</p>
              <p className="text-foreground font-semibold">{gameData.time}</p>
              <p className="text-sm text-muted-foreground">{gameData.venue}</p>
              {gameData.ftScore && (
                <p className="text-2xl font-bold text-primary mt-2">
                  {gameData.ftScore}
                </p>
              )}
            </div>

            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                {gameData.awayTeamLogo ? (
                  <img
                    src={gameData.awayTeamLogo}
                    alt={gameData.awayTeam}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  gameData.awayTeam.charAt(0)
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">{gameData.awayTeam}</h2>
              <div className="text-4xl font-bold text-secondary">
                {gameData.model?.awayWinProb || 50}%
              </div>
              <p className="text-sm text-muted-foreground">Win Probability</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{gameData.homeTeam}</span>
              <span>{gameData.awayTeam}</span>
            </div>
            <Progress
              value={gameData.model?.homeWinProb || 50}
              className="h-3"
            />
          </div>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="prediction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/30">
            <TabsTrigger value="prediction">
              <BarChart3 className="w-4 h-4 mr-2" />
              Prediction
            </TabsTrigger>
            <TabsTrigger value="form">
              <TrendingUp className="w-4 h-4 mr-2" />
              Form
            </TabsTrigger>
            <TabsTrigger value="injuries">
              <AlertCircle className="w-4 h-4 mr-2" />
              Injuries
            </TabsTrigger>
            <TabsTrigger value="odds">
              <Users className="w-4 h-4 mr-2" />
              Odds
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prediction">
            <Card className="p-6 glass border-border/50">
              <h3 className="text-xl font-bold mb-4">
                AI-Powered Prediction Analysis
              </h3>
              {gameData.prediction && (
                <div className="space-y-4">
                  {gameData.prediction.keyFactors?.map(
                    (factor: string, i: number) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/30">
                        <p className="font-semibold mb-2 text-primary">
                          {factor}
                        </p>
                      </div>
                    )
                  )}

                  {gameData.prediction.analysis && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <p className="font-semibold mb-2 text-primary">
                        AI Analysis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {gameData.prediction.analysis}
                      </p>
                    </div>
                  )}

                  {gameData.prediction.expectedScore && (
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                      <p className="font-semibold mb-2 text-secondary">
                        Expected Score
                      </p>
                      <p className="text-2xl font-bold">
                        {gameData.prediction.expectedScore}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-primary/10 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Home Win
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {gameData.model?.homeWinProb}%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Draw</p>
                      <p className="text-2xl font-bold">
                        {gameData.model?.drawProb}%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Away Win
                      </p>
                      <p className="text-2xl font-bold text-secondary">
                        {gameData.model?.awayWinProb}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!gameData.prediction && (
                <div className="text-center py-8 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p>Generating AI prediction...</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="form">
            <Card className="p-6 glass border-border/50">
              <h3 className="text-xl font-bold mb-4">Recent Form</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-3">{gameData.homeTeam}</p>
                  <div className="flex gap-2">
                    {recentForm.home.map((result, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                          result === "W"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-3">{gameData.awayTeam}</p>
                  <div className="flex gap-2">
                    {recentForm.away.map((result, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                          result === "W"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="injuries">
            <Card className="p-6 glass border-border/50">
              <h3 className="text-xl font-bold mb-4">Injury Report</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-semibold mb-1">{gameData.homeTeam}</p>
                  <p className="text-sm text-muted-foreground">
                    All players available - No injuries reported
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-semibold mb-1">{gameData.awayTeam}</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Player #23</span>
                      <Badge variant="destructive">Out</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Player #11</span>
                      <Badge
                        variant="outline"
                        className="border-yellow-500 text-yellow-500"
                      >
                        Questionable
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="odds">
            <Card className="p-6 glass border-border/50">
              <h3 className="text-xl font-bold mb-4">
                Betting Odds Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Bookmaker</th>
                      <th className="text-center py-3 px-4">
                        {gameData.homeTeam}
                      </th>
                      <th className="text-center py-3 px-4">
                        {gameData.awayTeam}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {odds.map((odd, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-3 px-4 font-semibold">
                          {odd.bookmaker}
                        </td>
                        <td className="text-center py-3 px-4 text-primary">
                          {odd.home.toFixed(2)}
                        </td>
                        <td className="text-center py-3 px-4 text-secondary">
                          {odd.away.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm">
                  <span className="font-semibold text-primary">
                    Value Edge:
                  </span>{" "}
                  Our AI model suggests{" "}
                  {gameData.edge?.home
                    ? `${(gameData.edge.home * 100).toFixed(1)}%`
                    : "N/A"}{" "}
                  better odds compared to market average for {gameData.homeTeam}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GameDetails;
