// Master Quiz Index - Import all individual quiz files here
import agencyCheckQuiz from './agency-check-request-quiz';
import agentStatementQuiz from './agent-statement-requests-quiz';
import collectionsQuiz from './collections-quiz';

// To add a new quiz:
// 1. Create new file: src/quizzes/your-sop-name-quiz.js
// 2. Import it here: import yourQuizName from './your-sop-name-quiz';
// 3. Add to quizData object below matching the SOP ID

export const quizData = {
  'agency-check-request': agencyCheckQuiz,
  'agent-statement-requests': agentStatementQuiz,
  'collections-rlink-wins-notes': collectionsQuiz
  // Add more quizzes here as: 'sop-id': quizVariableName,
};

export default quizData;
