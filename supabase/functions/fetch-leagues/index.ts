import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_KEY = "2295f0dcd5d3419bfd392e3bf6e91b2180cd978acffe96e19c33cbee3e6ec305";
const BASE_URL = "https://apiv2.allsportsapi.com/football/";
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

let leaguesCache: { data: any; timestamp: number } | null = null;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching leagues from AllSportsAPI");

    // Check cache
    if (leaguesCache && Date.now() - leaguesCache.timestamp < CACHE_DURATION) {
      console.log("Returning leagues from cache");
      return new Response(JSON.stringify(leaguesCache.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = `${BASE_URL}?met=Leagues&APIkey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`AllSportsAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched leagues successfully");

    // Update cache
    leaguesCache = { data, timestamp: Date.now() };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-leagues:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch leagues";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
