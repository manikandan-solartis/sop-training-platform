export default {
  id: 'agency-check-request',
  name: 'Agency Check Request',
  category: 'Payment Processing',
  difficulty: 'Advanced',
  summary: 'Weekly process every Wednesday for agency check requests',
  content: `**Key Applications:**
• RLI Enterprise Inquiry
• Surety Accounting email (Check request folder)
• Microsoft Outlook, Excel
• Lawson
• Image Express
• WINS

**Processing Schedule:** Every Wednesday
**SLA:** Every Wednesday

**Main Process Steps:**

Step 1: Check "Check Request" folder under Task 1 in inbox
Step 2: Receive email from agent requesting credit
Step 3: Pull up statement on Enterprise Inquiry by searching agent code
Step 4: Double check credit balance in WINS by pulling up bonds
Step 5: Save statement as AGT in: P:\\SURETY\\Agency Check Requests\\[year/month/week]
Step 6: Open Excel "Week of Check Request for Agents" from two weeks ago, Save As with current date
Step 7: Fill Excel: Agent#, Refund Amount, GL (20/BSL01/255005), Division
Step 8: Check Image Express for payment method (ACH or Check)
Step 9: Send email to agent using appropriate template with Friday date

**Creating Batch (Wednesdays):**
Step 10: Sort Excel data by Agent#
Step 11: Update "Week of Agency Request Lawson Surety Upload" (yellow fields)
Step 12: Email Lawson batch processor with attachment
Step 13: Save report with batch number when completed
Step 14: Combine all statements, save as "Week of[date] Check Requests"

**Submit Check Request:**
Step 15: Open ImageExpress eForm website
Step 16: Fill: Payment Date, Description (Batch# Statement Check Req), Payment Amount
Step 17: Vendor Search: Use SURETY AGENCY BATCH with correct location code
Step 18: Attach combined PDF and report, approve in queue

**Posting in WINS:**
Step 19: Open Excel by division for controls
Step 20: Search Lawson (ap90.2, Company 20) for ACH/Check number
Step 21: Post in WINS: Division mnemonic → AC → Control number
Step 22: Enter activity date, control total with (-)
Step 23: Enter agent code with 12/current year
Step 24: Enter check/ACH number (add "A" for ACH), check total with (-)
Step 25: Locate policy, enter bond numbers with TR 84
Step 26: Enter payment amounts with (-) for credits
Step 27: Hit F6, then F8 to post write off

**Critical Rules:**
• GL Code: Always 20/BSL01/255005
• Agent numbers 00984, 00985, 00986: Do NOT process refund
• Statement shows positive balance: Do NOT process refund
• ACH in WINS: Add "A" after number (e.g., 123456A)
• Location Codes: 1 (<$5k), 2 (<$50k), 3 (<$10m), 4 (>$10m)
• ALWAYS follow statement amount, even if bond shows different credit
• Single bond or credit less than statement: Mark my color

**Email Templates:**
ACH Template: "Your refund request has been completed and an ACH is scheduled to be direct deposited into your account on/after [date]."

Check Template: "Your refund request has been completed and a check is scheduled to be sent out on/after [date]."

**Location Code Approvers:**
• Location 1: Danielle Moore
• Location 2: Diane Swope
• Location 3: Kathleen Taylor
• Location 4: Seth Davis

**Escalation:** surety.accounting@rlicorp.com`,
  keywords: ['lawson', 'image express', 'wins', 'tr 84', 'wednesday', 'gl 20/bsl01/255005', 'ach', 'enterprise inquiry', 'batch', 'eform']
};
