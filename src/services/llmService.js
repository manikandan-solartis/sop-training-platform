// Free LLM Service - Supports Groq, Together AI, and HuggingFace
// No API key required from Claude - uses your configured free LLM providers

const LLM_CONFIG = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
  },
  together: {
    url: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    apiKey: process.env.REACT_APP_TOGETHER_API_KEY,
  },
  huggingface: {
    url: 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
    apiKey: process.env.REACT_APP_HUGGINGFACE_API_KEY,
  }
};

// Get active provider
const getProvider = () => {
  const provider = process.env.REACT_APP_LLM_PROVIDER || 'groq';
  const config = LLM_CONFIG[provider];
  
  if (!config || !config.apiKey) {
    console.warn(`⚠️ Provider ${provider} not configured`);
    return null;
  }
  
  return { provider, config };
};

// Check if LLM is configured
export const getProviderInfo = () => {
  const providerData = getProvider();
  return {
    configured: !!providerData,
    provider: providerData?.provider || 'none'
  };
};

/**
 * Generate answer using free LLM
 * @param {string} question - User question
 * @param {string} sopContent - SOP content for context
 * @returns {Promise<string>} - AI-generated answer
 */
export const generateAnswer = async (question, sopContent) => {
  const providerData = getProvider();
  
  if (!providerData) {
    throw new Error('LLM not configured. Please add API key to .env file.');
  }
  
  const { provider, config } = providerData;
  
  try {
    const systemPrompt = `You are a helpful SOP training assistant. Answer questions about the Standard Operating Procedure concisely and accurately based on the provided content. Keep responses clear, professional, and under 200 words.

SOP Content:
${sopContent.substring(0, 3000)}`;

    const requestBody = provider === 'huggingface' 
      ? {
          inputs: `${systemPrompt}\n\nQuestion: ${question}\n\nAnswer:`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.3,
            top_p: 0.9,
          }
        }
      : {
          model: config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ],
          max_tokens: 300,
          temperature: 0.3,
        };

    const headers = provider === 'huggingface'
      ? {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        }
      : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        };

    const response = await fetch(config.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Parse response based on provider
    if (provider === 'huggingface') {
      return data[0]?.generated_text?.split('Answer:')[1]?.trim() || data[0]?.generated_text || 'No response generated';
    } else {
      return data.choices[0]?.message?.content || 'No response generated';
    }
    
  } catch (error) {
    console.error('LLM Error:', error);
    throw new Error(`Failed to generate answer: ${error.message}`);
  }
};

/**
 * Generate quiz questions using free LLM
 * @param {string} sopContent - SOP content
 * @param {number} numQuestions - Number of questions to generate
 * @returns {Promise<Array>} - Array of quiz questions
 */
export const generateQuizQuestions = async (sopContent, numQuestions = 10) => {
  const providerData = getProvider();
  
  if (!providerData) {
    throw new Error('LLM not configured. Please add API key to .env file.');
  }
  
  const { provider, config } = providerData;
  
  // HuggingFace is too slow for quiz generation
  if (provider === 'huggingface') {
    throw new Error('Quiz generation requires Groq or Together AI provider');
  }
  
  try {
    const systemPrompt = `You are a quiz generator. Create ${numQuestions} multiple choice questions based on the SOP content. Return ONLY valid JSON array with this exact format:
[{"q":"Question text?","options":["Option A","Option B","Option C","Option D"],"correct":0}]

Rules:
- correct is index 0-3 for options array
- Questions must be specific to the SOP content
- Options should be plausible
- Return ONLY the JSON array, no other text`;

    const requestBody = {
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate ${numQuestions} quiz questions from this SOP:\n\n${sopContent.substring(0, 4000)}` }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    };

    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Quiz generation failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Clean and parse JSON
    let jsonStr = content.trim();
    
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to extract JSON array if wrapped in text
    const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    const questions = JSON.parse(jsonStr);
    
    // Validate format
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid quiz format');
    }
    
    // Validate each question
    const validQuestions = questions.filter(q => 
      q.q && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      typeof q.correct === 'number' &&
      q.correct >= 0 && 
      q.correct <= 3
    );
    
    if (validQuestions.length === 0) {
      throw new Error('No valid questions generated');
    }
    
    return validQuestions.slice(0, numQuestions);
    
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
};

export default {
  generateAnswer,
  generateQuizQuestions,
  getProviderInfo
};
