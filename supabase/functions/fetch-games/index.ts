import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_KEY = "2295f0dcd5d3419bfd392e3bf6e91b2180cd978acffe96e19c33cbee3e6ec305";
const BASE_URL = "https://apiv2.allsportsapi.com/football/";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const gamesCache = new Map<string, { data: any; timestamp: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { from, to, leagueId } = await req.json();
    console.log(`Fetching games: from=${from}, to=${to}, leagueId=${leagueId}`);

    const cacheKey = `${from}-${to}-${leagueId}`;
    const cached = gamesCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Returning games from cache");
      return new Response(JSON.stringify(cached.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let url = `${BASE_URL}?met=Fixtures&APIkey=${API_KEY}&timezone=Asia/Karachi`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;
    if (leagueId) url += `&leagueId=${leagueId}`;

    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit delay
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`AllSportsAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.result?.length || 0} games`);

    // Update cache
    gamesCache.set(cacheKey, { data, timestamp: Date.now() });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-games:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch games";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
