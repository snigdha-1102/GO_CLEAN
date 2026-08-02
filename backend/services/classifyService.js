import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const classifyWaste = async (imagePath) => {
  try {
    const imageBytes = fs.readFileSync(imagePath);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          text: `
You are an AI Waste Classification Assistant.

Identify:
1. Waste type
2. Is it recyclable?
3. Which bin should it go into?
4. Give one eco-friendly tip.

Keep the answer under 80 words.
`,
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBytes.toString("base64"),
          },
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};