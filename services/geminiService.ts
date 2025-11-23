
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { QuizQuestion } from "../types";

// Helper to safely get API Key from environment variables
const getApiKey = (): string => {
  // 1. Primary: Check Vite environment variable VITE_GEMINI_API_KEY (from .env file or deployment env vars)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (viteKey && viteKey.trim() !== '') {
      console.log('Using VITE_GEMINI_API_KEY from environment');
      return viteKey;
    }
    
    // 2. Fallback: Check for VITE_API_KEY (legacy support)
    const legacyKey = import.meta.env.VITE_API_KEY;
    if (legacyKey && legacyKey.trim() !== '') {
      console.log('Using VITE_API_KEY from environment');
      return legacyKey;
    }
  }

  // 3. Fallback: Check Node/Process environment (for server-side usage)
  try {
    // @ts-ignore - process may not be available in browser environment
    if (typeof process !== 'undefined' && process?.env) {
      // @ts-ignore
      if (process.env.VITE_GEMINI_API_KEY && process.env.VITE_GEMINI_API_KEY.trim() !== '') {
        // @ts-ignore
        return process.env.VITE_GEMINI_API_KEY;
      }
      // @ts-ignore
      if (process.env.API_KEY && process.env.API_KEY.trim() !== '') {
        // @ts-ignore
        return process.env.API_KEY;
      }
    }
  } catch (e) {
    // process is not available in browser environment
  }

  // 4. Final fallback: Hardcoded key
  console.warn('Warning: Using fallback API key. Please set VITE_GEMINI_API_KEY in your environment variables.');
  return 'AIzaSyA3L4WUNI-07L4126RWu6nQEAJvzw19AOo';
};

// Create AI instance dynamically to ensure fresh API key on each call
const getAI = (): GoogleGenAI => {
  const apiKey = getApiKey();
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a kid-friendly caption based on the scenario in the specified language.
 */
export const generateCaption = async (scenario: string, language: string): Promise<string> => {
  try {
    const ai = getAI();
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
    // Using 'gemini-2.5-flash-image' (Nano Banana) as requested for free API access.
    // This model is reliable and generally does not require a billing project like gemini-3-pro.
    const model = 'gemini-2.5-flash-image';
    
    // Clean up language label to ensure the model understands the target script clearly
    // e.g. "हिंदी (Hindi)" -> "Hindi"
    const languageName = language.split('(')[1]?.replace(')', '').trim() || language.split('(')[0].trim();

    const prompt = `
      Create a visually stunning, masterpiece-quality 4-panel comic strip (2x2 grid layout).
      
      **Visual Style:**
      - Style: High-fidelity Indian heritage watercolor illustration with fine ink detailing.
      - Resolution: High definition, sharp focus.
      - Color Palette: Rich, vibrant, and warm tones suitable for Indian cultural settings.
      - Composition: Professional cinematic angles for each panel.
      
      **Story Scenario:**
      A short story depicting: "${scenario}" which teaches a civic sense lesson.
      
      **Panel Breakdown:**
      1. **The Incident:** Depict the initial action or problem clearly.
      2. **The Reaction:** Show the immediate consequence or emotional reaction.
      3. **The Guidance:** A character explaining the right thing to do (civic sense).
      4. **The Solution:** A happy resolution showing the positive outcome.

      **CRITICAL TEXT & LANGUAGE INSTRUCTIONS:**
      - **Target Language:** **${languageName}**
      - **Speech Bubbles:** Generate speech bubbles with dialogue written in the **${languageName}** script.
      - **Strict Constraint:** Do NOT use English text inside the image if the target language is ${languageName} (unless ${languageName} is English).
      - **Legibility:** Ensure the characters are formed correctly, legible, and clear.
      - **Caption:** Integrate the caption "${caption}" artistically in the final panel (in ${languageName}).

      **Negative Constraints:**
      - Do not generate blurry or distorted text.
      - Do not mix scripts (e.g., do not mix Latin and Devanagari).
      - Do not generate photorealistic images; keep it watercolor art style.

      **Character & Setting Details:**
      - Characters should wear culturally appropriate Indian clothing.
      - Facial expressions must be expressive and clear.
      - Backgrounds should be detailed heritage sites or public places.
    `;

    const ai = getAI();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    // Extract the image from the parts
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    // Check for errors in response
    if (response.candidates && response.candidates[0]?.finishReason) {
      console.error("Image generation finish reason:", response.candidates[0].finishReason);
    }
    
    console.error("No image data found in response");
    return null;
  } catch (error: any) {
    console.error("Image generation error Details:", error);
    // Provide more helpful error messages
    if (error?.message?.includes('API key')) {
      throw new Error('Invalid or missing Gemini API key. Please check your VITE_GEMINI_API_KEY environment variable.');
    }
    if (error?.message?.includes('quota') || error?.message?.includes('billing')) {
      throw new Error('API quota exceeded or billing not enabled. Please check your Gemini API account.');
    }
    throw new Error(`Image generation failed: ${error?.message || 'Unknown error'}`);
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

    const ai = getAI();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
            { text: `Edit this comic panel: ${instruction}. Maintain the high-quality watercolor style.` },
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: cleanBase64
                }
            }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
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
    const ai = getAI();
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
