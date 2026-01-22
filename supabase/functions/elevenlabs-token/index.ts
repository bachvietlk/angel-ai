import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ETERNAL_CORE_PROMPT_VOICE } from "../_shared/eternal-core-prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Use the Voice-optimized Eternal Core Prompt
const ANGEL_AI_SYSTEM_PROMPT = ETERNAL_CORE_PROMPT_VOICE;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY is not configured");
      throw new Error("ElevenLabs API key is not configured");
    }

    // Get signed URL for WebSocket connection
    const response = await fetch(
      "https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=default",
      {
        method: "GET",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("ElevenLabs signed URL generated successfully");

    return new Response(
      JSON.stringify({ 
        signed_url: data.signed_url,
        system_prompt: ANGEL_AI_SYSTEM_PROMPT 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating ElevenLabs token:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
