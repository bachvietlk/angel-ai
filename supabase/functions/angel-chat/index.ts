import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sanitizePrompt, validateMessageRole } from "../_shared/prompt-sanitizer.ts";
import { ETERNAL_CORE_PROMPT } from "../_shared/eternal-core-prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_MESSAGE_LENGTH = 50000;
const MAX_MESSAGES_COUNT = 20;

// Use the Eternal Core Training Prompt
const ANGEL_AI_SYSTEM_PROMPT = ETERNAL_CORE_PROMPT;

// Helper to build message content for multimodal
interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string | MessageContent[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing or invalid authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabaseClient.auth.getClaims(token);

    if (authError || !claimsData?.claims) {
      console.log("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    const { messages, images } = await req.json();
    
    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      console.log("Invalid messages format received");
      return new Response(
        JSON.stringify({ error: "Định dạng tin nhắn không hợp lệ" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (messages.length > MAX_MESSAGES_COUNT) {
      console.log("Too many messages:", messages.length);
      return new Response(
        JSON.stringify({ error: `Quá nhiều tin nhắn (tối đa ${MAX_MESSAGES_COUNT})` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process messages - handle both text and multimodal
    const processedMessages: ChatMessage[] = [];
    
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      
      if (!msg.content) {
        console.log("Invalid message content type");
        return new Response(
          JSON.stringify({ error: "Nội dung tin nhắn không hợp lệ" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Validate message role - only allow 'user' and 'assistant'
      if (!validateMessageRole(msg.role)) {
        console.warn("Invalid message role detected:", msg.role, "from user:", userId);
        return new Response(
          JSON.stringify({ error: "Vai trò tin nhắn không hợp lệ" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if this is the last user message and has images
      const isLastUserMessage = i === messages.length - 1 && msg.role === "user";
      const hasImages = isLastUserMessage && images && Array.isArray(images) && images.length > 0;

      if (hasImages) {
        // Build multimodal content
        const content: MessageContent[] = [];
        
        // Add images first
        for (const imageUrl of images) {
          if (typeof imageUrl === "string" && imageUrl.startsWith("data:image")) {
            content.push({
              type: "image_url",
              image_url: { url: imageUrl }
            });
          }
        }
        
        // Sanitize text content for prompt injection
        let textToAdd = "Hãy mô tả và phân tích hình ảnh này với góc nhìn tâm linh và ánh sáng của Cha Vũ Trụ.";
        if (typeof msg.content === "string" && msg.content.trim()) {
          const sanitizeResult = sanitizePrompt(msg.content);
          if (sanitizeResult.isSuspicious) {
            console.warn("Suspicious prompt detected from user:", userId, "patterns:", sanitizeResult.detectedPatterns);
          }
          textToAdd = sanitizeResult.sanitized;
        }
        
        content.push({
          type: "text",
          text: textToAdd
        });
        
        processedMessages.push({
          role: msg.role,
          content: content
        });
      } else {
        // Regular text message
        const textContent = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
        
        if (textContent.length > MAX_MESSAGE_LENGTH) {
          console.log("Message too long:", textContent.length);
          return new Response(
            JSON.stringify({ error: `Tin nhắn quá dài (tối đa ${MAX_MESSAGE_LENGTH} ký tự)` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Sanitize for prompt injection
        const sanitizeResult = sanitizePrompt(textContent);
        if (sanitizeResult.isSuspicious) {
          console.warn("Suspicious prompt detected from user:", userId, "patterns:", sanitizeResult.detectedPatterns);
        }
        
        processedMessages.push({
          role: msg.role,
          content: sanitizeResult.sanitized
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const hasVisionContent = images && Array.isArray(images) && images.length > 0;
    console.log("Received chat request with", messages.length, "messages", hasVisionContent ? `and ${images.length} images` : "");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Supports vision
        messages: [
          { role: "system", content: ANGEL_AI_SYSTEM_PROMPT },
          ...processedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Đã vượt quá giới hạn. Vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Cần nạp thêm credits. Vui lòng liên hệ admin." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Successfully connected to AI gateway, streaming response");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
