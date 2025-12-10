// Free LLM Service - Supports Groq, Together AI, and HuggingFace

const LLM_CONFIG = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
  },
  // ... rest of the code
};
