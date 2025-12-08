import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, Trash2, AlertCircle } from 'lucide-react';
import { sopData } from './sopData';
import { getSmartAnswer } from './aiTrainer';
import { generateQuiz } from './quizGenerator';

// Valid credentials - In production, this should be in a backend
const VALID_CREDENTIALS = [
  { email: 'admin@solartis.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { email: 'user1@solartis.com', password: 'user123', name: 'User 1', role: 'user' },
  { email: 'user2@solartis.com', password: 'user123', name: 'User 2', role: 'user' },
  { email: 'user3@solartis.com', password: 'user123', name: 'User 3', role: 'user' },
  { email: 'user4@solartis.com', password: 'user123', name: 'User 4', role: 'user' },
  { email: 'user5@solartis.com', password: 'user123', name: 'User 5', role: 'user' },
  { email: 'user6@solartis.com', password: 'user123', name: 'User 6', role: 'user' },
  { email: 'user7@solartis.com', password: 'user123', name: 'User 7', role: 'user' },
  { email: 'user8@solartis.com', password: 'user123', name: 'User 8', role: 'user' },
  { email: 'user9@solartis.com', password: 'user123', name: 'User 9', role: 'user' }
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('qa');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSOPData, setNewSOPData] = useState({ name: '', category: '', difficulty: '', content: '' });
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const [sopDatabase, setSOPDatabase] = useState(sopData);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password');
      return;
    }

    const user = VALID_CREDENTIALS.find(
      cred => cred.email.toLowerCase() === loginEmail.toLowerCase() && cred.password === loginPassword
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('sop-list');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedSOP(null);
    setMessages([]);
    setCurrentView('login');
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  const handleSelectSOP = (sopId) => {
    setSelectedSOP(sopId);
    setActiveMode('qa');
    const sop = sopDatabase[sopId];
    setMessages([{ 
      id: 1, 
      type: 'assistant', 
      text: `Welcome to "${sop.name}"!\n\n${sop.summary}\n\nI can help you with:\n• Understanding specific steps\n• Applications and systems used\n• Email addresses and escalation contacts\n• Differences between processes\n• SLA and timing requirements\n\nWhat would you like to know?`
    }]);
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
    const response = getSmartAnswer(userInput, sop.content, sop.keywords);
    
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
    alert('SOP uploaded successfully!');
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
      alert('SOP deleted successfully!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <FileText className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-center mb-2">RLI SOP Training</h1>
          <p className="text-center text-gray-600 mb-6">Enterprise Training Platform</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setLoginError('');
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginError('');
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle size={20} />
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">Need Help?</p>
            <p className="text-xs text-blue-800">Contact your administrator for login credentials.</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'sop-list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold">SOP Training Platform</h1>
                <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold">SOP Library</h2>
              <p className="text-gray-600 mt-2">{Object.keys(sopDatabase).length} SOPs Available</p>
            </div>
            {currentUser.role === 'admin' && (
              <button 
                onClick={() => setShowUploadModal(true)} 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
              >
                <Upload size={20} /> Upload SOP
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(sopDatabase).map(sop => (
              <div key={sop.id} className="bg-white rounded-xl shadow-lg p-6 relative group hover:shadow-xl transition-shadow">
                {currentUser.role === 'admin' && (
                  <button 
                    onClick={() => handleDeleteSOP(sop.id)} 
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="flex justify-between mb-4">
                  <FileText className="text-blue-600" size={36} />
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    sop.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                    sop.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{sop.difficulty}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{sop.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{sop.category}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{sop.summary}</p>
                <button 
                  onClick={() => handleSelectSOP(sop.id)} 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Start Training
                </button>
              </div>
            ))}
          </div>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload New SOP</h2>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <input 
                placeholder="SOP Name" 
                value={newSOPData.name} 
                onChange={(e) => setNewSOPData(prev => ({ ...prev, name: e.target.value }))} 
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500" 
              />
              <input 
                placeholder="Category" 
                value={newSOPData.category} 
                onChange={(e) => setNewSOPData(prev => ({ ...prev, category: e.target.value }))} 
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500" 
              />
              <select 
                value={newSOPData.difficulty} 
                onChange={(e) => setNewSOPData(prev => ({ ...prev, difficulty: e.target.value }))} 
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <textarea 
                placeholder="SOP Content" 
                value={newSOPData.content} 
                onChange={(e) => setNewSOPData(prev => ({ ...prev, content: e.target.value }))} 
                className="w-full p-3 border rounded-lg mb-4 h-64 focus:ring-2 focus:ring-blue-500" 
              />
              <button 
                onClick={handleUploadSOP} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Upload SOP
              </button>
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
            <p className="text-xs text-gray-500 mt-2">Logged in as {currentUser.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <button 
              onClick={() => setActiveMode('qa')} 
              className={`w-full p-3 rounded-lg mb-2 font-semibold transition-colors ${activeMode === 'qa' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              💬 Q&A Mode
            </button>
            <button 
              onClick={() => setActiveMode('quiz')} 
              className={`w-full p-3 rounded-lg mb-2 font-semibold transition-colors ${activeMode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              ✅ Quiz Mode
            </button>
            <button 
              onClick={() => setActiveMode('content')} 
              className={`w-full p-3 rounded-lg font-semibold transition-colors ${activeMode === 'content' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              📖 View Content
            </button>
          </div>
          <div className="p-6 border-t space-y-2">
            <button 
              onClick={() => { setSelectedSOP(null); setCurrentView('sop-list'); }} 
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              ← Back to List
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {activeMode === 'qa' ? 'Q&A Mode' : activeMode === 'quiz' ? 'Quiz Mode' : 'SOP Content'}
          </h1>
        </div>

        {activeMode === 'qa' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-4 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{msg.text}</pre>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse">Analyzing SOP...</div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the SOP..."
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSendMessage} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'quiz' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Quiz: {sop.name}</h2>
                <p className="text-gray-600 mb-4">{currentQuizQuestions.length} questions • Select your answers</p>
              </div>
              {currentQuizQuestions.map((q, i) => (
                <div key={i} className="bg-white rounded-xl p-6 mb-4 shadow-sm">
                  <p className="font-bold mb-4">Q{i+1}. {q.q}</p>
                  {q.options.map((opt, j) => (
                    <div 
                      key={j} 
                      className={`p-3 mb-2 border rounded-lg cursor-pointer transition-colors ${
                        quizAnswers[i] === j 
                          ? 'bg-blue-100 border-blue-500' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`} 
                      onClick={() => setQuizAnswers(prev => ({ ...prev, [i]: j }))}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex gap-4">
                <button 
                  onClick={submitQuiz} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Quiz
                </button>
                <button 
                  onClick={retakeQuiz} 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  New Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'content' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold mb-6">{sop.name}</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{sop.content}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
