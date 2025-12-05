// AI Trainer Module - Smart Q&A responses
export const getSmartAnswer = (question, sopContent, keywords = []) => {
  const lowerQ = question.toLowerCase();
  const lines = sopContent.split('\n').map(l => l.trim()).filter(l => l);
  
  // Application/System questions
  if (lowerQ.includes('application') || lowerQ.includes('system') || lowerQ.includes('tool') || lowerQ.includes('software')) {
    const appSection = lines.find(l => l.includes('Applications:') || l.includes('Key Applications'));
    if (appSection) {
      const appIndex = lines.indexOf(appSection);
      const apps = lines.slice(appIndex, appIndex + 10).filter(l => l.startsWith('•'));
      return `**Applications used in this process:**\n\n${apps.join('\n')}`;
    }
  }

  // Email/Contact questions
  if ((lowerQ.includes('where') || lowerQ.includes('who')) && (lowerQ.includes('send') || lowerQ.includes('email') || lowerQ.includes('contact') || lowerQ.includes('escalate'))) {
    const emails = sopContent.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
    const escalation = lines.filter(l => l.toLowerCase().includes('escalat') || l.includes('@'));
    if (emails || escalation.length > 0) {
      return `**Escalation & Contact Information:**\n\n${escalation.slice(0, 5).join('\n')}\n\n${emails ? `Emails: ${[...new Set(emails)].join(', ')}` : ''}`;
    }
  }

  // Difference/Comparison questions
  if (lowerQ.includes('difference') || lowerQ.includes('vs') || lowerQ.includes('compare') || lowerQ.includes('distinguish')) {
    if (lowerQ.includes('ach') && lowerQ.includes('check')) {
      return `**Difference between ACH and Check:**\n\n**ACH (Automated Clearing House):**\n• Direct deposit into agent's account\n• Add "A" after number when posting in WINS (e.g., 123456A)\n• Faster processing\n• Use ACH email template\n\n**Check:**\n• Physical check sent by mail\n• No special marking needed\n• Standard processing time\n• Use Check email template`;
    }
    if (lowerQ.includes('wins') && lowerQ.includes('rlink')) {
      return `**Difference between WINS and RLink:**\n\n**WINS:**\n• Financial transaction system\n• Used for posting payments\n• Update using keyboard shortcuts (Shift+F1, F6, F8)\n• One "Collections" note only\n\n**RLink:**\n• Bond documentation system\n• Used for detailed notes and records\n• Access via "My Bond Center"\n• One "Direct Collect" note only\n• Notes require zero remainder and "Surety Operations" placement`;
    }
    if (lowerQ.includes('enterprise') && lowerQ.includes('duck')) {
      return `**Difference between Enterprise Inquiry and Duck Creek:**\n\n**Enterprise Inquiry:**\n• Primary tool for agent statements\n• Check commission statements first\n• Agent account information\n\n**Duck Creek:**\n• Secondary verification tool\n• Used when Enterprise Inquiry doesn't have info\n• Premium-related information\n• Access "Policy Extended Data" for Producer Account Reference`;
    }
  }

  // SLA/Timing questions
  if (lowerQ.includes('sla') || lowerQ.includes('deadline') || lowerQ.includes('turnaround') || lowerQ.includes('when') || lowerQ.includes('timing')) {
    const slaLines = lines.filter(l => l.toLowerCase().includes('sla') || l.toLowerCase().includes('schedule') || l.toLowerCase().includes('wednesday') || l.toLowerCase().includes('business day'));
    if (slaLines.length > 0) {
      return `**SLA & Timing Information:**\n\n${slaLines.slice(0, 5).join('\n')}`;
    }
  }

  // Keyboard shortcut questions
  if (lowerQ.includes('shortcut') || lowerQ.includes('key') || lowerQ.includes('f6') || lowerQ.includes('f8') || lowerQ.includes('shift')) {
    const shortcuts = lines.filter(l => l.includes('F6') || l.includes('F8') || l.includes('Shift') || l.includes('Type'));
    if (shortcuts.length > 0) {
      return `**Keyboard Shortcuts & Commands:**\n\n${shortcuts.slice(0, 8).join('\n')}`;
    }
  }

  // Step-specific questions
  const steps = lines.filter(l => l.toLowerCase().startsWith('step'));
  
  if (lowerQ.includes('first') || lowerQ.includes('start') || lowerQ.includes('begin') || lowerQ.includes('initial')) {
    return steps[0] ? `**First Step:**\n\n${steps[0]}\n\n${steps[1] || ''}\n\n${steps[2] || ''}` : 'Please refer to the SOP content for the first step.';
  }
  
  if (lowerQ.includes('last') || lowerQ.includes('final') || lowerQ.includes('end') || lowerQ.includes('complete')) {
    const lastSteps = steps.slice(-3);
    return lastSteps.length > 0 ? `**Final Steps:**\n\n${lastSteps.join('\n\n')}` : 'Please refer to the SOP for the final steps.';
  }
  
  if (lowerQ.includes('how many steps') || lowerQ.includes('number of steps') || lowerQ.includes('total steps')) {
    return `**Total Steps:** This process has ${steps.length} steps in total.\n\nWould you like to know about a specific step?`;
  }
  
  // Specific step number
  const stepMatch = lowerQ.match(/step (\d+)|(\d+)(st|nd|rd|th) step/);
  if (stepMatch) {
    const stepNum = parseInt(stepMatch[1] || stepMatch[2]);
    if (steps[stepNum - 1]) {
      const prevStep = steps[stepNum - 2] ? `Previous: ${steps[stepNum - 2]}\n\n` : '';
      const nextStep = steps[stepNum] ? `\n\nNext: ${steps[stepNum]}` : '';
      return `${prevStep}**Current Step:**\n${steps[stepNum - 1]}${nextStep}`;
    }
  }

  // Keyword search from SOP-specific keywords
  for (const keyword of keywords) {
    if (lowerQ.includes(keyword.toLowerCase())) {
      const relevantLines = lines.filter(l => l.toLowerCase().includes(keyword.toLowerCase()));
      if (relevantLines.length > 0) {
        return `**Information about "${keyword}":**\n\n${relevantLines.slice(0, 5).join('\n\n')}`;
      }
    }
  }

  // General keyword search
  const searchTerms = lowerQ.split(' ').filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'should', 'would', 'could'].includes(w));
  const matches = [];
  
  for (const term of searchTerms) {
    const matchingLines = lines.filter(l => l.toLowerCase().includes(term));
    matches.push(...matchingLines);
  }
  
  if (matches.length > 0) {
    const uniqueMatches = [...new Set(matches)].slice(0, 5);
    return `**Based on your question, here's the relevant information:**\n\n${uniqueMatches.join('\n\n')}`;
  }
  
  // Default response with overview
  return `**SOP Overview:**\n\n${sopContent.substring(0, 500)}...\n\n**I can help you with:**\n• Specific steps in the process\n• Applications and systems used\n• Email addresses and escalation contacts\n• Differences between processes/systems\n• SLA and timing requirements\n• Keyboard shortcuts and commands\n\nPlease ask a more specific question!`;
};

export default getSmartAnswer;
