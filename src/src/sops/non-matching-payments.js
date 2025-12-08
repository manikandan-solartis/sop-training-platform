export default {
  id: 'non-matching-payments',
  name: 'Non-Matching Payments',
  category: 'Payment Processing',
  difficulty: 'Intermediate',
  summary: 'Process for handling short payments on Direct Bill bonds that require full gross amount for renewal',
  content: `**Key Applications:**
• Microsoft Outlook
• WINS
• RLink3
• Excel

**Processing Schedule:** As needed (email-driven)
**SLA:** 1 business day from receipt
**Accuracy Required:** 100%

**Process Overview:**

Handle short payment notifications from Cash Ops when Direct Bill bonds do not receive full gross amount required for renewal. Process includes posting to Unapplied Cash, sending demand letters, and coordinating with Surety Main and underwriters.

**Part 1: Initial Review**

Step 1: Receive email from Cash Ops notifying of short payment
Step 2: Review email for bond number, payment amount, and amount due
Step 3: Note batch number and check number
Step 4: Determine if bond is Arizona or regular Direct Bill

**Part 2: Arizona Bonds Processing**

Step 5: Forward email to surety.misc-az@rlicorp.com
Step 6: Open RLink3 and search bond number
Step 7: Create note in RLink3:
    • Subject: Need Gross - Pending
    • Body: date (DB) batch#, CK#, received notice of a short payment - sent email to Surety AZ for further instructions - initials
    • Reminder: 1 day
Step 8: Follow up weekly until response received
Step 9: If AZ requests letter, follow standard procedures
Step 10: Do NOT send anything to insured/agent without AZ approval

**Part 3: Regular Direct Bill - Short Payment**

Step 11: Instruct Cash Ops to post to Unapplied Cash
Step 12: Use Unapplied Cash email template
Step 13: Inform Surety Main if action needed
Step 14: If email from Surety Main and no renewal needed, do not include them
Step 15: If payment already posted, no Unapplied Cash needed - instruct Surety Main only

**Part 4: Send Non-Matching Letter**

Step 16: Use Non-Matching Letter Template
Step 17: File location: P:\\SURETY\\Non-Matching
Step 18: Populate letter with:
    • Bond number
    • Insured name
    • Amount paid
    • Amount due
    • Additional amount needed
Step 19: Mail letter to payee
Step 20: Create note in RLink3:
    • Subject: Need Gross - Pending
    • Body: date (DB) batch#, CK#, received notice of a short payment - insured paid $XX.XX, however, $XX.XX is due - instructed Surety Main not to renew and Cash Ops to post to Unapplied Cash - sent letter requesting the additional $XX.XX - initials
    • Reminder: 7 days

**Part 5: First Follow-Up (After 7 Days)**

Step 21: Check if payment received
Step 22: If payment received:
    • Add note stating payment received
    • Clear reminder
    • Email Surety Main to renew bond
    • Email Cash Ops to transfer money using Transfer Table
Step 23: If no payment received:
    • Email division UW queue
    • Inform of short payment
    • Ask for directive
    • Set 7-day reminder

**Part 6: Subsequent Follow-Ups**

Step 24: Follow up every 7 days until response
Step 25: When UW responds, complete their directions
Step 26: Update RLink3 notes with actions taken
Step 27: Clear reminder when resolved

**Email Templates:**

**Unapplied Cash Template:**
To: Cash Ops
CC: Surety Main (if applicable)
Subject: Unapplied Cash - Bond #XXXXXX

Please post payment of $XX.XX to Unapplied Cash for bond #XXXXXX. 

Batch#: XXXXX
Check#: XXXXX
Amount Paid: $XX.XX
Amount Due: $XX.XX
Short by: $XX.XX

Thank you.

**Non-Matching Letter Template:**
[Use template from P:\\SURETY\\Non-Matching]

Dear [Insured Name],

We have received your payment of $XX.XX for bond #XXXXXX. However, the full gross amount of $XX.XX is required for renewal.

Please remit the additional $XX.XX to:
RLI Insurance Co
Dept. #3300
P.O. Box 844122
Kansas City, MO 64184-4122

If you have any questions, please contact us.

Sincerely,
Surety Accounting

**UW Escalation Email:**
To: [Division UW Queue]
Subject: Short Payment - Directive Needed - Bond #XXXXXX

We have a short payment on bond #XXXXXX.

Amount Paid: $XX.XX
Amount Due: $XX.XX
Short by: $XX.XX

Letter sent on [date]. No additional payment received after 7 days.

Please advise how to proceed.

Thank you.

**Transfer Table Email:**
To: Cash Ops
Subject: Transfer Request - Bond #XXXXXX

Please transfer $XX.XX from Unapplied Cash to renewal term for bond #XXXXXX.

From: Unapplied Cash
To: [Renewal Term Effective Date]
Amount: $XX.XX
Batch#: XXXXX
Check#: XXXXX

Thank you.

**Critical Rules:**
• Arizona bonds: ALWAYS forward to Surety AZ first
• Do NOT send letters to AZ bonds without approval
• Post to Unapplied Cash before sending letter
• Set 7-day reminders for all follow-ups
• If payment already posted, do not use Unapplied Cash
• Always inform Surety Main not to renew until gross received
• Follow up with UW if no payment after first letter
• Continue 7-day follow-ups until resolved
• Update RLink3 notes with all actions
• Use standard email templates
• Always BCC surety.accounting@rlicorp.com where applicable

**Follow-Up Timeline:**
• Day 0: Receive notification, send letter
• Day 7: First follow-up check
• Day 7+: If no payment, escalate to UW
• Every 7 days: Follow up with UW until resolved

**Note Subjects in RLink3:**
• Initial: "Need Gross - Pending"
• Payment Received: "Gross Received"
• UW Escalation: "Need Gross - Pending UW Response"

**Division UW Queues:**
• SUR01 (Other states): surety.central@rlicorp.com
• SUR01 (CA): surety.west@rlicorp.com
• SUR01 (PA): surety.east@rlicorp.com
• TEX01: Cliff.Miller@rlicorp.com
• FLS01: cliff.miller@rlicorp.com or Kyle.Johnson@rlicorp.com
• SEA01: Beth.Kumma@rlicorp.com, Grace.Reza@rlicorp.com
• AZ: surety.misc-az@rlicorp.com

**File Locations:**
• Non-Matching Letters: P:\\SURETY\\Non-Matching
• Transfer Table Template: [Transfer Table.msg]
• Unapplied Cash Template: [Unapplied Cash.msg]
• Non-Matching Letter Template: [Non Matching Letter Template.doc]

**Common Scenarios:**

**Scenario 1: Regular Short Payment**
1. Post to Unapplied Cash
2. Send letter
3. Wait 7 days
4. If no payment, escalate to UW

**Scenario 2: Arizona Short Payment**
1. Forward to Surety AZ
2. Create RLink3 note
3. Wait for AZ approval
4. Follow AZ directives

**Scenario 3: Payment Already Posted**
1. Do NOT post to Unapplied Cash
2. Inform Surety Main
3. Include Cash Ops as FYI
4. Wait for gross payment

**Scenario 4: No Renewal Needed**
1. Post to Unapplied Cash
2. Send letter
3. Do NOT involve Surety Main

**Quality Checks:**
✓ Email forwarded to correct queue (AZ or regular)
✓ RLink3 note created with proper subject
✓ Reminder set for 7 days
✓ Cash Ops instructed correctly
✓ Surety Main informed (if applicable)
✓ Letter mailed to correct address
✓ All amounts verified and documented

**Escalation:**
• Level 1: Kelly Barnard - Kelly.Barnard@rlicorp.com
• AZ Bonds: surety.misc-az@rlicorp.com
• General: surety.accounting@rlicorp.com`,
  keywords: ['non-matching', 'short payment', 'unapplied cash', 'az bonds', 'gross amount', 'renewal', 'cash ops', 'surety main', 'transfer table', 'uw queue', '7 days', 'rlink3', 'need gross']
};
