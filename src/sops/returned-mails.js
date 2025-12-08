export default {
  id: 'returned-mails',
  name: 'Returned Mails Processing',
  category: 'Mail Processing',
  difficulty: 'Intermediate',
  summary: 'Daily process for following up on returned invoices and updating addresses',
  content: `**Key Applications:**
• Duck Creek
• RLI Enterprise Inquiry
• General Email box (Premium Accounting)
• Microsoft Outlook
• Adobe Reader
• Microsoft Excel

**Processing Schedule:** Daily
**SLA:** 24 hours from receipt
**Volume:** 15 to 20 returned invoices per day
**Accuracy Required:** 100%

**Process Overview:**

Follow up with agent for returned mail invoices and update new address when received. Review returned invoices, log in Excel, email agents, update Duck Creek, and coordinate with Operations team for policy updates.

**Part 1: Check Volume and Initial Processing**

Step 1: Open path P:\\Returned mail\\Spreadsheet folder\\Daily Scans
Step 2: Navigate to current date folder
Step 3: Open returned invoice PDF files
Step 4: Open "Solartis Return Mail Log" Excel file

**Part 2: Log Invoice Details**

Step 5: Enter Current Date (date when logging)
Step 6: Fetch Statement Date from returned invoice
Step 7: Fetch Account/Policy number from Customer Reference ID
Step 8: Fetch Name on Account from invoice
Step 9: Fetch Original Address from highlighted data on invoice
Step 10: Leave Updated Address blank (will be filled when received)
Step 11: Mark Status as "Pending"

**Part 3: Find Agency Email**

Step 12: Copy policy number from returned invoice
Step 13: Open RLI Enterprise Inquiry
Step 14: Search for policy number
Step 15: Choose appropriate policy from list
Step 16: Go to Documents field
Step 17: Select document sent to Producer (usually "Producer Notice")
Step 18: Locate agency email address in document
Step 19: Paste agency email in Agency field of Excel

**Part 4: Send Email to Agent**

Step 20: Open email on behalf of Premium Accounting
Step 21: Subject Line: Account Number/Policy Number/Name on Account
Step 22: Use email template requesting updated address
Step 23: Include policy number and insured name
Step 24: Include address from invoice
Step 25: Attach copy of most recent invoice
Step 26: Send email to agency

**Part 5: Process Agent Response - Regular Policies**

Step 27: When updated address received, open Duck Creek
Step 28: Go to Payee tab
Step 29: Select insured name
Step 30: Select "Work with address"
Step 31: Click "Correct" option
Step 32: Enter new address details
Step 33: Click Save
Step 34: Click Back button in next screen
Step 35: Click Finish button
Step 36: Update "Updated Address" field in Excel
Step 37: Update Status to "Completed" in Excel

**Part 6: Send Email to Operations Team**

Step 38: Identify policy prefix
Step 39: Use prefix document to determine correct team email
Step 40: Send email to operations team with new address
Step 41: Request address update in actual policy

**Part 7: Follow-Up Process**

Step 42: After 5 business days, check for agent response
Step 43: If no response, send follow-up email using same template
Step 44: If still no response after follow-up, update Status to "No response"
Step 45: Add note in Duck Creek: "No response from agent for address change"
Step 46: Discontinue further follow-up

**Part 8: Special Process - Hawaii Invoices (RHO/DFP)**

Step 47: For policies beginning with RHO or DFP, open Duck Creek
Step 48: Confirm address on file matches returned invoice address
Step 49: Click hyperlinked policy term at bottom of page
Step 50: Click "Policy Extended Data" on left side
Step 51: Note the "RLI Producer Reference" number
Step 52: Enter Producer Reference in search under "Account Number"
Step 53: Pull up agency account
Step 54: Click "Agency Extended Data"
Step 55: Locate agent email address on this screen
Step 56: Use this email for Hawaii policy communications

**Part 9: Agent Confirms Address is Correct**

Step 57: If agent responds address is correct, note in Excel
Step 58: Notes field: "Agent states address is correct"
Step 59: Update Status to "Completed"
Step 60: No Duck Creek update needed if address confirmed correct

**Email Template to Agent:**

Subject: Account Number/Policy Number/Name on Account

Hello,

Due to return to sender mail for policy [policy # (Insured's Name)] with the below address, will you please share the current physical/billing address you have on record for our insured? Attached is a copy of the most recent invoice for this policy.

[Address on Invoice]

Thanks,

**Status Definitions:**
• Completed: Address received and updated
• Pending: Awaiting agent response
• No response: No reply after two follow-up emails

**Policy Prefix Email Routing:**

Marine Prefixes (CAR, EMA, HUL, IMA, MAP, MEX, MLP, MRP): marine.support@rlicorp.com
Package Prefixes (APO, BPO, PPO, WPO, XPO): RLIPack.Document@rlicorp.com
Hawaii Prefixes (RHO, DFP): Use Agency Extended Data process

**Critical Rules:**
• Log all returned invoices in "Solartis Return Mail Log" Excel
• Always email from Premium Accounting mailbox
• Attach copy of invoice to email
• Update Duck Creek only after receiving new address
• Send update to Operations team for policy system updates
• Follow up after 5 business days if no response
• After second email with no response, mark "No response" and stop
• For Hawaii policies, use Agency Extended Data to find email
• If agent confirms address correct, note in Excel - no Duck Creek update
• Always fetch agency email from Producer Notice document
• Statement Date comes from returned invoice
• Original Address comes from returned invoice
• Updated Address comes from agent response

**Excel Log Location:** P:\\Returned mail\\Spreadsheet folder\\Solartis Return Mail Log

**Daily Scans Location:** P:\\Returned mail\\Spreadsheet folder\\Daily Scans

**Follow-Up Timeline:**
Day 0: Initial email sent
Day 5: Follow-up email if no response
After Day 5: Mark "No response" and close

**Duck Creek Navigation:**
Payee Tab → Select Insured → Work with Address → Correct → Enter Details → Save → Back → Finish

**Notes Field Usage:**
• "Agent states address is correct" - if no change needed
• "No response from agent for address change" - if no reply

**Escalation:** Jennifer.Hasse@rlicorp.com (Level 1), bob.ogle@rlicorp.com (Level 2)`,
  keywords: ['returned mail', 'returned invoice', 'premium accounting', 'duck creek', 'rli enterprise inquiry', 'producer notice', 'address update', 'payee tab', '5 business days', 'follow-up', 'rho', 'dfp', 'hawaii', 'agency extended data']
};
