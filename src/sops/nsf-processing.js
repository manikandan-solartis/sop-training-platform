export default {
  id: 'nsf-processing',
  name: 'NSF Processing',
  category: 'Payment Processing',
  difficulty: 'Advanced',
  summary: 'Daily process for following up on returned payments (NSF) with Insured, Agent, or Underwriter',
  content: `**Key Applications:**
• RLINK2
• RLINK3
• RLINK Document filer
• MS-Outlook
• MS-Word
• WINS
• Acrobat Reader
• Powerflow

**Processing Schedule:** Daily
**SLA:** 24 hours from receipt
**Volume:** 10 to 15 per day
**Accuracy Required:** 100%

**Process Overview:**

Follow up to Insured/Agent/Underwriter for returned payment. Review bond, identify bill type (Agency/Direct), find who made payment, send appropriate follow-ups with specific timelines and escalation paths.

**Part 1: Initial Review**

Step 1: Receive email from Cash Ops with Returned Item Notice
Step 2: Look up bond in WINS to check if new payment received since return
Step 3: If new payment received, no further action needed - close task
Step 4: Determine if bond is Agency Billed or Direct Billed in WINS

**Part 2: Special Instruction Agents - AZ Bonds**

Step 5: Check if bond is under AZ or Agent AZ bond
Step 6: Do NOT send returned item letter for AZ bonds
Step 7: Forward email received from cash to SuretyUW.Southwest@rlicorp.com
Step 8: Email Body: "We received notice that payment made by insured on [DATE] via [ACH/CHECK/ETC] in amount of $[AMOUNT] was returned due to [REASON]. Please advise how to proceed."
Step 9: For Agency bill AZ bond, make notepad in RLink2
Step 10: For Direct bill AZ bond, make notepad only in RLINK3
Step 11: Notepad Subject: "Returned Item"
Step 12: Notepad Body: "date, batch#, CK# received notice that payment was returned due to REASON -- sent email to Surety AZ for further instructions - initials"
Step 13: Set Reminder: 7 days
Step 14: Follow up until response received
Step 15: If Chris wants letter sent, follow standard Return Item procedures
Step 16: Do NOT send anything to insured/agent without Chris's approval

**Part 3: Special Instruction - Notary Express**

Step 17: Check if bond is Notary Express #06552
Step 18: Forward email to Notary Express queue: info@notaryexpress.com
Step 19: Notary Express will handle sending letters for premium
Step 20: No further action needed

**Part 4: Agency Bill - Agent Paid**

Step 21: Forward original email from cash to agent (Remove WINS Screenshot)
Step 22: Use "Returned Item Email to Agent- AC" template
Step 23: Mark email high importance
Step 24: Subject: "AGT# - Returned Payment Notice"
Step 25: Add Notepad to RLink2
Step 26: Subject: "Returned Item"
Step 27: Body: "date batch#, CK# received notice that payment was returned due to REASON -- sent email to agent- initials"
Step 28: No reminder needed (will show on agent's producer statement)

**Part 5: Direct Bill - Insured Paid (First Letter)**

Step 29: Create/Mail Returned Item using Direct Bill Payment Template
Step 30: Use physical address (hit F4 in WINS to locate)
Step 31: Save PDF copy labeled with bond number under correct year
Step 32: Save location: P:\\Surety\\NSF\\[Year]\\
Step 33: Upload letter to RLink3 using RLink Document Filer
Step 34: Current File: Attach created letter
Step 35: Parent: Bond
Step 36: Document Category: Underwriting Information
Step 37: Bond/Sub#: Type bond number
Step 38: Document Type: Materials
Step 39: Document Description: Returned Item Notice
Step 40: Add Note to RLink3
Step 41: Subject: "Returned Item"
Step 42: Body: "date- batch#, CK# received notice that payment was returned due to REASON -- sent Returned Item -- Direct Bill Payment Letter - initials"
Step 43: Reminder: 7 days

**Part 6: Direct Bill - Agency Paid**

Step 44: Forward original email from cash to agent (Remove WINS Screenshot)
Step 45: Use "Returned Item Email to Agent- DB" template
Step 46: Mark email high importance
Step 47: Subject: "Bond # - Returned Payment Notice"
Step 48: Add Notepad to RLink3
Step 49: Subject: "Returned Item"
Step 50: Body: "date batch#, CK# received notice that payment made by Agency on Direct Bill bond was returned due to REASON -- sent email to agent- initials"
Step 51: Reminder: 7 days

**Part 7: After 7 Days - First Reminder**

Step 52: Check if payment received
Step 53: If payment received, update notepad and remove reminder
Step 54: Example note: "date- new payment received -- initials"
Step 55: If no new payment, create and mail second letter
Step 56: Indicate this is 2nd notice on letter
Step 57: Save as PDF
Step 58: Update Note in RLink
Step 59: Body: "date- no new payment received, resent Returned Item Letter -- initials"
Step 60: Reminder: 7 days
Step 61: Upload second letter to RLink using same instructions as first

**Part 8: After Second Letter (7 Days)**

Step 62: Check if payment received
Step 63: If payment received, update notepad and remove reminder
Step 64: Example: "New Payment Received: date - new payment received -- initials"
Step 65: If no new payment, forward original email to agent
Step 66: Remove WINS screenshot from email
Step 67: Use "Returned Item Email to Agent- DB Insured Paid" template
Step 68: Attach both letters that were sent
Step 69: Mark email high importance
Step 70: Update notepad and set 7 day reminder
Step 71: Example: "date- no new payment received -- emailed agent for further instructions -- initials"
Step 72: If agent doesn't respond after 7 days, call agent
Step 73: Use phone number for agent located in RLink2
Step 74: If no answer from agent, reach out to branch manager for directive

**Part 9: Branch Manager Response**

Step 75: Once agent/branch manager responds, update notepad
Step 76: Remove reminder
Step 77: Note: "Date per branch manager's email, bond will be (canceled, written off, etc) -- initials"
Step 78: Complete Branch Manager's instructions

**Email Templates:**

Template 1 - Returned Item Email to Agent- AC:
"Dear Producer, We have been notified that [ACH/check/CC] payment in amount of $[00.00] was returned for below bond(s) unpaid due to [Reason]. Please remit payment to RLI. If payment not received by 25th of current month, items will appear on next Monthly Producer Statement. [Bond Numbers]. To pay call Surety Accounting at 800-645-2402, Opt 2."

Template 2 - Returned Item Email to Agent- DB Agency Paid:
"Hello, We received notice that payment made by agency on [MM/DD/YYYY] via [ACH/Check/CC] in amount of $[00.00] was returned due to [Reason]. Please remit payment to RLI. To pay call Surety Accounting at 800-645-2402, Opt 2."

Template 3 - Returned Item Email to Agent- DB Insured Paid:
"Hello, We received notice that payment made by insured on [MM/DD/YYYY] via [ACH/check/CC] in amount of $[00.00] was returned due to [Reason]. We have sent attached two letters to insured, and no new payments received. As of today, $[00.00] balance owed to RLI. Can you please reach out to insured or advise if we have correct address?"

**Underwriter Escalation List:**

AZ: Chris Cornelius - Chris.Cornelius@rlicorp.com
SEA01: Beth Kumma and Grace Reza - Beth.Kumma@rlicorp.com, Grace.Reza@rlicorp.com
SUR01 (Other states): surety.central@rlicorp.com
SUR01 (CA): surety.west@rlicorp.com
SUR01 (PA): surety.east@rlicorp.com
TEX01: Cliff Miller - cliff.miller@rlicorp.com
FLS01: cliff.miller@rlicorp.com or Kyle.Johnson@rlicorp.com

**Region Map:**
• West (Orange, Green, Burgundy states)
• East (Blue states)
• Central (Yellow states)

**Critical Rules:**
• AZ bonds: NEVER send letter without approval from Chris Cornelius
• Notary Express #06552: Forward to info@notaryexpress.com
• Agency Bill: One email to agent, no follow-up needed
• Direct Bill Insured Paid: Two letters (7 days apart), then 2 agent follow-ups
• Direct Bill Agency Paid: Two agent follow-ups, then underwriter escalation
• Always use F4 in WINS for physical address
• Save all letters as PDF in P:\\Surety\\NSF\\[Year]\\
• Mark all emails to agents as high importance
• Document every action in notepad with date and initials
• Follow 7-day reminder schedule strictly
• Call agent before escalating to branch manager
• Payment Mailing Address: RLI Insurance Co Dept. #3300, P.O. Box 844122, Kansas City, MO 64184-4122
• Surety Accounting Phone: 800-645-2402, Option 2

**Timeline Summary:**
Day 0: Initial notice received
Day 0: First action (letter or email)
Day 7: First reminder check
Day 14: Second reminder/escalation
Day 21: Agent call/branch manager escalation

**RLink Document Filer Settings:**
• Parent: Bond
• Document Category: Underwriting Information
• Document Type: Materials
• Document Description: Returned Item Notice

**Keyboard Shortcuts:**
• F4 in WINS: View physical address

**Escalation:** Brittney.birge@rlicorp.com (Level 1), Kelly.Barnard@rlicorp.com (Level 2), Danielle.Moore@rlicorp.com (Level 3)`,
  keywords: ['nsf', 'returned item', 'returned payment', 'agency bill', 'direct bill', 'az bonds', 'notary express', 'rlink2', 'rlink3', 'f4', '7 days', 'branch manager', 'underwriter', 'chris cornelius', 'surety accounting']
};
