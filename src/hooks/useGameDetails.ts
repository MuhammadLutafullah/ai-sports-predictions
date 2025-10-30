import { useQuery } from "@tanstack/react-query";
import { fetchGames, generateAIPrediction, normalizeGameData, GameData } from "@/services/sportsApi";
import { toast } from "@/hooks/use-toast";

export const useGameDetails = (gameId: string) => {
  return useQuery({
    queryKey: ['game-details', gameId],
    queryFn: async () => {
      try {
        // In a real implementation, you'd fetch specific game by ID
        // For now, we'll fetch recent games and find the match
        const gamesResponse = await fetchGames();
        
        if (!gamesResponse?.result) {
          throw new Error("No games found");
        }

        // Find the specific game (in production, use a dedicated endpoint)
        const fixture = gamesResponse.result.find((g: any) => 
          g.event_key === gameId || g.match_id === gameId
        );

        if (!fixture) {
          throw new Error("Game not found");
        }

        // Generate AI prediction
        const prediction = await generateAIPrediction({
          homeTeam: fixture.event_home_team,
          awayTeam: fixture.event_away_team,
          league: fixture.league_name,
          venue: fixture.event_stadium,
          date: fixture.event_date,
        });

        // Mock odds for now
        const mockOdds = {
          home: 1.50 + Math.random(),
          draw: 3.00 + Math.random(),
          away: 4.00 + Math.random(),
        };

        const gameData = normalizeGameData(fixture, mockOdds, prediction);

        return {
          ...gameData,
          prediction,
        };
      } catch (error) {
        console.error('Error fetching game details:', error);
        toast({
          title: "Error",
          description: "Failed to fetch game details. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};
