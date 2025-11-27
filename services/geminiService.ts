import { QuizQuestion } from "../types";

// Get API key from environment variable (VITE_GEMINI_API_KEY from .env file)
// This is the ONLY source - no hardcoded fallbacks for security
const getViteGeminiApiKey = (): string => {
  // Get from Vite environment variables
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim() !== '' && envKey !== 'undefined') {
      console.log('✅ Using VITE_GEMINI_API_KEY from .env file');
      return envKey.trim();
    }
  }
  
  // No fallback - environment variable is required
  console.error('❌ VITE_GEMINI_API_KEY is missing from .env file!');
  console.error('💡 Please add VITE_GEMINI_API_KEY=your_api_key_here to your .env file');
  throw new Error('VITE_GEMINI_API_KEY environment variable is required. Please set it in your .env file.');
};

// Helper to build API URL for different models
const getApiUrl = (model: string): string => {
  const apiKey = getViteGeminiApiKey();
  return `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
};

// Direct REST API call helper
const callGeminiAPI = async (model: string, prompt: string, options?: {
  responseMimeType?: string;
  responseSchema?: any;
  imageConfig?: any;
}): Promise<any> => {
  const url = getApiUrl(model);
  
  const requestBody: any = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  };

  // Add generation config if options provided
  if (options?.responseMimeType || options?.responseSchema) {
    requestBody.generationConfig = {};
    if (options.responseMimeType) {
      requestBody.generationConfig.responseMimeType = options.responseMimeType;
    }
    if (options.responseSchema) {
      requestBody.generationConfig.responseSchema = options.responseSchema;
    }
  }
  
  // imageConfig goes at the top level, not in generationConfig
  if (options?.imageConfig) {
    requestBody.imageConfig = options.imageConfig;
  }

  console.log(`🔗 Calling Gemini API: ${model}`);
  console.log(`📝 Prompt length: ${prompt.length} characters`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    
    console.error('❌ API Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData
    });

    // Handle specific error cases
    if (response.status === 429 || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('API quota exceeded or billing not enabled. Please check your Gemini API account at https://aistudio.google.com/apikey');
    }
    
    if (response.status === 401 || response.status === 403 || errorMessage.includes('API key')) {
      throw new Error('Invalid or missing Gemini API key. Please check your API key at https://aistudio.google.com/apikey');
    }

    throw new Error(`Gemini API error: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Generates a kid-friendly caption based on the scenario in the specified language.
 */
export const generateCaption = async (scenario: string, language: string): Promise<string> => {
  try {
    const prompt = `You are a friendly teacher teaching children about civic sense at heritage sites and tourist places. 
      Target Language: ${language}.
      Based on this scenario: "${scenario}", write a very short, catchy, and rhyming caption in ${language} (max 10 words) that teaches a lesson (e.g., Don't litter, Keep it quiet). 
      Make it fun for kids. Output ONLY the caption.`;

    const response = await callGeminiAPI('gemini-2.0-flash', prompt);
    
    // Extract text from response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    return text?.trim() || "Let's protect our heritage together!";
  } catch (error: any) {
    console.error("Caption generation error:", error);
    // Return fallback caption instead of throwing
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

    console.log('Calling Gemini API for image generation...');
    console.log('Model:', model);
    
    const response = await callGeminiAPI(model, prompt, {
      imageConfig: {
        aspectRatio: "16:9",
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

    const url = getApiUrl(model);
    const requestBody = {
      contents: [{
        parts: [
          { text: `Edit this comic panel: ${instruction}. Maintain the high-quality watercolor style.` },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          }
        ]
      }],
      imageConfig: {
        aspectRatio: "16:9"
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts) {
      for (const part of data.candidates[0].content.parts) {
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
    const prompt = `Generate 5 multiple-choice quiz questions for children about civic sense at heritage sites and tourist places (e.g., not writing on walls, using dustbins, silence in museums).
      Target Language: ${language}.
      The questions should be simple, fun, and educational.
      Include a short, funny, or motivating "encouragement" message for getting the answer right.
      
      Return the response as a JSON array with this exact structure:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 0,
          "encouragement": "Great job!"
        }
      ]`;

    const response = await callGeminiAPI('gemini-2.0-flash', prompt, {
      responseMimeType: "application/json"
    });

    // Extract text from response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      // Try to parse JSON - sometimes it's wrapped in markdown code blocks
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanedText);
      return parsed as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
};
