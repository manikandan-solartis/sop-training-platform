export default {
  id: 'hawaii-refund-report',
  name: 'Hawaii Refund Report',
  category: 'Refund Processing',
  difficulty: 'Intermediate',
  summary: 'Weekly process for data extraction, validation, and research of Hawaii insurance policy refund transactions',
  content: `**Key Applications:**
• Suspense File (latest version)
• HIHO Refund Report Master File
• Excel
• Duck Creek Website
• WINS
• Agent Dashboard
• Pinnacle

**Processing Schedule:** Weekly
**SLA:** 1 Business Day
**Volume:** 200 to 300 cases per week
**Accuracy Required:** 100%

**Process Overview:**

Extract and filter data from Caption Suspense file for Hawaii products, validate transaction codes, research payment details, investigate refund eligibility, update report with accurate Notes, Actions, and Comments, and submit to Hawaii office for final decisions.

**Part 1: Open and Filter Data**

Step 1: Locate and open most recent Suspense Excel file
Step 2: Filter Column "Bill Product" to show only code 320
Step 3: Copy filtered data into new Excel spreadsheet
Step 4: Delete Column C (Policy Product Name)
Step 5: Rename columns (Bill Product → Policy, Bill Type → Notes, Selectsys Comments → Action, Analyst Notes → Comments)
Step 6: Delete content in columns E to H (keep headers)

**Part 2: Connect to Master File Using VLOOKUP**

Step 7: Open latest HIHO Refund Report Master File from P:\\copublic$\\Customer Accounting Specialist\\Direct Bill_Account Bill\\Direct Bill Resources\\HIHO Refund Report\\HIHO Master File
Step 8: In new spreadsheet enter formula in E2: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 5, FALSE)
Step 9: Enter formula in F2: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 6, FALSE)
Step 10: Enter formula in G2: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 7, FALSE)
Step 11: Enter formula in H2: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 8, FALSE)
Step 12: Drag down formulas in Columns E to H for all rows

**Part 3: Handle Missing Data**

Step 13: Filter Column G (Action) for #N/A
Step 14: Delete all rows with #N/A in columns E to H
Step 15: Clear filter when done

**Part 4: Review Email Actions**

Step 16: Check Account Number in Duck Creek Billing
Step 17: If NKLL request done twice and reinstated, change Action to Regular Refund
Step 18: If only one attempt, do not change
Step 19: If Comments mention 2 NKLL attempts, change Action to Regular Refund
Step 20: Check if 10+ days have passed, change to Regular Refund
Step 21: If only 9 days, wait and recheck next week
Step 22: For Allocation Date of 9 days or less, mark as "Refund in 10 Days"
Step 23: Hold for a week, then update to "Regular Refund"
Step 24: For more than two NKLL notes, mark as "Regular Refund"
Step 25: For only one NKLL note, mark as "Email"
Step 26: Update "Regular Refund" only after verifying names match in Agent Dashboard and Pinnacle

**Part 5: External or Cashops Classification**

Step 27: If Payor is AOAO in Duck Creek, Action = External
Step 28: In WINS, if Can Dt/Code = 08, set as External or Cashops
Step 29: In WINS, if Can Dt/Code = 03, set as External

**Part 6: Handle Hold Notes**

Step 30: If Notes mentions "Hold per [Name]", ensure Action is HIHO
Step 31: Do not change anything for Hold notes
Step 32: When DD with date is noted, mark as "HIHO" for approval

**Part 7: Identify and Handle Duplicates**

Step 33: Use Conditional Formatting to Highlight Duplicate Values in Column A
Step 34: For each duplicate, check Duck Creek Account Ledger Suspense Amount
Step 35: If mismatch, update Column D in Excel
Step 36: Delete duplicate row

**Part 8: Overpayment or Duplicate Payments**

Step 37: If Notes mention Overpayment or Duplicate, use Duck Creek to verify
Step 38: If payment source does not match policy/account, Action = External with comment

**Part 9: Verify Check Numbers**

Step 39: Click Check Number in Duck Creek
Step 40: Verify amount and details match

**Part 10: Accounts Without VLOOKUP Data**

Step 41: Search Account Number in Duck Creek
Step 42: Determine if Overpayment or Duplicate
Step 43: Check payment type (Credit Card or Check)
Step 44: If Credit Card, verify in Agent Dashboard
Step 45: If Check, verify in Pinnacle
Step 46: Update Policy with correct Policy Number
Step 47: Update Notes as Duplicate or Overpayment
Step 48: Update Action as "Refund in 10 Days"
Step 49: Add Comments if needed

**Part 11: Outstanding Balance Check**

Step 50: Before processing refund, review account in WINS for balances due
Step 51: If balance present, do NOT process refund until cleared

**Part 12: Refund to Check for Old Payments**

Step 52: If last payment received is older than 6 months, select "Refund to Check"
Step 53: Follow same procedure as other product types

**Critical Rules:**
• Bill Product Code: 320 (Hawaii products only)
• NKLL (No Known Loss Letter): If 2+ attempts, mark Regular Refund
• 10-Day Rule: Wait 10 days from Allocation Date before refunding
• AOAO Payor: Always External
• Hold Notes: Always mark as HIHO, do not change
• Duplicates: Verify in Duck Creek and update/delete accordingly
• Outstanding Balances: Must be cleared before refund
• 6-Month Rule: Use "Refund to Check" if payment older than 6 months
• Master File Location: P:\\copublic$\\Customer Accounting Specialist\\Direct Bill_Account Bill\\Direct Bill Resources\\HIHO Refund Report\\HIHO Master File

**VLOOKUP Formula Structure:**
• Column E: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 5, FALSE)
• Column F: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 6, FALSE)
• Column G: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 7, FALSE)
• Column H: =VLOOKUP(A2, [HIHO Master File]Sheet1!$A:$H, 8, FALSE)

**Action Types:**
• Regular Refund: Standard refund processing
• External: AOAO payor or specific cancellation codes
• Cashops: Specific cancellation code scenarios
• HIHO: Requires Hawaii office approval
• Refund in 10 Days: Wait period for allocation
• Email: NKLL single attempt pending

**Column Renaming:**
• Bill Product → Policy
• Bill Type → Notes
• Selectsys Comments → Action
• Analyst Notes → Comments

**Escalation Contacts:**
• Level 1: Kathy Ard - Kathy.Ard@rlicorp.com, (866) 216-8009
• Level 2: Ashley Seidel - Ashley.Seidel@rlicorp.com, (866) 216-8009

**Shared Path:** P:\\copublic$\\Customer Accounting Specialist\\Direct Bill_Account Bill\\Direct Bill Resources\\HIHO Refund Report`,
  keywords: ['hawaii', 'hiho', '320', 'vlookup', 'nkll', 'aoao', 'suspense file', 'master file', 'allocation date', '10 days', 'duck creek', 'pinnacle', 'agent dashboard', 'regular refund', 'external', 'cashops']
};
