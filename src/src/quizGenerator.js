// Quiz Generator Module - Now imports from modular quizzes/ folder
import { quizData } from './quizzes';

export { quizData };

export const generateQuiz = (sopId) => {
  const questions = quizData[sopId] || [];
  // Shuffle and return random 10 questions
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
};

export default generateQuiz;

// To add new quizzes:
// 1. Create: src/quizzes/your-sop-name-quiz.js
// 2. Update: src/quizzes/index.js (add import and entry)
// That's it! No need to touch this file.
