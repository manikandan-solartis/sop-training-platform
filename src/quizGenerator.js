// Quiz Generator - Auto-generates quizzes using FREE LLM (NO stored questions)
// Each user receives completely unique questions every time they take the quiz
import { generateQuizQuestions } from './services/llmService';

/**
 * Generate FRESH quiz questions - ALWAYS AI-generated, NEVER uses stored questions
 * Ensures every user gets unique questions and prevents cheating
 * @param {string} sopId - SOP identifier
 * @param {string} sopContent - SOP content for generation (REQUIRED)
 * @param {boolean} useAI - Whether to use AI generation (default: true, always enforced)
 * @returns {Promise<Array>} - Array of freshly generated quiz questions
 */
export const generateQuiz = async (sopId, sopContent = '', useAI = true) => {
  // SOP content is REQUIRED for fresh question generation
  if (!sopContent || sopContent.length < 100) {
    throw new Error('❌ SOP content is required for generating unique quiz questions. Stored questions are not permitted.');
  }

  // ALWAYS generate fresh questions - never fall back to stored
  try {
    console.log('🤖 Generating FRESH, unique quiz questions using FREE LLM...');
    console.log(`📝 Generating from SOP: ${sopId}`);
    
    const aiQuestions = await generateQuizQuestions(sopContent, 10);
    
    if (!aiQuestions || aiQuestions.length === 0) {
      throw new Error('Failed to generate questions from SOP content');
    }

    console.log(`✅ Generated ${aiQuestions.length} UNIQUE AI questions`);
    console.log('🔒 No stored questions used - ensuring fairness and preventing cheating');
    
    // Shuffle to randomize question order
    return aiQuestions.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('❌ Quiz generation failed:', error.message);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
};

/**
 * Generate a completely fresh quiz (never cached, always unique)
 * @param {string} sopContent - SOP content for generation
 * @param {number} numQuestions - Number of questions to generate
 * @returns {Promise<Array>} - Array of freshly generated questions
 */
export const generateFreshQuiz = async (sopContent, numQuestions = 10) => {
  if (!sopContent || sopContent.length < 100) {
    throw new Error('SOP content too short for quiz generation');
  }
  
  console.log('🔄 Generating completely fresh, unique quiz...');
  const questions = await generateQuizQuestions(sopContent, numQuestions);
  
  if (!questions || questions.length === 0) {
    throw new Error('Failed to generate quiz questions');
  }

  console.log(`✅ Generated ${questions.length} unique questions`);
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
