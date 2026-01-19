import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, you might proxy this through a backend to protect the key,
// but for this frontend-only demo, we use the env variable directly as instructed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateListingDescription = async (
  title: string,
  category: string,
  condition: string
): Promise<{ description: string; suggestedPrice: number; tags: string[] }> => {
  try {
    const prompt = `
      You are an expert copywriter for a community second-hand marketplace app (like Xianyu).
      Help me sell an item.
      
      Item Title: "${title}"
      Category: "${category}"
      Condition: "${condition}"

      Output a JSON object with the following keys:
      - "description": A catchy, friendly, and honest description (max 80 words) encouraging neighbors to buy. Use emojis.
      - "suggestedPrice": A numeric estimate (in local currency units, integer only) for a second-hand price. Assume a reasonable base value.
      - "tags": An array of 3 short relevant tags (e.g. "Urgent", "Like New", "Self-pickup").

      Do not wrap the JSON in markdown code blocks. Just return the raw JSON string.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback if AI fails
    return {
      description: `I am selling my ${title}. It is in ${condition} condition. Please contact me if interested!`,
      suggestedPrice: 50,
      tags: ["SecondHand"]
    };
  }
};