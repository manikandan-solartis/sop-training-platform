// Enhanced AI Trainer - Now with FREE LLM Integration
import { generateAnswer as llmGenerateAnswer } from './services/llmService';

/**
 * Smart answer function with LLM fallback
 * First tries pattern matching, then uses free LLM for complex questions
 */
export const getSmartAnswer = async (question, sopContent, keywords = []) => {
  const lowerQ = question.toLowerCase();
  const lines = sopContent.split('\n').map(l => l.trim()).filter(l => l);
  const steps = lines.filter(l => l.toLowerCase().startsWith('step'));
  
  // Helper function to format step guidance
  const formatStepGuidance = (stepIndex, context = 'current') => {
    if (!steps[stepIndex]) return null;
    
    const currentStep = steps[stepIndex];
    const prevStep = steps[stepIndex - 1];
    const nextStep = steps[stepIndex + 1];
    
    let response = '';
    
    if (context === 'current') {
      response += `📍 **Current Step (Step ${stepIndex + 1}):**\n\n${currentStep}\n\n`;
      
      response += `**What you need to do:**\n`;
      const actionParts = currentStep.split(':');
      if (actionParts.length > 1) {
        response += `${actionParts[1].trim()}\n\n`;
      }
      
      if (prevStep) {
        response += `⬆️ **Previous:** ${prevStep.substring(0, 80)}...\n`;
      }
      if (nextStep) {
        response += `⬇️ **Next:** ${nextStep.substring(0, 80)}...\n`;
      }
      
      response += `\n💡 **Need help?** Ask me:\n`;
      response += `• "What does this step mean?"\n`;
      response += `• "Show me the next step"\n`;
      response += `• "What application do I use?"\n`;
      response += `• "Give me an example"`;
    }
    
    return response;
  };
  
  // Quick pattern matching for common queries
  if (lowerQ.match(/^(hi|hello|hey|start|begin|help)/)) {
    return `👋 **Hello! I'm your SOP trainer.**\n\nI'll guide you through this process step-by-step. Here's how I can help:\n\n✅ **Step-by-Step Guidance** - Just say "start" or "first step"\n✅ **Detailed Explanations** - Ask "what does this mean?" or "explain this"\n✅ **Application Help** - Ask "what system/application do I use?"\n✅ **Examples** - Ask "give me an example"\n✅ **Navigation** - Say "next step" or "previous step"\n✅ **Quick Search** - Ask about any specific topic\n\n**Ready to begin?** Say "start training" or "show me step 1"!`;
  }
  
  if (lowerQ.match(/(start|begin|first|let's start|show me step 1|step 1)/)) {
    const firstStep = formatStepGuidance(0);
    return `🎯 **Let's begin the training!**\n\n${firstStep}\n\n**Remember:** Take your time with each step. Ask me if anything is unclear!`;
  }
  
  if (lowerQ.match(/(next|continue|proceed|what's next|next step|then what)/)) {
    const response = formatStepGuidance(1) || formatStepGuidance(0);
    return `➡️ **Moving Forward**\n\n${response}`;
  }
  
  // Specific step number requests
  const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step|show.*?(\d+)|go to.*?(\d+)/);
  if (stepMatch) {
    const stepNum = parseInt(stepMatch[1] || stepMatch[2] || stepMatch[4] || stepMatch[5]);
    if (steps[stepNum - 1]) {
      return formatStepGuidance(stepNum - 1);
    }
  }
  
  // How many steps
  if (lowerQ.match(/(how many steps|total steps|number of steps|count steps|all steps)/)) {
    return `📊 **Process Overview:**\n\nThis SOP has **${steps.length} steps** in total.\n\n**Quick Navigation:**\n• Say "show me step [number]" to jump to any step\n• Say "first step" to start from the beginning\n• Say "last step" to see the final step\n\n**Ready to start?** Just say "first step"!`;
  }

  // Application/System questions
  if (lowerQ.match(/(application|system|tool|software|program|platform|where do i|what do i use|which system)/)) {
    const appSection = lines.find(l => l.includes('Applications:') || l.includes('Key Applications'));
    if (appSection) {
      const appIndex = lines.indexOf(appSection);
      const apps = lines.slice(appIndex, appIndex + 10).filter(l => l.startsWith('•'));
      return `💻 **Systems & Applications Used:**\n\n${apps.join('\n')}\n\n**How to use them:**\n• Make sure you have access to all these systems\n• Log in before starting the process\n• Keep all applications open for easy switching\n\n**Step-by-step guidance:**\nI'll tell you exactly which system to use at each step. Just ask "which system for step X?" or continue with "next step"!`;
    }
  }

  // Email/Contact questions
  if (lowerQ.match(/(email|contact|who do i|escalate|send to|notify|reach out)/)) {
    const emails = sopContent.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
    const escalation = lines.filter(l => l.toLowerCase().includes('escalat') || l.includes('@'));
    if (emails || escalation.length > 0) {
      return `📧 **Contact & Escalation Information:**\n\n${escalation.slice(0, 5).join('\n')}\n\n**Email Addresses:**\n${emails ? [...new Set(emails)].map(e => `• ${e}`).join('\n') : 'See escalation section above'}\n\n**When to escalate:**\n• Issues you can't resolve\n• Need approval\n• System errors\n• Unusual situations\n\n💡 **Need help with the process?** Continue with "next step"!`;
    }
  }

  // For complex questions, use FREE LLM
  try {
    console.log('🤖 Using free LLM for complex question...');
    const llmResponse = await llmGenerateAnswer(question, sopContent);
    return `🤖 **AI Assistant:**\n\n${llmResponse}\n\n💡 *Generated using free LLM - no storage costs!*`;
  } catch (error) {
    console.error('LLM Error:', error);
    
    // Fallback to keyword search
    const searchTerms = lowerQ.split(' ').filter(w => 
      w.length > 3 && 
      !['what', 'when', 'where', 'which', 'should', 'would', 'could', 'does', 'this', 'that', 'have', 'will'].includes(w)
    );
    
    if (searchTerms.length > 0) {
      const matches = [];
      for (const term of searchTerms) {
        const matchingLines = lines.filter(l => l.toLowerCase().includes(term));
        matches.push(...matchingLines);
      }
      
      if (matches.length > 0) {
        const uniqueMatches = [...new Set(matches)].slice(0, 4);
        return `🔍 **Found relevant information:**\n\n${uniqueMatches.join('\n\n')}\n\n**Want more details?** Ask me:\n• "Explain this step"\n• "Give me an example"\n• "What's the next step?"\n\n**Or start from the beginning:** Say "first step"!`;
      }
    }
    
    // Final fallback
    return `🤔 **I want to help you!**\n\n**Here's what I can do:**\n\n📚 **Training Modes:**\n• "First step" - Start step-by-step training\n• "Show me step 5" - Jump to specific step\n• "Next step" - Continue to next step\n\n💡 **Get Help:**\n• "What does this mean?" - Detailed explanations\n• "Give me an example" - Real scenarios\n• "What system do I use?" - Application info\n\n🔍 **Quick Info:**\n• "How many steps?" - Process overview\n• "What's the SLA?" - Timing requirements\n\n**Ready to start?** Just say "first step"!`;
  }
};

export default getSmartAnswer;
