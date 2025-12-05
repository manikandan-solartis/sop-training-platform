import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('qa');
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSOPData, setNewSOPData] = useState({ name: '', category: '', difficulty: '', content: '' });
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  // Pre-loaded SOPs from RLI
  const [sopDatabase, setSOPDatabase] = useState({
    'agency-check-request': {
      id: 'agency-check-request',
      name: 'Agency Check Request',
      category: 'Payment Processing',
      difficulty: 'Advanced',
      content: `Process for handling agency check requests for outstanding credits.

**Key Applications:**
- RLI Enterprise Inquiry
- General email box (Surety Accounting-Check request folder)
- Microsoft Outlook, Excel
- Payment Request form
- Lawson
- Image Express
- WINS

**Processing Schedule:** Every Wednesday

**SLA:** Every Wednesday (confirm with client)

**Main Steps:**

Step 1: Check the Check Request folder under Task 1 in inbox
Step 2: Receive email from agent requesting credit
Step 3: Pull up statement on Enterprise Inquiry by searching agent code
Step 4: Double check credit balance in WINS by pulling up bonds
Step 5: Save statement as: AGT in P:\\SURETY\\Agency Check Requests\\[year/month/week]
Step 6: Open Excel "Week of Check Request for Agents" from two weeks ago and Save As with current date
Step 7: Fill out Excel with Agent#, Refund Amount, GL (20/BSL01/255005), and Division
Step 8: Check Image Express for how agency receives refunds (ACH or Check)
Step 9: Send email to agent using appropriate template (ACH or Check) with Friday date

**Creating Batch (Wednesdays):**
Step 10: Sort Excel data by Agent# 
Step 11: Update "Week of Agency Request Lawson Surety Upload" yellow fields
Step 12: Send email to Lawson batch processor with attachment
Step 13: Save report when completed with batch number
Step 14: Combine all agent statements and save as "Week of[date] Check Requests"

**Submit Check Request (Wednesdays):**
Step 15: Open ImageExpress eForm
Step 16: Fill Payment Date, Description (Batch# Statement Check Req), Payment Amount, Vendor (use Surety batch vendor)
Step 17: Attach combined statement PDF and report
Step 18: Approve in Image Express Queue

**Posting in WINS:**
Step 19: Open Excel by division for controls
Step 20: Search Lawson (ap90.2, Company 20) for ACH/Check number
Step 21: Post in WINS using division mnemonic, AC, control number
Step 22: Enter activity date, control total with (-)
Step 23: Enter agent code with 12/current year
Step 24: Enter check/ACH number (add "A" for ACH), check total with (-)
Step 25: Locate policy and enter bond numbers with TR 84
Step 26: Enter payment amounts with (-) for credits
Step 27: Hit F6, then F8 to post write off

**Important Rules:**
- If single bond credit request → Process as one-off, email yourself reminder to post
- If agent numbers 00984, 00985, or 00986 → Do NOT process refund
- If statement shows positive total balance → Do NOT process refund
- New vendor: SURETY AGENCY BATCH with location codes based on amount:
  * Location 1: <$5k (Danielle Moore)
  * Location 2: <$50k (Diane Swope)
  * Location 3: <$10m (Kathleen Taylor)
  * Location 4: >$10m (Seth Davis)
- ALWAYS follow the statement amount, even if bond shows different credit
- If credit less than statement or single bond request → Mark my color

**Email Templates:**
ACH: "Your refund request has been completed and an ACH is scheduled to be direct deposited into your account on/after [date]."
Check: "Your refund request has been completed and a check is scheduled to be sent out on/after [date]."

**Escalation:** Any exceptions → surety.accounting@rlicorp.com`,
      keywords: ['lawson', 'image express', 'wins', 'ach', 'check', 'batch', 'agent code', 'enterprise inquiry', 'surety accounting', 'wednesday', 'gl 20/bsl01/255005', 'eform', 'refund']
    },
    
    'agent-statement-requests': {
      id: 'agent-statement-requests',
      name: 'Agent Statement Requests',
      category: 'Customer Service',
      difficulty: 'Intermediate',
      content: `Process for handling agent commission statement requests.

**Key Applications:**
- Outlook
- RLI Inquiry Tool
- Agent Portal / Agent Dashboard
- Surety Accounting Inbox

**SLA:** 1 Business Day

**Main Scenarios:**

**Scenario 1: Agent Code Provided**
Step 1: Check if agent code is provided in request
Step 2: Check commission amount in RLI statement
Step 3: If amount is POSITIVE → Attach and send statement
Step 4: If amount is NEGATIVE or ZERO → Flag email to Surety Accounting, do NOT send

**Scenario 2: Missing Agent Code/Producer Name**
Step 5: Check email for agent code or producer name
Step 6: Look for attachments in email
Step 7: If complete info → Categorize as "Solartis", move to 2025 folder
Step 8: If need clarification → Categorize as "Waiting on Response", place in Agent Statement Request Inbox

**Scenario 3: Missing All Information**
Step 9: If no agent code or policy number provided
Step 10: Contact respective agent to request missing information
Step 11: Raise exception to document missing info and follow-up

**Scenario 4: Agent Name but No Code**
Step 12: If agent name mentioned but code missing
Step 13: Search agent name in RLink 3
Step 14: Find corresponding agent code for commission statement

**Scenario 5: Premium Amount Inquiry**
Step 15: If email requests specific premium amount for agent code
Step 16: Search for premium in Enterprise Inquiry first
Step 17: If amount doesn't match → Search in Duck Creek
Step 18: If Duck Creek premium matches email amount → Forward to Premium Accounting team

**Scenario 6: No Statement in Enterprise Inquiry**
Step 19: If commission statement requested for agent code
Step 20: Check Enterprise Inquiry for commission statement
Step 21: If no statement found → Search Duck Creek to verify if premium-related
Step 22: Click Policy Number under Endorsement section
Step 23: Navigate to Policy Term Summary screen
Step 24: Click Policy Extended Data on left panel
Step 25: Select Producer Account Reference and paste in Duck Creek search
Step 26: If displays disbursed premium amount → Confirm it's premium-related
Step 27: If premium-related → Forward to Premium Accounting, CC agent
Step 28: If no premium found → Contact Surety Accounting for clarification

**Escalation Matrix:**
- Value negative or odd → Flag to Surety Accounting
- Premium-related request → Forward to Premium Accounting
- Agent portal access issues → Send to Access/IT Team
- Email mismatch/unclear → Ask agent for clarity
- Manual pull verified → Send statement + BCC Surety

**Important Reminders:**
- Never assume statement was not sent - always verify
- Check correct statement attached before sending
- Document every step
- Use flowchart to confirm routing if in doubt`,
      keywords: ['rlink', 'enterprise inquiry', 'duck creek', 'commission statement', 'premium accounting', 'producer account reference', 'agent portal', 'policy extended data']
    },

    'collections-rlink-wins-notes': {
      id: 'collections-rlink-wins-notes',
      name: 'Collections - RLink and WINS Notes',
      category: 'Collections',
      difficulty: 'Advanced',
      content: `Process for updating collection notes in WINS and RLink systems based on Monthly Collections Report.

**Key Applications:**
- MS Excel
- WINS
- RLink3
- RLI net homepage

**SLA:** Custom TAT

**Main Process:**

**Analyzing Collection Excel:**
Step 1: Open Excel with 4 tabs/sheets - work on "Notes Needed" tab only
Step 2: Scroll through list bond by bond OR use slicer to filter
Step 3: Review total collections amount at bottom for selected bond
Step 4: Copy bond number and search in WINS, navigate to policy screen
Step 5: Type '1' and enter to open address screen
Step 6: Press "Shift + F1" to open Notes Section
Step 7: Review existing collection note (only ONE "Collections" note should exist)
Step 8: Type "5" and enter to view current collections note
Step 9: Compare terms in WINS with spreadsheet (e.g., 2020, 2022, 2023, 2024)
Step 10: Hit "F12" to go back to previous screen
Step 11: Hit "2" to Revise/update with new term (e.g., 2025)
Step 12: Add collections amount following standardized format: [Year]: $[Amount]
Step 13: Cross check Excel and WINS - ensure term amounts and Total due match
Step 14: Click "F6" to update in WINS
Step 15: Verify date changes to current date with your user ID
Step 16: In Excel Column E, type "UPDATE" (only in top row for the bond)

**Updating RLink Notes:**
Step 17: Go to RLI net homepage → Portal Login
Step 18: Navigate to Surety tab → Click "My Bond Center"
Step 19: Enter bond number in search box and hit Search
Step 20: Click folder icon "OPEN" to view bond details
Step 21: Select "NOTES" tab
Step 22: Find "Direct Collect" collection note (ensure only ONE exists)
Step 23: If duplicate entries found → Edit and change subject to "Do Not Use", remove remainders
Step 24: Edit existing Collection Notes
Step 25: Update term amount like done in WINS using standardized format
Step 26: Remove header "*2020-2024 Terms*" if present
Step 27: Update Total sent to collections amount
Step 28: Add new term at bottom following standard formatting
Step 29: Cross check data between Excel and RLink notes
Step 30: Add note in format: MM/DD/YYYY- Sent YYYY term to direct collections team in [collections date] collections report to place with external collections agency [initials]
Step 31: Don't set remainder and save notes
Step 32: In Excel Column F, type "UPDATED"

**Processing New Payment/Terms:**
Step 33: Refer Column D "New Placement" in Excel
Step 34: Follow same WINS steps - search bond
Step 35: In Notes section, verify NO "COLLECTIONS" notes exist
Step 36: Create new Collections note - place cursor on top, type '1', TAB, type "COLLECTIONS"
Step 37: Type "Total Due in Collections: $[amount]"
Step 38: Add term date and payment: [Year]: $[Amount]
Step 39: Press "F6" to update
Step 40: In Excel Column E, type "CNEW" for new creation
Step 41: In RLink, search bond number
Step 42: Check Notes tab - should be only ONE "Direct Collect" note
Step 43: If no Collections note → Email Surety Accounting team
Step 44: Edit Direct collection note
Step 45: Remove current year term and restructure
Step 46: Type Total Dues, term amount, and collection report note with initials
Step 47: Ensure zero remainder, placed in "Surety Operations"
Step 48: Subject: "Direct Collect", Save notes
Step 49: In Excel Column F, type "UPDATED"

**Standardized Format:**
- Collections note format: [Year]: $[Amount]
- Example: 2025: $985.00
- Note format: MM/DD/YYYY- Sent YYYY term to direct collections team in MM.DD.YYYY collections report to place with external collections agency [initials]

**Important Rules:**
- Only ONE "Collections" note in WINS
- Only ONE "Direct Collect" note in RLink
- Always follow standardized format
- Cross check Excel vs WINS vs RLink amounts
- Zero remainders in RLink notes
- Place notes in "Surety Operations"

**Exceptions:** Send to surety.accounting@rlicorp.com`,
      keywords: ['wins', 'rlink', 'rlink3', 'collections', 'direct collect', 'my bond center', 'shift+f1', 'notes needed', 'total due', 'surety operations', 'monthly collections report']
    }
  });

  // Enhanced smart answer function with deep SOP knowledge
  const getSmartAnswer = (question, sopContent, sopKeywords) => {
    const lowerQ = question.toLowerCase();
    const lines = sopContent.split('\n').map(l => l.trim()).filter(l => l);
    
    // Check for specific application/tool questions
    if (lowerQ.includes('application') || lowerQ.includes('tool') || lowerQ.includes('system') || lowerQ.includes('use')) {
      const appSection = lines.find(l => l.includes('Applications') || l.includes('Key Applications'));
      if (appSection) {
        const apps = lines.slice(lines.indexOf(appSection) + 1, lines.indexOf(appSection) + 10)
          .filter(l => l.startsWith('-') || l.includes(':'));
        return `The applications used in this process are:\n${apps.join('\n')}`;
      }
    }

    // Check for email template questions
    if (lowerQ.includes('email') && (lowerQ.includes('template') || lowerQ.includes('send'))) {
      const templates = lines.filter(l => l.includes('Template') || l.includes('"') && l.includes('refund'));
      if (templates.length > 0) {
        return `Here are the email templates:\n\n${templates.join('\n\n')}`;
      }
    }

    // Check for specific website/portal questions
    if (lowerQ.includes('website') || lowerQ.includes('portal') || lowerQ.includes('where')) {
      for (const keyword of sopKeywords) {
        if (lowerQ.includes(keyword.toLowerCase())) {
          const relevantLines = lines.filter(l => l.toLowerCase().includes(keyword.toLowerCase()));
          if (relevantLines.length > 0) {
            return `Regarding ${keyword}:\n${relevantLines.slice(0, 3).join('\n')}`;
          }
        }
      }
    }

    // Check for GL code or specific codes
    if (lowerQ.includes('gl') || lowerQ.includes('code') || lowerQ.includes('batch')) {
      const codeLine = lines.find(l => l.includes('GL') || l.includes('20/BSL01') || l.includes('Location'));
      if (codeLine) {
        const context = lines.slice(Math.max(0, lines.indexOf(codeLine) - 1), lines.indexOf(codeLine) + 5);
        return `Here's the information about codes:\n${context.join('\n')}`;
      }
    }

    // Check for escalation/exception questions
    if (lowerQ.includes('escalat') || lowerQ.includes('exception') || lowerQ.includes('who') || lowerQ.includes('contact')) {
      const escalation = lines.filter(l => l.includes('Escalation') || l.includes('@rlicorp.com') || l.includes('send to'));
      if (escalation.length > 0) {
        return `Escalation information:\n${escalation.join('\n')}`;
      }
    }

    // Check for difference/comparison questions
    if (lowerQ.includes('difference') || lowerQ.includes('vs') || lowerQ.includes('compare')) {
      if (lowerQ.includes('ach') && lowerQ.includes('check')) {
        return `The difference between ACH and Check:\n- ACH: Direct deposit into agent's account, marked with "A" after number in WINS\n- Check: Physical check sent by mail\nBoth use different email templates when notifying agents.`;
      }
      if (lowerQ.includes('wins') && lowerQ.includes('rlink')) {
        return `Difference between WINS and RLink:\n- WINS: Used for posting payments and financial transactions\n- RLink: Used for bond notes and documentation\nBoth systems need to be updated with the same collection amounts, but RLink requires detailed notes with dates and initials.`;
      }
    }

    // Check for SLA questions
    if (lowerQ.includes('sla') || lowerQ.includes('turnaround') || lowerQ.includes('deadline') || lowerQ.includes('when')) {
      const slaLine = lines.find(l => l.includes('SLA') || l.includes('Schedule') || l.includes('Wednesday'));
      if (slaLine) {
        const context = lines.slice(Math.max(0, lines.indexOf(slaLine) - 1), lines.indexOf(slaLine) + 3);
        return `Regarding timing and deadlines:\n${context.join('\n')}`;
      }
    }

    // Check for step-specific questions
    const steps = lines.filter(l => l.toLowerCase().startsWith('step'));
    if (lowerQ.includes('first') || lowerQ.includes('start') || lowerQ.includes('begin')) {
      return steps[0] ? `The first step is:\n${steps[0]}` : 'Please refer to the SOP content for the first step.';
    }
    
    if (lowerQ.includes('last') || lowerQ.includes('final') || lowerQ.includes('end')) {
      return steps.length > 0 ? `The final step is:\n${steps[steps.length - 1]}` : 'Please refer to the SOP for the final step.';
    }
    
    if (lowerQ.includes('how many steps')) {
      return `This process has ${steps.length} steps in total.`;
    }
    
    const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step/);
    if (stepMatch) {
      const stepNum = parseInt(stepMatch[1] || stepMatch[2]);
      if (steps[stepNum - 1]) {
        return `${steps[stepNum - 1]}`;
      }
    }

    // Search for keyword matches
    const keywords = lowerQ.split(' ').filter(w => w.length > 3);
    const matches = [];
    for (const keyword of keywords) {
      const matchingLines = lines.filter(l => l.toLowerCase().includes(keyword));
      matches.push(...matchingLines);
    }
    
    if (matches.length > 0) {
      const uniqueMatches = [...new Set(matches)].slice(0, 5);
      return `Based on your question, here's the relevant information from the SOP:\n\n${uniqueMatches.join('\n\n')}`;
    }
    
    return `I've reviewed the SOP content. Here are the main steps:\n${steps.slice(0, 5).join('\n')}\n\nPlease ask a more specific question about any step, tool, or process detail.`;
  };

  // Generate contextual quiz questions
  const generateContextualQuiz = (sopId, sopContent, sopKeywords) => {
    const questions = [];
    const lines = sopContent.split('\n').filter(l => l.trim());

    // SOP-specific questions based on actual content
    if (sopId === 'agency-check-request') {
      questions.push(
        { q: 'Where should you save the agent statement?', options: ['P:\\SURETY\\Agency Check Requests', 'C:\\Documents', 'Desktop folder', 'Email attachments'], correct: 0 },
        { q: 'What is the GL code used for agency check requests?', options: ['20/BSL01/255005', '10/BSL01/255005', '20/BSL02/255005', '30/BSL01/255005'], correct: 0 },
        { q: 'On which day are agency check request batches processed?', options: ['Monday', 'Wednesday', 'Friday', 'Daily'], correct: 1 },
        { q: 'Which application is used to search for agent statements?', options: ['WINS', 'RLink', 'Enterprise Inquiry', 'Lawson'], correct: 2 },
        { q: 'What should you do if agent numbers are 00984, 00985, or 00986?', options: ['Process normally', 'Do NOT process refund', 'Double check with manager', 'Send to collections'], correct: 1 },
        { q: 'How do you mark ACH payments in WINS?', options: ['Add "A" after the number', 'Add "ACH" before number', 'No special marking needed', 'Use negative sign'], correct: 0 },
        { q: 'What is the location code for payments less than $5k?', options: ['Location 1', 'Location 2', 'Location 3', 'Location 4'], correct: 0 },
        { q: 'Which vendor should be used for new eForm submissions?', options: ['AGENT BATCH', 'SURETY AGENCY BATCH', 'RLI VENDOR', 'PAYMENT BATCH'], correct: 1 },
        { q: 'If a single bond credit is requested, what should you do?', options: ['Process immediately', 'Process as one-off and email yourself reminder', 'Reject the request', 'Forward to manager'], correct: 1 },
        { q: 'What transaction code is used when posting in WINS?', options: ['TR 82', 'TR 84', 'TR 86', 'TR 88'], correct: 1 }
      );
    }

    if (sopId === 'agent-statement-requests') {
      questions.push(
        { q: 'What is the SLA for agent statement requests?', options: ['Same day', '1 Business Day', '2 Business Days', '3 Business Days'], correct: 1 },
        { q: 'If commission amount is NEGATIVE, what should you do?', options: ['Send statement anyway', 'Flag to Surety Accounting, do NOT send', 'Contact agent first', 'Process as zero'], correct: 1 },
        { q: 'Where should you search for agent codes when only name is provided?', options: ['WINS', 'Duck Creek', 'RLink 3', 'Enterprise Inquiry'], correct: 2 },
        { q: 'Which application is used to verify premium-related requests?', options: ['WINS only', 'Enterprise Inquiry first, then Duck Creek', 'RLink only', 'Lawson'], correct: 1 },
        { q: 'Where is Producer Account Reference found in Duck Creek?', options: ['Policy Summary', 'Policy Extended Data', 'Endorsement section', 'Premium section'], correct: 1 },
        { q: 'If premium amount matches in Duck Creek, where do you forward the request?', options: ['Surety Accounting', 'Premium Accounting', 'Collections', 'IT Support'], correct: 1 },
        { q: 'What category should complete requests be marked as?', options: ['Pending', 'Solartis', 'Waiting', 'Completed'], correct: 1 },
        { q: 'If agent portal access issues arise, who handles them?', options: ['Surety Accounting', 'Premium Accounting', 'Access/IT Team', 'Collections'], correct: 2 },
        { q: 'What should you do if agent code AND policy number are both missing?', options: ['Process anyway', 'Contact agent to request missing information', 'Reject immediately', 'Use last month\'s data'], correct: 1 },
        { q: 'When should you BCC Surety Accounting?', options: ['Always', 'Never', 'When manual pull verified and clear', 'Only on Fridays'], correct: 2 }
      );
    }

    if (sopId === 'collections-rlink-wins-notes') {
      questions.push(
        { q: 'Which Excel tab should you work on?', options: ['All tabs', 'Summary', 'Notes Needed', 'Collections'], correct: 2 },
        { q: 'What keyboard shortcut opens Notes in WINS?', options: ['Shift + F2', 'Shift + F1', 'Ctrl + F1', 'Alt + F1'], correct: 1 },
        { q: 'How many "Collections" notes should exist in WINS?', options: ['Multiple allowed', 'At least two', 'Only ONE', 'None'], correct: 2 },
        { q: 'What do you type in WINS to view collections note?', options: ['Type "3"', 'Type "5"', 'Type "7"', 'Type "9"'], correct: 1 },
        { q: 'What do you type to revise/update collections in WINS?', options: ['Type "1"', 'Type "2"', 'Type "3"', 'Type "4"'], correct: 1 },
        { q: 'What key do you press to update information in WINS?', options: ['F2', 'F4', 'F6', 'F8'], correct: 2 },
        { q: 'What should you type in Excel Column E for updated existing notes?', options: ['UPDATED', 'UPDATE', 'DONE', 'COMPLETE'], correct: 1 },
        { q: 'What should you type in Excel Column E for newly created notes?', options: ['NEW', 'CREATE', 'CNEW', 'ADDED'], correct: 2 },
        { q: 'How many "Direct Collect" notes should exist in RLink?', options: ['Multiple allowed', 'At least two', 'Only ONE', 'Depends on bonds'], correct: 2 },
        { q: 'Where should RLink notes be placed?', options: ['Agent folder', 'Surety Operations', 'Collections folder', 'Archive'], correct: 1 },
        { q: 'What should you set for remainders in RLink notes?', options: ['7 days', '30 days', 'Zero remainder', '1 day'], correct: 2 },
        { q: 'Which portal do you use to access "My Bond Center"?', options: ['WINS portal', 'RLI net homepage', 'Lawson', 'Enterprise Inquiry'], correct: 1 }
      );
    }

    // Shuffle and return 10 random questions
    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setCurrentView('sop-list');
    }
  };

  const handleSelectSOP = (sopId) => {
    setSelectedSOP(sopId);
    setActiveMode('qa');
    const sop = sopDatabase[sopId];
    setMessages([{ 
      id: 1, 
      type: 'assistant', 
      text: `Welcome! I'm your SOP trainer for "${sop.name}". I've thoroughly reviewed this ${sop.difficulty} level SOP and understand all the details about ${sop.category}. I can answer questions about specific steps, applications, procedures, and help you understand the complete process. What would you like to know?`
    }]);
    setCurrentView('sop-detail');
    setQuizAnswers({});
    setQuizScore(0);
    setCurrentQuizQuestions(generateContextualQuiz(sopId, sop.content, sop.keywords));
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 800));
    
    const sop = sopDatabase[selectedSOP];
    const response = getSmartAnswer(input, sop.content, sop.keywords);
    
    setMessages(prev => [...prev, { id: messages.length + 2, type: 'assistant', text: response }]);
    setLoading(false);
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const submitQuiz = () => {
    let correct = 0;
    currentQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    setQuizScore(correct);
    const percentage = (correct / currentQuizQuestions.length) * 100;
    let message = '';
    if (percentage === 100) message = '🎉 Perfect score! You\'ve mastered this SOP!';
    else if (percentage >= 80) message = '👍 Great job! You have a strong understanding.';
    else if (percentage >= 60) message = '📚 Good effort! Review the SOP and try again.';
    else message = '📖 Keep practicing! Review the SOP carefully and retake the quiz.';
    
    alert(`You scored ${correct} out of ${currentQuizQuestions.length}! (${percentage.toFixed(0)}%)\n\n${message}`);
  };

  const retakeQuiz = () => {
    setQuizAnswers({});
    setQuizScore(0);
    const sop = sopDatabase[selectedSOP];
    setCurrentQuizQuestions(generateContextualQuiz(selectedSOP, sop.content, sop.keywords));
  };

  const handleUploadSOP = () => {
    if (!newSOPData.name || !newSOPData.content) {
      alert('Please fill in at least SOP name and content!');
      return;
    }
    const newId = newSOPData.name.toLowerCase().replace(/\s+/g, '-');
    setSOPDatabase(prev => ({
      ...prev,
      [newId]: {
        id: newId,
        name: newSOPData.name,
        category: newSOPData.category || 'General',
        difficulty: newSOPData.difficulty || 'Intermediate',
        content: newSOPData.content,
        keywords: []
      }
    }));
    setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
    setShowUploadModal(false);
    alert('SOP uploaded successfully!');
  };

  const handleDeleteSOP = (sopId) => {
    if (window.confirm(`Are you sure you want to delete "${sopDatabase[sopId].name}"? This action cannot be undone.`)) {
      const newDatabase = { ...sopDatabase };
      delete newDatabase[sopId];
      setSOPDatabase(newDatabase);
      if (selectedSOP === sopId) {
        setCurrentView('sop-list');
      }
      alert('SOP deleted successfully!');
