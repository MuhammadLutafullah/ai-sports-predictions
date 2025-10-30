import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gameData } = await req.json();
    console.log("Generating AI prediction for game:", gameData);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are an expert sports analyst. Analyze this football match and provide a detailed prediction:

Home Team: ${gameData.homeTeam}
Away Team: ${gameData.awayTeam}
League: ${gameData.league}
Venue: ${gameData.venue}
Date: ${gameData.date}

${gameData.homeForm ? `Home Team Recent Form: ${gameData.homeForm.join(', ')}` : ''}
${gameData.awayForm ? `Away Team Recent Form: ${gameData.awayForm.join(', ')}` : ''}

Provide:
1. Win probability percentages for home, draw, and away (must sum to 100)
2. Confidence score (0-100)
3. Key factors influencing the prediction
4. Expected scoreline

Format your response as JSON:
{
  "homeWinProb": number,
  "drawProb": number,
  "awayWinProb": number,
  "confidence": number,
  "keyFactors": ["factor1", "factor2", "factor3"],
  "expectedScore": "X-Y",
  "analysis": "Brief analysis text"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert sports analyst specializing in football predictions. Always respond with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0].message.content;
    
    // Parse the JSON from the AI response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }
    
    const prediction = JSON.parse(jsonMatch[0]);
    console.log("Generated prediction:", prediction);

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-prediction:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate prediction";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
