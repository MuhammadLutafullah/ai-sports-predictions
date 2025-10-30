import { supabase } from "@/integrations/supabase/client";

export interface GameData {
  id: string;
  leagueId: string;
  leagueName: string;
  country: string;
  date: string;
  time: string;
  status: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  ftScore?: string;
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
  model?: {
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
  };
  edge?: {
    home: number;
    draw: number;
    away: number;
  };
  confidence?: number;
}

export const fetchLeagues = async () => {
  const { data, error } = await supabase.functions.invoke('fetch-leagues');
  
  if (error) throw error;
  return data;
};

export const fetchGames = async (params?: { from?: string; to?: string; leagueId?: string }) => {
  const { data, error } = await supabase.functions.invoke('fetch-games', {
    body: params || {}
  });
  
  if (error) throw error;
  return data;
};

export const fetchLiveScores = async () => {
  const { data, error } = await supabase.functions.invoke('fetch-live');
  
  if (error) throw error;
  return data;
};

export const fetchOdds = async (sport = 'soccer_epl', regions = 'us,uk,eu,au') => {
  const { data, error } = await supabase.functions.invoke('fetch-odds', {
    body: { sport, regions }
  });
  
  if (error) throw error;
  return data;
};

export const generateAIPrediction = async (gameData: any) => {
  const { data, error } = await supabase.functions.invoke('ai-prediction', {
    body: { gameData }
  });
  
  if (error) throw error;
  return data;
};

// Calculate implied probability from decimal odds
export const calculateImpliedProb = (odds: number): number => {
  return 1 / odds;
};

// Normalize probabilities to sum to 1
export const normalizeProbabilities = (probs: number[]): number[] => {
  const sum = probs.reduce((a, b) => a + b, 0);
  return probs.map(p => p / sum);
};

// Calculate edge (model probability - implied probability)
export const calculateEdge = (modelProb: number, odds: number): number => {
  const impliedProb = calculateImpliedProb(odds);
  return modelProb - impliedProb;
};

// Normalize game data from AllSportsAPI
export const normalizeGameData = (fixture: any, odds?: any, prediction?: any): GameData => {
  const gameData: GameData = {
    id: fixture.event_key || fixture.match_id,
    leagueId: fixture.league_key,
    leagueName: fixture.league_name || fixture.league,
    country: fixture.country_name || fixture.country,
    date: fixture.event_date,
    time: fixture.event_time,
    status: fixture.event_status || "Not Started",
    venue: fixture.event_stadium || "TBD",
    homeTeam: fixture.event_home_team || fixture.match_hometeam_name,
    awayTeam: fixture.event_away_team || fixture.match_awayteam_name,
    homeTeamLogo: fixture.home_team_logo || fixture.team_home_badge,
    awayTeamLogo: fixture.away_team_logo || fixture.team_away_badge,
    ftScore: fixture.event_final_result || fixture.match_hometeam_score && fixture.match_awayteam_score 
      ? `${fixture.match_hometeam_score} - ${fixture.match_awayteam_score}` 
      : undefined,
  };

  // Add odds if available
  if (odds) {
    gameData.odds = {
      home: odds.home || 0,
      draw: odds.draw || 0,
      away: odds.away || 0,
    };
  }

  // Add AI prediction if available
  if (prediction) {
    gameData.model = {
      homeWinProb: prediction.homeWinProb || 0,
      drawProb: prediction.drawProb || 0,
      awayWinProb: prediction.awayWinProb || 0,
    };
    gameData.confidence = prediction.confidence;

    // Calculate edge if odds are available
    if (gameData.odds) {
      gameData.edge = {
        home: calculateEdge(gameData.model.homeWinProb / 100, gameData.odds.home),
        draw: calculateEdge(gameData.model.drawProb / 100, gameData.odds.draw),
        away: calculateEdge(gameData.model.awayWinProb / 100, gameData.odds.away),
      };
    }
  }

  return gameData;
};
