import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Menu, X, Upload, Trash2, AlertCircle, Clock, Users, BarChart3, Activity, Mic, Volume2, VolumeX, MicOff, Sparkles } from 'lucide-react';
import { sopData } from './sopData';
import { getSmartAnswer } from './aiTrainer';
import { generateQuiz, isAIGenerationAvailable } from './quizGenerator';
import { getProviderInfo } from './services/llmService';

const VALID_CREDENTIALS = [
  { email: 'admin@solartis.com', password: 'Solartis@2026', name: 'Admin User', role: 'admin' },
  { email: 'S5599@solartis.com', password: 'S5599', name: 'R Sarojini', role: 'user' },
  { email: 'S5848@solartis.com', password: 'S5848', name: 'C G Aarthy', role: 'user' },
  { email: 'S6312@solartis.com', password: 'S6312', name: 'Nithya K', role: 'user' },
  { email: 'S6437@solartis.com', password: 'S6437', name: 'Varsha', role: 'user' },
  { email: 'S7266@solartis.com', password: 'S7266', name: 'Sanjay B', role: 'user' },
  { email: 'S7268@solartis.com', password: 'S7268', name: 'Vijayarajan Ravichandran', role: 'user' },
  { email: 'S7270@solartis.com', password: 'S7270', name: 'Gowsikan S', role: 'user' },
  { email: 'S7282@solartis.com', password: 'S7282', name: 'Arsat Barvezh R', role: 'user' },
  { email: 'S7284@solartis.com', password: 'S7284', name: 'Sam Nihil David D P', role: 'user' },
  { email: 'S7286@solartis.com', password: 'S7286', name: 'Dineshkumar Arumugam', role: 'user' },
  { email: 'S7289@solartis.com', password: 'S7289', name: 'Manivarma R', role: 'user' },
  { email: 'S7308@solartis.com', password: 'S7308', name: 'S Santhiya', role: 'user' },
  { email: 'S7310@solartis.com', password: 'S7310', name: 'Susil Kanth K', role: 'user' },
  { email: 'S7313@solartis.com', password: 'S7313', name: 'Jothibasu Ramasubbu', role: 'user' },
  { email: 'S7314@solartis.com', password: 'S7314', name: 'Aravindan M', role: 'user' },
  { email: 'S7315@solartis.com', password: 'S7315', name: 'Nagasree', role: 'user' },
  { email: 'S7316@solartis.com', password: 'S7316', name: 'Abdul Malik Pope Sikkandar Ali', role: 'user' },
  { email: 'S7325@solartis.com', password: 'S7325', name: 'Sabariswaran K N', role: 'user' },
  { email: 'S7321@solartis.com', password: 'S7321', name: 'Siva Ranjani R', role: 'user' },
  { email: 'S7322@solartis.com', password: 'S7322', name: 'Divya Shree Varatharajan', role: 'user' },
  { email: 'S7324@solartis.com', password: 'S7324', name: 'Gokul Sivakumar', role: 'user' },
  { email: 'S7335@solartis.com', password: 'S7335', name: 'Thendral Devi K', role: 'user' },
  { email: 'S7336@solartis.com', password: 'S7336', name: 'Balaji M', role: 'user' },
  { email: 'S7339@solartis.com', password: 'S7339', name: 'Gosakan N', role: 'user' },
  { email: 'S7337@solartis.com', password: 'S7337', name: 'Mohammed Asraf Ali A', role: 'user' },
  { email: 'S7340@solartis.com', password: 'S7340', name: 'Ramsurya Manavalan', role: 'user' },
  { email: 'S7338@solartis.com', password: 'S7338', name: 'Jeeveetha S', role: 'user' },
  { email: 'S7343@solartis.com', password: 'S7343', name: 'Shreenithy R G', role: 'user' },
  { email: 'S7344@solartis.com', password: 'S7344', name: 'Vetrikaruparr M', role: 'user' },
  { email: 'S7345@solartis.com', password: 'S7345', name: 'Rajaaruna S', role: 'user' },
  { email: 'S7346@solartis.com', password: 'S7346', name: 'Sankaranarayanan Sanjivi Ramesh', role: 'user' },
  { email: 'S7347@solartis.com', password: 'S7347', name: 'Karishma E', role: 'user' },
  { email: 'S7352@solartis.com', password: 'S7352', name: 'Atchaya S', role: 'user' },
  { email: 'S7355@solartis.com', password: 'S7355', name: 'Swethaa D', role: 'user' },
  { email: 'S7356@solartis.com', password: 'S7356', name: 'Swetha Veeraragavan', role: 'user' },
  { email: 'S7357@solartis.com', password: 'S7357', name: 'Santhanakumar S', role: 'user' },
  { email: 'S7358@solartis.com', password: 'S7358', name: 'Iswarya T N', role: 'user' },
  { email: 'S7248@solartis.com', password: 'S7248', name: 'B Tharunika', role: 'user' },
  { email: 'S7276@solartis.com', password: 'S7276', name: 'Gopinath J', role: 'user' },
  { email: 'S7277@solartis.com', password: 'S7277', name: 'Parthipan Manikandan', role: 'user' },
  { email: 'S7280@solartis.com', password: 'S7280', name: 'C A Anuppriya', role: 'user' },
  { email: 'S7281@solartis.com', password: 'S7281', name: 'Thirunavukkarasu Rangasamy', role: 'user' },
  { email: 'S7294@solartis.com', password: 'S7294', name: 'Devadharshini J', role: 'user' },
  { email: 'S7295@solartis.com', password: 'S7295', name: 'Kowsalya Jayaraman', role: 'user' },
  { email: 'S7297@solartis.com', password: 'S7297', name: 'Swetha Mohanraj', role: 'user' },
  { email: 'S7298@solartis.com', password: 'S7298', name: 'Sowmiya Saravanan', role: 'user' },
  { email: 'S7299@solartis.com', password: 'S7299', name: 'Krithika Selvaraju', role: 'user' },
  { email: 'S7305@solartis.com', password: 'S7305', name: 'Afreen', role: 'user' },
  { email: 'S7318@solartis.com', password: 'S7318', name: 'Balakumar G', role: 'user' },
  { email: 'S7319@solartis.com', password: 'S7319', name: 'Surandhar M', role: 'user' },
  { email: 'S7320@solartis.com', password: 'S7320', name: 'Boomika Nagaraj', role: 'user' },
  { email: 'S7327@solartis.com', password: 'S7327', name: 'Swathi S', role: 'user' },
  { email: 'S7333@solartis.com', password: 'S7333', name: 'S Subin', role: 'user' },
  { email: 'S7331@solartis.com', password: 'S7331', name: 'Logeshwaran V', role: 'user' },
  { email: 'S7349@solartis.com', password: 'S7349', name: 'Sivakumar S', role: 'user' },
  { email: 'S7350@solartis.com', password: 'S7350', name: 'S Kiruba', role: 'user' },
  { email: 'S7351@solartis.com', password: 'S7351', name: 'Sandeep.V', role: 'user' },
  { email: 'S7354@solartis.com', password: 'S7354', name: 'Aadhil Rasheeq A', role: 'user' },
  { email: 'S6246@solartis.com', password: 'S6246', name: 'Manikandan K', role: 'user' },
  { email: 'S6143@solartis.com', password: 'S6143', name: 'Moorthy', role: 'team-lead' },
  { email: 'S1759@solartis.com', password: 'S1759', name: 'OviyaRajan', role: 'team-lead' },
  { email: 'S7342@solartis.com', password: 'S7342', name: 'Jegadish Ramesh', role: 'team-lead' },
  { email: 'S7317@solartis.com', password: 'S7317', name: 'Sabarishkumar', role: 'team-lead' }
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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);
const [aiEnabled, setAiEnabled] = useState(false);
const [aiProvider, setAiProvider] = useState('');
  
  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [questionTimings, setQuestionTimings] = useState({});
  const [questionExplanations, setQuestionExplanations] = useState({});
  const [explanationsLoading, setExplanationsLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check AI configuration
useEffect(() => {
  const info = getProviderInfo();
  setAiEnabled(info.configured);
  setAiProvider(info.provider);
  
  if (info.configured) {
    console.log('✅ AI enabled with provider:', info.provider);
  } else {
    console.warn('⚠️ AI not configured. Using pattern matching only.');
  }
}, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Text-to-Speech function
  const speak = (text) => {
    if (!voiceEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Clean text for better speech (remove markdown and special characters)
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\n+/g, '. ')
      .replace(/•/g, '')
      .replace(/📍|🎯|✅|💡|⬆️|⬇️|➡️|⬅️|❌|📊|🏁|💭|📝|💻|📧|🔄|⏰|⌨️|🆘|🔍|🤔/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Start voice recognition
  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Timer effect for quiz questions
  useEffect(() => {
    // Only run timer if quiz is active and not completed
    if (quizCompleted || currentQuizQuestions.length === 0 || !questionStartTime) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted, currentQuizQuestions.length, questionStartTime]);

  const logActivity = (activityType, details = {}) => {
    if (!currentUser) return;
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
      setLoginError('Please enter both Workforce ID (or email) and password');
      return;
    }

    const entered = loginEmail.trim().toLowerCase();
    const user = VALID_CREDENTIALS.find(cred => {
      const emailLower = cred.email.toLowerCase();
      const id = emailLower.split('@')[0];
      return (emailLower === entered || id === entered) && cred.password === loginPassword;
    });

    if (user) {
      const loginTime = new Date();
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('sop-list');
      setSessionStartTime(loginTime);
      setLoginEmail('');
      setLoginPassword('');
      
      setTimeout(() => logActivity('login', { loginTime: loginTime.toISOString() }), 100);
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    const logoutTime = new Date();
    const sessionDuration = sessionStartTime 
      ? Math.round((logoutTime - sessionStartTime) / 1000 / 60)
      : 0;

    logActivity('logout', {
      logoutTime: logoutTime.toISOString(),
      sessionDuration: `${sessionDuration} minutes`
    });

    setTimeout(() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setSelectedSOP(null);
      setMessages([]);
      setCurrentView('login');
      setSessionStartTime(null);
      setSOPStartTime(null);
    }, 100);
  };
  // Add this function inside your App component, around line 200 (after handleLogout)

const handleUploadSOP = () => {
  // Validate input
  if (!newSOPData.name || !newSOPData.category || !newSOPData.difficulty || !newSOPData.content) {
    alert('Please fill in all fields');
    return;
  }

  if (newSOPData.content.length < 100) {
    alert('SOP content must be at least 100 characters');
    return;
  }

  // Generate unique ID
  const sopId = newSOPData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Check if SOP ID already exists
  if (sopDatabase[sopId]) {
    alert('An SOP with this name already exists. Please use a different name.');
    return;
  }

  // Create new SOP object
  const newSOP = {
    id: sopId,
    name: newSOPData.name,
    category: newSOPData.category,
    difficulty: newSOPData.difficulty,
    summary: newSOPData.content.substring(0, 150) + '...',
    content: newSOPData.content,
    keywords: [] // Empty keywords array for new SOPs
  };

  // Add to database
  setSOPDatabase(prev => ({
    ...prev,
    [sopId]: newSOP
  }));

  // Log activity
  logActivity('sop_created', {
    sopId: sopId,
    sopName: newSOPData.name,
    sopCategory: newSOPData.category
  });

  // Reset form and close modal
  setNewSOPData({ name: '', category: '', difficulty: '', content: '' });
  setShowUploadModal(false);
  
  alert('SOP uploaded successfully!');
};
  const handleSelectSOP = async (sopId) => {
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
    text: `Welcome to "${sop.name}"!\n\n${sop.summary}\n\n${aiEnabled ? '🤖 AI-powered assistance enabled!\n\n' : ''}I can help you with:\n• Understanding specific steps\n• Applications and systems used\n• Email addresses and escalation contacts\n• Differences between processes\n• SLA and timing requirements\n\nWhat would you like to know?`
  }]);
  
  setCurrentView('sop-detail');
  setQuizAnswers({});
  
  // Generate quiz with AI if available
  try {
    const questions = await generateQuiz(sopId, sop.content, aiEnabled);
    setCurrentQuizQuestions(questions);
  } catch (error) {
    console.error('Quiz generation error:', error);
    const questions = await generateQuiz(sopId, '', false);
    setCurrentQuizQuestions(questions);
  }

  logActivity('sop_access', { 
    sopId, 
    sopName: sop.name, 
    sopCategory: sop.category,
    aiEnabled 
  });
};

const handleSendMessage = async () => {
  if (!input.trim()) return;
  
  stopSpeaking();
  
  setMessages(prev => [...prev, { id: prev.length + 1, type: 'user', text: input }]);
  const userInput = input;
  setInput('');
  setLoading(true);
  
  try {
    const sop = sopDatabase[selectedSOP];
    const response = await getSmartAnswer(userInput, sop.content, sop.keywords);
    
    setMessages(prev => [...prev, { id: prev.length + 1, type: 'assistant', text: response }]);
    
    if (voiceEnabled) {
      setTimeout(() => speak(response), 300);
    }

    logActivity('qa_interaction', {
      sopId: selectedSOP,
      sopName: sop.name,
      question: userInput.substring(0, 100),
      aiPowered: aiEnabled
    });
  } catch (error) {
    console.error('Response generation error:', error);
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      type: 'assistant', 
      text: `I apologize, but I encountered an error. ${aiEnabled ? 'Using basic pattern matching instead.' : 'Please try rephrasing your question.'}\n\nError: ${error.message}` 
    }]);
  } finally {
    setLoading(false);
  }
};

const retakeQuiz = async () => {
  setQuizAnswers({});
  setLoading(true);

  try {
    const sop = sopDatabase[selectedSOP];
    const questions = await generateQuiz(selectedSOP, sop.content, aiEnabled);
    if (!questions || questions.length === 0) throw new Error('No questions generated');

    // Reset quiz state and start fresh
    setCurrentQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setQuizScore(null);
    setQuestionTimings({});
    setQuestionStartTime(Date.now());
    setTimeLeft(45);

    logActivity('quiz_retake', {
      sopId: selectedSOP,
      sopName: sop.name,
      aiGenerated: aiEnabled
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    alert('Failed to generate new quiz. Please try again.');
  } finally {
    setLoading(false);
  }
};

/**
 * Start the quiz - initialize first question and timer
 */
const startQuiz = () => {
  (async () => {
    // If no questions are present, try to generate them first
    if (!currentQuizQuestions || currentQuizQuestions.length === 0) {
      setLoading(true);
      try {
        const sop = sopDatabase[selectedSOP];
        const questions = await generateQuiz(selectedSOP, sop.content, aiEnabled);
        setCurrentQuizQuestions(questions);
      } catch (err) {
        console.error('Quiz generation failed on start:', err);
        alert('Failed to generate quiz questions. Please try again.');
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }

    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setQuizScore(null);
    setQuizAnswers({});
    setQuestionStartTime(Date.now());
    setTimeLeft(45);
    setQuestionTimings({});
  })();
};

// Auto-advance / auto-submit when timer reaches zero
useEffect(() => {
  if (quizCompleted || currentQuizQuestions.length === 0 || !questionStartTime) return;
  if (timeLeft !== 0) return;

  // Record timing for current question and advance or finish
  const elapsedTime = Math.floor((Date.now() - questionStartTime) / 1000);
  setQuestionTimings(prev => ({
    ...prev,
    [currentQuestionIndex]: elapsedTime
  }));

  if (currentQuestionIndex < currentQuizQuestions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
    setQuestionStartTime(Date.now());
    setTimeLeft(45);
  } else {
    submitQuiz();
  }
}, [timeLeft]);

/**
 * Handle answer selection for current question
 */
const handleAnswerSelect = (questionIdx, optionIdx) => {
  setQuizAnswers(prev => ({
    ...prev,
    [questionIdx]: optionIdx
  }));
};

/**
 * Move to next question with timer penalty calculation
 */
const handleContinueToNext = () => {
  // Record timing for current question
  const elapsedTime = Math.floor((Date.now() - questionStartTime) / 1000);
  setQuestionTimings(prev => ({
    ...prev,
    [currentQuestionIndex]: elapsedTime
  }));

  // Check if this is the last question
  if (currentQuestionIndex < currentQuizQuestions.length - 1) {
    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setQuestionStartTime(Date.now());
    setTimeLeft(45);
  } else {
    // Quiz finished - calculate final score
    submitQuiz();
  }
};

/**
 * Generate explanations for each question using `getSmartAnswer` if not provided
 */
const generateExplanations = async () => {
  if (!selectedSOP) return;
  if (!currentQuizQuestions || currentQuizQuestions.length === 0) return;

  setExplanationsLoading(true);
  const sop = sopDatabase[selectedSOP];

  try {
    const promises = currentQuizQuestions.map(async (q, idx) => {
      // Use existing explanation if present
      if (q.explanation && q.explanation.trim()) return q.explanation;

      const correctIdx = q.correct;
      const correctText = q.options && q.options[correctIdx] ? q.options[correctIdx] : 'the correct option';
      const optionsText = q.options ? q.options.map((o, i) => `${i}: ${o}`).join(' | ') : '';

      const prompt = `Explain concisely why the correct answer is ${correctText} for the question below, and provide a short practical example relevant to the SOP.
Question: ${q.q}
Options: ${optionsText}
Correct option index: ${correctIdx}`;

      const explanation = await getSmartAnswer(prompt, sop.content, sop.keywords);
      return explanation;
    });

    const explanations = await Promise.all(promises);
    const mapping = explanations.reduce((acc, text, i) => ({ ...acc, [i]: text }), {});
    setQuestionExplanations(mapping);

    logActivity('quiz_review_generated', {
      sopId: selectedSOP,
      sopName: sop.name,
      count: currentQuizQuestions.length
    });
  } catch (error) {
    console.error('Error generating explanations:', error);
  } finally {
    setExplanationsLoading(false);
  }
};

/**
 * Submit quiz and calculate score with time penalties
 */
const submitQuiz = () => {
  let totalScore = 0;
  let correctCount = 0;

  currentQuizQuestions.forEach((question, idx) => {
    const selectedAnswer = quizAnswers[idx];
    const isCorrect = selectedAnswer === question.correct;
    const timeTaken = questionTimings[idx] || 0;

    if (isCorrect) {
      correctCount++;
      
      // Full marks (10 points) if within 45 seconds
      if (timeTaken <= 45) {
        totalScore += 10;
      } else {
        // Reduced marks if exceeded 45 seconds
        // Deduct 0.5 points per extra second (minimum 2 points)
        const penalty = Math.min((timeTaken - 45) * 0.5, 8);
        const score = Math.max(10 - penalty, 2);
        totalScore += score;
      }
    } else {
      // Wrong answer - no points, but timer penalty doesn't apply
      totalScore += 0;
    }
  });

  const maxScore = currentQuizQuestions.length * 10;
  const percentage = (totalScore / maxScore) * 100;

  const finalScore = {
    totalScore: Math.round(totalScore * 10) / 10, // Round to 1 decimal
    maxScore: maxScore,
    correct: correctCount,
    percentage: percentage,
    totalQuestions: currentQuizQuestions.length
  };

  setQuizScore(finalScore);
  setQuizCompleted(true);

  // Start generating explanations for review (async, non-blocking)
  (async () => {
    try {
      await generateExplanations();
    } catch (e) {
      console.error('Failed to generate explanations:', e);
    }
  })();

  // Log activity with detailed scoring
  logActivity('quiz_completed', {
    sopId: selectedSOP,
    sopName: sopDatabase[selectedSOP].name,
    score: `${correctCount}/${currentQuizQuestions.length}`,
    totalScore: finalScore.totalScore,
    maxScore: maxScore,
    percentage: `${percentage.toFixed(1)}%`,
    totalQuestions: currentQuizQuestions.length,
    correctAnswers: correctCount,
    aiGenerated: aiEnabled
  });
};

  const handleDeleteSOP = (sopId) => {
    if (window.confirm(`Delete "${sopDatabase[sopId].name}"?`)) {
      const deletedSOP = sopDatabase[sopId];
      const newDB = { ...sopDatabase };
      delete newDB[sopId];
      setSOPDatabase(newDB);
      
      logActivity('sop_deleted', { sopId, sopName: deletedSOP.name });

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
              <label className="block text-sm font-semibold mb-2 text-gray-700">Workforce ID or Email</label>
              <input
                type="text"
                placeholder="Enter your Workforce ID (e.g., S5599) or email"
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

  if (currentView === 'analytics') {
    // Count all non-admin accounts (users + team-leads) so admin sees full workforce
    const allUsers = VALID_CREDENTIALS.filter(u => u.role !== 'admin');
    
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

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">User Statistics</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
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
                        <td className="py-3 px-4 text-gray-700">{user.role}</td>
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

  if (currentView === 'sop-list') {
    return (
      <>
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
            {Object.values(sopDatabase).map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow-lg p-6 relative group hover:shadow-xl transition-shadow">
                {currentUser.role === 'admin' && (
                  <button 
                    onClick={() => handleDeleteSOP(s.id)} 
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="flex justify-between mb-4">
                  <FileText className="text-blue-600" size={36} />
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    s.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                    s.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{s.difficulty}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{s.category}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{s.summary}</p>
                <button 
                  onClick={() => handleSelectSOP(s.id)} 
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
                onChange={(e) => setNewSOPData(prev=> ({ ...prev, difficulty: e.target.value }))} 
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
      </>
    );
  }

  // SOP Detail View
  const sop = selectedSOP ? sopDatabase[selectedSOP] : null;
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && sop && (
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">{sop.name}</h2>
            <p className="text-sm text-gray-600">{sop.category}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <button onClick={() => setActiveMode('qa')} className={`w-full p-3 rounded-lg mb-2 font-semibold transition-colors ${activeMode === 'qa' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              💬 Q&A Mode
            </button>
            <button onClick={() => setActiveMode('quiz')} className={`w-full p-3 rounded-lg mb-2 font-semibold transition-colors ${activeMode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              ✅ Quiz Mode
            </button>
            <button onClick={() => setActiveMode('content')} className={`w-full p-3 rounded-lg font-semibold transition-colors ${activeMode === 'content' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
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
            {/* Voice Controls Header */}
            <div className="bg-blue-50 border-b border-blue-100 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isListening ? 'bg-red-100 text-red-700' : 'bg-white'}`}>
                  {isListening ? (
                    <>
                      <Mic className="animate-pulse" size={18} />
                      <span className="text-sm font-semibold">Listening...</span>
                    </>
                  ) : (
                    <>
                      <MicOff size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-600">Voice Ready</span>
                    </>
                  )}
                </div>
                
                {isSpeaking && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700">
                    <Volume2 className="animate-pulse" size={18} />
                    <span className="text-sm font-semibold">Speaking...</span>
                  </div>
                )}
              </div>
                {aiEnabled && (
  <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 rounded-lg">
    <Sparkles className="text-purple-600" size={16} />
    <span className="text-xs font-semibold text-purple-700">
      AI: {aiProvider.toUpperCase()}
    </span>
  </div>
)}              
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  voiceEnabled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
              >
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="text-sm">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-4 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'} relative group`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{msg.text}</pre>
                    {msg.type === 'assistant' && (
                      <button
                        onClick={() => speak(msg.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                        title="Read aloud"
                      >
                        <Volume2 size={16} className="text-blue-600" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-4 rounded-lg">Analyzing SOP...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!recognition}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                  } ${!recognition ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={!recognition ? 'Voice recognition not supported in your browser' : 'Click to speak'}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening... speak now" : "Ask about the SOP or click mic to speak..."}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isListening}
                />
                
                {isSpeaking ? (
                  <button 
                    onClick={stopSpeaking} 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    title="Stop speaking"
                  >
                    <VolumeX size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSendMessage} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    title="Send message"
                  >
                    <Send size={20} />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Tip: Click the microphone to ask questions with your voice • Responses are read aloud automatically
              </p>
            </div>
          </div>
        )}

        {activeMode === 'quiz' && (
  <div className="flex-1 overflow-y-auto p-6">
    <div className="max-w-3xl mx-auto">
      {currentQuizQuestions.length === 0 ? (
        // Quiz not started yet
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-600 mb-6 text-lg">
            {aiEnabled ? '🤖 AI will generate 10 unique questions just for you!' : 'Take a 10-question quiz on this SOP'}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 text-left">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Activity className="text-blue-600" size={24} />
              Quiz Rules
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>10 questions</strong> will be generated uniquely for you</li>
              <li>• <strong>45 seconds</strong> per question</li>
              <li>• <strong>Full marks (10 points)</strong> if answered within time</li>
              <li>• <strong>Reduced marks</strong> for exceeding 45 seconds</li>
              <li>• One question at a time - click <strong>Continue</strong> to proceed</li>
              <li>• {aiEnabled ? 'Questions generated fresh every time - no two quizzes are the same!' : 'Questions randomized from question bank'}</li>
            </ul>
          </div>
          <button 
            onClick={startQuiz}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Generating Questions...' : '🚀 Start Quiz'}
          </button>
        </div>
      ) : quizCompleted ? (
        // Quiz completed - show results
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
          {quizScore && (
            <div className="space-y-4 mb-6">
              <div className="text-6xl font-bold text-blue-600">
                {quizScore.percentage.toFixed(1)}%
              </div>
              <div className="text-xl text-gray-700">
                Score: <strong>{quizScore.totalScore}</strong> / {quizScore.maxScore} points
              </div>
              <div className="text-lg text-gray-600">
                Correct Answers: <strong>{quizScore.correct}</strong> / {currentQuizQuestions.length}
              </div>
              <div className={`text-2xl font-bold ${
                quizScore.percentage === 100 ? 'text-green-600' :
                quizScore.percentage >= 80 ? 'text-blue-600' :
                quizScore.percentage >= 60 ? 'text-yellow-600' :
                'text-orange-600'
              }`}>
                {quizScore.percentage === 100 ? '🎉 Perfect Score!' :
                 quizScore.percentage >= 80 ? '👍 Great Job!' :
                 quizScore.percentage >= 60 ? '📚 Good Effort!' :
                 '📖 Keep Practicing!'}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={retakeQuiz}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Generating New Quiz...' : '🔄 Take New Quiz'}
            </button>

            <button
              onClick={() => setShowReview(prev => !prev)}
              className="bg-white border px-6 py-3 rounded-lg font-semibold hover:shadow"
            >
              {showReview ? 'Hide Review' : 'Show Review'}
            </button>
          </div>

          {/* Review Section */}
          {showReview && (
            <div className="mt-8 text-left">
              <h3 className="text-2xl font-semibold mb-4">Review - Questions & Answers</h3>
              {explanationsLoading && (
                <div className="mb-4 text-sm text-gray-600">Generating explanations...</div>
              )}

              <div className="space-y-4">
                {currentQuizQuestions.map((q, idx) => {
                  const userSel = quizAnswers[idx];
                  const correctIdx = q.correct;
                  const explanation = questionExplanations[idx];
                  return (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="mb-2 font-semibold">{idx + 1}. {q.q}</div>
                      <div className="ml-4 mb-2">
                        {q.options && q.options.map((opt, j) => (
                          <div key={j} className={`py-1 ${j === correctIdx ? 'text-green-700 font-semibold' : ''} ${j === userSel && j !== correctIdx ? 'text-red-700' : ''}`}>
                            <span className="mr-2">{String.fromCharCode(65 + j)}.</span>{opt}
                            {j === userSel && (
                              <span className="ml-3 text-sm text-gray-600">(Your answer)</span>
                            )}
                            {j === correctIdx && (
                              <span className="ml-3 text-sm text-green-600">(Correct)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="ml-4 text-sm text-gray-700">
                        <div className="font-semibold">Explanation:</div>
                        <div>{explanation ? explanation : <em>No explanation available.</em>}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Quiz in progress - show current question
        <>
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {currentQuizQuestions.length}
              </h2>
              <div className={`text-xl font-bold px-4 py-2 rounded-lg ${
                timeLeft <= 10 ? 'bg-red-100 text-red-700 animate-pulse' :
                timeLeft <= 20 ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                ⏱️ {timeLeft}s
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%` }}
              />
            </div>
            {aiEnabled && (
              <div className="bg-purple-50 border-l-4 border-purple-600 p-3 mb-4">
                <span className="text-sm font-semibold text-purple-700 flex items-center gap-2">
                  <Sparkles size={16} />
                  AI-Generated Question - Unique to your session
                </span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 mb-4 shadow-sm">
            <p className="font-bold text-lg mb-6">
              {currentQuizQuestions[currentQuestionIndex]?.q}
            </p>
            <div className="space-y-3">
              {currentQuizQuestions[currentQuestionIndex]?.options.map((opt, j) => (
                <div 
                  key={j} 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    quizAnswers[currentQuestionIndex] === j 
                      ? 'bg-blue-100 border-blue-500 shadow-md' 
                      : 'hover:bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`} 
                  onClick={() => handleAnswerSelect(currentQuestionIndex, j)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      quizAnswers[currentQuestionIndex] === j 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {quizAnswers[currentQuestionIndex] === j && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={quizAnswers[currentQuestionIndex] === j ? 'font-semibold' : ''}>
                      {opt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {timeLeft > 45 ? (
                <span className="text-orange-600 font-semibold">
                  ⚠️ Time exceeded - marks will be reduced
                </span>
              ) : timeLeft <= 10 ? (
                <span className="text-red-600 font-semibold animate-pulse">
                  ⚠️ Hurry! Time running out!
                </span>
              ) : (
                <span>Select your answer carefully</span>
              )}
            </div>
            <button 
              onClick={handleContinueToNext}
              disabled={quizAnswers[currentQuestionIndex] === undefined}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {currentQuestionIndex < currentQuizQuestions.length - 1 ? 'Continue →' : 'Finish Quiz'}
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}
        {activeMode === 'content' && sop && (
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

// Error boundary to surface rendering errors (helps diagnose white/blank screens)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in App render:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="text-sm text-gray-700 mb-2">The application encountered an error while rendering. Details:</p>
            <pre className="text-xs text-red-700 whitespace-pre-wrap">{String(this.state.error)}</pre>
            <p className="text-xs text-gray-500 mt-4">Check the browser console for a full stack trace.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
