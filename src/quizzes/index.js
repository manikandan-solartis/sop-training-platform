// Master Quiz Index - Import all individual quiz modules
import agencyCheckRequestQuiz from './agency-check-request-quiz';
import agentStatementRequestsQuiz from './agent-statement-requests-quiz';
import collectionsRlinkWinsQuiz from './collections-rlink-wins-notes-quiz';
import directBillCollectLetterQuiz from './direct-bill-collect-letter-quiz';
import duckCreekRefundsQuiz from './duck-creek-refunds-quiz';
import hawaiiRefundReportQuiz from './hawaii-refund-report-quiz';
import monthlyCollectionsNotesQuiz from './monthly-collections-notes-quiz';
import nsfProcessingQuiz from './nsf-processing-quiz';

// To add a new quiz:
// 1. Create new file: src/quizzes/your-sop-name-quiz.js
// 2. Import it here: import yourQuizName from './your-sop-name-quiz';
// 3. Add to quizData object below with same key as SOP

export const quizData = {
  'agency-check-request': agencyCheckRequestQuiz,
  'agent-statement-requests': agentStatementRequestsQuiz,
  'collections-rlink-wins-notes': collectionsRlinkWinsQuiz,
  'direct-bill-collect-letter': directBillCollectLetterQuiz,
  'duck-creek-refunds': duckCreekRefundsQuiz,
  'hawaii-refund-report': hawaiiRefundReportQuiz,
  'monthly-collections-notes': monthlyCollectionsNotesQuiz,
  'nsf-processing': nsfProcessingQuiz
  // Add more quizzes here as: 'sop-id': quizVariableName,
};

export default quizData;
