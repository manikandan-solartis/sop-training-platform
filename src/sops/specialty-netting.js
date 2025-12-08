export default {
  id: 'specialty-netting',
  name: 'Specialty Netting',
  category: 'Accounting',
  difficulty: 'Intermediate',
  summary: 'Monthly process to net policies for Specialty Markets between two agents with credit and debit',
  content: `**Key Applications:**
• MS Excel
• MS Outlook
• WINS

**Processing Schedule:** Monthly
**Volume:** 90 to 120 per week
**SLA:** Custom TAT
**Accuracy Required:** 100%

**Process Overview:**
Net policies with two agents on term - one with debit, one with credit. Transfer credit to debit for zero balance.

**Main Steps:**

Step 1: Receive monthly email with Excel spreadsheet containing policy list
Step 2: Open Aging Report Pivot tables
Step 3: Each division listed on own sheet (NAD01, HHO01, RSM01)
Step 4: Go to WINS RLI 02, Enter Option 1
Step 5: Enter division in Mnemonic field based on policy prefix
Step 6: Enter Option 2 for PRMACT (Premium Accounting)
Step 7: Enter Option 8 for Producer Commission/Payment Change
Step 8: Enter Policy Number and Effective Date from Pivot table, Hit Enter
Step 9: On corresponding result, enter 1 at beginning of row
Step 10: Confirm Original Agent number on credit (negative) amount
Step 11: Confirm New Agent number next to amount due (positive)
Step 12: If agent numbers do NOT match, add note "New agent changed" - DO NOT MOVE MONEY
Step 13: If agent numbers match, hit Enter, hit Y to confirm transfer
Step 14: To verify: Enter PI in Mnemonic field
Step 15: Enter policy number
Step 16: Hit F6 for Bill History
Step 17: Page down to locate transaction
Step 18: Enter 1 on line to see money moved from one agent to other

**WINS Mnemonic by Policy Prefix:**
• NAD01: Policies prefix PUP*
• HHO01: Policies prefix RHO* and DFP*
• RSM01: Policies prefix BOP*

**Critical Rules:**
• One agent has credit (negative), other has debit (positive)
• Agent numbers MUST match before transfer
• If agent numbers don't match, note in spreadsheet - DO NOT transfer
• Transfer moves credit to debit for zero balance
• Always verify transfer using PI and F6
• Complete all policies in monthly batch

**Verification Process:**
1. Enter PI in Mnemonic
2. Enter policy number
3. Press F6 for Bill History
4. Page down to transaction
5. Enter 1 on line to confirm transfer

**Escalation:** Kirstyn.Tryon@rlicorp.com (Level 1), Danielle.Moore@rlicorp.com (Level 2)`,
  keywords: ['specialty netting', 'nad01', 'hho01', 'rsm01', 'prmact', 'producer commission', 'credit', 'debit', 'transfer', 'f6', 'bill history', 'pi', 'aging report']
};
