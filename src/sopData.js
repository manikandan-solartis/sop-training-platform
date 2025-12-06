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
};

  'direct-bill-db40': {
    id: 'direct-bill-db40',
    name: 'Direct Bill Collect Letter (DB40)',
    category: 'Collections',
    difficulty: 'Advanced',
    summary: 'Monthly demand letters for probate and non-probate bonds',
    content: `**Key Applications:**
• MS Excel, Outlook
• WINS
• RLink3 / My Bond Center
• RLI net homepage

**Processing Frequency:** Monthly
**Volume:** 120-150 per week
**SLA:** Custom TAT
**Accuracy Required:** 100%

**Process Overview:**
Monthly demand letter process for pended DB40 bonds. Two types: Probate and Non-Probate, each with different letter codes and processes.

**PROBATE BONDS:**
**Letter Codes:** L00HR (30 days) → L00HQ (20 days)

**Probate Types (Type of Work in WINS):**
• Executor
• Administrator
• Guardian
• Conservator
• Trustee
• Personal Representative

**PROBATE - First Letter (L00HR):**
Step 1: Copy bond number, paste in WINS
Step 2: Check status "Renewal in Progress"
Step 3: Check notes for cancellation info
Step 4: Verify effective date and division
Step 5: Confirm no outstanding amount in WINS
Step 6: Open another WINS, enter Division in Mnemonic
Step 7: Enter "Renew" in Mnemonic
Step 8: Enter '4', paste policy number
Step 9: Check policy and effective date, enter '5'
Step 10: Check renewal dates and "Type of Work" to determine probate/non-probate
Step 11: Open bond in RLink3, search and click "OPEN"
Step 12: Check notes for "Do not Renew" → If found, email Surety Accounting
Step 13: Click "New Document", search for L00HR
Step 14: Select "Final Notice (Probate) L00HR"
Step 15: Fill mandatory fields:
  • Surety Office: TEX01/FLS01→TX, SUR01→IL, PA→PA, AZ→AZ, CA/SEA01→WA
  • User: Megan Mazzeffi
  • Effective date and expiration date from WINS
  • Term: e.g., "Surety 2025-2026"
  • Term premium: Enter premium amount
  • Premium amount due: Same as term premium
  • Due date: Calculate 30 days from today
  • Court appointed position: From "Type of Work" in WINS
Step 16: Select "Preview" to view document
Step 17: Save as "Final notice(probate) -- Policy number" in P:\\SURETY\\Agency Check Requests
Step 18: Press F4, verify billing address matches letter
Step 19: If address doesn't match, select "Has any other information changed?" → Yes
Step 20: Put address in "Principal Address if does not match RLink"
Step 21: Select letter, click "Send Documents"
Step 22: Click "To" field, select matching email from address book
Step 23: If no match, select "Billing Agency" or "Main Contact Agency"
Step 24: Paste Probate email template in body, enter effective date
Step 25: Verify document attached, send email
Step 26: Go to Notes tab, add note (do NOT create new if "Direct Collect" exists)
Step 27: Add note: If address match "pended DB40, sent first letter", if not "pended DB40, sent first letter to F4 address"
Step 28: Set reminder: 30 days
Step 29: Recipient: Your name, Type: "Issue - Accounting Notes"
Step 30: Format: MM/DD/YYYY
Step 31: Update Excel sheet

**PROBATE - Second Letter (L00HQ) After 30 Days:**
Step 32: Check if payment received
Step 33: If payment received: Notes → Recipient: Surety Accounting, Reminder: 0 days
Step 34: Update RLINK: "MM/DD/YYYY - Payment received on the YYYY term - IN"
Step 35: If no payment: Generate L00HQ letter (same process as L00HR)
Step 36: Search "L00HQ", select "15 Day Demand (Probate) L00HQ"
Step 37: Fill same fields as L00HR
Step 38: Due date: Calculate 20 days from today
Step 39: Save as "15 Days Demand (Probate) -- Policy number"
Step 40: Verify F4 address, update if needed
Step 41: Select letter AND "Direct Bill 2nd Notice" (if available)
Step 42: Send with 2nd letter Probate template
Step 43: Add note: If address match "sent second letter", if not "sent second letter to F4 address"
Step 44: Set reminder: 20 days
Step 45: Update Excel

**NON-PROBATE BONDS:**
**Letter Codes:** M00DF (30 days) → L00CA (20 days)
**Transaction Type:** Always "Renewal"

**NON-PROBATE - First Letter (M00DF):**
Step 46: Follow same WINS search process as Probate
Step 47: Click "New Document", select "Direct Collect Letter & Invoice - Principle - Non Probate"
Step 48: Fill fields:
  • Surety Office: Same as Probate
  • User: Megan Mazzeffi
  • Renewal Effective Date(s): e.g., "01/01/2025 -- 01/01/2026"
  • Stat 1 Description: "Surety -- Bond 2025-2026"
  • Net premium 1: Enter premium amount
  • Past due premium: Same as net premium
  • Due date: Calculate 30 days from today
  • Transaction type: Renewal
  • Principal Address if mismatch: Fill if needed
Step 49: Select "Preview"
Step 50: Save as "Direct Collect Letter & Invoice - Principle - Non Probate - Policy number"
Step 51: Verify F4 address
Step 52: Select letter and "Direct bill 2nd notice" (if available)
Step 53: Send with NON-PROBATE 1st letter template
Step 54: Add note: Same as Probate process
Step 55: Reminder: 30 days
Step 56: Update Excel

**NON-PROBATE - Second Letter (L00CA) After 30 Days:**
Step 57: Check if payment received
Step 58: If received: Same as Probate
Step 59: If no payment: Search "L00CA", select "15 Day Demand - Principle - Non-Probate"
Step 60: Fill same fields as M00DF
Step 61: Due date: Calculate 20 days from today
Step 62: Save as "15 Day Demand - Principle - Non Probate - Policy number"
Step 63: Verify F4 address
Step 64: Select letter and "Direct bill 2nd notice" (if available)
Step 65: Send with NON-PROBATE 2nd letter template
Step 66: Add note and set reminder: 20 days
Step 67: Update Excel

**SPECIAL RULES:**

**CBS Bonds (Agent code starts with F8, C B S Agency):**
• Email ONLY to: bonds@cbalaw.org
• Use most recent term amount from F6 screen
• Check renewal in progress or F6 screen
• Manually renewed - analyze F6 screen
• Notes: "CBS bonds should not go directly to external collections and should be referred back to UW for directive"

**Agent 00984:**
• NO email to agent
• Generate letter, save, update notes, set reminder

**AZ Bonds:**
• Email Surety Accounting for confirmation BEFORE generating letter

**Agents 49920, 28242, 49366, 35187, 49368:**
• NO letters should ever be sent
• Email Surety Accounting if on report

**Important Notes:**
• Only ONE "Collections" note in WINS
• Only ONE "Direct Collect" note in RLink
• Always verify Bond Number, Premium, Address against WINS and letter
• Use F4 address page for balance due
• Match Bond Amount between WINS and letter
• Date format: MM/DD/YYYY
• User in all letters: Megan Mazzeffi
• Zero remainder in RLink
• Place in "Surety Operations"

**Office Codes:**
• TEX01 → TX
• FLS01 → TX
• SUR01 → IL
• SUR01 PA → PA
• AZ → AZ
• SUR01 CA → WA
• SEA01 → WA

**Escalation:** surety.accounting@rlicorp.com`,
    keywords: ['l00hr', 'l00hq', 'm00df', 'l00ca', 'probate', 'non-probate', 'megan mazzeffi', 'my bond center', 'type of work', 'executor', 'guardian', 'cbs bonds', 'f4 address', 'direct collect']
  },

  'direct-bill-refunds-duck-creek': {
    id: 'direct-bill-refunds-duck-creek',
    name: 'Direct Bill Refunds in Duck Creek',
    category: 'Payment Processing',
    difficulty: 'Advanced',
    summary: 'Daily refund processing for Duck Creek product codes 180,181,183,100,102',
    content: `**Key Applications:**
• MS Excel, Outlook, Word
• Duck Creek (Google Chrome)
• PaymentUs, Vendor Request Form, RLI Enterprise Inquiry (Chrome)
• Image Express, CRM, Pinnacle (Microsoft Edge)
• Charlie (WINS)
• PowerFlow

**Volume:** 25-30 per day
**SLA:** 24 hours from receipt
**Accuracy Required:** 100%

**Product Codes to Process:** 180, 181, 183, 100, 102
**Important:** 320 products (RHO or DFP Hawaii Homeowners) - DO NOT refund

**NEW REQUIREMENT (10/17/2025):**
For product codes 100, 102, 180, 181, 183: Wait 10 days after payment received before processing ANY disbursements.

**PAYMENT TYPES:**

**1. REGULAR PAYMENT (Check):**
Step 1: Paste account number in Duck Creek, search
Step 2: Validate "In suspense amount" matches Excel
Step 3: Go to Installment Schedule, enter renewal/issue date
Step 4: Calculate account charges to validate amount
Step 5: Verify last payment is through Check
Step 6: Identify check in Pinnacle (PNC):
  • Login: Company ID: 118295, Operator ID, Password, Token
  • Go to "Integrated Receivables" → "CHI-779030"
  • Locate check deposit date, search
  • Type last 4 digits of check number
  • Verify insured name matches Duck Creek
Step 7: Check Deductibles:
  • Open S:\\cash ops\\Deductibles\\Access Databases\\GL deduct_production.mdb
  • Do NOT click "Enable editing"
  • Filter by insured name
  • Should be blank - if has amount, email Jeanie.Ruhland@rlicorp.com
Step 8: Check Charlie (WINS) for balance (for OR, ID, MT, NM, AZ, NV, TX, ND, WY, HI, CKA05 policies, CA for CKA120/CKA040)
Step 9: Go to Duck Creek "Items in Suspense"
Step 10: Verify suspense amount
Step 11: Check box under Payment Source, select "Disburse"
Step 12: Disbursement Type: "Regular"
Step 13: Select appropriate "Disbursement Reason"
Step 14: Click "Refund"
Step 15: Verify amount moved from "Item in Suspense" to "Pending Disbursements"

**2. UNIDENTIFIED CHECK PAYMENT:**
Step 16: If last payment shows "Unidentified"
Step 17: Login to PaymentUs, enter payment amount in range (From and To same value)
Step 18: Date range: 1 week before post date to post date
Step 19: Locate transaction matching policy number and amount
Step 20: If not in PaymentUs, check CRM Web Payment
Step 21: Finance → Web Payment
Step 22: Type check amount in search
Step 23: Sort "Created On" for recent transactions
Step 24: Verify payee details and Line Items
Step 25: If payment by agent (BTIS), refund as External Payment
Step 26: If name matches account, refund as Regular Payment
Step 27: Follow same steps as Regular Payment

**3. REFUND > RECEIVED PAYMENT:**
Step 28: If refund amount greater than last payment
Step 29: Always return as Regular Payment (even if EFT/CC)
Step 30: Follow Regular Payment process

**4. REGULAR PAYMENT (Online - Approved CC/EFT):**
Step 31: If payment through Approved CC or EFT
Step 32: Open PaymentUs, paste account number in Customer Reference ID
Step 33: Match Policy number, amount, deposit date
Step 34: Verify insured name and cardholder name match
Step 35: Create backup in MS-Word
Step 36: Save to: P:\\CUSTOMER ACCOUNTING SPECIALIST\\Cash Suspense Duck Creek\\Backup for Duck Creek Refunds\\2024
Step 37: Format: Payee name followed by account number
Step 38: Check Deductibles (same process as Check Payment)
Step 39: Go to Duck Creek "Item in Suspense"
Step 40: Select "Disburse", Type: "Regular"
Step 41: Select Disbursement Reason, click "Refund"
Step 42: Verify moved to "Pending Disbursement"

**5. UNIDENTIFIED ONLINE PAYMENT:**
Step 43: If payment shows "Unidentified"
Step 44: Search in PaymentUs by amount and date range
Step 45: If not found, check CRM Web Payment
Step 46: Create backup with payee details
Step 47: Follow Regular Payment disbursement process

**6. EXTERNAL PAYMENT (Agency Paid):**
Step 48: If payment made by BTIS or other agency
Step 49: Verify in PaymentUs
Step 50: Create backup (WITH check and Duck Creek screenshots)
Step 51: Submit Vendor Request if vendor not available
Step 52: Open Payment Request Form
Step 53: Enter payment details
Step 54: Click GL Information
Step 55: Enter GL: 20/BSL02/255005
Step 56: Enter refund amount, ensure difference = 0
Step 57: GL Distribution changes from brown to green checkmark
Step 58: Attach backup, click "Submit for approval"
Step 59: Search policy in Image Express Active tab
Step 60: Double-click, verify attachment and GL Distribution
Step 61: Click "Approve"
Step 62: Go to Duck Creek "Item in Suspense"
Step 63: Select "Disburse", Type: "External"
Step 64: Select Disbursement Reason, click "Refund"
Step 65: Verify moved to "Pending Disbursement"

**DISBURSEMENT REASONS:**

**Cancellation:**
• Due to Pro rata cancellation, cancellation, or Flat cancellation
• Verify in RLI Enterprise Inquiry documents
• Wait 10 days after cancellation date (unless insured initiated or flat cancellation)
• Do NOT refund if Reinstatement found after cancellation

**Audit:**
• Due to Audit or Interim Audit

**Endorsement:**
• Due to endorsement

**CHARLIE (WINS) PROCESS:**
Step 66: Login to Charlie
Step 67: Type 61 in Option
Step 68: Type policy number in "Liability"
Step 69: Choose recent term, type "1" in Select field
Step 70: Hit F11 key
Step 71: Make sure no balance exists

**VENDOR CREATION:**
Step 72: Go to Treasury Vendor Form, select "Start Here"
Step 73: Fill Requestor form: Name, email, select "Policyholder Refund"
Step 74: Update insured details from WINS
Step 75: Payment terms: "NONE"
Step 76: Choose correct Workflow listing number
Step 77: Attach backup, click "Next"
Step 78: Payment option: Always select "CHECK"
Step 79: Preview, then Submit
Step 80: Check Outlook for completion confirmation

**IMPORTANT NOTES:**
• BTIS payments: Name shows "BTIS" with account ending in 5330 - PRIORITY for vendor creation and refund to insured
• Backup format: Include check image and Duck Creek screenshots
• Save path: P:\\CUSTOMER ACCOUNTING SPECIALIST\\Cash Suspense Duck Creek\\Backup for Duck Creek Refunds\\2024
• File name: Payee name + Account number (e.g., P100164172 Jared J.Steele)
• Deductibles: Always email Jeanie.Ruhland@rlicorp.com if found
• Pro-rata cancellation/Final Audit/Endorsement: Verify in RLI Enterprise Inquiry documents

**Escalation:** Contact Jennifer Hasse for exceptions`,
    keywords: ['duck creek', 'paymentus', 'pinnacle', 'charlie', 'disbursement', 'suspense', 'image express', 'gl 20/bsl02/255005', 'btis', 'vendor request', 'deductibles', 'jeanie ruhland']
  },

  'hawaii-refund-report': {
    id: 'hawaii-refund-report',
    name: 'Hawaii Refund Report (HIHO)',
    category: 'Payment Processing',
    difficulty: 'Intermediate',
    summary: 'Weekly report for Hawaii Homeowners (Product 320) refunds',
    content: `**Key Applications:**
• MS Excel
• Duck Creek Website
• WINS
• Agent Dashboard (PaymentUs)
• Pinnacle

**Volume:** 200-300 cases per week
**SLA:** 1 Business Day
**Accuracy Required:** 100%

**File Locations:**
• Suspense File: Latest version (received via email)
• Master File: P:\\copublic$\\Customer Accounting Specialist\\Direct Bill_Account Bill\\Direct Bill Resources\\HIHO Refund Report\\HIHO Master File

**PROCESS STEPS:**

**Step 1: Open Latest Suspense File**
• Locate and open most recent Suspense Excel file

**Step 2: Filter for Bill Product 320**
• Filter Column "Bill Product" to show only 320 (Hawaii Homeowners)

**Step 3: Prepare New Workbook**
Step 1: Copy filtered data to new Excel spreadsheet
Step 2: Delete Column C (Policy Product Name)
Step 3: Rename columns:
  • Bill Product → Policy
  • Bill Type → Notes
  • Selectsys Comments → Action
  • Analyst Notes → Comments
Step 4: Delete content in columns E to H (keep headers)

**Step 4: Connect to Master File Using VLOOKUP**
Step 5: Open latest HIHO Refund Report Master File
Step 6: Enter formulas in new spreadsheet:
  • E2: =VLOOKUP(A2, '[HIHO Master File]Sheet1'!$A:$H, 5, FALSE)
  • F2: =VLOOKUP(A2, '[HIHO Master File]Sheet1'!$A:$H, 6, FALSE)
  • G2: =VLOOKUP(A2, '[HIHO Master File]Sheet1'!$A:$H, 7, FALSE)
  • H2: =VLOOKUP(A2, '[HIHO Master File]Sheet1'!$A:$H, 8, FALSE)
Step 7: Drag formulas down for all rows

**Step 5: Handle Missing Data**
Step 8: Filter Column G (Action) for #N/A
Step 9: Delete all rows with #N/A in columns E to H
Step 10: Clear filter

**Step 6: Review 'Email' Actions**
Step 11: Check Account Number in Duck Creek Billing
Step 12: If NKLL request done twice and reinstated → Action: "Regular Refund"
Step 13: If only one NKLL attempt → Do not change
Step 14: If Comments mention 2 NKLL attempts → Action: "Regular Refund"
Step 15: Check if 10+ days passed since allocation → Action: "Regular Refund"
Step 16: If only 9 days → Wait, recheck next week
Step 17: For Allocation Date ≤9 days → Mark "Refund in 10 Days" (hold for week, then update to "Regular Refund")
Step 18: More than 2 NKLL notes → "Regular Refund"
Step 19: Only 1 NKLL note → "Email"
Step 20: For "Regular Refund" action: Verify names match in Agent Dashboard AND Pinnacle

**Step 7: External or Cashops Classification**
Step 21: If Payor is "AOAO" in Duck Creek → Action: "External"
Step 22: In WINS:
  • Can Dt/Code = 08 → "External" or "Cashops"
  • Can Dt/Code = 03 → "External"

**Step 8: Handle "Hold" Notes**
Step 23: If Notes mention "Hold per [Name]" → Action: "HIHO" (do not change)
Step 24: When DD with date noted → Mark "HIHO" (requires HIHO approval)

**Step 9: Identify and Handle Duplicates**
Step 25: Use Conditional Formatting → Highlight Duplicate Values in Column A
Step 26: For each duplicate:
  • Check Duck Creek → Account Ledger → Suspense Amount
  • If mismatch, update Column D in Excel
  • Delete duplicate row

**Step 10: Overpayment or Duplicate Payments**
Step 27: If Notes mention "Overpayment" or "Duplicate"
Step 28: Verify in Duck Creek
Step 29: If payment source doesn't match policy/account → Action: "External" with comment

**Step 11: Verify Check Numbers**
Step 30: Click Check Number in Duck Creek
Step 31: Verify amount and details match

**Step 12: Accounts Without VLOOKUP Data**
Step 32: Search Account Number in Duck Creek
Step 33: Determine if Overpayment or Duplicate
Step 34: Check payment type:
  • Credit Card → Verify in Agent Dashboard
  • Check → Verify in Pinnacle
Step 35: Update:
  • Policy: Correct Policy Number
  • Notes: "Duplicate" or "Overpayment"
  • Action: "Refund in 10 Days"
  • Comments: If needed

**Step 13: Final Verification**
Step 36: Check for Outstanding Balances in WINS before processing refund
Step 37: If balance present → Do NOT process until cleared
Step 38: If last payment >6 months old → Use "Refund to Check" option

**ACTION TYPES:**

**"Regular Refund":**
• Payment verified in both Agent Dashboard and Pinnacle
• Names match
• 10+ days passed or 2+ NKLL attempts

**"Email":**
• Only 1 NKLL attempt
• Waiting for additional verification

**"External":**
• Payment made by AOAO
• WINS Can Dt/Code = 08 or 03
• Payment source doesn't match policy/account

**"HIHO":**
• Requires Hawaii office approval
• "Hold per [Name]" in notes
• DD with date noted

**"Refund in 10 Days":**
• Allocation Date ≤9 days
• Waiting for 10-day period
• New accounts without VLOOKUP data

**"Cashops":**
• WINS Can Dt/Code = 08

**IMPORTANT REMINDERS:**
• Product 320 only (RHO or DFP - Hawaii Homeowners)
• Always verify names in Agent Dashboard AND Pinnacle for Regular Refund
• Wait full 10 days before processing disbursements
• Check WINS for outstanding balances
• Update Master File weekly
• Document all actions in Comments column

**NKLL Notes:**
• NKLL = Non-Sufficient Funds Letter sent
• 1 NKLL = Mark "Email"
• 2+ NKLL = Mark "Regular Refund"

**Escalation:** Contact Kathy Ard or Ashley Seidel for clarification`,
    keywords: ['hiho', 'hawaii', 'product 320', 'vlookup', 'nkll', 'aoao', 'agent dashboard', 'pinnacle', 'suspense', 'allocation date', 'refund in 10 days']
  },

  'nsf-returned-items': {
    id: 'nsf-returned-items',
    name: 'NSF / Returned Items',
    category: 'Collections',
    difficulty: 'Intermediate',
    summary: 'Follow-up process for returned payments (NSF checks, ACH, CC)',
    content: `**Key Applications:**
• RLink2, RLink3
• WINS
• MS-Outlook, MS-Word
• RLink Document Filer
• Acrobat Reader
• PowerFlow

**Volume:** 10-15 per day
**SLA:** 24 hours from receipt
**Accuracy Required:** 100%

**PROCESS OVERVIEW:**
Follow-up for returned payments from Cash Ops. Different processes for Agency Bill vs Direct Bill, and by who made the payment.

**INITIAL STEPS (All Bonds):**
Step 1: Receive email from Cash Ops with Returned Item Notice
Step 2: Look up bond in WINS
Step 3: If new payment received since return → No further action needed

**SPECIAL INSTRUCTIONS:**

**AZ Bonds:**
Step 4: Do NOT send returned item letter
Step 5: Forward email to: SuretyUW.Southwest@rlicorp.com
Step 6: Email Body: "We received notice that payment made by insured on [DATE] via [ACH/CHECK/ETC] in amount of $[AMOUNT] was returned due to '[REASON].' Please advise how to proceed."
Step 7: Create notepad in RLink2 (Agency Bill) or RLink3 (Direct Bill):
  • Subject: "Returned Item"
  • Body: "date, batch#, CK# received notice that payment was returned due to 'REASON' -- sent email to Surety AZ for further instructions - initials"
  • Reminder: 7 days
Step 8: Follow up until response received
Step 9: If Chris wants letter sent → Follow standard Return Item procedures
Step 10: Do NOT send anything to insured/agent without Chris's approval

**Notary Express (#06552):**
Step 11: Forward email to: info@notaryexpress.com
Step 12: They handle sending letters for premium

**AGENCY BILL - AGENT PAID:**
Step 13: Forward original email from Cash Ops (remove WINS screenshot) to agent
Step 14: Use "Returned Item Email to Agent - AC" template
Step 15: Mark email HIGH IMPORTANCE
Step 16: Subject: "AGT# - Returned Payment Notice"
Step 17: Add Notepad to RLink2:
  • Subject: "Returned Item"
  • Body: "date batch#, CK# received notice that payment was returned due to 'REASON' -- sent email to agent - initials"
  • Reminder: None (will show on producer statement if no payment)

**DIRECT BILL - INSURED PAID:**

**First Letter (Day 0):**
Step 18: Create/Mail Returned Item using Direct Bill Payment Template
Step 19: Use physical address (F4 in WINS)
Step 20: Save PDF labeled with bond number in correct year folder
Step 21: Upload to RLink3 using RLink Document Filer:
  • Current File: Attach letter
  • Parent: Bond
  • Document Category: Underwriting Information
  • Bond/Sub#: Bond number
  • Document Type: Materials
  • Document Description: Returned Item Notice
Step 22: Add Note to RLink3:
  • Subject: "Returned Item"
  • Body: "date- batch#, CK# received notice that payment was returned due to 'REASON' -- sent Returned Item -- Direct Bill Payment Letter - initials"
  • Reminder: 7 days

**After 7 Days:**
Step 23: If payment received → Update notepad, remove reminder: "date- new payment received -- initials"
Step 24: If no payment → Create and mail second letter (indicate "2nd notice")
Step 25: Update Note in RLink:
  • Body: "date- no new payment received, resent Returned Item Letter -- initials"
  • Reminder: 7 days
Step 26: Upload second letter to RLink3

**After 14 Days (7 days after 2nd letter):**
Step 27: If payment received → Update notepad, remove reminder
Step 28: If no payment → Forward email to agent with BOTH letters attached
Step 29: Use "Returned Item Email to Agent - DB Insured Paid" template
Step 30: Mark HIGH IMPORTANCE
Step 31: Update notepad: "date- no new payment received -- emailed agent for further instructions -- initials"
Step 32: Reminder: 7 days
Step 33: If agent doesn't respond after 7 days → Call agent (phone number in RLink2)
Step 34: If no answer from agent → Reach out to branch manager for directive

**Branch Manager Response:**
Step 35: Update notepad, remove reminder: "Date per branch manager's email, bond will be (canceled, written off, etc) -- initials"
Step 36: Complete branch manager's instructions

**DIRECT BILL - AGENCY PAID:**
Step 37: Forward original email from Cash Ops (remove WINS screenshot) to agent
Step 38: Use "Returned Item Email to Agent - DB" template
Step 39: Mark email HIGH IMPORTANCE
Step 40: Subject: "Bond # - Returned Payment Notice"
Step 41: Add Notepad to RLink3:
  • Subject: "Returned Item"
  • Body: "date batch#, CK# received notice that payment made by Agency on Direct Bill bond was returned due to 'REASON' -- sent email to agent - initials"
  • Reminder: 7 days

**After 7 Days:**
Step 42: If payment received → Update notepad, remove reminder
Step 43: If no payment → Forward to agent
Step 44: If no response → Reach out to branch manager

**EMAIL TEMPLATES:**

**Returned Item Email to Agent - AC:**
"Dear Producer,
We have been notified that an [ACH/check/CC] payment in amount of $[00.00] was returned for below bond(s) unpaid due to '[Reason].' Please remit payment to RLI. If payment not received by 25th of current month these item(s) will appear on next Monthly Producer Statement.
[Bond Number(s)]
To pay call Surety Accounting at 800-645-2402, Opt 2."

**Returned Item Email to Agent - DB Agency Paid:**
"Hello,
We received notice that payment made by agency on [MM/DD/YYYY] via [ACH/Check/CC] in amount of $[00.00] was returned due to '[Reason].' Please remit payment to RLI.
To pay call Surety Accounting at 800-645-2402, Opt 2."

**Returned Item Email to Agent - DB Insured Paid:**
"Hello,
We received notice that payment made by insured on [MM/DD/YYYY] via [ACH/check/CC] in amount of $[00.00] was returned due to '[Reason].' We have sent attached two letters to insured, and there have been no new payments. As of today, there is $[00.00] balance owed to RLI. Can you please reach out to insured or advise if we have correct address?"

**UNDERWRITER CONTACTS:**
• AZ: Chris.Cornelius@rlicorp.com
• SEA01: Beth.Kumma@rlicorp.com and Grace.Reza@rlicorp.com
• SUR01 (Other states): surety.central@rlicorp.com
• SUR01 (CA): surety.west@rlicorp.com
• SUR01 (PA): surety.east@rlicorp.com
• TEX01: cliff.miller@rlicorp.com
- FLS01: cliff.miller@rlicorp.com or Kyle.Johnson@rlicorp.com

**REGIONAL MAP:**
- West (orange, green, burgundy states): surety.west@rlicorp.com
- East (blue states): surety.east@rlicorp.com  
- Central (yellow states): surety.central@rlicorp.com

**IMPORTANT RULES:**
- AZ bonds: Get directive from Chris Cornelius FIRST
- Notary Express: Forward to info@notaryexpress.com
- Agency Bill: One email to agent, no further follow-up
- Direct Bill Insured: Up to 2 letters, then 2 agent follow-ups, then branch manager
- Direct Bill Agency: 2 agent follow-ups, then branch manager
- Always use physical address (F4) for letters
- Upload all letters to RLink3
- Use proper notepad format with MM/DD/YYYY
- Mark all agent emails HIGH IMPORTANCE

**Escalation:** Brittney.birge@rlicorp.com`,
    keywords: ['nsf', 'returned item', 'rlink document filer', 'f4 address', 'branch manager', 'az bonds', 'notary express', 'chris cornelius', 'high importance', 'direct bill payment template']
  }
};

// Export for easy adding of new SOPs
export default sopData;
