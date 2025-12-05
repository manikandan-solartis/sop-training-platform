// Quiz Generator Module - Add new quiz questions here
export const quizData = {
  'agency-check-request': [
    { q: 'Where should you save agent statements?', options: ['P:\\SURETY\\Agency Check Requests', 'C:\\Documents', 'Desktop folder', 'Email attachments'], correct: 0 },
    { q: 'What is the GL code for agency check requests?', options: ['20/BSL01/255005', '10/BSL01/255005', '20/BSL02/255005', '30/BSL01/255005'], correct: 0 },
    { q: 'On which day are batches processed?', options: ['Monday', 'Wednesday', 'Friday', 'Daily'], correct: 1 },
    { q: 'Which system is used to search agent statements?', options: ['WINS', 'RLink', 'Enterprise Inquiry', 'Lawson'], correct: 2 },
    { q: 'What should you do if agent number is 00984, 00985, or 00986?', options: ['Process normally', 'Do NOT process refund', 'Check with manager', 'Send to collections'], correct: 1 },
    { q: 'How do you mark ACH payments in WINS?', options: ['Add "A" after number', 'Add "ACH" before', 'No marking needed', 'Use negative sign'], correct: 0 },
    { q: 'What is Location Code 1 used for?', options: ['Payments <$5k', 'Payments <$50k', 'Payments <$10m', 'Payments >$10m'], correct: 0 },
    { q: 'Which vendor name should be used in eForm?', options: ['AGENT BATCH', 'SURETY AGENCY BATCH', 'RLI VENDOR', 'PAYMENT BATCH'], correct: 1 },
    { q: 'What transaction code is used when posting in WINS?', options: ['TR 82', 'TR 84', 'TR 86', 'TR 88'], correct: 1 },
    { q: 'What should you do for single bond credit requests?', options: ['Process immediately', 'Process as one-off, email yourself', 'Reject request', 'Forward to manager'], correct: 1 },
    { q: 'Where do you approve the check request after submission?', options: ['WINS', 'Lawson', 'Image Express Queue', 'Email'], correct: 2 },
    { q: 'Who approves Location 2 requests (<$50k)?', options: ['Danielle Moore', 'Diane Swope', 'Kathleen Taylor', 'Seth Davis'], correct: 1 },
    { q: 'What escalation email should be used?', options: ['help@rlicorp.com', 'surety.accounting@rlicorp.com', 'support@rlicorp.com', 'payments@rlicorp.com'], correct: 1 },
    { q: 'If statement shows positive balance, what do you do?', options: ['Process it', 'Do NOT process', 'Check WINS first', 'Email agent'], correct: 1 },
    { q: 'What does "F6" do in WINS?', options: ['Delete', 'View', 'Update/Save', 'Cancel'], correct: 2 }
  ],

  'agent-statement-requests': [
    { q: 'What is the SLA for agent statement requests?', options: ['Same day', '1 Business Day', '2 Business Days', '3 Business Days'], correct: 1 },
    { q: 'If commission amount is NEGATIVE, what should you do?', options: ['Send statement', 'Flag to Surety, do NOT send', 'Contact agent first', 'Process as zero'], correct: 1 },
    { q: 'Where should you search for agent codes when only name is given?', options: ['WINS', 'Duck Creek', 'RLink 3', 'Enterprise Inquiry'], correct: 2 },
    { q: 'For premium inquiries, which system do you check FIRST?', options: ['Duck Creek', 'Enterprise Inquiry then Duck Creek', 'RLink', 'WINS'], correct: 1 },
    { q: 'Where is "Producer Account Reference" found?', options: ['Policy Summary', 'Policy Extended Data', 'Endorsement section', 'Premium section'], correct: 1 },
    { q: 'If premium matches in Duck Creek, where do you forward?', options: ['Surety Accounting', 'Premium Accounting', 'Collections', 'IT Support'], correct: 1 },
    { q: 'What category for complete requests with all info?', options: ['Pending', 'Solartis', 'Waiting on Response', 'Completed'], correct: 1 },
    { q: 'Who handles agent portal access issues?', options: ['Surety Accounting', 'Premium Accounting', 'Access/IT Team', 'Collections'], correct: 2 },
    { q: 'If agent code AND policy number are missing, what do you do?', options: ['Process anyway', 'Contact agent for info', 'Reject immediately', 'Use old data'], correct: 1 },
    { q: 'When should you BCC Surety Accounting?', options: ['Always', 'Never', 'Manual pull verified', 'Only Fridays'], correct: 2 },
    { q: 'What folder for requests needing clarification?', options: ['Solartis', 'Waiting on Response', 'Pending', 'Archive'], correct: 1 },
    { q: 'In Duck Creek, where do you click after searching bond?', options: ['Summary', 'Policy Number under Endorsement', 'Notes', 'Premium'], correct: 1 },
    { q: 'What does negative commission value indicate?', options: ['Send anyway', 'Flag issue, do not send', 'Agent owes money', 'Processing error'], correct: 1 },
    { q: 'Required accuracy level for this process?', options: ['95%', '98%', '99%', '100%'], correct: 3 },
    { q: 'If no statement in Enterprise Inquiry, check where next?', options: ['WINS', 'Duck Creek for premium', 'RLink', 'Lawson'], correct: 1 }
  ],

  'collections-rlink-wins-notes': [
    { q: 'Which Excel tab should you work on?', options: ['All tabs', 'Summary', 'Notes Needed', 'Collections Report'], correct: 2 },
    { q: 'What keyboard shortcut opens Notes in WINS?', options: ['Shift + F2', 'Shift + F1', 'Ctrl + F1', 'Alt + F1'], correct: 1 },
    { q: 'How many "Collections" notes should exist in WINS?', options: ['Multiple allowed', 'At least two', 'Only ONE', 'None'], correct: 2 },
    { q: 'What do you type in WINS to VIEW a collections note?', options: ['Type "3"', 'Type "5"', 'Type "7"', 'Type "9"'], correct: 1 },
    { q: 'What do you type to REVISE collections in WINS?', options: ['Type "1"', 'Type "2"', 'Type "3"', 'Type "4"'], correct: 1 },
    { q: 'What key saves/updates information in WINS?', options: ['F2', 'F4', 'F6', 'F8'], correct: 2 },
    { q: 'Excel Column E for updated existing notes?', options: ['UPDATED', 'UPDATE', 'DONE', 'COMPLETE'], correct: 1 },
    { q: 'Excel Column E for newly created notes?', options: ['NEW', 'CREATE', 'CNEW', 'ADDED'], correct: 2 },
    { q: 'How many "Direct Collect" notes in RLink?', options: ['Multiple', 'Two', 'Only ONE', 'Depends on bonds'], correct: 2 },
    { q: 'Where should RLink notes be placed?', options: ['Agent folder', 'Surety Operations', 'Collections folder', 'Archive'], correct: 1 },
    { q: 'What remainder should be set in RLink?', options: ['7 days', '30 days', 'Zero remainder', '1 day'], correct: 2 },
    { q: 'Portal to access "My Bond Center"?', options: ['WINS portal', 'RLI net homepage', 'Lawson', 'Enterprise Inquiry'], correct: 1 },
    { q: 'Excel Column F after RLink update?', options: ['DONE', 'UPDATED', 'COMPLETE', 'SAVED'], correct: 1 },
    { q: 'What does "F12" do in WINS?', options: ['Save', 'Delete', 'Go back', 'Post'], correct: 2 },
    { q: 'Standardized format for collections note?', options: ['$Amount Year', '[Year]: $[Amount]', 'Year - $Amount', 'Amount/Year'], correct: 1 }
  ]
};

export const generateQuiz = (sopId) => {
  const questions = quizData[sopId] || [];
  // Shuffle and return random 10 questions
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
};

export default generateQuiz;
