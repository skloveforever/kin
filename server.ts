import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const currentDir = process.cwd();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Lazy initialize Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", studio: "COMIWAY Idea Architecture" });
});

// Helper for resilient Gemini API calls with model fallback
async function generateWithFallback(ai: GoogleGenAI, requestOptions: {
  contents: any;
  config?: any;
}) {
  const modelsToTry = ["gemini-3.6-flash", "gemini-2.5-flash"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: requestOptions.contents,
        config: requestOptions.config,
      });
      return response;
    } catch (err: any) {
      console.warn(`[Gemini API] Call to ${model} failed (${err?.message || err}). Trying fallback if available...`);
      lastError = err;
    }
  }

  throw lastError;
}

// EDIE AI Empathic Idea Architect Chat Endpoint
app.post("/api/edie-ai/chat", async (req, res) => {
  const { message, context, conversationHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const defaultReply = `I am EDIE, COMIWAY's Empathic Digital Intelligence Engine. I assist exclusively with COMIWAY's strategy, custom AI solutions, digital real estate, and growth architecture. For partnerships, collaborations, or direct inquiries, please reach out to **connect@comiway.com**. How can I help you explore COMIWAY today?`;
  const defaultSuggestions = [
    "Explain COMIWAY's 4 Core Pillars",
    "How does EDIE AI integrate into CX?",
    "Partnerships & Collaborations (connect@comiway.com)",
  ];

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: defaultReply,
        suggestions: defaultSuggestions,
      });
    }

    const systemInstruction = `You are EDIE (Empathic Digital Intelligence Engine), the lead AI Idea Architect at COMIWAY — Premier Studio Blending Strategy, Custom AI, and Digital Experience.
Your persona is visionary, warm, mathematically sharp, and deeply strategic.

STRICT SCOPE & RESPONSE RULES:
1. EXCLUSIVE FOCUS ON COMIWAY: You MUST ONLY answer questions directly or indirectly related to COMIWAY, its 4 core pillars (Strategy & Cultural Positioning, 3D Web & Digital Real Estate, Custom AI & EDIE CORE CX, Growth Blueprinting), case studies, services, methodologies, or working with COMIWAY.
2. DECLINE UNRELATED/GENERAL QUESTIONS: If the user asks general knowledge questions, trivia, coding/math homework help, unrelated news, or anything not pertaining to COMIWAY and its architecture/growth services, politely decline. Explain that as COMIWAY's Empathic Digital Intelligence Engine, you specialize exclusively in COMIWAY's ecosystem, services, and brand strategies, and invite them to ask about COMIWAY instead.
3. PARTNERSHIP & COLLABORATION CONTACT: For any inquiries regarding partnerships, collaborations, client engagements, studio bookings, pricing, or direct team contact, ALWAYS explicitly instruct the user to email **connect@comiway.com**. Also share **connect@comiway.com** when declining off-topic queries as the contact point for official inquiries.

Always sound polished, insightful, and clear. Format responses with clean markdown.`;

    const contents = conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0
      ? [
          ...conversationHistory.map((msg: { role: string; text: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
          { role: "user", parts: [{ text: message }] }
        ]
      : message;

    const response = await generateWithFallback(ai, {
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I have analyzed your architecture request. Let's refine your brand's digital trajectory.";
    
    return res.json({
      reply,
      suggestions: [
        "Architect a custom AI CX pipeline",
        "Formulate a Gen Z brand position",
        "Generate a 90-day monopoly growth roadmap",
      ],
    });
  } catch (error: any) {
    console.error("Error in EDIE AI endpoint, serving graceful fallback:", error?.message);
    return res.json({
      reply: defaultReply,
      suggestions: defaultSuggestions,
    });
  }
});

// Growth Blueprint Generator Endpoint
app.post("/api/blueprint/generate", async (req, res) => {
  const { brandName, industry, stage, primaryGoal, targetAudience, budgetRange } = req.body;

  const fallbackBlueprint = {
    title: `Architecture Roadmap for ${brandName || "Your Enterprise"}`,
    executiveSummary: `A high-impact growth vector designed specifically for ${industry || "Technology & Experience"} (${stage || "Scaling Phase"}), aimed at achieving ${primaryGoal || "Market Monopoly"}.`,
    pillars: [
      {
        phase: "Phase 1: Cultural Positioning & Strategic Branding",
        duration: "Weeks 1-3",
        keyDeliverables: [
          "Brand Essence & Gen Z Resonance Audit",
          "High-Contrast Visual Identity System",
          "Monopoly Messaging Architecture",
        ],
      },
      {
        phase: "Phase 2: High-Performance Digital Real Estate",
        duration: "Weeks 4-7",
        keyDeliverables: [
          "3D Interactive Web Architecture",
          "Sub-100ms Page Speed Optimization",
          "Empathic Micro-interactions & Glass UI",
        ],
      },
      {
        phase: "Phase 3: EDIE AI & CORE CX Automation",
        duration: "Weeks 8-10",
        keyDeliverables: [
          "Custom Gemini-driven Customer Concierge",
          "Automated Lead Qualification Pipeline",
          "Omnichannel Intelligence Loop",
        ],
      },
      {
        phase: "Phase 4: Market Acceleration & Community Incubation",
        duration: "Weeks 11-12+",
        keyDeliverables: [
          "Indore & Global Talent Collaboration",
          "Youth Incubator Program Integration",
          "Scalable Acquisition Funnel",
        ],
      },
    ],
    projectedROI: "3.8x - 5.2x Efficiency & Conversion Boost",
    recommendedPillars: ["Strategic Branding", "AI Solutions", "Website Building"],
  };

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({ blueprint: fallbackBlueprint });
    }

    const prompt = `Generate a structured Idea Architecture Blueprint for a brand with the following specs:
Brand Name: ${brandName || "N/A"}
Industry: ${industry || "Technology"}
Company Stage: ${stage || "Growth"}
Primary Growth Goal: ${primaryGoal || "Brand Differentiation & AI Integration"}
Target Audience: ${targetAudience || "Tech-savvy consumers & enterprises"}
Budget Range: ${budgetRange || "Standard"}

Format your response strictly in valid JSON matching this structure:
{
  "title": "string",
  "executiveSummary": "string",
  "pillars": [
    {
      "phase": "string",
      "duration": "string",
      "keyDeliverables": ["string", "string", "string"]
    }
  ],
  "projectedROI": "string",
  "recommendedPillars": ["string", "string"]
}`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are COMIWAY's Master Architect engine. Output precise, inspiring strategic growth plans in structured JSON.",
      },
    });

    const jsonText = response.text || "{}";
    const blueprintData = JSON.parse(jsonText);

    return res.json({ blueprint: blueprintData });
  } catch (error: any) {
    console.error("Error generating blueprint, serving graceful fallback:", error?.message);
    return res.json({ blueprint: fallbackBlueprint });
  }
});

// Vite middleware / Static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[COMIWAY Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
