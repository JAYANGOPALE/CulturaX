import { QuizQuestion } from "../types";

// Use import.meta.env for Vite environment variables
const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyA3L4WUNI-07L4126RWu6nQEAJvzw19AOo';

if (!apiKey) {
  console.error("API Key is missing. Please check your .env file and ensure VITE_API_KEY or VITE_GEMINI_API_KEY is set.");
}

// Base URL for Gemini API
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Helper function to make API calls to Gemini REST API
 */
async function callGeminiAPI(model: string, requestBody: any): Promise<any> {
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

/**
 * Generates a kid-friendly caption based on the scenario in the specified language.
 */
export const generateCaption = async (scenario: string, language: string): Promise<string> => {
  try {
    const prompt = `You are a friendly teacher teaching children about civic sense at heritage sites and tourist places. 
      Target Language: ${language}.
      Based on this scenario: "${scenario}", write a very short, catchy, and rhyming caption in ${language} (max 10 words) that teaches a lesson (e.g., Don't litter, Keep it quiet). 
      Make it fun for kids. Output ONLY the caption.`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await callGeminiAPI('gemini-2.0-flash', requestBody);
    
    // Extract text from response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text || "Let's protect our heritage together!";
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
    // Use gemini-2.0-flash-exp for image generation capabilities
    const model = 'gemini-2.0-flash-exp';
    
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

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await callGeminiAPI(model, requestBody);

    // Extract the image from the parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
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
    const model = 'gemini-2.0-flash-exp';
    
    // Strip prefix if present
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
    
    // Extract mime type from original base64 string
    const mimeTypeMatch = imageBase64.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
    const mimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : 'image/png';

    const requestBody = {
      contents: [{
        parts: [
          {
            text: instruction
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          }
        ]
      }]
    };

    const response = await callGeminiAPI(model, requestBody);

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const responseMimeType = part.inlineData.mimeType || 'image/png';
          return `data:${responseMimeType};base64,${part.inlineData.data}`;
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
    const prompt = `Generate 5 multiple-choice quiz questions for children about civic sense at heritage sites and tourist places (e.g., not writing on walls, using dustbins, silence in museums).
      Target Language: ${language}.
      The questions should be simple, fun, and educational.
      Include a short, funny, or motivating "encouragement" message for getting the answer right.
      Return the response as a JSON array with this exact structure:
      [
        {
          "question": "question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": 0,
          "encouragement": "encouragement message"
        }
      ]
      Return ONLY valid JSON, no other text.`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await callGeminiAPI('gemini-2.0-flash', requestBody);
    
    // Extract text from response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      try {
        // Try to parse as JSON
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed as QuizQuestion[];
        }
      } catch (parseError) {
        console.error("Failed to parse quiz JSON:", parseError);
      }
    }
    
    return [];
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
};
