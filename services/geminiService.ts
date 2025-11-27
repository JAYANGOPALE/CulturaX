
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { QuizQuestion } from "../types";

// Direct API key & URL (from your Makersuite / AI Studio)
// NOTE: This key is now hardcoded – do NOT commit this file to any public repo.
const API_KEY = 'AIzaSyD8FooJraEXTs0ERttLlB2OymyeU951dpE';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Simple helper so rest of the code can stay the same
const getApiKey = (): string => {
  return API_KEY;
};

// Create AI instance dynamically to ensure fresh API key on each call
const getAI = (): GoogleGenAI => {
  const apiKey = getApiKey();
  console.log('🔑 API Key retrieved, length:', apiKey?.length || 0);
  console.log('🔑 API Key starts with:', apiKey?.substring(0, 10) || 'N/A');
  
  // Validate API key format (Gemini keys typically start with "AIza")
  if (!apiKey || apiKey.trim() === '' || apiKey.length < 20) {
    console.error('❌ Invalid API key format');
    throw new Error('Gemini API key is missing or invalid. Please check your VITE_GEMINI_API_KEY environment variable.');
  }
  
  if (!apiKey.startsWith('AIza')) {
    console.warn('⚠️ API key does not start with "AIza" - may be invalid');
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    console.log('✅ GoogleGenAI instance created successfully');
    return ai;
  } catch (error: any) {
    console.error('❌ Failed to create GoogleGenAI instance:', error);
    throw new Error(`Failed to initialize Gemini API: ${error?.message || 'Unknown error'}`);
  }
};

/**
 * Generates a kid-friendly caption based on the scenario in the specified language.
 */
export const generateCaption = async (scenario: string, language: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
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
    console.log('Starting image generation...');
    console.log('Scenario:', scenario);
    console.log('Caption:', caption);
    console.log('Language:', language);
    
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

    console.log('Creating AI instance...');
    const ai = getAI();
    console.log('AI instance created, calling generateContent...');
    console.log('Model:', model);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });
    
    console.log('Response received:', response);

    // Extract the image from the parts
    console.log('Extracting image from response...');
    console.log('Response candidates:', response.candidates);
    
    if (response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      console.log('First candidate:', candidate);
      console.log('Finish reason:', candidate.finishReason);
      
      if (candidate.finishReason && candidate.finishReason !== 'STOP') {
        console.error("Image generation finish reason:", candidate.finishReason);
        throw new Error(`Image generation stopped: ${candidate.finishReason}`);
      }
      
      if (candidate.content?.parts) {
        console.log('Content parts:', candidate.content.parts);
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log('Found image data! MIME type:', part.inlineData.mimeType);
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
    
    console.error("No image data found in response");
    console.error("Full response structure:", JSON.stringify(response, null, 2));
    return null;
  } catch (error: any) {
    console.error("❌ Image generation error Details:", error);
    console.error("Error stack:", error?.stack);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error code:", error?.code);
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Check for API key related errors
    const errorMessage = error?.message || '';
    const errorCode = error?.code || '';
    const errorStatus = error?.status || error?.statusCode || '';
    const errorString = JSON.stringify(error?.message || error || '');
    
    // Check for leaked API key error (most common issue)
    if (errorMessage.includes('leaked') || 
        errorString.includes('leaked') ||
        errorMessage.includes('reported as leaked')) {
      console.error('❌ API Key was reported as leaked by Google');
      throw new Error('Your API key was reported as leaked and has been disabled by Google. Please generate a NEW API key at https://aistudio.google.com/apikey and update VITE_GEMINI_API_KEY in Vercel.');
    }
    
    // API authentication errors
    if (errorMessage.includes('API key') || 
        errorMessage.includes('401') || 
        errorMessage.includes('403') ||
        errorMessage.includes('UNAUTHENTICATED') ||
        errorMessage.includes('PERMISSION_DENIED') ||
        errorCode === '401' || 
        errorCode === '403' ||
        errorStatus === 401 ||
        errorStatus === 403) {
      console.error('❌ API Authentication Error - Key may be invalid, missing, or disabled');
      throw new Error('Invalid or missing Gemini API key. Please generate a new key at https://aistudio.google.com/apikey and set VITE_GEMINI_API_KEY in Vercel dashboard.');
    }
    
    // Quota/billing errors
    if (errorMessage.includes('quota') || 
        errorMessage.includes('billing') || 
        errorMessage.includes('429') ||
        errorMessage.includes('RESOURCE_EXHAUSTED') ||
        errorCode === '429' ||
        errorStatus === 429) {
      throw new Error('API quota exceeded or billing not enabled. Please check your Gemini API account.');
    }
    
    // CORS/Network errors
    if (errorMessage.includes('CORS') || 
        errorMessage.includes('network') ||
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('NetworkError')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    // Model not found or unavailable
    if (errorMessage.includes('model') || errorMessage.includes('not found') || errorMessage.includes('404')) {
      throw new Error('The image generation model is not available. Please try again later.');
    }
    
    // Generic error with full details
    const detailedError = errorMessage || JSON.stringify(error) || 'Unknown error';
    throw new Error(`Image generation failed: ${detailedError}`);
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
      model: 'gemini-2.0-flash',
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
