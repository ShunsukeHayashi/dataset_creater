export const config = {
  geminiApiUrl: import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  defaultApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  defaultTemperature: Number(import.meta.env.VITE_DEFAULT_TEMPERATURE) || 0.7,
  defaultTopP: Number(import.meta.env.VITE_DEFAULT_TOP_P) || 0.9,
  defaultMaxTokens: Number(import.meta.env.VITE_DEFAULT_MAX_TOKENS) || 1000,
  defaultContext: import.meta.env.VITE_DEFAULT_CONTEXT || 'You are an AI assistant tasked with creating a paired dataset for question-answering tasks. The dataset should cover various topics and difficulty levels.',
  defaultPromptTemplate: import.meta.env.VITE_DEFAULT_PROMPT_TEMPLATE || 'Based on the following context, generate 5 question-answer pairs in JSON format. Each pair should be an object with "question" and "answer" keys.\n\nContext: {context}',
  appName: import.meta.env.VITE_APP_NAME || 'Gemini Paired Dataset Creator',
};