export default {
  id: 'special-markets-formatting',
  name: 'Special Markets Formatting',
  category: 'Accounting',
  difficulty: 'Advanced',
  summary: 'Monthly process for formatting agent statements and calculating consolidated commission amounts',
  content: `**Key Applications:**
• Microsoft Excel
• PDF
• WINS

**Processing Schedule:** Monthly
**Volume:** 25 to 30 per month
**Accuracy Required:** 100%

**Process Overview:**

Check agent statement for outstanding commission to be paid by RLI, format excel to arrive at consolidated payment, update comparison sheet for specific agent codes.

**Part 1: Gather Data**

Step 1: Create Big I Folder in P:\\Specialty Markets\\Electronic Statements\\DB\\YEAR\\MOYEAR
Step 2: Copy Templates AL3 Comparison Template and Big I AL3 Template from P:\\Specialty Markets\\Electronic Statements\\DB\\Template
Step 3: Paste templates into new Big I folder
Step 4: Open AL3 Comparison template
Step 5: Copy first agency code from comparison sheet
Step 6: Find agency code CSV statement in S:\\cash ops\\SM_Statements\\YEARMO
Step 7: Copy CSV files to Big I folder
Step 8: If statement not available, move to next agent code

**Part 2: Format CSV Files to XLSX**

Step 9: Open first agency CSV file
Step 10: Save as XLSX with "formatted" in filename
Step 11: Filter top row using Ctrl+Shift+L
Step 12: Fix column widths using carrot and double-click crosshairs
Step 13: Sort "Trans Description" Column F, A to Z
Step 14: Change all "Full Comm AMT" to 0 where Trans Description is "Commission"
Step 15: Insert new column before Trans Description (new Column F)
Step 16: Title new column "Cant"
Step 17: Create formula =B2&D2&E2 (Insured name, Policy Eff Date, Endorsement Eff Date)
Step 18: Double-click formula box crosshairs to fill proceeding boxes
Step 19: Copy Cant column and paste values only to remove formula
Step 20: Custom sort by Cant A to Z and Trans Description A to Z
Step 21: Go to Data Tab, Subtotal
Step 22: Subtotal by each change in Cant
Step 23: Add subtotal to Premium/Surcharge, Full Comm Amt, and Comm Amt
Step 24: Fill in blanks so information is on one line
Step 25: Highlight columns A:E, then Ctrl+Select G:G, I:I, L:P
Step 26: Press F5, hit Special, select blanks
Step 27: Make rows equal row above by typing = Up Arrow, Ctrl+Enter
Step 28: Copy and paste values for whole sheet
Step 29: Select "2" on side to show subtotal lines only
Step 30: Delete last 2 rows (grand total)
Step 31: Use carrot to select whole sheet
Step 32: Press F5, select "Visible cells only"
Step 33: Copy and create new sheet
Step 34: Paste into new sheet
Step 35: Delete Cant column
Step 36: Use carrot and crosshairs to open columns to correct width
Step 37: Put opposite of Comm Amt into Column P
Step 38: Copy and paste values so commission shows positive
Step 39: Delete data in Column P
Step 40: Sum columns Premium/Surcharge, Full Comm Amt, and Comm Amount
Step 41: Apply comma style format to G:J
Step 42: Save as file.xlsx with "Formatted" in title
Step 43: Copy Comm Amount from formatted spreadsheet
Step 44: Open AL3 Comparison Template
Step 45: Paste value with corresponding agent code
Step 46: Find PDF statement in S:\\cash ops\\SM_Statements\\YEARMO
Step 47: Place amount in Statement amount column

**Part 3: Handle Commission Line Items**

Step 48: Add filter for Trans Description column
Step 49: Filter for "commission" transactions
Step 50: Find missing Trans Description, Premium/Surcharge, and Comm %
Step 51: Login to WINS, type 1, Enter
Step 52: Enter Mnemonic: PIC, Enter
Step 53: Click Search, Enter
Step 54: Find line item matching spreadsheet
Step 55: Enter Premium/Surcharge and Full Comm Amount

**Part 4: Special Agents (09623, 16772, 43621)**

Creating AC Files for 09623 & 43621:
Step 56: Open WINS query session
Step 57: Type WRKQRY on command line, Enter
Step 58: Option 2
Step 59: Query: IIAA.ACDWN, Library: COPUOBJ, Enter
Step 60: Type 1 next to select records
Step 61: Change agent number to 09623
Step 62: Change date to month statements were processed (YYYYMM format)
Step 63: Type 1 next to select output type and output form, Enter
Step 64: Enter through next screen
Step 65: Change filename to AGT09623, change TEXT to AGT09623, Enter
Step 66: Hit F3 and Enter to run file
Step 67: Go to P:\\Specialty Markets\\Electronic Statements\\AC
Step 68: Find AGT09623.dtf file
Step 69: Arrow to date field and change it
Step 70: Select Transfer Data from IBM I
Step 71: Login with WINS credentials if prompted
Step 72: Click Open File
Step 73: Save file (opens to correct path)
Step 74: Place Excel and PDF statements in same folder

Creating DB Files for 09623, 43621 & 16772:
Step 75: Open regular WINS session, do 1 on line
Step 76: In Mnemonic, type NAFM
Step 77: Type 50 for copy statement to disk
Step 78: On producer line, type agent number (09623)
Step 79: On statement type, type D, hit Enter, Y to confirm
Step 80: Go to P:\\Specialty Markets\\Electronic Statements\\DB
Step 81: Find AGT09623.dft file
Step 82: Arrow to date field and change it
Step 83: Select Transfer Data from IBM I
Step 84: For AGT09623 ONLY: Do edit and replace
Step 85: Find What: full year (2019), Replace With: last 2 digits (19)
Step 86: Repeat for years 2019-2025
Step 87: Save file

**Part 5: Special Agents (10692, 90216, 29293, 90050)**

For 10692 & 90216 AC Files:
Step 88: Copy CSV and PDF from S:\\cash ops\\SM_Statements\\YEARMO
Step 89: Create new folder P:\\Specialty Markets\\Electronic Statements\\AC\\Year\\YEARMO\\AGTnum
Step 90: Total Gross Premium, Comm Amt & Net Due
Step 91: Put borders on grand total line
Step 92: Save as XLSX

For 10692 & 90216 DB Files:
Step 93: Follow Big I formatting
Step 94: Save formatting into new excel file instead of new sheet

For 29293 DB Excel:
Step 95: Copy CSV and PDF to P:\\Specialty Markets\\Electronic Statements\\DB\\Year\\MOYEAR\\29293
Step 96: Open template from P:\\Specialty Markets\\Electronic Statements\\Excel Templates\\29293 DB Template
Step 97: Change date to first day of last month
Step 98: Copy columns A:M from CSV to B:N in template
Step 99: Copy column O from CSV to O in template
Step 100: Format columns as Comma Style
Step 101: Total Premium/Surcharge, Full Comm Amt, Comm Amt columns
Step 102: Add number sequence 1,2,3,4 in Column A
Step 103: Save

For 90050 DB Excel:
Step 104: Open template, Password: INFO4AFI
Step 105: Open CSV, filter column F (Trans Description)
Step 106: Deselect "Commission"
Step 107: Map fields to template (see detailed mapping)
Step 108: Create new sheet for name formatting
Step 109: Use Text to Columns (Space delimiter)
Step 110: Remove middle name/initial
Step 111: Cut and paste to Last name column
Step 112: Save as month.Year 90050

**Transaction Types:**
• New = Issue
• Renew = Renewal
• Endorsement = Endorse
• Short Rate Cancellation = Cancel (less than original premium)
• Cancellation = Cancel

**Critical Rules:**
• Only process agent codes in comparison sheet
• Save formatted files with "Formatted" in filename
• Always verify amounts match between CSV and PDF
• For commission line items, find missing info in WINS
• Agent 09623: Edit and replace full year with 2 digits
• Agent 43621: Needs files in .DAT format
• Always copy Excel and PDF to final folder
• Use PIC in WINS to find transaction details
• Formula for Cant column: =B2&D2&E2
• Always paste values only after using formulas
• Grand total rows should be deleted before copying
• Use F5 Special "Visible cells only" when copying subtotals

**File Paths:**
• Templates: P:\\Specialty Markets\\Electronic Statements\\DB\\Template
• Statements: S:\\cash ops\\SM_Statements\\YEARMO
• AC Files: P:\\Specialty Markets\\Electronic Statements\\AC
• DB Files: P:\\Specialty Markets\\Electronic Statements\\DB
• Excel Templates: P:\\Specialty Markets\\Electronic Statements\\Excel Templates

**WINS Commands:**
• WRKQRY: Work with queries
• PIC: Policy Inquiry
• NAFM: Producer functions
• Option 50: Copy statement to disk

**Keyboard Shortcuts:**
• Ctrl+Shift+L: Filter
• F5: Go to Special
• Ctrl+Enter: Fill down formula
• F3: Exit/Back

**Escalation:** Brittney.Birge@rlicorp.com (Level 1), Danielle.Moore@rlicorp.com (Level 2)`,
  keywords: ['special markets', 'big i', 'formatting', 'csv', 'xlsx', 'cant column', 'subtotal', 'commission', 'pic', 'wrkqry', 'nafm', 'agent 09623', 'agent 43621', 'agent 16772', 'agent 10692', 'agent 90216', 'agent 29293', 'agent 90050', 'al3 comparison']
};
