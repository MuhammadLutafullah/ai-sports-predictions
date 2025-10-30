import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NBAGamesTable from "@/components/NBAGamesTable";
import NFLGamesTable from "@/components/NFLGamesTable";
import NBA from "./NBA";
import CustomDashboard from "@/components/CustomDashboard";
import NFLWeather from "@/components/NFLWeather";

const Index = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning models process thousands of data points to deliver accurate predictions.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Odds",
      description:
        "Live betting odds from multiple bookmakers to find the best value for your predictions.",
    },
    {
      icon: Zap,
      title: "Instant Predictions",
      description:
        "Get lightning-fast predictions for upcoming games across multiple sports leagues.",
    },
    {
      icon: Shield,
      title: "73.8% Accuracy",
      description:
        "Proven track record with consistent high-accuracy predictions backed by data.",
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description:
        "Comprehensive stats including ELO ratings, team form, and head-to-head analysis.",
    },
    {
      icon: Target,
      title: "Edge Detection",
      description:
        "Identify value bets by comparing AI predictions against market odds.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Select a Game",
      description:
        "Browse upcoming matches from top leagues worldwide including EPL, NBA, NFL, and more.",
    },
    {
      number: "02",
      title: "View AI Prediction",
      description:
        "Our AI analyzes team form, injuries, venue, and historical data in real-time.",
    },
    {
      number: "03",
      title: "Compare Odds",
      description:
        "See how our predictions stack up against bookmaker odds to find value opportunities.",
    },
  ];

  const stats = [
    { value: "73.8%", label: "Prediction Accuracy" },
    { value: "50K+", label: "Games Analyzed" },
    { value: "15+", label: "Sports Leagues" },
    { value: "99.9%", label: "Uptime" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      {/* <NFLGamesTable /> */}
      {/* <NBAGamesTable /> */}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Advanced AI Technology
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Win Smarter with
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                AI Sports Predictions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of machine learning to predict game outcomes
              with 73.8% accuracy. Get real-time predictions, betting edges, and
              comprehensive analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8 py-6 hover:scale-105 transition-transform"
                >
                  Start Predicting Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Make Winning Predictions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with comprehensive sports
              data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 glass border-border/50 hover:border-primary/50 transition-all hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get accurate predictions in three simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="container mx-auto px-4 relative">
          <Card className="max-w-4xl mx-auto p-12 glass border-border/50 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Winning?
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of sports analysts and investors who trust our AI
              predictions to make smarter decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8 py-6"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  View Methodology
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-2" />
                Real-time predictions
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-2" />
                Multiple sports leagues
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
