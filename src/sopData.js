// SOP Database - Add new SOPs here
export const sopData = {
  'agency-check-request': {
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
  },

  'agent-statement-requests': {
    id: 'agent-statement-requests',
    name: 'Agent Statement Requests',
    category: 'Customer Service',
    difficulty: 'Intermediate',
    summary: '1 Business Day SLA for agent commission statements',
    content: `**Key Applications:**
• Microsoft Outlook
• RLI Inquiry Tool / Enterprise Inquiry
• RLink 3
• Duck Creek
• Agent Portal / Agent Dashboard
• Surety Accounting Inbox

**SLA:** 1 Business Day
**Accuracy Required:** 100%

**Scenario 1: Agent Code Provided**
Step 1: Check if agent code is provided in request
Step 2: Check commission amount in RLI statement
Step 3: If amount is POSITIVE → Attach and send statement
Step 4: If amount is NEGATIVE or ZERO → Flag email to Surety Accounting (do NOT send)

**Scenario 2: Missing Agent Code/Producer Name**
Step 5: Check email for agent code or producer name
Step 6: Look for attachments in email
Step 7: If complete info → Categorize as "Solartis", move to 2025 folder
Step 8: If need clarification → Categorize as "Waiting on Response", place in Agent Statement Request Inbox

**Scenario 3: Missing All Information**
Step 9: If no agent code or policy number provided
Step 10: Contact respective agent to request missing information
Step 11: Raise exception to document missing info and follow-up action

**Scenario 4: Agent Name but No Code**
Step 12: If agent name mentioned but code missing
Step 13: Search agent name in RLink 3
Step 14: Find corresponding agent code for commission statement

**Scenario 5: Premium Amount Inquiry**
Step 15: If email requests specific premium amount for agent code
Step 16: Search for premium in Enterprise Inquiry FIRST
Step 17: If amount doesn't match → Search in Duck Creek
Step 18: If Duck Creek premium matches email amount → Forward to Premium Accounting team

**Scenario 6: No Statement in Enterprise Inquiry**
Step 19: If commission statement requested for agent code
Step 20: Check Enterprise Inquiry for commission statement
Step 21: If no statement found → Search Duck Creek to verify if premium-related
Step 22: Click Policy Number under Endorsement section
Step 23: Navigate to Policy Term Summary screen
Step 24: Click "Policy Extended Data" on left panel
Step 25: Select "Producer Account Reference" and paste in Duck Creek search
Step 26: If displays disbursed premium amount → Confirm it's premium-related
Step 27: If premium-related → Forward to Premium Accounting, CC agent
Step 28: If no premium found → Contact Surety Accounting for clarification

**Escalation Matrix:**
• Value negative or odd → Flag to Surety Accounting
• Premium-related request → Forward to Premium Accounting
• Agent portal access issues → Send to Access/IT Team
• Email mismatch/unclear → Ask agent for clarity
• Manual pull verified → Send statement + BCC Surety Accounting

**Important Reminders:**
❗ Never assume statement was not sent - always verify
❗ Check correct statement attached before sending
📌 Always document every step
📎 Use flowchart to confirm routing if in doubt

**Key Contacts:**
• Surety Accounting: For negative amounts, unclear requests
• Premium Accounting: For premium-related inquiries
• Access/IT Team: For portal access issues`,
    keywords: ['rlink 3', 'duck creek', 'commission', 'producer account reference', 'policy extended data', 'enterprise inquiry', 'premium accounting']
  },

  'collections-rlink-wins-notes': {
    id: 'collections-rlink-wins-notes',
    name: 'Collections - RLink & WINS Notes',
    category: 'Collections',
    difficulty: 'Advanced',
    summary: 'Monthly update of collection notes in WINS and RLink systems',
    content: `**Key Applications:**
• MS Excel (Monthly Collections Report)
• WINS
• RLink 3
• RLI net homepage → My Bond Center

**Processing Frequency:** Monthly
**SLA:** Custom TAT
**Accuracy Required:** 100%

**Part 1: Analyzing Collection Excel**

Step 1: Open Excel with 4 tabs/sheets
Step 2: Work ONLY on "Notes Needed" tab
Step 3: Scroll through list bond by bond OR use slicer on right to filter
Step 4: Review total collections amount at bottom for selected bond
Step 5: Copy bond number and search in WINS
Step 6: Navigate to policy screen

**Part 2: Updating WINS Notes**

Step 7: Type '1' and Enter to open address screen
Step 8: Press "Shift + F1" to open Notes Section
Step 9: Review existing collection note (ensure ONLY ONE "Collections" note exists)
Step 10: Type "5" and Enter to view current collections note
Step 11: Compare terms in WINS with spreadsheet (e.g., 2020, 2022, 2023, 2024)
Step 12: Hit "F12" to go back to previous screen
Step 13: Hit "2" to Revise/update with new term (e.g., 2025)
Step 14: Add collections amount using standardized format: [Year]: $[Amount]
Example: 2025: $985.00
Step 15: Cross check Excel and WINS - ensure term amounts and Total due match
Step 16: Click "F6" to update in WINS
Step 17: Verify date changes to current date with your user ID
Step 18: In Excel Column E, type "UPDATE" (only in top row for the bond)

**Part 3: Updating RLink Notes**

Step 19: Go to RLI net homepage → Portal Login
Step 20: Navigate to Surety tab → Click "My Bond Center"
Step 21: Enter bond number in search box and hit Search
Step 22: Click folder icon "OPEN" to view bond details
Step 23: Select "NOTES" tab
Step 24: Find "Direct Collect" collection note (ensure ONLY ONE exists)
Step 25: If duplicate entries found → Edit and change subject to "Do Not Use", remove remainders
Step 26: Edit existing Collection Notes
Step 27: Update term amount like done in WINS using standardized format
Step 28: Remove header "*2020-2024 Terms*" if present
Step 29: Update Total sent to collections amount
Step 30: Add new term at bottom following standard formatting
Step 31: Cross check data between Excel and RLink notes
Step 32: Add note in format:
MM/DD/YYYY- Sent YYYY term to direct collections team in [collections date] collections report to place with external collections agency [initials]
Example: 08/06/2025- sent 2025 term to direct collections team in 06.02.2025 collections report to place with external collections agency JE
Step 33: Set ZERO remainder
Step 34: Place in "Surety Operations"
Step 35: Save notes
Step 36: In Excel Column F, type "UPDATED"

**Part 4: Processing New Payment/Terms**

Step 37: Refer Column D "New Placement" in Excel
Step 38: Follow same WINS steps - search bond
Step 39: In Notes section, verify NO "COLLECTIONS" notes exist
Step 40: Create new Collections note:
  • Place cursor on top blank line
  • Type '1', TAB
  • Type "COLLECTIONS", Enter
Step 41: Type "Total Due in Collections: $[amount]"
Step 42: Add term: [Year]: $[Amount]
Step 43: Press "F6" to update
Step 44: In Excel Column E, type "CNEW" (for new creation)
Step 45: In RLink, search bond number
Step 46: Check Notes tab - should be only ONE "Direct Collect" note
Step 47: If no Collections note exists → Email Surety Accounting team
Step 48: Edit Direct collection note
Step 49: Remove current year term and restructure
Step 50: Type Total Dues, term amount, and collection report note with initials
Step 51: Ensure zero remainder, placed in "Surety Operations"
Step 52: Subject: "Direct Collect", Save notes
Step 53: In Excel Column F, type "UPDATED"

**Standardized Format:**
Collections note: [Year]: $[Amount]
Example: 2025: $985.00

Note format: MM/DD/YYYY- Sent YYYY term to direct collections team in MM.DD.YYYY collections report to place with external collections agency [initials]

**Critical Rules:**
• Only ONE "Collections" note in WINS
• Only ONE "Direct Collect" note in RLink
• Always follow standardized format
• Cross check Excel vs WINS vs RLink amounts
• Zero remainders in RLink notes
• Place notes in "Surety Operations" folder
• Type "UPDATE" in Excel Column E for existing notes
• Type "CNEW" in Excel Column E for new notes
• Type "UPDATED" in Excel Column F after RLink update

**Keyboard Shortcuts:**
• Shift + F1: Open Notes in WINS
• Type 5: View note
• Type 2: Revise note
• F6: Update/Save
• F12: Go back
• F8: Post write off

**Escalation:** surety.accounting@rlicorp.com`,
    keywords: ['shift+f1', 'collections', 'my bond center', 'f6', 'rlink3', 'wins', 'notes needed', 'direct collect', 'surety operations', 'total due']
  }
};

// Export for easy adding of new SOPs
export default sopData;
