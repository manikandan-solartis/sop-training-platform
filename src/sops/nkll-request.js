export default {
  id: 'nkll-request',
  name: 'Requesting NKLL Form',
  category: 'Policy Processing',
  difficulty: 'Beginner',
  summary: 'Weekly process for sending NKLL form to agents for reinstatement confirmation',
  content: `**Key Applications:**
• MS Excel
• Google Chrome (Duck Creek)
• Microsoft Edge (Image Express)
• Outlook

**Processing Schedule:** Weekly
**SLA:** 24 hours from receipt
**Volume:** 10 to 20 per week
**Accuracy Required:** 100%

**Process Overview:**

Send email to agent for confirmation of reinstatement and to obtain completed NKLL form. RLI sends weekly email with Excel containing policy list, search each policy in Duck Creek, verify reinstatement status, and send NKLL form to agent.

**Part 1: Analyze the Excel**

Step 1: Receive weekly email from RLI with Excel spreadsheet
Step 2: Open attached Excel file with multiple accounts
Step 3: Review policy list requiring NKLL form

**Part 2: Search Policy in Duck Creek**

Step 4: Copy policy number from Excel
Step 5: Open Duck Creek in Google Chrome
Step 6: Paste policy number in search field
Step 7: Hit search to locate policy

**Part 3: Verify Policy Status**

Step 8: Check if policy is ready for reinstatement
Step 9: Verify cancellation date in Duck Creek
Step 10: Check past due amount in Duck Creek
Step 11: Review policy details for accuracy

**Part 4: Prepare Email**

Step 12: Open email template in Outlook
Step 13: Fill in Policy number from Duck Creek
Step 14: Fill in cancellation date from Duck Creek
Step 15: Copy agent email address from Excel
Step 16: Paste agent email in "To" section
Step 17: Change "From" address to "Enterprise Billing"

**Part 5: Attach NKLL Form**

Step 18: Locate blank NKLL document
Step 19: Attach NKLL document to email
Step 20: Verify attachment is properly added

**Part 6: Send Email**

Step 21: Review email for accuracy (policy number, date, attachment)
Step 22: Verify recipient email address is correct
Step 23: Verify "From" address is "Enterprise Billing"
Step 24: Click Send button to send email

**Part 7: Add Note in Duck Creek**

Step 25: Go to Notes section in Duck Creek
Step 26: Add new note with following text:
        "Payment has been received. Sent NKLL to an agent. It will need to be completed and received within 5 days to reinstate."
Step 27: Save note in Duck Creek
Step 28: Verify note is properly saved
Step 29: Move to next policy in Excel list

**Email Template:**

Subject: NKLL Request for Policy [Policy Number]

Dear Agent,

We have received payment for the above-referenced policy. However, the policy was previously cancelled on [Cancellation Date].

In order to reinstate this policy, we need a completed No Known Loss Letter (NKLL) from you. Please complete the attached form and return it to us within 5 days.

Policy Number: [Policy Number]
Cancellation Date: [Cancellation Date]
Past Due Amount: [Amount from Duck Creek]

Please let us know if you have any questions.

Thank you,
Enterprise Billing

**Critical Rules:**
• Always verify policy is ready for reinstatement before sending email
• NKLL must be completed and received within 5 days
• Always use "Enterprise Billing" as From address
• Include policy number and cancellation date in email
• Attach blank NKLL document to every email
• Add note in Duck Creek after sending each email
• Copy exact cancellation date from Duck Creek
• Use agent email address from Excel file
• Process all policies in weekly batch
• Keep template consistent for all emails

**NKLL Document:**
• Blank form attached to all emails
• Agent must complete and return within 5 days
• Required for policy reinstatement
• No Known Loss Letter confirms no claims

**Duck Creek Note Format:**
"Payment has been received. Sent NKLL to an agent. It will need to be completed and received within 5 days to reinstate."

**From Address:**
Always use: Enterprise Billing

**Verification Checklist:**
✓ Policy ready for reinstatement
✓ Cancellation date correct
✓ Past due amount verified
✓ Agent email from Excel
✓ NKLL form attached
✓ From address is Enterprise Billing
✓ Note added in Duck Creek

**Escalation:** Ashley.Seidel@rlicorp.com (Level 1), Colleen.Krider@rlicorp.com (Level 2)`,
  keywords: ['nkll', 'no known loss letter', 'reinstatement', 'duck creek', 'enterprise billing', '5 days', 'cancellation date', 'past due', 'agent email', 'weekly']
};
