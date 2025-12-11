// Quiz Generator - Auto-generates quizzes using FREE LLM (NOT stored)
import { generateQuizQuestions } from './services/llmService';
import { quizData } from './quizzes';

/**
 * Generate quiz questions - prioritizes AI generation, falls back to stored
 * @param {string} sopId - SOP identifier
 * @param {string} sopContent - SOP content for generation
 * @param {boolean} useAI - Whether to use AI generation (default: true)
 * @returns {Promise<Array>} - Array of quiz questions
 */
export const generateQuiz = async (sopId, sopContent = '', useAI = true) => {
  // Try AI generation first if enabled and content provided
  if (useAI && sopContent && sopContent.length > 100) {
    try {
      console.log('🤖 Generating fresh quiz questions using FREE LLM...');
      const aiQuestions = await generateQuizQuestions(sopContent, 10);
      
      if (aiQuestions && aiQuestions.length > 0) {
        console.log(`✅ Generated ${aiQuestions.length} AI questions`);
        // Shuffle and return
        return aiQuestions.sort(() => Math.random() - 0.5);
      }
    } catch (error) {
      console.warn('⚠️ AI generation failed, falling back to stored questions:', error.message);
    }
  }
  
  // Fallback to stored questions
  const storedQuestions = quizData[sopId] || [];
  if (storedQuestions.length > 0) {
    console.log(`📚 Using ${storedQuestions.length} stored questions`);
    return storedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
  }
  
  // No questions available
  console.warn('❌ No questions available for this SOP');
  return [];
};

/**
 * Generate a completely fresh quiz (never cached)
 */
export const generateFreshQuiz = async (sopContent, numQuestions = 10) => {
  if (!sopContent || sopContent.length < 100) {
    throw new Error('SOP content too short for quiz generation');
  }
  
  console.log('🔄 Generating completely fresh quiz...');
  const questions = await generateQuizQuestions(sopContent, numQuestions);
  
  if (!questions || questions.length === 0) {
    throw new Error('Failed to generate quiz questions');
  }
  
  return questions;
};

/**
 * Check if AI quiz generation is available
 */
export const isAIGenerationAvailable = () => {
  try {
    const hasGroq = !!process.env.REACT_APP_GROQ_API_KEY;
    const hasTogether = !!process.env.REACT_APP_TOGETHER_API_KEY;
    const hasHuggingFace = !!process.env.REACT_APP_HUGGINGFACE_API_KEY;
    
    return hasGroq || hasTogether || hasHuggingFace;
  } catch {
    return false;
  }
};

export { quizData };

export default generateQuiz;
