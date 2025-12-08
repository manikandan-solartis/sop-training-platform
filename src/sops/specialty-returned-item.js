export default {
  id: 'specialty-returned-item',
  name: 'Specialty Returned Item (NSF)',
  category: 'Payment Processing',
  difficulty: 'Intermediate',
  summary: 'Process for generating NSF letters for returned Specialty Markets payments',
  content: `**Key Applications:**
• MS Word
• WINS
• Duck Creek
• Microsoft Outlook

**Processing Schedule:** Daily
**SLA:** Rush - 24 to 48 hours from receipt
**Volume:** 5 to 10 tasks per day
**Accuracy Required:** 100%

**Part 1: Policies After 08/01/2024**

Step 1: Check policy in Duck Creek
Step 2: If no letter auto-generated, inform Brittney
Step 3: If letter available, file email in Returned Item->2024 folder
Step 4: No further action needed

**Part 2: Policies Before 08/01/2024**

Step 5: Receive email from cash about returned payment
Step 6: Note payment method, amount, policy number
Step 7: Pull policy in WINS
Step 8: Verify if new payment made
Step 9: If payment made (no outstanding balance), file email - no follow-up
Step 10: If balance remains, send letter to insured

**Part 3: Generate NSF Letter**

Step 11: Open template from P:\\Specialty Markets\\Returned Item
Step 12: Update date to current date
Step 13: Get address from WINS
Step 14: Hit F4 to check billing screen
Step 15: If address in billing screen, use that address
Step 16: If no billing address, hit F3, use main screen address
Step 17: Update returned payment amount in subject line
Step 18: Update policy number
Step 19: Update description portion with payment details
Step 20: Complete template with all information
Step 21: Send attached letter to Brittney.Birge@rlicorp.com for printing
Step 22: Mark email "pend for next week"
Step 23: Leave in folder

**Part 4: Follow-Up Process**

Step 24: After 1 week, check for new payment
Step 25: If no payment, send second letter
Step 26: After 2 weeks, check for new payment
Step 27: If still no payment and not cancelled, email customerservice@rlicorp.com
Step 28: State two follow-ups sent with no payment/cancellation
Step 29: Kirstyn and Brittney will reach out to underwriting

**Letter Template Content:**

Date: [Current Date]
Address: [From WINS F4 or main screen]
Policy: [Policy Number]
Amount: $[Returned Payment Amount]

Description Options:
• Single payment: "Payment made to RLI in amount of $XX.XX with credit card/check/ACH ending in XXXX. Payment returned due to Insufficient Funds. Balance due $XX.XX for policy PUPXXXXXX"
• Double payment with refund: "Two payments received, one refunded. Remaining payment returned due to Insufficient Funds. Balance due $XX.XX"

**Follow-Up Timeline:**
• Day 0: Initial letter sent
• Day 7: First follow-up if no payment
• Day 14: Second follow-up if no payment
• After 2 follow-ups: Email customerservice@rlicorp.com

**Critical Rules:**
• Policies after 08/01/2024: Check Duck Creek only
• Policies before 08/01/2024: Check WINS, generate letters
• Always use F4 in WINS for billing address first
• If no billing address, use main screen address
• Send letters to Brittney for printing
• Mark emails "pend for next week"
• After 2 follow-ups with no payment, escalate
• File completed items in Returned Item->2024 folder

**Template Location:** P:\\Specialty Markets\\Returned Item

**Email for Printing:** Brittney.Birge@rlicorp.com
**Escalation Email:** customerservice@rlicorp.com

**Keyboard Shortcuts:**
• F4: Billing screen in WINS
• F3: Back to main screen

**Escalation:** Brittney.Birge@rlicorp.com`,
  keywords: ['specialty returned item', 'nsf', 'duck creek', 'f4', '08/01/2024', 'billing screen', 'returned payment', 'insufficient funds', 'follow-up', 'pend for next week', 'customerservice']
};
