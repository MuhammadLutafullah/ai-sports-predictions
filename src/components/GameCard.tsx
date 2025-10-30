import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GameCardProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeWinProb: number;
  awayWinProb: number;
  date: string;
  time: string;
  league: string;
  edge?: number;
}

const GameCard = ({
  id,
  homeTeam,
  awayTeam,
  homeWinProb,
  awayWinProb,
  date,
  time,
  league,
  edge,
}: GameCardProps) => {
  return (
    <Link to={`/game/${id}`}>
      <Card className="p-6 hover:bg-card/80 transition-all duration-300 border-border/50 hover:border-primary/50 group cursor-pointer glass">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-muted/50 text-foreground">
            {league}
          </Badge>
          {edge && (
            <Badge
              variant="outline"
              className={`${
                edge > 0 ? "border-secondary text-secondary" : "border-primary text-primary"
              }`}
            >
              {edge > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(edge)}% edge
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              {homeTeam.charAt(0)}
            </div>
            <p className="font-semibold text-sm">{homeTeam}</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VS
            </p>
            <p className="text-xs text-muted-foreground mt-1">{date}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              {awayTeam.charAt(0)}
            </div>
            <p className="font-semibold text-sm">{awayTeam}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-primary">{homeWinProb}%</p>
            <p className="text-xs text-muted-foreground">Win Probability</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-secondary">{awayWinProb}%</p>
            <p className="text-xs text-muted-foreground">Win Probability</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;
