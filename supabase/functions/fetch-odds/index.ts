import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_KEY = "17cee9f11bfc52dd7bc80f37922da142";
const BASE_URL = "https://api.the-odds-api.com/v4";
const CACHE_DURATION = 60 * 1000; // 1 minute

const oddsCache = new Map<string, { data: any; timestamp: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sport = 'soccer_epl', regions = 'us,uk,eu,au' } = await req.json();
    console.log(`Fetching odds for sport: ${sport}, regions: ${regions}`);

    const cacheKey = `${sport}-${regions}`;
    const cached = oddsCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Returning odds from cache");
      return new Response(JSON.stringify(cached.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = `${BASE_URL}/sports/${sport}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=h2h,spreads,totals`;
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit delay
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`The Odds API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched odds for ${data.length || 0} events`);

    // Update cache
    oddsCache.set(cacheKey, { data, timestamp: Date.now() });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-odds:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch odds";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
