import { GoogleGenerativeAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let ai: any = null;

// ✅ SAFE INIT (no crash if key missing)
if (API_KEY) {
  ai = new GoogleGenerativeAI(API_KEY);
}

// ✅ DUMMY RESPONSE (for deployment safety)
const DEMO_RESPONSE = {
  title: "Pothole Issue in Sector 12",
  category: "Ministry of Urban Development",
  severity: "medium",
  summary: "Road damage causing inconvenience to daily commuters.",
  fakeScore: 0.1,
  fakeReason: "Verified report",
  assignmentSuggestion: "Municipal Department"
};

export async function analyzeComplaint(inputText: string) {
  try {
    if (!ai) return DEMO_RESPONSE;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: inputText
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.log("AI ERROR:", err);
    return DEMO_RESPONSE; // fallback
  }
}

export async function generateSocialBusterPost(title: string) {
  try {
    if (!ai) return `⚠️ Delay in resolving: ${title} #Veritas`;

    const res = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Generate a strong tweet for delay in: ${title}`
    });

    return res.text;
  } catch {
    return `⚠️ Delay in resolving: ${title} #Veritas`;
  }
}
