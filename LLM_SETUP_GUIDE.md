# 🚀 Free LLM Integration Setup Guide

## Overview
This guide will help you integrate **FREE** LLM APIs for:
- ✅ Intelligent Q&A responses
- ✅ Auto-generated quizzes (NOT stored, generated on-demand)
- ✅ Zero storage costs
- ✅ No database required

---

## 🎯 Recommended Provider: Groq (FREE & FAST)

### Why Groq?
- ✅ **Completely FREE** - 6000 requests per minute
- ✅ **Lightning fast** - Sub-second responses
- ✅ **Best for this use case** - Perfect for educational content
- ✅ **Easy setup** - No credit card required

### Steps to Get Groq API Key:

1. **Visit**: https://console.groq.com
2. **Sign up** with Google/GitHub account (FREE)
3. **Navigate to** "API Keys" section
4. **Click** "Create API Key"
5. **Copy** your API key (starts with `gsk_...`)
6. **Done!** You have 6000 requests/min free forever

---

## 📦 Installation Steps

### Step 1: Create Environment File

Create a file named `.env` in your project root:

```bash
# .env file
REACT_APP_GROQ_API_KEY=gsk_your_actual_api_key_here
REACT_APP_LLM_PROVIDER=groq
```

**Important:** 
- Replace `gsk_your_actual_api_key_here` with your actual Groq API key
- Add `.env` to `.gitignore` (already done if using create-react-app)

### Step 2: Create LLM Service File

Create `src/services/llmService.js` (copy from the artifact above)

### Step 3: Update Existing Files

Replace these files with the new versions:
- `src/aiTrainer.js` - Enhanced with LLM fallback
- `src/quizGenerator.js` - Auto-generation support

### Step 4: Update App.js

Modify the `handleSelectSOP` function to pass SOP content:

```javascript
const handleSelectSOP = (sopId) => {
  // ... existing code ...
  
  const sop = sopDatabase[sopId];
  
  // Pass sopContent for AI generation
  generateQuiz(sopId, sop.content, true).then(questions => {
    setCurrentQuizQuestions(questions);
  });
  
  // ... rest of code ...
};
```

Modify the `retakeQuiz` function:

```javascript
const retakeQuiz = () => {
  setQuizAnswers({});
  
  // Generate fresh quiz each time
  const sop = sopDatabase[selectedSOP];
  generateQuiz(selectedSOP, sop.content, true).then(questions => {
    setCurrentQuizQuestions(questions);
  });
  
  logActivity('quiz_retake', { 
    sopId: selectedSOP, 
    sopName: sop.name,
    aiGenerated: true 
  });
};
```

### Step 5: Update handleSendMessage

Make the Q&A function async:

```javascript
const handleSendMessage = async () => {
  if (!input.trim()) return;
  
  stopSpeaking();
  
  setMessages(prev => [...prev, { 
    id: prev.length + 1, 
    type: 'user', 
    text: input 
  }]);
  
  const userInput = input;
  setInput('');
  setLoading(true);
  
  try {
    const sop = sopDatabase[selectedSOP];
    
    // Now uses async LLM integration
    const response = await getSmartAnswer(userInput, sop.content, sop.keywords);
    
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      type: 'assistant', 
      text: response 
    }]);
    
    if (voiceEnabled) {
      setTimeout(() => speak(response), 300);
    }
    
    logActivity('qa_interaction', {
      sopId: selectedSOP,
      sopName: sop.name,
      question: userInput.substring(0, 100),
      aiPowered: true
    });
  } catch (error) {
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      type: 'assistant', 
      text: `Error: ${error.message}. Using basic response mode.` 
    }]);
  } finally {
    setLoading(false);
  }
};
```

---

## 🎨 Alternative FREE Providers

### Option 2: Together AI (Free $25 Credit)

1. Visit: https://api.together.xyz
2. Sign up (free $25 credit)
3. Get API key from dashboard
4. Update `.env`:

```bash
REACT_APP_TOGETHER_API_KEY=your_together_key_here
REACT_APP_LLM_PROVIDER=together
```

### Option 3: HuggingFace (Completely Free)

1. Visit: https://huggingface.co
2. Sign up (free account)
3. Go to: Settings → Access Tokens
4. Create new token
5. Update `.env`:

```bash
REACT_APP_HUGGINGFACE_API_KEY=hf_your_token_here
REACT_APP_LLM_PROVIDER=huggingface
```

**Note:** HuggingFace is free but slower. Best for Q&A, not quiz generation.

---

## 🧪 Testing Your Setup

### Test 1: Check Configuration

Add this to your App.js to test:

```javascript
import { getProviderInfo } from './services/llmService';

// In useEffect
useEffect(() => {
  const info = getProviderInfo();
  console.log('LLM Provider:', info);
  
  if (!info.configured) {
    console.warn('⚠️ LLM not configured. Add API key to .env file.');
  } else {
    console.log('✅ LLM configured:', info.provider);
  }
}, []);
```

### Test 2: Generate a Quiz

In quiz mode, click "New Questions" - you should see:
- Loading indicator
- Fresh questions generated
- "AI Generated" indicator

### Test 3: Ask a Question

In Q&A mode, ask:
- "What are the main steps?"
- "Explain this process"
- "What systems do I use?"

You should see "🤖 AI Assistant:" responses.

---

## 💰 Cost Comparison

| Provider | Free Tier | Speed | Best For |
|----------|-----------|-------|----------|
| **Groq** | 6000 req/min | ⚡ Very Fast | **Everything** |
| Together AI | $25 credit | 🚀 Fast | Production use |
| HuggingFace | Unlimited | 🐢 Slower | Basic Q&A |

**Recommendation:** Start with Groq. It's the best free option.

---

## 🔧 Troubleshooting

### Error: "API key not configured"

**Fix:** 
1. Check `.env` file exists in project root
2. Ensure variable starts with `REACT_APP_`
3. Restart development server: `npm start`

### Error: "Failed to generate answer"

**Fix:**
1. Check internet connection
2. Verify API key is correct
3. Check API quotas at provider dashboard
4. Try different provider

### Quiz Generation Fails

**Fix:**
1. Ensure SOP content is substantial (>100 characters)
2. Use Groq or Together AI (not HuggingFace)
3. Check console for specific error
4. Falls back to stored questions automatically

### Slow Responses

**Fix:**
1. Switch to Groq (fastest)
2. Check network connection
3. Reduce `max_tokens` in llmService.js

---

## 📊 Monitoring Usage

### Groq Dashboard
- Visit: https://console.groq.com
- Check: API usage, rate limits, errors
- Free tier: 6000 requests/minute

### Together AI Dashboard
- Visit: https://api.together.xyz/dashboard
- Check: Credit balance, usage
- Free: $25 credit

### HuggingFace
- No dashboard needed
- Unlimited free tier
- Rate limited during high traffic

---

## 🎓 How It Works

### Q&A Flow:
1. User asks question
2. System tries pattern matching first (instant)
3. If complex, uses LLM API (1-2 seconds)
4. Response generated and displayed
5. No storage required

### Quiz Generation Flow:
1. User clicks "New Questions"
2. SOP content sent to LLM
3. AI generates 10 fresh questions
4. Questions returned and displayed
5. **NOT stored** - regenerated each time
6. Falls back to stored questions if API fails

---

## 🚀 Production Deployment

### Environment Variables on Vercel/Netlify:

1. Go to project settings
2. Add environment variables:
   - `REACT_APP_GROQ_API_KEY` = your_key
   - `REACT_APP_LLM_PROVIDER` = groq
3. Redeploy

### Security Notes:
- ✅ API keys are safe in React (frontend can see them)
- ✅ Groq/Together/HF are designed for frontend use
- ✅ Free tiers have rate limits (prevents abuse)
- ✅ No sensitive data transmitted

---

## 📈 Scaling

### If You Exceed Free Limits:

**Groq:** 6000 req/min is HUGE. Unlikely to hit.

**Together AI:** Switch to Groq or add credits ($1/million tokens)

**HuggingFace:** Rate limited automatically, just slower

**Best Practice:** Use Groq for primary, HuggingFace as backup

---

## 🎉 Benefits

### Before (Stored Quizzes):
- ❌ Manual quiz creation
- ❌ Fixed questions
- ❌ Repetitive for users
- ❌ Storage required

### After (AI Generated):
- ✅ Automatic quiz creation
- ✅ Unique questions every time
- ✅ Never repetitive
- ✅ Zero storage costs
- ✅ Adapts to SOP content
- ✅ Completely FREE

---

## 📞 Support

### Need Help?

1. **Check Console:** `F12` → Console tab
2. **Test API Key:** Use demo artifact above
3. **Verify .env:** Restart server after changes
4. **Check Provider:** Visit provider dashboard

### Common Issues:

**"Cannot read property of undefined"**
- Import statements missing
- Check file paths

**"Network error"**
- Check internet connection
- Verify API endpoint URLs

**"Invalid JSON"**
- Quiz generation issue
- Falls back to stored automatically

---

## 🎯 Quick Start Checklist

- [ ] Get Groq API key (https://console.groq.com)
- [ ] Create `.env` file with key
- [ ] Copy `llmService.js` to `src/services/`
- [ ] Update `aiTrainer.js`
- [ ] Update `quizGenerator.js`
- [ ] Modify `App.js` (make handleSendMessage async)
- [ ] Restart dev server
- [ ] Test Q&A mode
- [ ] Test quiz generation
- [ ] Deploy!

---

## 🌟 Next Steps

1. **Customize Prompts:** Edit system prompts in `llmService.js`
2. **Adjust Temperature:** Change creativity (0.1 = precise, 1.5 = creative)
3. **Add Caching:** Cache common responses (optional)
4. **Analytics:** Track AI vs pattern-matched responses
5. **Feedback:** Let users rate AI answers

---

**Ready to go! 🚀**

Your SOP training platform now has intelligent AI capabilities for FREE!
