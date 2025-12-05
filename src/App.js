import React, { useState, useRef } from 'react';
import { Send, FileText, Menu, X, Upload, CheckCircle, XCircle } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('en');
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
  const [sopDatabase, setSOPDatabase] = useState({
    'rating-siris': { 
      id: 'rating-siris', 
      name: 'Rating in SIRIS - GL', 
      category: 'Rating & Underwriting', 
      difficulty: 'Intermediate', 
      content: 'This process is performed to rate an insured based on Acord details.\n\nStep 1: Login to Nationwide system\nStep 2: Select SIRIS tool\nStep 3: Enter policy information\nStep 4: Add coverage details\nStep 5: Start rating\n\nSLA: ≤50 locations: 24hrs | 50-200: 48hrs | >200: 72hrs',
      quiz: [
        { q: 'What is the first step in the SIRIS rating process?', options: ['Select SIRIS tool', 'Login to Nationwide system', 'Enter policy information', 'Add coverage'], correct: 1 },
        { q: 'What is the SLA for rating ≤50 locations?', options: ['12 hours', '24 hours', '48 hours', '72 hours'], correct: 1 },
        { q: 'Which step comes after entering policy information?', options: ['Start rating', 'Add coverage details', 'Login to system', 'Select SIRIS tool'], correct: 1 }
      ]
    },
    'non-matching': { 
      id: 'non-matching', 
      name: 'Non Matching Payments', 
      category: 'Payment Processing', 
      difficulty: 'Advanced', 
      content: 'Process for handling Direct Bill bonds with short payments.\n\nStep 1: Receive notification\nStep 2: Forward to appropriate team\nStep 3: Create RLink3 note\nStep 4: Send non-matching letter\nStep 5: Set 7-day reminder\n\nFollow-up: Every 7 days until resolved',
      quiz: [
        { q: 'What is the first step when receiving a short payment?', options: ['Create note', 'Receive notification', 'Forward to team', 'Send letter'], correct: 1 },
        { q: 'How often should follow-ups occur?', options: ['Every 3 days', 'Every 5 days', 'Every 7 days', 'Every 10 days'], correct: 2 },
        { q: 'What type of note should be created?', options: ['RLink2 note', 'RLink3 note', 'Payment note', 'System note'], correct: 1 }
      ]
    },
    'claims': { 
      id: 'claims', 
      name: 'Claims Processing', 
      category: 'Claims', 
      difficulty: 'Intermediate', 
      content: 'Standard claims handling procedure.\n\nStep 1: Receive claim notice\nStep 2: Validate documents\nStep 3: Assess coverage\nStep 4: Calculate payout\nStep 5: Process disbursement\n\nSLA: 48 hours initial response',
      quiz: [
        { q: 'What is the SLA for initial response?', options: ['24 hours', '48 hours', '72 hours', '96 hours'], correct: 1 },
        { q: 'What comes after validating documents?', options: ['Receive notice', 'Assess coverage', 'Calculate payout', 'Process disbursement'], correct: 1 },
        { q: 'What is the last step in claims processing?', options: ['Validate documents', 'Assess coverage', 'Calculate payout', 'Process disbursement'], correct: 3 }
      ]
    }
  });
  const messagesEndRef = useRef(null);

  const translations = {
    en: { appName: 'SOP Training Platform', welcome: 'Welcome', login: 'Login', email: 'Email', password: 'Password', selectSOP: 'Select an SOP', logout: 'Logout', search: 'Search SOPs...', send: 'Send', askQuestion: 'Ask a question...', mode: 'Mode', qa: 'Q&A', quiz: 'Quiz', guide: 'Guide', metrics: 'Metrics', back: 'Back', language: 'Language', uploadSOP: 'Upload SOP', addNew: 'Add New SOP' },
    es: { appName: 'Plataforma SOP', welcome: 'Bienvenido', login: 'Iniciar sesión', email: 'Correo', password: 'Contraseña', selectSOP: 'Seleccionar SOP', logout: 'Cerrar sesión', search: 'Buscar SOPs...', send: 'Enviar', askQuestion: 'Haz una pregunta...', mode: 'Modo', qa: 'P&R', quiz: 'Cuestionario', guide: 'Guía', metrics: 'Métricas', back: 'Atrás', language: 'Idioma', uploadSOP: 'Subir SOP', addNew: 'Agregar Nuevo' },
    fr: { appName: 'Plateforme SOP', welcome: 'Bienvenue', login: 'Connexion', email: 'Email', password: 'Mot de passe', selectSOP: 'Sélectionner SOP', logout: 'Déconnexion', search: 'Rechercher...', send: 'Envoyer', askQuestion: 'Poser une question...', mode: 'Mode', qa: 'Q&R', quiz: 'Quiz', guide: 'Guide', metrics: 'Métriques', back: 'Retour', language: 'Langue', uploadSOP: 'Télécharger SOP', addNew: 'Ajouter Nouveau' },
    de: { appName: 'SOP-Plattform', welcome: 'Willkommen', login: 'Anmeldung', email: 'E-Mail', password: 'Passwort', selectSOP: 'SOP wählen', logout: 'Abmelden', search: 'Suchen...', send: 'Senden', askQuestion: 'Frage stellen...', mode: 'Modus', qa: 'F&A', quiz: 'Quiz', guide: 'Handbuch', metrics: 'Metriken', back: 'Zurück', language: 'Sprache', uploadSOP: 'SOP hochladen', addNew: 'Neu hinzufügen' },
    ta: { appName: 'SOP தளம்', welcome: 'வரவேற்கிறோம்', login: 'உள்நுழைய', email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', selectSOP: 'SOP தேர்வு', logout: 'வெளியேறு', search: 'தேடுக...', send: 'அனுப்பு', askQuestion: 'கேள்வி கேளுங்கள்...', mode: 'முறை', qa: 'Q&A', quiz: 'வினாடி', guide: 'வழிகாட்டி', metrics: 'மெட்ரிக்', back: 'பின்', language: 'மொழி', uploadSOP: 'SOP பதிவேற்று', addNew: 'புதியது சேர்' }
  };

  const t = translations[language];

  const getSmartAnswer = (question, sopContent) => {
    const lowerQ = question.toLowerCase();
    const lines = sopContent.split('\n');
    
    // Extract steps
    const steps = lines.filter(line => line.trim().startsWith('Step'));
    
    // Questions about first step
    if (lowerQ.includes('first') || lowerQ.includes('start') || lowerQ.includes('begin')) {
      return steps[0] ? `The first step is: ${steps[0].replace('Step 1:', '').trim()}` : 'Please refer to the SOP content for the first step.';
    }
    
    // Questions about last step
    if (lowerQ.includes('last') || lowerQ.includes('final') || lowerQ.includes('end')) {
      return steps.length > 0 ? `The final step is: ${steps[steps.length - 1].split(':')[1]?.trim()}` : 'Please refer to the SOP for the final step.';
    }
    
    // Questions about SLA
    if (lowerQ.includes('sla') || lowerQ.includes('time') || lowerQ.includes('how long')) {
      const slaLine = lines.find(line => line.toLowerCase().includes('sla'));
      return slaLine ? `Regarding SLA: ${slaLine.replace('SLA:', '').trim()}` : 'SLA information is available in the SOP content above.';
    }
    
    // Questions about steps count
    if (lowerQ.includes('how many steps') || lowerQ.includes('number of steps')) {
      return `This process has ${steps.length} steps in total.`;
    }
    
    // Questions about specific step number
    const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step/);
    if (stepMatch) {
      const stepNum = parseInt(stepMatch[1] || stepMatch[2]);
      if (steps[stepNum - 1]) {
        return `${steps[stepNum - 1]}`;
      }
    }
    
    // Questions about follow-up
    if (lowerQ.includes('follow') || lowerQ.includes('after')) {
      const followLine = lines.find(line => line.toLowerCase().includes('follow'));
      if (followLine) return followLine;
    }
    
    // General response - try to find relevant lines
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
    const quiz = sopDatabase[selectedSOP]?.quiz || [];
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    setQuizScore(correct);
    alert(`You scored ${correct} out of ${quiz.length}! ${correct === quiz.length ? '🎉 Perfect!' : 'Review the SOP and try again.'}`);
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
        quiz: []
      }
    }));
    setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
    setShowUploadModal(false);
    alert('SOP uploaded successfully!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t.appName}</h1>
          <p className="text-gray-600 text-center mb-6">Solartis Enterprise Training</p>
          <div className="space-y-4">
            <input type="email" placeholder={t.email} value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder={t.password} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ta">தமிழ்</option>
            </select>
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">{t.login}</button>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">Demo: Any email and password</p>
        </div>
      </div>
    );
  }

  if (currentView === 'sop-list') {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{t.appName}</h1>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowUploadModal(true)} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2 hover:bg-green-700">
              <Upload size={18} /> {t.uploadSOP}
            </button>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="px-3 py-1 border rounded">
              <option value="en">EN</option><option value="es">ES</option><option value="fr">FR</option><option value="de">DE</option><option value="ta">TA</option>
            </select>
            <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 bg-red-600 text-white rounded">{t.logout}</button>
          </div>
        </nav>
        <div className="p-6">
          <input placeholder={t.search} className="w-full px-4 py-2 border rounded-lg mb-6" />
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
    const quiz = currentSOP?.quiz || [];

    return (
      <div className="min-h-screen bg-gray-100 flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-blue-900 text-white transition-all overflow-hidden`}>
          <div className="p-4">
            <h2 className="font-bold mb-4 truncate">{currentSOP.name}</h2>
            <button onClick={() => setActiveMode('qa')} className={`w-full text-left px-3 py-2 rounded mb-2 ${activeMode === 'qa' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>💬 {t.qa}</button>
            <button onClick={() => setActiveMode('quiz')} className={`w-full text-left px-3 py-2 rounded mb-2 ${activeMode === 'quiz' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>✅ {t.quiz}</button>
            <button onClick={() => setActiveMode('guide')} className={`w-full text-left px-3 py-2 rounded ${activeMode === 'guide' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}>📖 {t.guide}</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">{sidebarOpen ? <X size={24} /> : <Menu size={24} />}</button>
            <h1 className="text-xl font-bold">{currentSOP.name}</h1>
            <button onClick={() => setCurrentView('sop-list')} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">{t.back}</button>
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
                <h3 className="font-bold text-xl mb-4">Knowledge Check Quiz</h3>
                {quiz.length > 0 ? (
                  <div className="space-y-6">
                    {quiz.map((question, qIdx) => (
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
                    <button onClick={submitQuiz} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Submit Quiz</button>
                    {quizScore > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded">
                        <p className="text-lg font-bold">Score: {quizScore}/{quiz.length}</p>
                        <p>{quizScore === quiz.length ? '🎉 Perfect score!' : 'Review the SOP and try again!'}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No quiz available for this SOP yet. Contact admin to add quiz questions.</p>
                )}
              </div>
            )}

            {activeMode === 'guide' && (
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-bold text-xl mb-4">Step-by-Step Guide</h3>
                <div className="space-y-4">
                  {currentSOP.content.split('\n').filter(line => line.trim().startsWith('Step')).map((step, idx) => (
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
                    {currentSOP.content.split('\n').filter(line => !line.trim().startsWith('Step') && line.trim()).map((line, idx) => (
                      <p key={idx} className="text-sm text-gray-700">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {activeMode === 'qa' && (
            <div className="bg-white p-4 flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder={t.askQuestion} className="flex-1 px-4 py-2 border rounded-lg" />
              <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"><Send size={18} />{t.send}</button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default App;
