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
      你是一个社区二手交易平台（类似闲鱼）的专业文案助手。
      请帮我为以下物品撰写一段吸引人的销售文案。
      
      物品名称: "${title}"
      分类: "${category}"
      成色: "${condition}"

      请输出一个 JSON 对象，包含以下键：
      - "description": 一段朗朗上口、友好且诚实的中文描述（最多80字），鼓励邻居购买。请适当使用emoji表情。
      - "suggestedPrice": 二手估价（人民币整数），基于常识给出一个合理的基准价格。
      - "tags": 一个包含3个简短中文标签的数组（例如 "急出"、"九九新"、"自提"）。

      不要使用 markdown 代码块包裹 JSON。直接返回原始 JSON 字符串。
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
      description: `我在出闲置：${title}。成色${condition}。感兴趣的邻居请联系我！`,
      suggestedPrice: 50,
      tags: ["二手闲置"]
    };
  }
};