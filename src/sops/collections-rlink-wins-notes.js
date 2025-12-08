export default {
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
