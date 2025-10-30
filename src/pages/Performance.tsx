import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Performance = () => {
  const accuracyData = [
    { month: "May", accuracy: 68 },
    { month: "Jun", accuracy: 71 },
    { month: "Jul", accuracy: 69 },
    { month: "Aug", accuracy: 73 },
    { month: "Sep", accuracy: 74 },
    { month: "Oct", accuracy: 76 },
  ];

  const leaguePerformance = [
    { league: "NBA", accuracy: 76, games: 847 },
    { league: "NFL", accuracy: 71, games: 523 },
    { league: "Premier", accuracy: 74, games: 612 },
    { league: "La Liga", accuracy: 69, games: 438 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Model Performance
            </span>
          </h1>
          <p className="text-muted-foreground">
            Real-time analytics and performance metrics of our AI prediction
            models
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">73.8%</div>
            <p className="text-sm text-muted-foreground">Overall Accuracy</p>
            <div className="mt-2 text-xs text-secondary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.4% vs last month
            </div>
          </Card>

          <Card className="p-6 glass border-border/50">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">+15.7%</div>
            <p className="text-sm text-muted-foreground">ROI Simulation</p>
            <div className="mt-2 text-xs text-muted-foreground">
              Based on $100 flat bets
            </div>
          </Card>

          <Card className="p-6 glass border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">0.218</div>
            <p className="text-sm text-muted-foreground">Log Loss Score</p>
            <div className="mt-2 text-xs text-secondary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Improving
            </div>
          </Card>

          <Card className="p-6 glass border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">92.3%</div>
            <p className="text-sm text-muted-foreground">Calibration Score</p>
            <div className="mt-2 text-xs text-muted-foreground">
              Well-calibrated
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 glass border-border/50">
            <h3 className="text-xl font-bold mb-6">Accuracy Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 glass border-border/50">
            <h3 className="text-xl font-bold mb-6">Performance by League</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leaguePerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="league" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="accuracy"
                  fill="hsl(var(--secondary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Model Insights */}
        <Card className="p-6 glass border-border/50">
          <h3 className="text-xl font-bold mb-4">Model Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2 text-primary">
                Latest Model Update v3.2.1
              </h4>
              <p className="text-sm text-muted-foreground">
                Deployed October 1, 2025 - Enhanced player injury impact
                analysis and home-court advantage weighting
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2 text-secondary">
                Key Improvements
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Integrated real-time player availability data</li>
                <li>• Improved historical matchup analysis algorithm</li>
                <li>• Enhanced ELO rating decay function</li>
                <li>• Better handling of back-to-back games impact</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2 text-primary">Data Sources</h4>
              <p className="text-sm text-muted-foreground">
                Our models analyze 2.4M+ historical games, 500+ real-time data
                feeds, and 75+ statistical features per game
              </p>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Performance;
