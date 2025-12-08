import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, Trash2, AlertCircle, Clock, Users, BarChart3, Activity } from 'lucide-react';
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
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sopStartTime, setSOPStartTime] = useState(null);
  const [userActivities, setUserActivities] = useState(() => {
    const saved = localStorage.getItem('userActivities');
    return saved ? JSON.parse(saved) : [];
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userActivities', JSON.stringify(userActivities));
  }, [userActivities]);

  // Track time spent on current SOP
  useEffect(() => {
    let interval;
    if (selectedSOP && sopStartTime) {
      interval = setInterval(() => {
        // Update every minute silently
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [selectedSOP, sopStartTime]);

  const logActivity = (activityType, details = {}) => {
    const activity = {
      id: Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      activityType,
      timestamp: new Date().toISOString(),
      ...details
    };
    setUserActivities(prev => [activity, ...prev]);
  };

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
      const loginTime = new Date();
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('sop-list');
      setSessionStartTime(loginTime);
      setLoginEmail('');
      setLoginPassword('');
      
      logActivity('login', {
        loginTime: loginTime.toISOString()
      });
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    const logoutTime = new Date();
    const sessionDuration = sessionStartTime 
      ? Math.round((logoutTime - sessionStartTime) / 1000 / 60) // minutes
      : 0;

    logActivity('logout', {
      logoutTime: logoutTime.toISOString(),
      sessionDuration: `${sessionDuration} minutes`
    });

    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedSOP(null);
    setMessages([]);
    setCurrentView('login');
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setSessionStartTime(null);
    setSOPStartTime(null);
  };

  const handleSelectSOP = (sopId) => {
    // Log time spent on previous SOP if any
    if (selectedSOP && sopStartTime) {
      const timeSpent = Math.round((new Date() - sopStartTime) / 1000 / 60);
      logActivity('sop_time', {
        sopId: selectedSOP,
        sopName: sopDatabase[selectedSOP].name,
        timeSpent: `${timeSpent} minutes`
      });
    }

    setSelectedSOP(sopId);
    setActiveMode('qa');
    setSOPStartTime(new Date());
    const sop = sopDatabase[sopId];
    
    setMessages([{ 
      id: 1, 
      type: 'assistant', 
      text: `Welcome to "${sop.name}"!\n\n${sop.summary}\n\nI can help you with:\n• Understanding specific steps\n• Applications and systems used\n• Email addresses and escalation contacts\n• Differences between processes\n• SLA and timing requirements\n\nWhat would you like to know?`
    }]);
    setCurrentView('sop-detail');
    setQuizAnswers({});
    setCurrentQuizQuestions(generateQuiz(sopId));

    logActivity('sop_access', {
      sopId,
      sopName: sop.name,
      sopCategory: sop.category
    });
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

    logActivity('qa_interaction', {
      sopId: selectedSOP,
      sopName: sop.name,
      question: userInput.substring(0, 100) // Log first 100 chars
    });
  };

  const submitQuiz = () => {
    let correct = 0;
    currentQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    const pct = (correct / currentQuizQuestions.length) * 100;
    const msg = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '👍 Great!' : pct >= 60 ? '📚 Good!' : '📖 Keep practicing!';
    
    logActivity('quiz_completed', {
      sopId: selectedSOP,
      sopName: sopDatabase[selectedSOP].name,
      score: `${correct}/${currentQuizQuestions.length}`,
      percentage: `${pct.toFixed(0)}%`,
      totalQuestions: currentQuizQuestions.length,
      correctAnswers: correct
    });

    alert(`Score: ${correct}/${currentQuizQuestions.length} (${pct.toFixed(0)}%)\n\n${msg}`);
  };

  const retakeQuiz = () => {
    setQuizAnswers({});
    setCurrentQuizQuestions(generateQuiz(selectedSOP));
    
    logActivity('quiz_retake', {
      sopId: selectedSOP,
      sopName: sopDatabase[selectedSOP].name
    });
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
    
    logActivity('sop_uploaded', {
      sopId: newId,
      sopName: newSOPData.name,
      sopCategory: newSOPData.category,
      sopDifficulty: newSOPData.difficulty
    });

    setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
    setShowUploadModal(false);
    alert('SOP uploaded successfully!');
  };

  const handleDeleteSOP = (sopId) => {
    if (window.confirm(`Delete "${sopDatabase[sopId].name}"?`)) {
      const deletedSOP = sopDatabase[sopId];
      const newDB = { ...sopDatabase };
      delete newDB[sopId];
      setSOPDatabase(newDB);
      
      logActivity('sop_deleted', {
        sopId,
        sopName: deletedSOP.name
      });

      if (selectedSOP === sopId) {
        setSelectedSOP(null);
        setMessages([]);
        setCurrentView('sop-list');
      }
      alert('SOP deleted successfully!');
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getUserStats = (email) => {
    const userActivitiesFiltered = userActivities.filter(a => a.userEmail === email);
    const quizzes = userActivitiesFiltered.filter(a => a.activityType === 'quiz_completed');
    const sopAccesses = userActivitiesFiltered.filter(a => a.activityType === 'sop_access');
    const timeActivities = userActivitiesFiltered.filter(a => a.activityType === 'sop_time');
    
    const totalTime = timeActivities.reduce((sum, a) => {
      const mins = parseInt(a.timeSpent);
      return sum + (isNaN(mins) ? 0 : mins);
    }, 0);

    const avgScore = quizzes.length > 0
      ? quizzes.reduce((sum, q) => sum + parseInt(q.percentage), 0) / quizzes.length
      : 0;

    return {
      totalQuizzes: quizzes.length,
      totalSOPsAccessed: new Set(sopAccesses.map(a => a.sopId)).size,
      totalTimeSpent: totalTime,
      averageScore: avgScore.toFixed(0)
    };
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
            <div className="flex items-center gap-3">
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => setCurrentView('analytics')}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <BarChart3 size={18} />
                  Analytics
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
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

  if (currentView === 'analytics') {
    const allUsers = VALID_CREDENTIALS.filter(u => u.role === 'user');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold">User Analytics</h1>
                <p className="text-sm text-gray-600">Training Activity Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentView('sop-list')}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
              >
                ← Back to SOPs
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-blue-600" size={24} />
                <h3 className="font-semibold text-gray-700">Total Users</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{allUsers.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-green-600" size={24} />
                <h3 className="font-semibold text-gray-700">Active Users</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(userActivities.map(a => a.userEmail)).size}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-purple-600" size={24} />
                <h3 className="font-semibold text-gray-700">Total Quizzes</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {userActivities.filter(a => a.activityType === 'quiz_completed').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-orange-600" size={24} />
                <h3 className="font-semibold text-gray-700">Total Time</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {formatDuration(userActivities
                  .filter(a => a.activityType === 'sop_time')
                  .reduce((sum, a) => sum + parseInt(a.timeSpent || 0), 0)
                )}
              </p>
            </div>
          </div>

          {/* User Statistics Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">User Statistics</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">SOPs Accessed</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Quizzes Taken</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time Spent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map(user => {
                    const stats = getUserStats(user.email);
                    const lastActivity = userActivities.find(a => a.userEmail === user.email);
                    return (
                      <tr key={user.email} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{stats.totalSOPsAccessed}</td>
                        <td className="py-3 px-4 text-gray-700">{stats.totalQuizzes}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            stats.averageScore >= 80 ? 'bg-green-100 text-green-700' :
                            stats.averageScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            stats.averageScore > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {stats.averageScore > 0 ? `${stats.averageScore}%` : 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {stats.totalTimeSpent > 0 ? formatDuration(stats.totalTimeSpent) : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {lastActivity ? new Date(lastActivity.timestamp).toLocaleString() : 'Never'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity Log</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {userActivities.slice(0, 50).map(activity => (
                <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.activityType === 'login' && <Users className="text-green-600" size={20} />}
                    {activity.activityType === 'logout' && <Users className="text-red-600" size={20} />}
                    {activity.activityType === 'sop_access' && <FileText className="text-blue-600" size={20} />}
                    {activity.activityType === 'quiz_completed' && <Activity className="text-purple-600" size={20} />}
                    {activity.activityType === 'quiz_retake' && <Activity className="text-orange-600" size={20} />}
                    {activity.activityType === 'sop_time' && <Clock className="text-gray-600" size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.userName}</p>
                    <p className="text-xs text-gray-600">
                      {activity.activityType === 'login' && 'Logged in'}
                      {activity.activityType === 'logout' && `Logged out (Session: ${activity.sessionDuration})`}
                      {activity.activityType === 'sop_access' && `Started training: ${activity.sopName}`}
                      {activity.activityType === 'quiz_completed' && `Completed quiz: ${activity.sopName} - Score: ${activity.score} (${activity.percentage})`}
                      {activity.activityType === 'quiz_retake' && `Retaking quiz: ${activity.sopName}`}
                      {activity.activityType === 'sop_time' && `Spent ${activity.timeSpent} on ${activity.sopName}`}
                      {activity.activityType === 'qa_interaction' && `Asked question in ${activity.sopName}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {userActivities.length === 0 && (
                <p className="text-center text-gray-500 py-8">No activity recorded yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
