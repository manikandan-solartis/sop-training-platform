export default {
  id: 'agent-statement-requests',
  name: 'Agent Statement Requests',
  category: 'Payment Processing',
  difficulty: 'Beginner',
  summary: 'Process for generating and sending agent commission statements upon request',
  content: `**Key Applications:**
• RLI Enterprise Inquiry
• Duck Creek
• Microsoft Outlook
• Adobe PDF Reader

**Processing Schedule:** As needed (request-driven)
**SLA:** 1-2 business days
**Volume:** 5 to 15 per week
**Accuracy Required:** 100%

**Process Overview:**

Generate and send agent commission statements when requested by agents. Use Enterprise Inquiry as primary source, Duck Creek as secondary verification.

**Part 1: Receive and Review Request**

Step 1: Receive email from agent requesting statement
Step 2: Note agent code from email
Step 3: Note requested period (monthly, quarterly, annual)
Step 4: Note any specific date range if mentioned
Step 5: Open RLI Enterprise Inquiry

**Part 2: Generate Statement in Enterprise Inquiry**

Step 6: Log into RLI Enterprise Inquiry
Step 7: Navigate to Commission Statements section
Step 8: Search for agent code
Step 9: Select appropriate time period
Step 10: Generate statement report
Step 11: Review statement for accuracy
Step 12: Export as PDF
Step 13: Save with naming convention: AgentCode_Period_Date.pdf

**Part 3: Verify Data (if needed)**

Step 14: If Enterprise Inquiry doesn't have complete data, open Duck Creek
Step 15: Search for agent using policy information
Step 16: Click hyperlinked policy term
Step 17: Access "Policy Extended Data" on left side
Step 18: Note "RLI Producer Reference" or "Producer Account Reference"
Step 19: Use this reference for verification
Step 20: Cross-reference amounts with Enterprise Inquiry

**Part 4: Prepare and Send Response**

Step 21: Open new email in Outlook
Step 22: Address to agent's email
Step 23: CC: surety.accounting@rlicorp.com
Step 24: Subject: "Agent Statement - [Agent Code] - [Period]"
Step 25: Use professional tone in email body
Step 26: Attach statement PDF
Step 27: Include brief summary of statement period
Step 28: Provide contact information for questions
Step 29: Review email and attachment
Step 30: Send email

**Email Template:**

Subject: Agent Statement - [Agent Code] - [Period]

Dear [Agent Name],

Please find attached your commission statement for [Period]. This statement covers transactions from [Start Date] to [End Date].

If you have any questions or need clarification on any items, please don't hesitate to contact us.

Thank you,
[Your Name]
Surety Accounting Team

**Critical Rules:**
• Always CC surety.accounting@rlicorp.com on response emails
• Use Enterprise Inquiry as primary source
• Use Duck Creek only for verification or if Enterprise Inquiry unavailable
• Generate statements within 1-2 business days
• Review statements for accuracy before sending
• Use standard naming convention for saved files
• Maintain professional tone in all communications
• If agent code not found, verify with agent before proceeding
• Keep copies of sent statements for records

**Statement Periods:**
• Monthly: Current or previous month
• Quarterly: Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec)
• Annual: Full calendar year or fiscal year

**File Naming Convention:**
AgentCode_Period_Date.pdf
Example: 12345_Q2-2025_06-15-2025.pdf

**Verification Checklist:**
✓ Agent code correct
✓ Period matches request
✓ Amounts properly calculated
✓ PDF properly formatted
✓ Email addressed correctly
✓ Surety Accounting CCd
✓ Attachment included

**Common Issues:**
• Agent code not found: Verify code with agent
• Incomplete data: Use Duck Creek for verification
• Wrong period: Confirm period with agent
• System unavailable: Notify agent of delay

**Escalation Contacts:**
• Level 1: Kelly Barnard - Kelly.Barnard@rlicorp.com
• Level 2: Danielle Moore - Danielle.Moore@rlicorp.com
• General: surety.accounting@rlicorp.com`,
  keywords: ['enterprise inquiry', 'commission statement', 'agent code', 'duck creek', 'producer reference', 'pdf', 'quarterly', 'monthly', 'annual', 'surety accounting']
};
