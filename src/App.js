import React, { useState, useRef } from 'react';
import { Send, FileText, Menu, X } from 'lucide-react';

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
  const messagesEndRef = useRef(null);

  const translations = {
    en: { appName: 'SOP Training Platform', welcome: 'Welcome', login: 'Login', email: 'Email', password: 'Password', selectSOP: 'Select an SOP', logout: 'Logout', search: 'Search SOPs...', send: 'Send', askQuestion: 'Ask a question...', mode: 'Mode', qa: 'Q&A', quiz: 'Quiz', guide: 'Guide', metrics: 'Metrics', back: 'Back', language: 'Language' },
    es: { appName: 'Plataforma SOP', welcome: 'Bienvenido', login: 'Iniciar sesión', email: 'Correo', password: 'Contraseña', selectSOP: 'Seleccionar SOP', logout: 'Cerrar sesión', search: 'Buscar SOPs...', send: 'Enviar', askQuestion: 'Haz una pregunta...', mode: 'Modo', qa: 'P&R', quiz: 'Cuestionario', guide: 'Guía', metrics: 'Métricas', back: 'Atrás', language: 'Idioma' },
    fr: { appName: 'Plateforme SOP', welcome: 'Bienvenue', login: 'Connexion', email: 'Email', password: 'Mot de passe', selectSOP: 'Sélectionner SOP', logout: 'Déconnexion', search: 'Rechercher...', send: 'Envoyer', askQuestion: 'Poser une question...', mode: 'Mode', qa: 'Q&R', quiz: 'Quiz', guide: 'Guide', metrics: 'Métriques', back: 'Retour', language: 'Langue' },
    de: { appName: 'SOP-Plattform', welcome: 'Willkommen', login: 'Anmeldung', email: 'E-Mail', password: 'Passwort', selectSOP: 'SOP wählen', logout: 'Abmelden', search: 'Suchen...', send: 'Senden', askQuestion: 'Frage stellen...', mode: 'Modus', qa: 'F&A', quiz: 'Quiz', guide: 'Handbuch', metrics: 'Metriken', back: 'Zurück', language: 'Sprache' },
    ta: { appName: 'SOP தளம்', welcome: 'வரவேற்கிறோம்', login: 'உள்நுழைய', email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', selectSOP: 'SOP தேர்வு', logout: 'வெளியேறு', search: 'தேடுக...', send: 'அனுப்பு', askQuestion: 'கேள்வி கேளுங்கள்...', mode: 'முறை', qa: 'Q&A', quiz: 'வினாடி', guide: 'வழிகாட்டி', metrics: 'மெட்ரிக்', back: 'பின்', language: 'மொழி' }
  };

  const t = translations[language];

  const sopDatabase = {
    'rating-siris': { id: 'rating-siris', name: 'Rating in SIRIS - GL', category: 'Rating & Underwriting', difficulty: 'Intermediate', content: 'This process is performed to rate an insured based on Acord details.\n\nStep 1: Login to Nationwide system\nStep 2: Select SIRIS tool\nStep 3: Enter policy information\nStep 4: Add coverage details\nStep 5: Start rating\n\nSLA: ≤50 locations: 24hrs | 50-200: 48hrs | >200: 72hrs' },
    'non-matching': { id: 'non-matching', name: 'Non Matching Payments', category: 'Payment Processing', difficulty: 'Advanced', content: 'Process for handling Direct Bill bonds with short payments.\n\nStep 1: Receive notification\nStep 2: Forward to appropriate team\nStep 3: Create RLink3 note\nStep 4: Send non-matching letter\nStep 5: Set 7-day reminder\n\nFollow-up: Every 7 days until resolved' },
    'claims': { id: 'claims', name: 'Claims Processing', category: 'Claims', difficulty: 'Intermediate', content: 'Standard claims handling procedure.\n\nStep 1: Receive claim notice\nStep 2: Validate documents\nStep 3: Assess coverage\nStep 4: Calculate payout\nStep 5: Process disbursement\n\nSLA: 48 hours initial response' }
  };

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setCurrentView('sop-list');
    }
  };

  const handleSelectSOP = (sopId) => {
    setSelectedSOP(sopId);
    setMessages([{ id: 1, type: 'assistant', text: `Welcome to ${sopDatabase[sopId].name}. Ask me anything about this SOP!` }]);
    setCurrentView('sop-detail');
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 1000));
    
    const response = `Based on ${sopDatabase[selectedSOP]?.name}: ${input.includes('step') ? 'Please refer to the steps listed in the SOP content above.' : 'This is important information from the SOP. Please review the complete content for details.'}`;
    setMessages(prev => [...prev, { id: messages.length + 2, type: 'assistant', text: response }]);
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t.appName}</h1>
          <p className="text-gray-600 text-center mb-6">Solartis Enterprise Training</p>
          <div className="space-y-4">
            <input type="email" placeholder={t.email} value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder={t.password} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ta">தமிழ்</option>
            </select>
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">{t.login}</button>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">Demo: admin@solartis.com or user@solartis.com (any password)</p>
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
              <div key={sop.id} className="bg-white rounded-lg shadow hover:shadow-lg p-6 cursor-pointer" onClick={() => handleSelectSOP(sop.id)}>
                <FileText className="text-blue-600 mb-2" size={24} />
                <h3 className="text-lg font-bold text-gray-800">{sop.name}</h3>
                <p className="text-sm text-gray-600">{sop.category}</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">{sop.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'sop-detail' && selectedSOP) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-blue-900 text-white transition-all`}>
          <div className="p-4">
            <h2 className="font-bold mb-4">{sopDatabase[selectedSOP].name}</h2>
            <button className="w-full text-left px-3 py-2 bg-blue-500 rounded mb-2">💬 {t.qa}</button>
            <button className="w-full text-left px-3 py-2 hover:bg-blue-700 rounded mb-2">✅ {t.quiz}</button>
            <button className="w-full text-left px-3 py-2 hover:bg-blue-700 rounded">📖 {t.guide}</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">{sidebarOpen ? <X size={24} /> : <Menu size={24} />}</button>
            <h1 className="text-xl font-bold">{sopDatabase[selectedSOP].name}</h1>
            <button onClick={() => setCurrentView('sop-list')} className="px-4 py-2 bg-gray-300 rounded">{t.back}</button>
          </nav>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-white p-4 rounded shadow"><pre className="whitespace-pre-wrap text-sm">{sopDatabase[selectedSOP].content}</pre></div>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{msg.text}</div>
              </div>
            ))}
            {loading && <p className="text-gray-500">Thinking...</p>}
            <div ref={messagesEndRef} />
          </div>
          <div className="bg-white p-4 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder={t.askQuestion} className="flex-1 px-4 py-2 border rounded-lg" />
            <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"><Send size={18} />{t.send}</button>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
