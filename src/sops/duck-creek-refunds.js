export default {
  id: 'duck-creek-refunds',
  name: 'Duck Creek Refunds',
  category: 'Refund Processing',
  difficulty: 'Intermediate',
  summary: 'Daily process for processing refund requests in Duck Creek system',
  content: `**Key Applications:**
• Duck Creek
• Microsoft Excel
• Microsoft Outlook
• WINS

**Processing Schedule:** Daily
**SLA:** 1-2 business days
**Volume:** 20 to 40 per day
**Accuracy Required:** 100%

**Process Overview:**

Process refund requests in Duck Creek system for overpayments, cancellations, and other eligible refund scenarios.

**Part 1: Review Refund Queue**

Step 1: Log into Duck Creek
Step 2: Navigate to Refund Queue
Step 3: Review list of pending refunds
Step 4: Sort by date to prioritize oldest requests
Step 5: Select first refund to process

**Part 2: Verify Refund Eligibility**

Step 6: Open policy in Duck Creek
Step 7: Review policy status (Active, Cancelled, etc.)
Step 8: Check Account Ledger for payment history
Step 9: Verify overpayment or credit balance
Step 10: Check for any outstanding balances
Step 11: Review cancellation date if applicable
Step 12: Confirm refund amount matches calculation

**Part 3: Verify in WINS (if needed)**

Step 13: If verification needed, open WINS
Step 14: Search policy number
Step 15: Check policy status and balances
Step 16: Verify no outstanding amounts
Step 17: Confirm credit amount
Step 18: Return to Duck Creek

**Part 4: Process Standard Refund**

Step 19: In Duck Creek, select "Process Refund"
Step 20: Verify refund amount
Step 21: Select refund method (Check or ACH)
Step 22: If ACH: Verify bank account information on file
Step 23: If Check: Verify mailing address
Step 24: Enter refund reason/notes
Step 25: Review all details
Step 26: Submit refund for processing

**Part 5: Special Cases - Old Payments**

Step 27: If payment received more than 6 months ago
Step 28: Select "Refund to Check" option
Step 29: Verify current mailing address
Step 30: Process as check refund
Step 31: Add note about age of payment

**Part 6: Hold for Review**

Step 32: If refund requires manager approval
Step 33: Select "Hold for Review" status
Step 34: Add detailed notes explaining reason
Step 35: Email manager with policy number and details
Step 36: Set reminder to follow up

**Part 7: Documentation**

Step 37: Add note to Duck Creek with processing details
Step 38: Include date, amount, method, and reason
Step 39: Save all documentation
Step 40: Update Excel tracking log
Step 41: Move to next refund in queue

**Refund Eligibility Criteria:**

**Eligible for Refund:**
• Policy cancelled with unused premium
• Overpayment made
• Duplicate payment received
• Policy not taken (never bound)
• Returned premium due to rate adjustment

**NOT Eligible for Refund:**
• Outstanding balance on account
• Policy lapsed for non-payment
• Earned premium (policy in force during period)
• Pending cancellation (not yet effective)

**Refund Methods:**

**ACH (Preferred):**
• Faster processing (3-5 business days)
• Bank information must be verified
• Used for payments received within 6 months

**Check:**
• Standard mail (7-10 business days)
• Required for payments older than 6 months
• Used when ACH information unavailable
• Verify current mailing address

**Critical Rules:**
• Always verify policy status before processing
• Check for outstanding balances - must be cleared first
• Payments older than 6 months = Refund to Check
• Verify bank info before processing ACH
• Verify mailing address before processing Check
• Document all actions in Duck Creek notes
• Manager approval required for refunds over $5,000
• Never process refund with outstanding balance
• Always add detailed notes explaining refund reason

**Common Refund Scenarios:**

**Overpayment:**
- Verify payment amount vs premium due
- Calculate correct refund amount
- Process standard refund

**Cancellation:**
- Verify cancellation date
- Calculate unearned premium
- Check for minimum earned premium requirements
- Process refund for unearned portion

**Duplicate Payment:**
- Identify both payments
- Verify one was applied
- Refund duplicate amount
- Add note explaining duplicate

**Policy Not Taken:**
- Verify policy never bound
- Refund full amount
- Add note "Policy Not Taken"

**Notes Format:**
"[Date] - Processed refund of $[Amount] via [ACH/Check] for [Reason]. Payment received [Date]. [Initials]"

Example: "12/07/2025 - Processed refund of $450.00 via ACH for policy cancellation. Payment received 11/15/2025. JD"

**Manager Approval Required:**
• Refunds over $5,000
• Unusual circumstances
• Disputed amounts
• Policy-related issues

**Excel Tracking Log:**
• Date Processed
• Policy Number
• Refund Amount
• Refund Method
• Reason
• Status
• Initials

**Escalation Contacts:**
• Level 1: Ashley Seidel - Ashley.Seidel@rlicorp.com
• Level 2: Colleen Krider - Colleen.Krider@rlicorp.com
• Manager Approval: [Manager Email]

**Quality Checks:**
✓ Policy status verified
✓ No outstanding balance
✓ Refund amount calculated correctly
✓ Refund method appropriate
✓ Address/bank info verified
✓ Notes added to Duck Creek
✓ Excel log updated
✓ Manager approval obtained if needed`,
  keywords: ['duck creek', 'refund', 'overpayment', 'cancellation', 'ach', 'check', 'account ledger', '6 months', 'policy status', 'outstanding balance']
};
