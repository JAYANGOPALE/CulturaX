/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY?: string;
  readonly VITE_GEMINI_API_KEY?: string;
}

// Gemini API Key: AIzaSyA3L4WUNI-07L4126RWu6nQEAJvzw19AOo
// Add this to your .env file as: VITE_GEMINI_API_KEY=AIzaSyA3L4WUNI-07L4126RWu6nQEAJvzw19AOo

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

