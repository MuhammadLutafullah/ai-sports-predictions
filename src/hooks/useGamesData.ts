import { useQuery } from "@tanstack/react-query";
import { fetchGames, fetchOdds, generateAIPrediction, normalizeGameData, GameData } from "@/services/sportsApi";
import { toast } from "@/hooks/use-toast";

interface UseGamesDataParams {
  from?: string;
  to?: string;
  leagueId?: string;
}

export const useGamesData = (params?: UseGamesDataParams) => {
  return useQuery({
    queryKey: ['games', params],
    queryFn: async () => {
      try {
        // Fetch games from AllSportsAPI
        const gamesResponse = await fetchGames(params);
        
        if (!gamesResponse?.result || gamesResponse.result.length === 0) {
          return [];
        }

        // Process each game
        const games: GameData[] = await Promise.all(
          gamesResponse.result.slice(0, 20).map(async (fixture: any) => {
            try {
              // Generate AI prediction for each game
              const prediction = await generateAIPrediction({
                homeTeam: fixture.event_home_team,
                awayTeam: fixture.event_away_team,
                league: fixture.league_name,
                venue: fixture.event_stadium,
                date: fixture.event_date,
              });

              // For now, use mock odds (The Odds API may not have all matches)
              // In production, you'd match by team names and time
              const mockOdds = {
                home: 1.50 + Math.random(),
                draw: 3.00 + Math.random(),
                away: 4.00 + Math.random(),
              };

              return normalizeGameData(fixture, mockOdds, prediction);
            } catch (error) {
              console.error('Error processing game:', error);
              // Return game without prediction if AI fails
              return normalizeGameData(fixture);
            }
          })
        );

        return games;
      } catch (error) {
        console.error('Error fetching games:', error);
        toast({
          title: "Error",
          description: "Failed to fetch games data. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};
