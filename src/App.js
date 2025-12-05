// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import './App.css';

/**
 * Full SOP Trainer App component
 * - Q&A using local getSmartAnswer
 * - Quiz generation
 * - Upload new SOP (basic)
 * - Delete SOP
 * - Simple login stub
 *
 * Drop into a React app (create-react-app or Vite). Ensure lucide-react is installed:
 * npm install lucide-react
 */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'sop-list' | 'sop-detail'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('qa'); // 'qa' | 'quiz'
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSOPData, setNewSOPData] = useState({ name: '', category: '', difficulty: '', content: '' });
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  // -- pre-loaded SOPs (from conversation / uploaded files) --
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

Scenario 1: Agent Code Provided
Step 1: Check if agent code is provided in request
Step 2: Check commission amount in RLI statement
Step 3: If amount is POSITIVE → Attach and send statement
Step 4: If amount is NEGATIVE or ZERO → Flag email to Surety Accounting, do NOT send

Scenario 2: Missing Agent Code/Producer Name
Step 5: Check email for agent code or producer name
Step 6: Look for attachments in email
Step 7: If complete info → Categorize as "Solartis", move to 2025 folder
Step 8: If need clarification → Categorize as "Waiting on Response", place in Agent Statement Request Inbox

Scenario 3: Missing All Information
Step 9: If no agent code or policy number provided
Step 10: Contact respective agent to request missing information
Step 11: Raise exception to document missing info and follow-up

Scenario 4: Agent Name but No Code
Step 12: If agent name mentioned but code missing
Step 13: Search agent name in RLink 3 to find corresponding agent code

Scenario 5: Premium Amount Inquiry
Step 15: Search in Enterprise Inquiry first; if mismatch, search Duck Creek
Step 17: If Duck Creek matches → Forward to Premium Accounting

Escalation Matrix: ...
Important Reminders: Never assume the statement was not sent - always verify.`,
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
- Open the excel received and work on "Notes Needed" tab only
- Copy bond numbers, search in WINS, open notes (Shift + F1), update the collections notes
- Update RLink notes similarly, ensure only one "Direct Collect" note exists
- Use standardized format: [Year]: $[Amount]
- Add audit note format: MM/DD/YYYY - sent YYYY term to direct collections team ... [initials]

Exceptions: send to surety.accounting@rlicorp.com`,
      keywords: ['wins', 'rlink', 'rlink3', 'collections', 'direct collect', 'my bond center', 'shift+f1', 'notes needed', 'total due']
    }
  });

  // ---------- Helper functions ----------
  const getSmartAnswer = (question, sopContent, sopKeywords) => {
    const lowerQ = question.toLowerCase();
    const lines = sopContent.split('\n').map(l => l.trim()).filter(l => l);

    // Applications / Tools
    if (lowerQ.includes('application') || lowerQ.includes('tool') || lowerQ.includes('system') || lowerQ.includes('use')) {
      const appSectionIdx = lines.findIndex(l => /applications/i.test(l) || /key applications/i.test(l));
      if (appSectionIdx !== -1) {
        const apps = [];
        for (let i = appSectionIdx + 1; i < Math.min(lines.length, appSectionIdx + 12); i++) {
          if (lines[i].startsWith('-') || lines[i].includes(':')) apps.push(lines[i]);
        }
        if (apps.length) return `The applications used in this process are:\n${apps.join('\n')}`;
      }
    }

    // Email templates
    if (lowerQ.includes('email') && (lowerQ.includes('template') || lowerQ.includes('send'))) {
      const templates = lines.filter(l => /template/i.test(l) || (l.includes('refund') && l.includes('ACH')) || (l.includes('refund') && l.includes('check')));
      if (templates.length > 0) return `Here are the email templates:\n\n${templates.join('\n\n')}`;
    }

    // Portal / website
    if (lowerQ.includes('website') || lowerQ.includes('portal') || lowerQ.includes('where')) {
      for (const keyword of sopKeywords || []) {
        if (lowerQ.includes(keyword.toLowerCase())) {
          const relevantLines = lines.filter(l => l.toLowerCase().includes(keyword.toLowerCase()));
          if (relevantLines.length > 0) {
            return `Regarding ${keyword}:\n${relevantLines.slice(0, 5).join('\n')}`;
          }
        }
      }
    }

    // GL / codes / batch
    if (lowerQ.includes('gl') || lowerQ.includes('code') || lowerQ.includes('batch')) {
      const codeLine = lines.find(l => l.match(/GL|20\/BSL01|Location|Batch/i));
      if (codeLine) {
        const idx = lines.indexOf(codeLine);
        const context = lines.slice(Math.max(0, idx - 2), Math.min(lines.length, idx + 6));
        return `Here's the information about codes:\n${context.join('\n')}`;
      }
    }

    // Escalation / contact
    if (lowerQ.includes('escalat') || lowerQ.includes('exception') || lowerQ.includes('who') || lowerQ.includes('contact')) {
      const escalation = lines.filter(l => l.toLowerCase().includes('@rlicorp.com') || /escalation/i.test(l) || /send to/i.test(l));
      if (escalation.length > 0) return `Escalation information:\n${escalation.join('\n')}`;
    }

    // Compare / difference
    if (lowerQ.includes('difference') || lowerQ.includes('vs') || lowerQ.includes('compare')) {
      if (lowerQ.includes('ach') && lowerQ.includes('check')) {
        return `The difference between ACH and Check:\n- ACH: Direct deposit into account; marked with "A" in WINS\n- Check: Physical check mailed\nUse different email templates when notifying agents.`;
      }
      if (lowerQ.includes('wins') && lowerQ.includes('rlink')) {
        return `Difference between WINS and RLink:\n- WINS: Posting payments and financial transactions\n- RLink: Bond notes and documentation\nBoth must be updated to reflect the same collection amounts.`;
      }
    }

    // SLA / timing
    if (lowerQ.includes('sla') || lowerQ.includes('turnaround') || lowerQ.includes('deadline') || lowerQ.includes('when')) {
      const slaLine = lines.find(l => /SLA|Schedule|Wednesday|Business Turn Around Time/i.test(l));
      if (slaLine) {
        const idx = lines.indexOf(slaLine);
        const context = lines.slice(Math.max(0, idx - 2), Math.min(lines.length, idx + 4));
        return `Regarding timing and deadlines:\n${context.join('\n')}`;
      }
    }

    // Steps fallback
    const steps = lines.filter(l => /^Step \d+/i.test(l) || /^Steps for/i.test(l) || /^Steps:/i.test(l));
    if (lowerQ.includes('first') || lowerQ.includes('start') || lowerQ.includes('begin')) {
      return steps[0] ? `The first step is:\n${steps[0]}` : 'Please refer to the SOP content for the first step.';
    }
    if (lowerQ.includes('last') || lowerQ.includes('final') || lowerQ.includes('end')) {
      return steps.length > 0 ? `The final step is:\n${steps[steps.length - 1]}` : 'Please refer to the SOP for the final step.';
    }
    if (lowerQ.includes('how many steps')) {
      return `This process has approximately ${steps.length} step-lines captured in the SOP (depends on how steps are numbered).`;
    }

    const stepMatch = lowerQ.match(/step\s*(\d+)|(\d+)(st|nd|rd|th)\s*step/);
    if (stepMatch) {
      const n = parseInt(stepMatch[1] || stepMatch[2]);
      const specific = steps.find(s => s.match(new RegExp(`Step\\s*${n}`, 'i')));
      if (specific) return specific;
    }

    // simple keyword search fallback
    const keywords = lowerQ.split(/\s+/).filter(w => w.length > 3);
    const matches = [];
    for (const keyword of keywords) {
      const matchingLines = lines.filter(l => l.toLowerCase().includes(keyword));
      matches.push(...matchingLines);
    }
    if (matches.length > 0) {
      const uniqueMatches = [...new Set(matches)].slice(0, 6);
      return `Based on your question, here's relevant info from the SOP:\n\n${uniqueMatches.join('\n\n')}`;
    }

    return `I've reviewed the SOP content. Here are the first few step-lines:\n${(steps.length ? steps.slice(0, 5).join('\n') : 'No explicit numbered steps found — try asking about a specific tool, SLA, or "email template".')}`;
  };

  // Generate contextual quiz questions
  const generateContextualQuiz = (sopId, sopContent, sopKeywords) => {
    const questions = [];
    // provide quizzes targeting each SOP id (sample set based on SOP content)
    if (sopId === 'agency-check-request') {
      questions.push(
        { q: 'Where should you save the agent statement?', options: ['P:\\SURETY\\Agency Check Requests', 'C:\\Documents', 'Desktop folder', 'Email attachments'], correct: 0 },
        { q: 'What is the GL code used for agency check requests?', options: ['20/BSL01/255005', '10/BSL01/255005', '20/BSL02/255005', '30/BSL01/255005'], correct: 0 },
        { q: 'On which day are agency check request batches processed?', options: ['Monday', 'Wednesday', 'Friday', 'Daily'], correct: 1 },
        { q: 'Which application is used to search for agent statements?', options: ['WINS', 'RLink', 'Enterprise Inquiry', 'Lawson'], correct: 2 },
        { q: 'What should you do if agent numbers are 00984, 00985, or 00986?', options: ['Process normally', 'Do NOT process refund', 'Double check with manager', 'Send to collections'], correct: 1 }
      );
    }

    if (sopId === 'agent-statement-requests') {
      questions.push(
        { q: 'What is the SLA for agent statement requests?', options: ['Same day', '1 Business Day', '2 Business Days', '3 Business Days'], correct: 1 },
        { q: 'If commission amount is NEGATIVE, what should you do?', options: ['Send statement anyway', 'Flag to Surety Accounting, do NOT send', 'Contact agent first', 'Process as zero'], correct: 1 },
        { q: 'Where should you search for agent codes when only name is provided?', options: ['WINS', 'Duck Creek', 'RLink 3', 'Enterprise Inquiry'], correct: 2 },
        { q: 'Which application is used to verify premium-related requests?', options: ['WINS only', 'Enterprise Inquiry first, then Duck Creek', 'RLink only', 'Lawson'], correct: 1 }
      );
    }

    if (sopId === 'collections-rlink-wins-notes') {
      questions.push(
        { q: 'Which Excel tab should you work on?', options: ['All tabs', 'Summary', 'Notes Needed', 'Collections'], correct: 2 },
        { q: 'What keyboard shortcut opens Notes in WINS?', options: ['Shift + F2', 'Shift + F1', 'Ctrl + F1', 'Alt + F1'], correct: 1 },
        { q: 'How many "Collections" notes should exist in WINS?', options: ['Multiple allowed', 'At least two', 'Only ONE', 'None'], correct: 2 },
        { q: 'What key do you press to update information in WINS?', options: ['F2', 'F4', 'F6', 'F8'], correct: 2 }
      );
    }

    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  // ---------- UI actions ----------
  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setCurrentView('sop-list');
    } else {
      alert('Please enter email and password (this is a demo login).');
    }
  };

  const handleSelectSOP = (sopId) => {
    setSelectedSOP(sopId);
    setActiveMode('qa');
    const sop = sopDatabase[sopId];
    setMessages([{ 
      id: 1, 
      type: 'assistant', 
      text: `Welcome! I'm your SOP trainer for "${sop.name}". I've reviewed this ${sop.difficulty} SOP and can answer questions about its steps, applications, and rules. What would you like to know?`
    }]);
    setCurrentView('sop-detail');
    setQuizAnswers({});
    setQuizScore(0);
    setCurrentQuizQuestions(generateContextualQuiz(sopId, sop.content, sop.keywords));
  };

  // simple message send that uses getSmartAnswer
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const capturedInput = input;
    setInput('');
    setLoading(true);

    // tiny delay to feel interactive
    await new Promise(r => setTimeout(r, 600));

    const sop = sopDatabase[selectedSOP];
    const response = getSmartAnswer(capturedInput, sop.content, sop.keywords);

    setMessages(prev => [...prev, { id: prev.length + 2, type: 'assistant', text: response }]);
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
    if (!sopDatabase[sopId]) return;
    if (window.confirm(`Are you sure you want to delete "${sopDatabase[sopId].name}"? This action cannot be undone.`)) {
      const newDatabase = { ...sopDatabase };
      delete newDatabase[sopId];
      setSOPDatabase(newDatabase);
      if (selectedSOP === sopId) {
        setSelectedSOP(null);
        setCurrentView('sop-list');
      }
      alert('SOP deleted successfully!');
    }
  };

  // auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ---------- render ----------
  return (
    <div className="app-container">
      {/* Sidebar */}
      {isLoggedIn && currentView !== 'login' && (
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-top">
            <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h2 className="sidebar-title">SOP Library</h2>
          </div>

          <div className="sidebar-actions">
            <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
              <Upload size={16} /> <span>Upload New SOP</span>
            </button>
          </div>

          <ul className="sop-list">
            {Object.values(sopDatabase).map(sop => (
              <li
                key={sop.id}
                className={`sop-item ${selectedSOP === sop.id ? 'active' : ''}`}
                onClick={() => handleSelectSOP(sop.id)}
              >
                <div className="sop-left">
                  <FileText size={16} /> <span className="sop-name">{sop.name}</span>
                </div>
                <div className="sop-right">
                  <Trash2
                    size={16}
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSOP(sop.id);
                    }}
                    title="Delete SOP"
                  />
                </div>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'login' && (
          <div className="login-container card">
            <h2>Login (demo)</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="login-row">
              <button className="btn" onClick={handleLogin}>Login</button>
            </div>
            <p className="note">Use any email/password for demo login.</p>
          </div>
        )}

        {currentView === 'sop-list' && (
          <div className="dashboard card">
            <h1>Welcome to SOP AI Trainer</h1>
            <p>Select an SOP from the left panel to start reviewing or training.</p>
            <div className="quick-grid">
              <div className="card small">
                <h3>Total SOPs</h3>
                <p>{Object.keys(sopDatabase).length}</p>
              </div>
              <div className="card small">
                <h3>Quiz ready</h3>
                <p>Yes — each SOP has contextual quizzes</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'sop-detail' && selectedSOP && (
          <div className="sop-detail card">
            <div className="sop-header">
              <h2>{sopDatabase[selectedSOP].name}</h2>
              <div className="sop-meta">
                <span>{sopDatabase[selectedSOP].category}</span>
                <span className="dot">·</span>
                <span>{sopDatabase[selectedSOP].difficulty}</span>
              </div>
            </div>

            <div className="mode-selection">
              <button className={activeMode === 'qa' ? 'active' : ''} onClick={() => setActiveMode('qa')}>
                Q&A Mode
              </button>
              <button className={activeMode === 'quiz' ? 'active' : ''} onClick={() => setActiveMode('quiz')}>
                Quiz Mode
              </button>
            </div>

            {activeMode === 'qa' && (
              <>
                <div className="messages-container">
                  {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                      {msg.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-bar">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about this SOP..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <button onClick={handleSendMessage} disabled={loading} className="btn-icon">
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}

            {activeMode === 'quiz' && (
              <div className="quiz-container">
                {currentQuizQuestions.length === 0 ? (
                  <p>No quiz questions available for this SOP.</p>
                ) : (
                  <>
                    {currentQuizQuestions.map((q, index) => (
                      <div key={index} className="quiz-question">
                        <h4>{index + 1}. {q.q}</h4>
                        <div className="quiz-options">
                          {q.options.map((opt, optIdx) => (
                            <label key={optIdx} className={`quiz-option ${quizAnswers[index] === optIdx ? 'selected' : ''}`}>
                              <input
                                type="radio"
                                name={`q-${index}`}
                                checked={quizAnswers[index] === optIdx}
                                onChange={() => handleQuizAnswer(index, optIdx)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="quiz-actions">
                      <button className="btn" onClick={submitQuiz}>Submit Quiz</button>
                      <button className="btn muted" onClick={retakeQuiz}>Retake Quiz</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Upload SOP Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-container card" onClick={(e) => e.stopPropagation()}>
            <h2>Upload SOP</h2>
            <input
              placeholder="SOP Name"
              value={newSOPData.name}
              onChange={(e) => setNewSOPData({ ...newSOPData, name: e.target.value })}
            />
            <input
              placeholder="Category (optional)"
              value={newSOPData.category}
              onChange={(e) => setNewSOPData({ ...newSOPData, category: e.target.value })}
            />
            <input
              placeholder="Difficulty (optional)"
              value={newSOPData.difficulty}
              onChange={(e) => setNewSOPData({ ...newSOPData, difficulty: e.target.value })}
            />
            <textarea
              placeholder="SOP Content (paste text here)"
              value={newSOPData.content}
              onChange={(e) => setNewSOPData({ ...newSOPData, content: e.target.value })}
              rows={10}
            />
            <div className="modal-actions">
              <button className="btn" onClick={handleUploadSOP}><CheckCircle size={16} /> Save</button>
              <button className="btn muted" onClick={() => setShowUploadModal(false)}><XCircle size={16} /> Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
