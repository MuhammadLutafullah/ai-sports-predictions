import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_KEY = "2295f0dcd5d3419bfd392e3bf6e91b2180cd978acffe96e19c33cbee3e6ec305";
const BASE_URL = "https://apiv2.allsportsapi.com/football/";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching live scores from AllSportsAPI");

    const url = `${BASE_URL}?met=Livescore&APIkey=${API_KEY}&timezone=Asia/Karachi`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`AllSportsAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.result?.length || 0} live games`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-live:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch live scores";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
