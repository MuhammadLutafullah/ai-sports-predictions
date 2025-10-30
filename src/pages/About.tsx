import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Github,
  Twitter,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About SportAI Predictor
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing sports analytics with advanced AI and machine
            learning
          </p>
        </div>

        <Card className="p-8 mb-8 glass border-border/50">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SportAI Predictor leverages cutting-edge artificial intelligence to
            provide the most accurate sports predictions available. Our mission
            is to democratize access to professional-grade sports analytics,
            empowering fans, analysts, and enthusiasts with data-driven
            insights.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe in transparency, accuracy, and continuous improvement.
            Every prediction is backed by rigorous analysis of thousands of data
            points, historical trends, and real-time factors.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 glass border-border/50">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced AI Models</h3>
            <p className="text-sm text-muted-foreground">
              Our proprietary machine learning models analyze millions of data
              points to generate accurate predictions with confidence scores.
            </p>
          </Card>

          <Card className="p-6 glass border-border/50">
            <Database className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Big Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Processing 2.4M+ historical games and 500+ real-time data feeds to
              identify patterns and trends that matter.
            </p>
          </Card>

          <Card className="p-6 glass border-border/50">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
            <p className="text-sm text-muted-foreground">
              Consistently achieving 73%+ accuracy across major sports leagues
              with transparent performance metrics.
            </p>
          </Card>

          <Card className="p-6 glass border-border/50">
            <Shield className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Transparent Methodology</h3>
            <p className="text-sm text-muted-foreground">
              Full transparency in our approach with detailed explanations for
              every prediction and confidence rating.
            </p>
          </Card>
        </div>

        <Card className="p-8 mb-8 glass border-border/50">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Data Collection</h4>
                <p className="text-sm text-muted-foreground">
                  We aggregate data from official league statistics, player
                  performance metrics, injury reports, weather conditions, and
                  historical matchup records.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Feature Engineering</h4>
                <p className="text-sm text-muted-foreground">
                  Our algorithms process 75+ statistical features per game,
                  including team form, ELO ratings, rest days, home advantage,
                  and head-to-head history.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Model Prediction</h4>
                <p className="text-sm text-muted-foreground">
                  Multiple ensemble models (Gradient Boosting, Neural Networks,
                  and XGBoost) generate probability distributions for game
                  outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Calibration & Validation</h4>
                <p className="text-sm text-muted-foreground">
                  Predictions are calibrated using historical performance and
                  validated against holdout datasets to ensure accuracy and
                  reliability.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8 glass border-border/50 bg-destructive/5 border-destructive/30">
          <h2 className="text-2xl font-bold mb-4">Important Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SportAI Predictor is designed for informational and entertainment
            purposes only. Our predictions are based on statistical analysis and
            should not be considered as betting advice or guarantees of future
            outcomes.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sports are inherently unpredictable, and many factors can influence
            game results. Please gamble responsibly and never bet more than you
            can afford to lose.
          </p>
        </Card>

        <Card className="p-8 glass border-border/50">
          <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Twitter className="w-5 h-5" />
              Twitter
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="w-5 h-5" />
              Email
            </Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;
