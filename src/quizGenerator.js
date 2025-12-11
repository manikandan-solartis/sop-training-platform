import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

const AIQuizGenerator = () => {
  const [quizState, setQuizState] = useState('loading'); // loading, active, completed
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [score, setScore] = useState(null);
  const [generating, setGenerating] = useState(false);

  // This component receives sopContent as a prop
// Use this in your App.js: <AIQuizComponent sopContent={sop.content} />

  // Timer effect
  useEffect(() => {
    if (quizState === 'active' && questionStartTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizState, questionStartTime]);

  // Generate quiz using AI
  const generateQuiz = async () => {
    setGenerating(true);
    setQuizState('loading');
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: `Generate 10 unique multiple-choice questions based on this SOP content. Each question should test understanding of the procedures, rules, or systems mentioned.

Return ONLY a valid JSON array with this exact format:
[{"q":"Question text?","options":["Option A","Option B","Option C","Option D"],"correct":0}]

Rules:
- "correct" is the index (0-3) of the correct option
- Questions must be specific to the SOP content
- Options should be plausible but clearly distinct
- Mix of difficulty levels
- Return ONLY the JSON array, no markdown, no explanation

SOP Content:
${sopContent}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      const content = data.content[0].text;
      
      // Clean and parse JSON
      let jsonStr = content.trim();
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      
      const generatedQuestions = JSON.parse(jsonStr);
      
      // Validate questions
      const validQuestions = generatedQuestions.filter(q => 
        q.q && 
        Array.isArray(q.options) && 
        q.options.length === 4 &&
        typeof q.correct === 'number' &&
        q.correct >= 0 && 
        q.correct <= 3
      );

      if (validQuestions.length === 0) {
        throw new Error('No valid questions generated');
      }

      // Shuffle questions and options for uniqueness
      const shuffledQuestions = validQuestions.map(q => {
        const optionsWithIndex = q.options.map((opt, idx) => ({ opt, idx }));
        const shuffled = optionsWithIndex.sort(() => Math.random() - 0.5);
        const newCorrect = shuffled.findIndex(item => item.idx === q.correct);
        
        return {
          q: q.q,
          options: shuffled.map(item => item.opt),
          correct: newCorrect
        };
      }).sort(() => Math.random() - 0.5).slice(0, 10);

      setQuestions(shuffledQuestions);
      setQuizState('active');
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setTimePerQuestion([]);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
      setElapsedTime(0);
      setScore(null);
      
    } catch (error) {
      console.error('Quiz generation error:', error);
      alert('Failed to generate quiz. Please try again.');
      setQuizState('error');
    } finally {
      setGenerating(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
    }
  };

  // Handle continue to next question
  const handleContinue = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer before continuing');
      return;
    }

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers, selectedAnswer];
    const newTimes = [...timePerQuestion, timeTaken];
    
    setAnswers(newAnswers);
    setTimePerQuestion(newTimes);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
      setElapsedTime(0);
    } else {
      // Quiz completed
      calculateScore(newAnswers, newTimes);
    }
  };

  // Calculate score with time penalties
  const calculateScore = (finalAnswers, finalTimes) => {
    let totalScore = 0;
    let breakdown = [];

    questions.forEach((q, idx) => {
      const isCorrect = finalAnswers[idx] === q.correct;
      const timeTaken = finalTimes[idx];
      let questionScore = 0;

      if (isCorrect) {
        if (timeTaken <= 45) {
          questionScore = 10; // Full marks
        } else if (timeTaken <= 60) {
          questionScore = 8; // 20% penalty
        } else if (timeTaken <= 75) {
          questionScore = 6; // 40% penalty
        } else {
          questionScore = 5; // 50% penalty
        }
      }

      totalScore += questionScore;
      breakdown.push({
        question: idx + 1,
        correct: isCorrect,
        time: timeTaken,
        score: questionScore
      });
    });

    setScore({
      total: totalScore,
      percentage: (totalScore / 100) * 100,
      breakdown
    });
    setQuizState('completed');
  };

  // Retry quiz
  const handleRetry = () => {
    generateQuiz();
  };

  // Initial load
  useEffect(() => {
    generateQuiz();
  }, []);

  // Loading state
  if (quizState === 'loading' || generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Sparkles className="mx-auto text-purple-600 animate-pulse mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Generating Your Quiz</h2>
          <p className="text-gray-600 mb-4">AI is creating unique questions just for you...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz state
  if (quizState === 'active' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const timeWarning = elapsedTime > 45;
    const timeCritical = elapsedTime > 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-600" size={24} />
              <div>
                <h2 className="text-xl font-bold">AI-Generated Quiz</h2>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeCritical ? 'bg-red-100 text-red-700' :
              timeWarning ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              <Clock size={20} />
              <span className="font-bold text-lg">{elapsedTime}s</span>
            </div>
          </div>

          {/* Time warning */}
          {timeWarning && (
            <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
              timeCritical ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
            }`}>
              <AlertCircle size={20} />
              <span className="text-sm font-semibold">
                {timeCritical ? 'Significant time penalty! Answer quickly.' : 'Time penalty applies after 45 seconds'}
              </span>
            </div>
          )}

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">{currentQuestion.q}</h3>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === idx
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === idx ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {selectedAnswer === idx && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={selectedAnswer === null}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              selectedAnswer === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>Continue to Next Question <ChevronRight size={20} /></>
            ) : (
              <>Complete Quiz <CheckCircle size={20} /></>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Completed state
  if (quizState === 'completed' && score) {
    const passed = score.percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
          {/* Score header */}
          <div className="text-center mb-8">
            {passed ? (
              <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            ) : (
              <XCircle className="mx-auto text-red-600 mb-4" size={64} />
            )}
            <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
            <p className={`text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score.total}/100
            </p>
            <p className="text-xl text-gray-600">
              {passed ? '🎉 Congratulations! You passed!' : '📚 Keep practicing!'}
            </p>
          </div>

          {/* Score breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Question Breakdown</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {score.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                    item.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.correct ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className="font-semibold">Question {item.question}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{item.time}s</span>
                    </div>
                    <span className={`font-bold ${item.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {item.score}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time penalties info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Time Scoring:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 0-45 seconds: Full marks (10 points)</li>
              <li>• 46-60 seconds: 20% penalty (8 points)</li>
              <li>• 61-75 seconds: 40% penalty (6 points)</li>
              <li>• 76+ seconds: 50% penalty (5 points)</li>
            </ul>
          </div>

          {/* Retry button */}
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Try New Quiz (AI will generate different questions)
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AIQuizGenerator;
