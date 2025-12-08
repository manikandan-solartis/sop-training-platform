export default {
  id: 'direct-bill-weekly-refund',
  name: 'Direct Bill Weekly Refund',
  category: 'Refund Processing',
  difficulty: 'Advanced',
  summary: 'Weekly process for refunding extra credit to insured or other payees',
  content: `**Key Applications:**
• MS Excel, MS Outlook, MS Word
• WINS1, WINS2 (Query)
• Powerflow
• System i Navigator
• Google Chrome (Agent Dashboard, Payment Request Form, RLINK2, RLINK3, Enterprise Inquiry, Vendor Request Form)
• Microsoft Edge (Image Express, CRM)

**Processing Schedule:** Weekly (Every Wednesday)
**SLA:** 2 business days from date created
**Volume:** 80 to 100 per week
**Accuracy Required:** 100%

**Process Overview:**

Process weekly refunds for direct bill policies by bifurcating between Regular Payee (RP) and Other Payee (OP) transactions, initiating refunds, approving payments in Image Express, and posting in WINS.

**Part 1: Analyze Received Excel**

Step 1: Check batch in path X:\\SURETY\\DB Weekly\\2025 for current week
Step 2: Open Excel with 12 tabs (SUR01, SUR01-AZ, OP1-SUR01, TEX01, OP1-TEX01, FLS01, OP1-FLS01, SEA01, OP1-SEA01, MCS01, UIS01, In Progress)
Step 3: Do not process red-highlighted tabs
Step 4: Check bond number in WINS
Step 5: Fill agent code in Excel
Step 6: Identify reason using transaction codes
Step 7: Review any comments in Column J from Surety Accounting

**Part 2: Transaction Code Identification**

Step 8: Use transaction codes to identify refund type:
• Code 10: New Issue
• Code 20: Renewal
• Code 35: Cancel
• Code 45: Cancel - Return Premium (RP refund)
• Code 80: Payment received on direct bill term (check for overpayment)
• Code 99: Returned premium check

Step 9: Identify refund scenario:
• Return Premium: Last transaction code "45"
• Overpayment: Code "80" with payment > gross due
• Duplicate Payment: Same payment received twice
• Flat Cancel: Last transaction code "35"

**Part 3: RP (Regular Payee) Refund**

Step 10: Check effective date and agent code in WINS
Step 11: Verify program code (if not AZ, proceed normally)
Step 12: Press F12 then F6 for Policy Inquiry
Step 13: Verify outstanding amount matches Excel
Step 14: Type "1" before code "80" and press Enter
Step 15: Open Powerflow with deposit date, batch number, check number
Step 16: Cross-verify insured name and address in check vs WINS
Step 17: If matched, mark as RP1 in Excel with exact reason (RP1-FLAT CANCEL, RETURN PREMIUM, DUPLICATE PAYMENT, OVER PAYMENT)

**Part 4: OP (Other Payee) - Check Refund**

Step 18: Check effective date and agent code in WINS
Step 19: If program code not AZ, proceed normally
Step 20: Press F12 then F6 for Policy Inquiry
Step 21: Verify outstanding amount matches Excel
Step 22: Type "1" before code "80" and press Enter
Step 23: Open Powerflow with transaction details
Step 24: If check not made to RLI, email Surety Accounting
Step 25: Cross-verify names - if not matched, mark as OP1
Step 26: Create backup with check screenshots and WINS transaction details
Step 27: Save as MS-Word: {BOND number PayeeName}
Step 28: Create Payment Request with correct vendor
Step 29: If vendor unavailable, submit vendor request
Step 30: Enter payment details in Payment Request Form
Step 31: Enter GL Distribution: 20/SUR50/255008
Step 32: Verify remaining difference is "0"
Step 33: Submit for approval in Image Express
Step 34: Verify attachment and GL Distribution
Step 35: Click Approve

**Part 5: OP - PRS (Payment Reversal System) Refund**

Step 36: Check if check number has "CC" or "ACH" (card payment)
Step 37: Download batch ticket from Powerflow
Step 38: Find confirmation number in payment method column
Step 39: Login to Agent Dashboard
Step 40: Paste confirmation number and search
Step 41: Match cardholder name with WINS and RLINK2
Step 42: If not matched, proceed as Other Payee
Step 43: Create backup with Agent Dashboard and WINS screenshots
Step 44: Choose vendor "PRSREF"
Step 45: Enter GL Distribution (3 lines):
    • 20/SUR50/255008
    • 20/BSL01/255017
    • 20/BSA01/121191
Step 46: Submit for approval
Step 47: Approve in Image Express
Step 48: Receive payment number from RLI
Step 49: Post in WINS using division mnemonic (SUR01/TEX01/FLS01/SEA01)
Step 50: Type "DB" in Mnemonic field
Step 51: Type "1" in Option field twice
Step 52: Use batch number as control for PRS refunds
Step 53: Enter current date in Activity date
Step 54: Enter refund amount with "-" symbol
Step 55: Choose Option 2
Step 56: Type "1" in Option field
Step 57: Enter policy number, effective date, code 99, refund amount, payment number
Step 58: Press F6 to update, then F12
Step 59: Type "4" in Option field
Step 60: Press F8 to post
Step 61: Verify no outstanding amount
Step 62: Verify check number and control number

**Part 6: OP - CRM OVT (One-Time Vendor) Refund**

Step 63: Check if Posted control number is A series (CRM payment)
Step 64: Download batch ticket
Step 65: Find order number in payment method column
Step 66: Search order number in CRM
Step 67: Click Web Payment under Finance tab
Step 68: Match name/address with CRM payee
Step 69: If not matched, mark as OP
Step 70: Create backup with CRM payment screenshots
Step 71: Choose vendor with OVT payment type
Step 72: Enter GL Distribution (3 lines - same as PRS)
Step 73: Submit and approve
Step 74: Post in WINS using batch number as control
Step 75: Follow same posting steps as PRS

**Part 7: OP - CRM Check Refund**

Step 76: Identify when outstanding amount < payment code "80"
Step 77: Check if Posted control number is A series
Step 78: Download batch ticket, find order number
Step 79: Search in CRM, check Web Payment
Step 80: If names don't match, mark as OP
Step 81: Create backup
Step 82: Choose vendor with payment type "SYS"
Step 83: Enter GL Distribution: 20/SUR50/255008
Step 84: Submit and approve

**Part 8: OP - Duplicate Payment Refund**

Step 85: Identify two payments on same term
Step 86: Determine which payment to refund using table:
    • Payment by Insured + Payment by Other Payee = Refund to Other Payee
    • Payment by Other Payee + Payment by Other Payee = Refund recent transaction
Step 87: Type "1" before duplicate transaction code "80"
Step 88: Verify in Powerflow
Step 89: Create backup
Step 90: Choose correct vendor
Step 91: Enter GL Distribution: 20/SUR50/255008
Step 92: Submit and approve

**Part 9: Vendor Setup**

Step 93: If vendor unavailable, click vendor request link
Step 94: Select "Start Here" in Treasury vendor form
Step 95: Fill requestor name and email
Step 96: Select "Policyholder Refund"
Step 97: Update insured name and address from WINS
Step 98: Select payment terms as "NONE"
Step 99: Choose Workflow listing as IX264
Step 100: Attach backup
Step 101: Select "CHECK" for payment option
Step 102: Submit
Step 103: Check Outlook for completion

**Part 10: Special Instructions**

Agent 06552 (Notary Express):
• DO NOT refund without approval
• Email info@notaryexpress.com for approval
• Subject: DB Weekly Refunds - SUR01 06552 Bond#
• If PayPal, request screenshot

Agents 38202 & 90176 (AZ Contractors):
• DO NOT refund without emailing Chris.Cornelius@rlicorp.com
• CC: Surety.Misc-AZ@rlicorp.com
• Consolidate all AZ bonds in weekly batch before emailing

Agents 00984/00985/00986 (Collections):
• DO NOT refund
• Email surety.accounting@rlicorp.com
• Run query to ensure credit under these agent codes
• If not, proceed with normal refund

**Part 11: Claims and Transfers**

Claims Check:
Step 104: Search bond in RLI Inquiry Portal
Step 105: Check for red flag in Claims column
Step 106: If no claims, continue refunding
Step 107: If claim with zero balance and no monies, continue
Step 108: If claim with outstanding balance:
    • Email Stacy.campbell@rlicorp.com
    • BCC: surety.accounting@rlicorp.com
    • Ask if funds needed for claim fees
    • Wait for response before refunding

Transfers:
Step 109: Review Surety Accounting inbox for transfers
Step 110: If transfer in process, do not refund
Step 111: Hide row and note "Transfer in Progress"

**Part 12: WINS Query**

Step 112: Use WINS2 username for queries
Step 113: Enter: wrkqry
Step 114: Option: 2
Step 115: Query: Your initials.polhist
Step 116: Library: COPUOBJ
Step 117: Type "1" on "Select records" line
Step 118: Enter bond number between quotes
Step 119: Press F3 then Enter
Step 120: Open iNavigator
Step 121: Click RLI02, enter password
Step 122: Click Work Management > Output Queues
Step 123: Find and click "Cooutq"
Step 124: Refresh by clicking "Created" column
Step 125: Find username, double-click
Step 126: Enter credentials twice
Step 127: Review query results

**Critical Rules:**
• Red-highlighted Excel tabs: Do not process
• Effective date in WINS may not match Excel - this is normal
• Payment numbers must be posted in WINS for all OP1 refunds
• ACH payments: Add "A" after payment number in WINS
• PRS refunds: Use batch number as control
• OVT refunds: Use batch number as control
• Check refunds: Use initials+1 as control
• Always BCC surety.accounting@rlicorp.com on claims emails
• Run query for every bond before processing
• Outstanding amount must match Excel exactly
• If mismatch, email Surety Accounting

**GL Distribution Codes:**
• Check Refund: 20/SUR50/255008 (one line)
• PRS/OVT Refund: 
  - 20/SUR50/255008
  - 20/BSL01/255017
  - 20/BSA01/121191

**Excel Updates:**
• Claims: "Email sent to Stacy for Claims"
• Clarifications: "Email sent to Surety Accounting"
• Do Not Refund: "Don't Refund - [Name]"
• Transfer: "Transfer in Progress"
• OP1: Update PRS request date, approval date, posted date
• Completed tab: Change tab color to Green

**Escalation Contacts:**
• Level 1: Kelly Barnard - Kelly.Barnard@rlicorp.com, (309) 689-3853
• Level 2: Danielle Moore - Danielle.Moore@rlicorp.com
• Level 3: Tori Cobb - Tori.Cobb@rlicorp.com, 309-273-1993
• Claims: Stacy.campbell@rlicorp.com
• AZ: Chris.Cornelius@rlicorp.com, CC: Surety.Misc-AZ@rlicorp.com
• Notary Express: info@notaryexpress.com`,
  keywords: ['direct bill', 'weekly refund', 'rp', 'op', 'prs', 'crm', 'ovt', 'powerflow', 'image express', 'batch', 'gl distribution', 'vendor setup', 'claims', 'transfer', 'wins query', 'az bonds', 'collections']
};
