const env = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  geminiModel: import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-pro'
}

export default env

