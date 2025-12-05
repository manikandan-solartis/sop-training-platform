import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, CheckCircle, XCircle } from 'lucide-react';

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
  const [sopDatabase, setSOPDatabase] = useState({});
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  // Generate quiz questions automatically from SOP content
  const generateQuizQuestions = (sopContent) => {
    const lines = sopContent.split('\n').filter(line => line.trim());
    const steps = lines.filter(line => line.trim().toLowerCase().startsWith('step'));
    const questions = [];

    // Generate questions about each step
    steps.forEach((step, idx) => {
      const stepNumber = idx + 1;
      const stepContent = step.split(':')[1]?.trim() || step;
      
      // Question 1: What is step X?
      questions.push({
        q: `What is Step ${stepNumber}?`,
        options: [
          stepContent,
          steps[(idx + 1) % steps.length]?.split(':')[1]?.trim() || 'Check documentation',
          steps[(idx + 2) % steps.length]?.split(':')[1]?.trim() || 'Review process',
          'None of the above'
        ],
        correct: 0
      });

      // Question 2: Which step involves...?
      const keywords = stepContent.split(' ').slice(0, 3).join(' ');
      questions.push({
        q: `Which step involves "${keywords}"?`,
        options: [
          `Step ${stepNumber}`,
          `Step ${(stepNumber % steps.length) + 1}`,
          `Step ${((stepNumber + 1) % steps.length) + 1}`,
          'Not mentioned'
        ],
        correct: 0
      });
    });

    // Question about total steps
    questions.push({
      q: 'How many steps are in this process?',
      options: [
        `${steps.length} steps`,
        `${steps.length + 1} steps`,
        `${steps.length - 1} steps`,
        `${steps.length + 2} steps`
      ],
      correct: 0
    });

    // Question about first step
    if (steps[0]) {
      questions.push({
        q: 'What is the first step in this process?',
        options: [
          steps[0].split(':')[1]?.trim() || steps[0],
          steps[1]?.split(':')[1]?.trim() || 'Step 2',
          steps[2]?.split(':')[1]?.trim() || 'Step 3',
          'Review documentation'
        ],
        correct: 0
      });
    }

    // Question about last step
    if (steps.length > 0) {
      questions.push({
        q: 'What is the final step in this process?',
        options: [
          steps[steps.length - 1].split(':')[1]?.trim() || steps[steps.length - 1],
          steps[0].split(':')[1]?.trim() || 'First step',
          steps[1]?.split(':')[1]?.trim() || 'Second step',
          'There is no final step'
        ],
        correct: 0
      });
    }

    // SLA related questions
    const slaLine = lines.find(line => line.toLowerCase().includes('sla'));
    if (slaLine) {
      questions.push({
        q: 'What is the SLA for this process?',
        options: [
          slaLine.replace(/sla:/gi, '').trim(),
          '24 hours',
          '48 hours',
          '72 hours'
        ],
        correct: 0
      });
    }

    // Follow-up related questions
    const followupLine = lines.find(line => line.toLowerCase().includes('follow'));
    if (followupLine) {
      questions.push({
        q: 'What is the follow-up procedure?',
        options: [
          followupLine.trim(),
          'No follow-up required',
          'Daily follow-up',
          'Monthly follow-up'
        ],
        correct: 0
      });
    }

    // Order questions
    if (steps.length >= 3) {
      questions.push({
        q: `Which step comes after "${steps[1].split(':')[1]?.trim()}"?`,
        options: [
          steps[2].split(':')[1]?.trim() || 'Step 3',
          steps[0].split(':')[1]?.trim() || 'Step 1',
          steps[1].split(':')[1]?.trim() || 'Step 2',
          'Process ends'
        ],
        correct: 0
      });
    }

    // Ensure we have at least 10 questions by adding generic ones
    while (questions.length < 10) {
      questions.push({
        q: `According to the SOP, which statement is correct?`,
        options: [
          'Follow the documented process',
          'Skip unnecessary steps',
          'Ignore SLA requirements',
          'Proceed without validation'
        ],
        correct: 0
      });
    }

    return questions;
  };

  // Shuffle and select random questions
  const getRandomQuestions = (allQuestions, count = 10) => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length)).map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5).map((opt, idx) => {
        if (opt === q.options[q.correct]) {
          q.correct = idx;
        }
        return opt;
      })
    }));
  };

  const getSmartAnswer = (question, sopContent) => {
    const lowerQ = question.toLowerCase();
    const lines = sopContent.split('\n');
    const steps = lines.filter(line => line.trim().toLowerCase().startsWith('step'));
    
    if (lowerQ.includes('first') || lowerQ.includes('start') || lowerQ.includes('begin')) {
      return steps[0] ? `The first step is: ${steps[0].replace(/step 1:/gi, '').trim()}` : 'Please refer to the SOP content for the first step.';
    }
    
    if (lowerQ.includes('last') || lowerQ.includes('final') || lowerQ.includes('end')) {
      return steps.length > 0 ? `The final step is: ${steps[steps.length - 1].split(':')[1]?.trim()}` : 'Please refer to the SOP for the final step.';
    }
    
    if (lowerQ.includes('sla') || lowerQ.includes('time') || lowerQ.includes('how long')) {
      const slaLine = lines.find(line => line.toLowerCase().includes('sla'));
      return slaLine ? `Regarding SLA: ${slaLine.replace(/sla:/gi, '').trim()}` : 'SLA information is available in the SOP content above.';
    }
    
    if (lowerQ.includes('how many steps') || lowerQ.includes('number of steps')) {
      return `This process has ${steps.length} steps in total.`;
    }
    
    const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step/);
    if (stepMatch) {
      const stepNum = parseInt(stepMatch[1] || stepMatch[2]);
      if (steps[stepNum - 1]) {
        return `${steps[stepNum - 1]}`;
      }
    }
    
    if (lowerQ.includes('follow') || lowerQ.includes('after')) {
      const followLine = lines.find(line => line.toLowerCase().includes('follow'));
      if (followLine) return followLine;
    }
    
    const keywords = lowerQ.split(' ').filter(w => w.length > 3);
    for (const keyword of keywords) {
      const relevantLine = lines.find(line => line.toLowerCase().includes(keyword));
      if (relevantLine && relevantLine.trim()) {
        return `Based on the SOP: ${relevantLine.trim()}`;
      }
    }
    
    return `Based on the SOP content, here are the key steps:\n${steps.join('\n')}\n\nPlease review the complete SOP above for more details, or ask a more specific question.`;
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
    setMessages([{ id: 1, type: 'assistant', text: `Welcome! I'm your SOP trainer for "${sopDatabase[sopId].name}". I've reviewed this SOP and I'm ready to help you understand it. Ask me anything!` }]);
    setCurrentView('sop-detail');
    setQuizAnswers({});
    setQuizScore(0);
    
    // Generate new random quiz questions
    const allQuestions = generateQuizQuestions(sopDatabase[sopId].content);
    setCurrentQuizQuestions(getRandomQuestions(allQuestions, 10));
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 800));
    
    const sopContent = sopDatabase[selectedSOP]?.content || '';
    const response = getSmartAnswer(input, sopContent);
    
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
    alert(`You scored ${correct} out of ${currentQuizQuestions.length}! ${correct === currentQuizQuestions.length ? '🎉 Perfect!' : 'Review the SOP and try again.'}`);
  };

  const retakeQuiz = () => {
    setQuizAnswers({});
    setQuizScore(0);
    const allQuestions = generateQuizQuestions(sopDatabase[selectedSOP].content);
    setCurrentQuizQuestions(getRandomQuestions(allQuestions, 10));
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
        content: newSOPData.content
      }
    }));
    setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
    setShowUploadModal(false);
    alert('SOP uploaded successfully!');
  };

  useEffect(() => {
    if (activeMode === 'quiz' && selectedSOP && currentQuizQuestions.length === 0) {
      const allQuestions = generateQuizQuestions(sopDatabase[selectedSOP].content);
      setCurrentQuizQuestions(getRandomQuestions(allQuestions, 10));
    }
  }, [activeMode, selectedSOP, sopDatabase, currentQuizQuestions.length]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">SOP Training Platform</h1>
          <p className="text-gray-600 text-center mb-6">Solartis Enterprise Training</p>
          <div className="space-y-4">
            <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Login</button>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">Enter any email and password to login</p>
        </div>
      </div>
    );
  }

  if (currentView === 'sop-list') {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SOP Training Platform</h1>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowUploadModal(true)} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2 hover:bg-green-700">
              <Upload size={18} /> Upload SOP
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
          </div>
        </nav>
        <div className="p-6">
          <input placeholder="Search SOPs..." className="w-full px-4 py-2 border rounded-lg mb-6" />
          
          {Object.keys(sopDatabase).length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No SOPs Available</h2>
              <p className="text-gray-600 mb-4">Upload your first SOP to get started</p>
              <button onClick={() => setShowUploadModal(true)} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Upload SOP
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(sopDatabase).map(sop => (
                <div key={sop.id} className="bg-white rounded-lg shadow hover:shadow-lg p-6 cursor-pointer transition-all" onClick={() => handleSelectSOP(sop.id)}>
                  <FileText className="text-blue-600 mb-2" size={24} />
                  <h3 className="text-lg font-bold text-gray-800">{sop.name}</h3>
                  <p className="text-sm text-gray-600">{sop.category}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">{sop.difficulty}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Upload New SOP</h2>
              <div className="space-y-4">
                <input type="text" placeholder="SOP Name *" value={newSOPData.name} onChange={e => setNewSOPData({...newSOPData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Category (e.g., Payment Processing)" value={newSOPData.category} onChange={e => setNewSOPData({...newSOPData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <select value={newSOPData.difficulty} onChange={e => setNewSOPData({...newSOPData, difficulty: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Select Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <textarea placeholder="SOP Content * (Include steps, SLA, etc.)" value={newSOPData.content} onChange={e => setNewSOPData({...newSOPData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-64" />
                <div className="flex gap-2">
                  <button onClick={handleUploadSOP} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Upload SOP</button>
                  <button onClick={() => setShowUploadModal(false)} className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'sop-detail' && selectedSOP) {
    const currentSOP = sopDatabase[selectedSOP];

    return (
      <div className="min-h-screen bg-gray-100 flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-blue-900 text-white transition-all overflow-hidden`}>
          <div className="p-4">
            <h2 className="font-bold mb-4 truncate">{currentSOP.name}</h2>
            <button onClick={() => setActiveMode('qa')} className={`w-full text-left px-3 py-2 rounded mb-2 ${activeMode === 'qa' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>💬 Q&A</button>
            <button onClick={() => setActiveMode('quiz')} className={`w-full text-left px-3 py-2 rounded mb-2 ${activeMode === 'quiz' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>✅ Quiz</button>
            <button onClick={() => setActiveMode('guide')} className={`w-full text-left px-3 py-2 rounded ${activeMode === 'guide' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>📖 Guide</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">{sidebarOpen ? <X size={24} /> : <Menu size={24} />}</button>
            <h1 className="text-xl font-bold">{currentSOP.name}</h1>
            <button onClick={() => setCurrentView('sop-list')} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
          </nav>
          
          <div className="flex-1 overflow-y-auto p-6">
            {activeMode === 'qa' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-bold text-lg mb-2">SOP Content</h3>
                  <pre className="whitespace-pre-wrap text-sm">{currentSOP.content}</pre>
                </div>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl p-3 rounded ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{msg.text}</div>
                  </div>
                ))}
                {loading && <p className="text-gray-500">Analyzing SOP...</p>}
                <div ref={messagesEndRef} />
              </div>
            )}

            {activeMode === 'quiz' && (
              <div className="bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl">Knowledge Check Quiz</h3>
                  <button onClick={retakeQuiz} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">New Questions</button>
                </div>
                <p className="text-gray-600 mb-6">Answer all 10 questions. Click "New Questions" to get a different set.</p>
                <div className="space-y-6">
                  {currentQuizQuestions.map((question, qIdx) => (
                    <div key={qIdx} className="border-b pb-4">
                      <p className="font-semibold mb-2">{qIdx + 1}. {question.q}</p>
                      <div className="space-y-2 ml-4">
                        {question.options.map((option, oIdx) => (
                          <label key={oIdx} className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name={`q${qIdx}`} checked={quizAnswers[qIdx] === oIdx} onChange={() => handleQuizAnswer(qIdx, oIdx)} className="cursor-pointer" />
                            <span>{option}</span>
                            {quizScore > 0 && (
                              oIdx === question.correct ? <CheckCircle className="text-green-600" size={16} /> :
                              quizAnswers[qIdx] === oIdx ? <XCircle className="text-red-600" size={16} /> : null
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={submitQuiz} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">Submit Quiz</button>
                  {quizScore > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded">
                      <p className="text-lg font-bold">Score: {quizScore}/{currentQuizQuestions.length}</p>
                      <p>{quizScore === currentQuizQuestions.length ? '🎉 Perfect score!' : quizScore >= 7 ? '👍 Good job!' : 'Review the SOP and try again!'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeMode === 'guide' && (
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-bold text-xl mb-4">Step-by-Step Guide</h3>
                <div className="space-y-4">
                  {currentSOP.content.split('\n').filter(line => line.trim().toLowerCase().startsWith('step')).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">{idx + 1}</div>
                      <div className="flex-1">
                        <p className="font-semibold">{step.split(':')[0]}</p>
                        <p className="text-gray-700">{step.split(':')[1]?.trim()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
                    <h4 className="font-bold mb-2">Additional Information:</h4>
                    {currentSOP.content.split('\n').filter(line => !line.trim().toLowerCase().startsWith('step') && line.trim()).map((line, idx) => (
                      <p key={idx} className="text-sm text-gray-700 mb-1">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {activeMode === 'qa' && (
            <div className="bg-white p-4 flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ask a question..." className="flex-1 px-4 py-2 border rounded-lg" />
              <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"><Send size={18} />Send</button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default App;
