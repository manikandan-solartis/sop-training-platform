// Enhanced AI Trainer Module - Intelligent Step-by-Step Guidance
export const getSmartAnswer = (question, sopContent, keywords = []) => {
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
      
      // Add detailed breakdown
      response += `**What you need to do:**\n`;
      const actionParts = currentStep.split(':');
      if (actionParts.length > 1) {
        response += `${actionParts[1].trim()}\n\n`;
      }
      
      // Add navigation hints
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
  
  // Greeting/Introduction
  if (lowerQ.match(/^(hi|hello|hey|start|begin|help)/)) {
    return `👋 **Hello! I'm your SOP trainer.**\n\nI'll guide you through this process step-by-step. Here's how I can help:\n\n✅ **Step-by-Step Guidance** - Just say "start" or "first step"\n✅ **Detailed Explanations** - Ask "what does this mean?" or "explain this"\n✅ **Application Help** - Ask "what system/application do I use?"\n✅ **Examples** - Ask "give me an example"\n✅ **Navigation** - Say "next step" or "previous step"\n✅ **Quick Search** - Ask about any specific topic\n\n**Ready to begin?** Say "start training" or "show me step 1"!`;
  }
  
  // Starting the process
  if (lowerQ.match(/(start|begin|first|let's start|show me step 1|step 1)/)) {
    const firstStep = formatStepGuidance(0);
    return `🎯 **Let's begin the training!**\n\n${firstStep}\n\n**Remember:** Take your time with each step. Ask me if anything is unclear!`;
  }
  
  // Navigation - Next Step
  if (lowerQ.match(/(next|continue|proceed|what's next|next step|then what)/)) {
    // Try to detect current step context or show step 2
    const response = formatStepGuidance(1) || formatStepGuidance(0);
    return `➡️ **Moving Forward**\n\n${response}`;
  }
  
  // Navigation - Previous Step
  if (lowerQ.match(/(previous|go back|back|prior|before|last step)/)) {
    return `⬅️ **Going Back**\n\n${formatStepGuidance(0)}\n\n💭 Need to review? I can explain any step in detail!`;
  }
  
  // Specific step number requests
  const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step|show.*?(\d+)|go to.*?(\d+)/);
  if (stepMatch) {
    const stepNum = parseInt(stepMatch[1] || stepMatch[2] || stepMatch[4] || stepMatch[5]);
    if (steps[stepNum - 1]) {
      return formatStepGuidance(stepNum - 1);
    } else {
      return `❌ **Step ${stepNum} not found.**\n\nThis process has **${steps.length} steps** in total.\n\n💡 Try: "show me step 1" or "what's the last step?"`;
    }
  }
  
  // How many steps
  if (lowerQ.match(/(how many steps|total steps|number of steps|count steps|all steps)/)) {
    return `📊 **Process Overview:**\n\nThis SOP has **${steps.length} steps** in total.\n\n**Quick Navigation:**\n• Say "show me step [number]" to jump to any step\n• Say "first step" to start from the beginning\n• Say "last step" to see the final step\n\n**Ready to start?** Just say "first step"!`;
  }
  
  // Last/Final step
  if (lowerQ.match(/(last|final|end|conclude|finish|completion)/)) {
    const lastSteps = steps.slice(-3);
    return `🏁 **Final Steps:**\n\n${lastSteps.join('\n\n')}\n\n✅ **Almost done!** These are the closing steps of the process.\n\n💡 Need clarification on any of these? Just ask!`;
  }
  
  // Explanation requests
  if (lowerQ.match(/(what does.*mean|explain|clarify|understand|don't get|confused|help me understand|break.*down|elaborate)/)) {
    const contextSteps = steps.slice(0, 3);
    return `💡 **Let me explain:**\n\n${contextSteps[0]}\n\n**In simple terms:**\nThis step is asking you to start by reviewing the information you received. Think of it as preparing your workspace before you begin the actual work.\n\n**Why is this important?**\nIt ensures you have all the necessary information before proceeding, reducing errors later.\n\n**What you'll need:**\nThe relevant documents, system access, and any reference materials.\n\n❓ **Still unclear?** Ask me:\n• "What system do I use for this?"\n• "Give me an example"\n• "Show me the next step"`;
  }
  
  // Example requests
  if (lowerQ.match(/(example|show me how|demonstrate|for instance|sample|walk me through)/)) {
    return `📝 **Here's a practical example:**\n\n${steps[0] || 'First step in the process'}\n\n**Real-world scenario:**\nLet's say you receive an email about a policy refund:\n\n1️⃣ You open the email and note:\n   • Policy Number: ABC123456\n   • Refund Amount: $450.00\n   • Reason: Cancellation\n\n2️⃣ You verify this matches the criteria in the SOP\n\n3️⃣ You proceed to the next step with this information\n\n**See how it works?** Each step builds on the previous one.\n\n💡 Want to see the next step? Just say "next"!`;
  }
  
  // Application/System questions
  if (lowerQ.match(/(application|system|tool|software|program|platform|where do i|what do i use|which system)/)) {
    const appSection = lines.find(l => l.includes('Applications:') || l.includes('Key Applications'));
    if (appSection) {
      const appIndex = lines.indexOf(appSection);
      const apps = lines.slice(appIndex, appIndex + 10).filter(l => l.startsWith('•'));
      return `💻 **Systems & Applications Used:**\n\n${apps.join('\n')}\n\n**How to use them:**\n• Make sure you have access to all these systems\n• Log in before starting the process\n• Keep all applications open for easy switching\n\n**Step-by-step guidance:**\nI'll tell you exactly which system to use at each step. Just ask "which system for step X?" or continue with "next step"!`;
    }
    return `💻 **System Information:**\n\nThe specific applications are mentioned in each step. As we go through the process step-by-step, I'll point out exactly which system to use.\n\n**Want to start?** Say "first step" and I'll guide you through each application!`;
  }
  
  // Email/Contact questions
  if (lowerQ.match(/(email|contact|who do i|escalate|send to|notify|reach out)/)) {
    const emails = sopContent.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
    const escalation = lines.filter(l => l.toLowerCase().includes('escalat') || l.includes('@'));
    if (emails || escalation.length > 0) {
      return `📧 **Contact & Escalation Information:**\n\n${escalation.slice(0, 5).join('\n')}\n\n**Email Addresses:**\n${emails ? [...new Set(emails)].map(e => `• ${e}`).join('\n') : 'See escalation section above'}\n\n**When to escalate:**\n• Issues you can't resolve\n• Need approval\n• System errors\n• Unusual situations\n\n💡 **Need help with the process?** Continue with "next step"!`;
    }
  }
  
  // Difference/Comparison questions
  if (lowerQ.match(/(difference|vs|compare|distinguish|what's the difference)/)) {
    if (lowerQ.includes('ach') && lowerQ.includes('check')) {
      return `🔄 **ACH vs Check - Key Differences:**\n\n**ACH (Automated Clearing House):**\n✅ Electronic bank transfer\n✅ Faster (3-5 business days)\n✅ Direct to bank account\n✅ Mark with "A" in system (e.g., 123456A)\n✅ Lower cost\n\n**Check:**\n✅ Physical paper check\n✅ Slower (7-10 business days)\n✅ Mailed to address\n✅ No special marking needed\n✅ Traditional method\n\n**Which should you use?**\n• ACH: Preferred for speed and security\n• Check: When ACH info unavailable or payment >6 months old\n\n💡 **Continue learning:** Say "next step" for the process!`;
    }
    return `🔄 **Let me help you understand the differences.**\n\nI noticed you're asking about comparisons. Could you be more specific?\n\n**Common questions:**\n• "Difference between ACH and Check?"\n• "WINS vs RLink?"\n• "Enterprise Inquiry vs Duck Creek?"\n\nOr continue with the step-by-step training by saying "next step"!`;
  }
  
  // SLA/Timing questions
  if (lowerQ.match(/(sla|deadline|turnaround|when|timing|how long|due date|timeframe)/)) {
    const slaLines = lines.filter(l => 
      l.toLowerCase().includes('sla') || 
      l.toLowerCase().includes('schedule') || 
      l.toLowerCase().includes('day') ||
      l.toLowerCase().includes('business day')
    );
    if (slaLines.length > 0) {
      return `⏰ **Timing & SLA Information:**\n\n${slaLines.slice(0, 5).join('\n')}\n\n**Important timing notes:**\n• Follow these deadlines strictly\n• Business days = Mon-Fri (excluding holidays)\n• Set reminders for follow-ups\n• Document when you complete each step\n\n**Ready to proceed?** Say "first step" to begin with proper timing in mind!`;
    }
  }
  
  // Keyboard shortcuts
  if (lowerQ.match(/(shortcut|hotkey|keyboard|key|press|f\d+|shift|ctrl|alt)/)) {
    const shortcuts = lines.filter(l => 
      l.includes('F6') || l.includes('F8') || l.includes('F12') || 
      l.includes('Shift') || l.includes('Ctrl') || l.includes('Enter')
    );
    if (shortcuts.length > 0) {
      return `⌨️ **Keyboard Shortcuts & Commands:**\n\n${shortcuts.slice(0, 8).join('\n')}\n\n**Pro Tips:**\n• Learn these shortcuts to work faster\n• Keep a reference sheet handy\n• Practice with each step\n\n**Ready to practice?** Say "first step" and I'll guide you through using these!`;
    }
  }
  
  // What to do / How to proceed
  if (lowerQ.match(/(what do i do|what should i|how do i|what now|what next|how to proceed|where do i start)/)) {
    return `🎯 **Let's get you started!**\n\n${formatStepGuidance(0)}\n\n**I'm here to help you through the entire process.**\n\nJust follow along and ask questions anytime:\n• "What does this mean?"\n• "Give me an example"\n• "What system do I use?"\n• "Next step"\n\n**Feeling ready?** Let me know when you've completed this step!`;
  }
  
  // Completed a step
  if (lowerQ.match(/(done|completed|finished|next|ok|got it|understood|ready|move on)/)) {
    return `✅ **Great job!**\n\n${formatStepGuidance(1)}\n\n**You're making progress!** Keep going at your own pace.\n\n💪 **Remember:** Quality over speed. Take time to do each step correctly.`;
  }
  
  // Stuck or having trouble
  if (lowerQ.match(/(stuck|trouble|problem|error|issue|can't|won't work|not working|help|difficult)/)) {
    return `🆘 **I'm here to help! Let's troubleshoot together.**\n\n**Common issues and solutions:**\n\n1️⃣ **System Access Issues:**\n   • Verify you're logged in\n   • Check your permissions\n   • Try refreshing the page\n\n2️⃣ **Can't Find Information:**\n   • Double-check the policy/bond number\n   • Verify you're in the correct system\n   • Look for the exact field names I mentioned\n\n3️⃣ **Unclear Instructions:**\n   • Ask me "explain step X"\n   • Request an example\n   • Break it down into smaller parts\n\n**What specifically are you stuck on?** Tell me:\n• "Can't find the field"\n• "System won't let me"\n• "Don't understand step X"\n• "Need an example"`;
  }
  
  // General keyword search in SOP
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
  
  // Default helpful response
  return `🤔 **I want to help you!**\n\n**Here's what I can do:**\n\n📚 **Training Modes:**\n• "First step" - Start step-by-step training\n• "Show me step 5" - Jump to specific step\n• "Next step" - Continue to next step\n• "Last step" - See final steps\n\n💡 **Get Help:**\n• "What does this mean?" - Detailed explanations\n• "Give me an example" - Real scenarios\n• "What system do I use?" - Application info\n• "Who do I contact?" - Email addresses\n\n🔍 **Quick Info:**\n• "How many steps?" - Process overview\n• "What's the SLA?" - Timing requirements\n• "Keyboard shortcuts?" - Quick commands\n\n**Ready to start?** Just say "first step"!\n\n**Have a specific question?** Ask me about any topic in the SOP!`;
};

export default getSmartAnswer;
