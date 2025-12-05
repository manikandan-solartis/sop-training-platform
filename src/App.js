import React, { useState, useRef } from 'react';
import { Send, FileText, Menu, X, Upload, Trash2 } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('qa');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSOPData, setNewSOPData] = useState({ name: '', category: '', difficulty: '', content: '' });
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  const [sopDatabase, setSOPDatabase] = useState({
    'agency-check-request': {
      id: 'agency-check-request',
      name: 'Agency Check Request',
      category: 'Payment Processing',
      difficulty: 'Advanced',
      summary: 'Weekly process every Wednesday for agency check requests',
      content: `**Applications:** Enterprise Inquiry, Outlook, Excel, Lawson, Image Express, WINS\n**Schedule:** Every Wednesday\n\nProcess: Check email → Verify in Enterprise Inquiry → Save to P:\\SURETY\\Agency Check Requests → Prepare Excel → Create Lawson batch → Submit in ImageExpress → Post in WINS with TR 84\n\n**Key Rules:**\n- GL: 20/BSL01/255005\n- Agents 00984/00985/00986: Do NOT process\n- ACH: Add "A" after number\n- Locations: 1(<$5k), 2(<$50k), 3(<$10m), 4(>$10m)\n\n**Escalation:** surety.accounting@rlicorp.com`,
      keywords: ['lawson', 'image express', 'wins', 'tr 84', 'wednesday']
    },
    'agent-statement-requests': {
      id: 'agent-statement-requests',
      name: 'Agent Statement Requests',
      category: 'Customer Service',
      difficulty: 'Intermediate',
      summary: '1 Business Day SLA for agent commission statements',
      content: `**Applications:** Outlook, RLink 3, Duck Creek, Enterprise Inquiry\n**SLA:** 1 Business Day\n\n**Scenarios:**\n1. Agent code given → Check commission → POSITIVE=send, NEGATIVE=flag to Surety\n2. Missing info → Categorize "Solartis" or "Waiting on Response"\n3. No code/policy → Contact agent\n4. Name only → Search RLink 3\n5. Premium inquiry → Enterprise Inquiry → Duck Creek → Forward to Premium Accounting\n6. No statement → Check Duck Creek → Policy Extended Data → Producer Account Reference\n\n**Escalation:** Negative→Surety, Premium→Premium Accounting, Portal→IT`,
      keywords: ['rlink 3', 'duck creek', 'commission', 'producer account']
    },
    'collections-rlink-wins-notes': {
      id: 'collections-rlink-wins-notes',
      name: 'Collections - RLink & WINS Notes',
      category: 'Collections',
      difficulty: 'Advanced',
      summary: 'Update collection notes in WINS and RLink monthly',
      content: `**Applications:** Excel, WINS, RLink3\n**Frequency:** Monthly\n\n**WINS:** "Notes Needed" tab → Search bond → Shift+F1 → Type '5' (view) → Type '2' (revise) → Add [Year]: $[Amount] → F6 (update) → Excel "UPDATE"\n\n**RLink:** My Bond Center → Search bond → OPEN → Notes → Edit "Direct Collect" → Update amounts → Add: MM/DD/YYYY- Sent YYYY term to collections [initials] → Zero remainder → "Surety Operations" → Save → Excel "UPDATED"\n\n**Rules:** ONE Collections note in WINS, ONE Direct Collect in RLink\n\n**New:** Type '1' TAB "COLLECTIONS" → Excel "CNEW"`,
      keywords: ['shift+f1', 'collections', 'my bond center', 'f6']
    },
    'direct-bill-db40': {
      id: 'direct-bill-db40',
      name: 'Direct Bill Collect (DB40)',
      category: 'Collections',
      difficulty: 'Advanced',
      summary: 'Monthly demand letters for probate and non-probate bonds',
      content: `**Applications:** Excel, Outlook, WINS, RLink3\n**Frequency:** Monthly\n\n**PROBATE:** L00HR (30 days) → L00HQ (20 days)\n- Check "Type of Work" (Executor, Guardian, etc.)\n- User: Megan Mazzeffi\n- Notes: "pended DB40, sent first letter"\n\n**NON-PROBATE:** M00DF (30 days) → L00CA (20 days)\n- Transaction: Renewal\n- Same process as probate\n\n**Special:** CBS (F8xxxx) → bonds@cbalaw.org only\nAgent 00984 → No email\nAZ → Confirm with Surety first\n\n**Offices:** TEX01→TX, SUR01→IL, PA→PA, AZ→AZ, CA→WA`,
      keywords: ['db40', 'probate', 'l00hr', 'megan mazzeffi', 'cbs']
    }
  });

  const getSmartAnswer = (question, sopContent) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('application') || lowerQ.includes('system')) {
      const app = sopContent.match(/\*\*Applications:\*\*[^\n]+/);
      return app ? app[0] : 'Applications listed in SOP content.';
    }
    
    if (lowerQ.includes('where') && (lowerQ.includes('send') || lowerQ.includes('email'))) {
      const emails = sopContent.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
      return emails ? `Email: ${[...new Set(emails)].join(', ')}` : 'Check escalation section.';
    }
    
    if (lowerQ.includes('difference') && lowerQ.includes('ach') && lowerQ.includes('check')) {
      return 'ACH: Direct deposit, add "A" after number\nCheck: Physical mail, no special marking';
    }
    
    if (lowerQ.includes('difference') && lowerQ.includes('wins') && lowerQ.includes('rlink')) {
      return 'WINS: Financial transactions, post payments\nRLink: Bond documentation, detailed notes';
    }
    
    if (lowerQ.includes('sla') || lowerQ.includes('deadline')) {
      const sla = sopContent.match(/\*\*SLA:\*\*[^\n]+/);
      return sla ? sla[0] : 'Check SLA section in SOP.';
    }
    
    return `Overview:\n\n${sopContent.substring(0, 400)}...\n\nAsk about: applications, where to send emails, differences, or SLA.`;
  };

  const generateQuiz = (sopId) => {
    const quizzes = {
      'agency-check-request': [
        { q: 'Where save statements?', options: ['P:\\SURETY\\Agency Check Requests', 'Desktop', 'Email', 'Downloads'], correct: 0 },
        { q: 'Escalation email?', options: ['help@rli.com', 'surety.accounting@rlicorp.com', 'support@rli.com', 'agent@rli.com'], correct: 1 },
        { q: 'System for statements?', options: ['WINS', 'RLink', 'Enterprise Inquiry', 'Lawson'], correct: 2 },
        { q: 'ACH marking?', options: ['No marking', 'Add "A" after number', 'Add "ACH"', 'Use negative'], correct: 1 },
        { q: 'GL code?', options: ['20/BSL01/255005', '10/BSL01/255005', '20/BSL02/255005', '30/BSL01/255005'], correct: 0 },
        { q: 'Processing day?', options: ['Monday', 'Wednesday', 'Friday', 'Daily'], correct: 1 },
        { q: 'Transaction code?', options: ['TR 82', 'TR 84', 'TR 86', 'TR 88'], correct: 1 },
        { q: 'Approve where?', options: ['WINS', 'Lawson', 'Image Express', 'Email'], correct: 2 },
        { q: 'Location 1 limit?', options: ['<$5k', '<$50k', '<$10m', '>$10m'], correct: 0 },
        { q: 'Vendor name?', options: ['AGENT BATCH', 'SURETY AGENCY BATCH', 'RLI VENDOR', 'PAYMENT'], correct: 1 }
      ],
      'agent-statement-requests': [
        { q: 'SLA?', options: ['Same day', '1 Business Day', '2 Days', '3 Days'], correct: 1 },
        { q: 'Negative commission?', options: ['Send', 'Flag to Surety, do NOT send', 'Contact agent', 'Zero'], correct: 1 },
        { q: 'Search agent names?', options: ['WINS', 'Duck Creek', 'RLink 3', 'Enterprise'], correct: 2 },
        { q: 'Premium order?', options: ['Duck Creek', 'Enterprise then Duck Creek', 'RLink', 'WINS'], correct: 1 },
        { q: 'Producer Account Reference?', options: ['Summary', 'Policy Extended Data', 'Endorsement', 'Premium'], correct: 1 },
        { q: 'Premium forward to?', options: ['Surety', 'Premium Accounting', 'Collections', 'IT'], correct: 1 },
        { q: 'Complete category?', options: ['Pending', 'Solartis', 'Waiting', 'Done'], correct: 1 },
        { q: 'Portal issues?', options: ['Surety', 'Premium', 'Access/IT Team', 'Collections'], correct: 2 },
        { q: 'Missing info?', options: ['Process', 'Contact agent', 'Reject', 'Old data'], correct: 1 },
        { q: 'Enterprise vs Duck Creek?', options: ['Same', 'Enterprise statements, Duck Creek premium', 'Duck Creek old', 'No difference'], correct: 1 }
      ],
      'collections-rlink-wins-notes': [
        { q: 'Excel tab?', options: ['All', 'Summary', 'Notes Needed', 'Collections'], correct: 2 },
        { q: 'WINS Notes shortcut?', options: ['Shift+F2', 'Shift+F1', 'Ctrl+F1', 'Alt+F1'], correct: 1 },
        { q: 'Collections notes in WINS?', options: ['Multiple', 'Two', 'Only ONE', 'None'], correct: 2 },
        { q: 'View note in WINS?', options: ['Type 3', 'Type 5', 'Type 7', 'Type 9'], correct: 1 },
        { q: 'Revise in WINS?', options: ['Type 1', 'Type 2', 'Type 3', 'Type 4'], correct: 1 },
        { q: 'Update key?', options: ['F2', 'F4', 'F6', 'F8'], correct: 2 },
        { q: 'Excel Column E updates?', options: ['UPDATED', 'UPDATE', 'DONE', 'COMPLETE'], correct: 1 },
        { q: 'Excel Column E new?', options: ['NEW', 'CREATE', 'CNEW', 'ADDED'], correct: 2 },
        { q: 'Direct Collect in RLink?', options: ['Multiple', 'Two', 'Only ONE', 'Depends'], correct: 2 },
        { q: 'RLink notes location?', options: ['Agent', 'Surety Operations', 'Collections', 'Archive'], correct: 1 }
      ],
      'direct-bill-db40': [
        { q: 'My Bond Center portal?', options: ['WINS', 'RLI net homepage', 'Lawson', 'Enterprise'], correct: 1 },
        { q: 'Probate difference?', options: ['Same', 'Court positions', 'Harder', 'None'], correct: 1 },
        { q: 'Initial probate letter?', options: ['L00CA', 'L00HQ', 'L00HR', 'M00DF'], correct: 2 },
        { q: 'Initial non-probate?', options: ['L00HR', 'M00DF', 'L00HQ', 'L00CA'], correct: 1 },
        { q: 'First reminder days?', options: ['10', '20', '30', '45'], correct: 2 },
        { q: 'Second reminder days?', options: ['10', '20', '30', '45'], correct: 1 },
        { q: 'User in letters?', options: ['Kelly Barnard', 'Megan Mazzeffi', 'Danielle Moore', 'Jennifer Hasse'], correct: 1 },
        { q: 'CBS email?', options: ['surety@rli.com', 'bonds@cbalaw.org', 'cbs@rli.com', 'collections@rli.com'], correct: 1 },
        { q: 'Agent 00984?', options: ['Email agent', 'NO email, just note', 'Skip', 'Email Surety'], correct: 1 },
        { q: 'Probate includes?', options: ['Manager', 'Executor', 'Agent', 'Vendor'], correct: 1 }
      ]
    };
    return quizzes[sopId] || [];
  };

  const handleLogin = () => {
    if (loginEmail) {
      setIsLoggedIn(true);
      setCurrentView('sop-list');
    }
  };

  const handleSelectSOP = (sopId) => {
    setSelectedSOP(sopId);
    setActiveMode('qa');
    const sop = sopDatabase[sopId];
    setMessages([{ id: 1, type: 'assistant', text: `Welcome to "${sop.name}"! ${sop.summary}\n\nAsk me about applications, where to send emails, differences between systems, SLA, or specific steps.` }]);
    setCurrentView('sop-detail');
    setQuizAnswers({});
    setCurrentQuizQuestions(generateQuiz(sopId));
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, type: 'user', text: input }]);
    const userInput = input;
    setInput('');
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 800));
    
    const sop = sopDatabase[selectedSOP];
    const response = getSmartAnswer(userInput, sop.content);
    
    setMessages(prev => [...prev, { id: prev.length + 1, type: 'assistant', text: response }]);
    setLoading(false);
  };

  const submitQuiz = () => {
    let correct = 0;
    currentQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    const pct = (correct / currentQuizQuestions.length) * 100;
    const msg = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '👍 Great!' : pct >= 60 ? '📚 Good!' : '📖 Keep practicing!';
    alert(`Score: ${correct}/${currentQuizQuestions.length} (${pct.toFixed(0)}%)\n\n${msg}`);
  };

  const retakeQuiz = () => {
    setQuizAnswers({});
    setCurrentQuizQuestions(generateQuiz(selectedSOP));
  };

  const handleUploadSOP = () => {
    if (!newSOPData.name || !newSOPData.content) {
      alert('Please fill SOP name and content!');
      return;
    }
    const newId = newSOPData.name.toLowerCase().replace(/\s+/g, '-');
    setSOPDatabase(prev => ({
      ...prev,
      [newId]: { ...newSOPData, id: newId, summary: 'Custom SOP', keywords: [] }
    }));
    setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
    setShowUploadModal(false);
    alert('SOP uploaded!');
  };

  const handleDeleteSOP = (sopId) => {
    if (window.confirm(`Delete "${sopDatabase[sopId].name}"?`)) {
      const newDB = { ...sopDatabase };
      delete newDB[sopId];
      setSOPDatabase(newDB);
      if (selectedSOP === sopId) {
        setSelectedSOP(null);
        setMessages([]);
        setCurrentView('sop-list');
      }
      alert('Deleted!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <FileText className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-center mb-6">RLI SOP Training</h1>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'sop-list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">SOP Training Library</h1>
              <p className="text-gray-600 mt-2">4 SOPs Ready for Training</p>
            </div>
            <button onClick={() => setShowUploadModal(true)} className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              <Upload size={20} /> Upload SOP
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(sopDatabase).map(sop => (
              <div key={sop.id} className="bg-white rounded-xl shadow-lg p-6 relative group">
                <button onClick={() => handleDeleteSOP(sop.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg">
                  <Trash2 size={18} />
                </button>
                <div className="flex justify-between mb-4">
                  <FileText className="text-blue-600" size={36} />
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    sop.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                    sop.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{sop.difficulty}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{sop.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{sop.category}</p>
                <p className="text-sm text-gray-500 mb-4">{sop.summary}</p>
                <button onClick={() => handleSelectSOP(sop.id)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold">
                  Start Training
                </button>
              </div>
            ))}
          </div>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload New SOP</h2>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <input placeholder="SOP Name" value={newSOPData.name} onChange={(e) => setNewSOPData(prev => ({ ...prev, name: e.target.value }))} className="w-full p-3 border rounded-lg mb-4" />
              <input placeholder="Category" value={newSOPData.category} onChange={(e) => setNewSOPData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-3 border rounded-lg mb-4" />
              <select value={newSOPData.difficulty} onChange={(e) => setNewSOPData(prev => ({ ...prev, difficulty: e.target.value }))} className="w-full p-3 border rounded-lg mb-4">
                <option value="">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <textarea placeholder="SOP Content" value={newSOPData.content} onChange={(e) => setNewSOPData(prev => ({ ...prev, content: e.target.value }))} className="w-full p-3 border rounded-lg mb-4 h-64" />
              <button onClick={handleUploadSOP} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Upload SOP</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const sop = sopDatabase[selectedSOP];
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">{sop.name}</h2>
            <p className="text-sm text-gray-600">{sop.category}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <button onClick={() => setActiveMode('qa')} className={`w-full p-3 rounded-lg mb-2 ${activeMode === 'qa' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Q&A Mode</button>
            <button onClick={() => setActiveMode('quiz')} className={`w-full p-3 rounded-lg mb-2 ${activeMode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Quiz Mode</button>
            <button onClick={() => setActiveMode('content')} className={`w-full p-3 rounded-lg ${activeMode === 'content' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>View Content</button>
          </div>
          <div className="p-6 border-t">
            <button onClick={() => { setSelectedSOP(null); setCurrentView('sop-list'); }} className="w-full bg-gray-600 text-white py-3 rounded-lg">Back to List</button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">{activeMode === 'qa' ? 'Q&A Mode' : activeMode === 'quiz' ? 'Quiz Mode' : 'SOP Content'}</h1>
        </div>

        {activeMode === 'qa' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-4 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="bg-gray-200 p-4 rounded-lg">Typing...</div></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the SOP..."
                  className="flex-1 p-3 border rounded-lg"
                />
                <button onClick={handleSendMessage} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'quiz' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Quiz: {sop.name}</h2>
                <p className="text-gray-600 mb-4">{currentQuizQuestions.length} questions</p>
              </div>
              {currentQuizQuestions.map((q, i) => (
                <div key={i} className="bg-white rounded-xl p-6 mb-4">
                  <p className="font-bold mb-4">Q{i+1}. {q.q}</p>
                  {q.options.map((opt, j) => (
                    <div key={j} className={`p-3 mb-2 border rounded-lg cursor-pointer ${quizAnswers[i] === j ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`} onClick={() => setQuizAnswers(prev => ({ ...prev, [i]: j }))}>
                      {opt}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex gap-4">
                <button onClick={submitQuiz} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold">Submit Quiz</button>
                <button onClick={retakeQuiz} className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold">Retake</button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'content' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">{sop.name}</h2>
              <div className="prose max-w-none whitespace-pre-wrap">{sop.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
