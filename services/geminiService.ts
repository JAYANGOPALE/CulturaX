
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { QuizQuestion } from "../types";

// Initialize Gemini Client
// @ts-ignore - Process env handling
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a kid-friendly caption based on the scenario in the specified language.
 */
export const generateCaption = async (scenario: string, language: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly teacher teaching children about civic sense at heritage sites and tourist places. 
      Target Language: ${language}.
      Based on this scenario: "${scenario}", write a very short, catchy, and rhyming caption in ${language} (max 10 words) that teaches a lesson (e.g., Don't litter, Keep it quiet). 
      Make it fun for kids. Output ONLY the caption.`,
    });
    return response.text?.trim() || "Let's protect our heritage together!";
  } catch (error) {
    console.error("Caption generation error:", error);
    return "Protect our history!";
  }
};

/**
 * Generates the watercolor image panel with embedded text.
 */
export const generateImagePanel = async (scenario: string, caption: string, language: string): Promise<string | null> => {
  try {
    // We use the specific model requested for Nano/Flash Image capabilities
    const model = 'gemini-2.5-flash-image';
    
    const prompt = `
      Create a complete 4-panel comic strip (2x2 grid layout) illustration in 16:9 aspect ratio.
      Style: Indian heritage watercolor-ink style with fine ink outlines and soft, bleeding washes.
      Subject: A story about ${scenario} teaching a civic sense lesson.
      Layout: 
      - Divide the image into 4 clear distinct panels.
      - Panel 1: Show the initial action (e.g., someone doing something wrong or starting a journey).
      - Panel 2: Show the reaction or consequence of the action.
      - Panel 3: Show a wise character (like a heritage guardian or elder) explaining the right thing to do.
      - Panel 4: Show the happy resolution with everyone doing the right thing.
      Text Integration: 
      - The text must be in ${language}.
      - Include speech bubbles with simple dialogue in ${language} in the panels.
      - Include the main caption "${caption}" prominently, either as a title or in the final panel.
      Atmosphere: Educational, cultural, vibrant but soft watercolor.
      Characters: Indian styling, friendly expressions.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    // Extract the image from the parts
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};

/**
 * Edits an existing image based on a text prompt.
 */
export const editImagePanel = async (imageBase64: string, instruction: string): Promise<string | null> => {
  try {
    const model = 'gemini-2.5-flash-image';
    
    // Strip prefix if present
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
            { text: instruction },
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: cleanBase64
                }
            }
        ]
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image edit error:", error);
    throw error;
  }
};

/**
 * Generates a quiz about civic sense.
 */
export const generateQuiz = async (language: string): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 multiple-choice quiz questions for children about civic sense at heritage sites and tourist places (e.g., not writing on walls, using dustbins, silence in museums).
      Target Language: ${language}.
      The questions should be simple, fun, and educational.
      Include a short, funny, or motivating "encouragement" message for getting the answer right.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
              encouragement: { type: Type.STRING, description: "A short cheerful phrase like 'Awesome!', 'Superb!', etc." }
            },
            required: ["question", "options", "correctAnswer", "encouragement"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
};
