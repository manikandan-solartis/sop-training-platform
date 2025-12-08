export default {
  id: 'direct-bill-collect-letter',
  name: 'Direct Bill Collect Letter (DB40)',
  category: 'Collections',
  difficulty: 'Advanced',
  summary: 'Monthly process for sending demand letters to insured and agents for bonds in pended DB40 status',
  content: `**Key Applications:**
• MS Excel
• WINS
• Outlook
• RLINK3

**Processing Schedule:** Monthly
**SLA:** Custom TAT
**Volume:** 120 to 150 per week
**Accuracy Required:** 100%

**Main Process Overview:**

RLI sends monthly email with Excel spreadsheet containing policy list. Process involves searching policies in RLINK3 and WINS, generating demand letters, updating notes, setting reminders, and sending emails to agents.

**Part 1: Probate - L00HR Final Notice**

Step 1: Copy bond number and paste into WINS
Step 2: Check bond status is "Renewal in Progress" at WINS
Step 3: Check notes for any bond cancellation information
Step 4: Check effective date and division on policy information screen
Step 5: Confirm no outstanding amount in WINS Policy Inquiry Screen
Step 6: Open another WINS and enter Division in Mnemonic
Step 7: In next screen enter "Renew" in Mnemonic
Step 8: Enter 4 in select option and paste policy number
Step 9: Check policy number and effective date, then enter 5
Step 10: Check renewal effective date and renewal expiry date
Step 11: Check "Type of work" to determine probate or non-probate
Step 12: Open policy in RLINK3 and hit search
Step 13: Click "Open" option in policy details
Step 14: Check notes for "Do not Renew" - if found, email Surety accounting
Step 15: Click New document option and search for L00HR
Step 16: Select "Final Notice(Probate) LOOHR"
Step 17: Fill Surety office (TEX01/FLS01: TX, SUR01: IL, SUR01 PA: PA, AZ: AZ, SUR01 CA/SEA01: WA)
Step 18: Select User as Megan Mazzeffi
Step 19: Enter effective date and expiration date from WINS
Step 20: Enter policy term (e.g., Surety 2025-2026)
Step 21: Enter premium amount in Term 1 premium field
Step 22: Enter total premium amount in Premium amount due
Step 23: Calculate 30 days from today and enter as due date
Step 24: Capture "Type of Work" data from WINS for Court appointed position
Step 25: Select Preview to view document
Step 26: Save document as "Final notice(probate) -- Policy number"
Step 27: Press F4 and verify billing address matches
Step 28: Verify Bond Number, Premium and Address against WINS
Step 29: If address does not match, update using "Has any other information changed"
Step 30: Select Final Notice (Probate) and click "Send Documents"
Step 31: Select email address matching name in bond details
Step 32: If no match, select "Billing Agency" or "Main Contact Agency"
Step 33: Use Probate template from input excel for email body
Step 34: Enter effective date and click Send
Step 35: Verify document is attached properly before sending
Step 36: Go to Notes Tab (add to existing "Direct Collect" note if present)
Step 37: Add note "pended DB40, sent first letter" (or "to F4 address" if address mismatch)
Step 38: Set Reminder as 30 days
Step 39: Use format MM/DD/YYYY for notes
Step 40: Select recipient as your name and Type as "Issue - Accounting Notes"
Step 41: Update Input excel for respective bond

**Part 2: Probate Reminder - L00HQ 15 Day Demand**

Step 42: After 30 days, check if payment received
Step 43: If payment received, select Surety Accounting as recipient
Step 44: Set reminder to 0 days and complete task
Step 45: Update RLINK Notes as "MM/DD/YYYY - Payment received on YYYY term - IN"
Step 46: If payment not received, generate L00HQ - 15 Day Demand (Probate)
Step 47: Follow same procedure as Final Notice, select 15 Day Demand document
Step 48: Fill same fields as Final Notice
Step 49: Calculate 20 days from today and enter as due date
Step 50: Select Preview and save document
Step 51: Verify address and bond details
Step 52: Select 15 Day Demand (Probate) and Direct Bill 2nd Notice if available
Step 53: Click Send Documents
Step 54: Use Templates 2nd letter sheet for Probate email body
Step 55: Add note "sent second letter" (or "to F4 address")
Step 56: Set Reminder as 20 days
Step 57: Update input excel

**Part 3: Non-Probate - M00DF Direct Collect Letter**

Step 58: Follow same WINS and RLINK3 search procedure
Step 59: Select "Direct Collect Letter & Invoice - Principle - Non Probate"
Step 60: Fill Surety office (same as probate)
Step 61: Select User as Megan Mazzeffi
Step 62: Enter Renewal Effective Date (e.g., 01/01/2025 -- 01/01/2026)
Step 63: Enter Stat 1 Description as "Surety -- Bond 2025-2026"
Step 64: Enter premium amount in Net premium 1
Step 65: Enter total premium in Past due premium
Step 66: Calculate 30 days from today for Due date
Step 67: Type "Renewal" for Transaction type
Step 68: Fill Principal Address if mismatch with RLINK2
Step 69: Select Preview and save document
Step 70: Verify address and bond details
Step 71: Select Direct Collect Letter and Direct bill 2nd notice if available
Step 72: Click Send documents
Step 73: Use NON-PROBATE template from Templates 1st letter sheet
Step 74: Add note "pended DB40, sent first letter" (or "to F4 address")
Step 75: Set Reminder as 30 days
Step 76: Update Input excel

**Part 4: Non-Probate Reminder - L00CA 15 Day Demand**

Step 77: After 30 days, check payment status
Step 78: If payment received, update notes and set 0 day reminder to Surety Accounting
Step 79: If payment not received, generate L00CA - 15 Day Demand
Step 80: Search L00CA and select 15 Day Demand - Principle - Non Probate
Step 81: Fill same fields as Non-Probate first letter
Step 82: Calculate 20 days from today for Due date
Step 83: Select Preview and save document
Step 84: Verify all details
Step 85: Select 15 Day Demand and Direct bill 2nd notice if available
Step 86: Use NON-PROBATE template from Templates 2nd letter sheet
Step 87: Add note "sent second letter" (or "to F4 address")
Step 88: Set Reminder as 20 days
Step 89: Update input excel

**CBS Bonds Special Rules:**

Step 90: Identify CBS bonds (Agent code starts with F8, C B S Agency name)
Step 91: Process pended DB40 and send letter for most recent term
Step 92: Check F6 screen for renewal status if not showing "renewal in progress"
Step 93: Send email only to bonds@cbalaw.org for CBS bonds
Step 94: Add note "CBS bonds should not go directly to external collections"

**Critical Rules:**
• Agent code 00984: Generate letter, save, update notes - NO email to agent
• AZ bonds: Email Surety Accounting for confirmation before generating letter
• Agent codes 49920, 28242, 49366, 35187, 49368: NO letters - email Surety Accounting
• Verify Bond Number, Premium, Address match WINS before sending
• Use F4 address page for balance due premium amount
• Only ONE "Direct Collect" note per bond in RLINK
• Always use MM/DD/YYYY format for dates in notes
• Set reminders: First letter = 30 days, Second letter = 20 days

**Probate Type of Work List:**
• Administrator
• Conservator
• Executor
• Guardian
• Personal Representative
• Trustee

**Email Contacts:**
• Escalation: surety.accounting@rlicorp.com
• CBS Bonds: bonds@cbalaw.org
• Level 1: Kelly Barnard - Kelly.Barnard@rlicorp.com
• Level 2: Danielle Moore - Danielle.Moore@rlicorp.com

**Keyboard Shortcuts:**
• F4: View billing address screen
• Enter: Submit/Next screen
• Tab: Move to next field

**Escalation:** surety.accounting@rlicorp.com`,
  keywords: ['probate', 'non-probate', 'l00hr', 'l00hq', 'm00df', 'l00ca', 'db40', 'rlink3', 'wins', 'megan mazzeffi', 'cbs bonds', '30 days', '20 days', 'direct collect', 'f4 address']
};
