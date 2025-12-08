export default {
  id: 'monthly-collections-notes',
  name: 'Notes Needed - Monthly Collections',
  category: 'Collections',
  difficulty: 'Intermediate',
  summary: 'Monthly process for updating collection notes in WINS and ARLink systems based on Monthly Collections Report',
  content: `**Key Applications:**
• Excel (Monthly Collections Report)
• WINS system
• ARLink (via ROInet portal)

**Processing Schedule:** Monthly
**File Location:** P:\\Surety\\Collections\\[Year]\\[Month]\\[Date] Collections Report Working.xlsx
**Accuracy Required:** 100%

**Process Overview:**

Ensure accurate and consistent updating of collection notes in both WINS and ARLink systems based on Monthly Collections Report, enabling clear documentation of amounts placed in external collections.

**Part 1: Open the Notes Needed Tab**

Step 1: Navigate to P:\\Surety\\Collections\\[Year]\\[Month]\\
Step 2: Open file titled "[Date] Collections Report Working.xlsx"
Step 3: Go to "Notes Needed" tab (only tab to update)
Step 4: Review bonds listed (all bonds placed with external collections)

**Part 2: Review Bonds**

Step 5: Option A - Scroll through list manually bond by bond
Step 6: Option B (Preferred) - Use slicer on right to filter by bond
Step 7: Slicer shows total collections amount at bottom

**Part 3: Update WINS Notes**

Step 8: Copy bond number and search in WINS
Step 9: Navigate to policy screen
Step 10: Hit 1 + Enter to open address screen
Step 11: Press Shift + F1 to open Notes section
Step 12: Use Page Up/Down to navigate notes
Step 13: Verify only ONE "Collections" note exists
Step 14: If multiple notes exist, consolidate and delete older ones
Step 15: To view note, press 5 + Enter
Step 16: To revise note, press 2 + Enter
Step 17: Update note using standardized format:
        Title: Collections
        Total Due in Collections: $[Total Amount]
        [Year1]: $[Amount1]
        [Year2]: $[Amount2]
Step 18: If formatting significantly different, delete and create new
Step 19: Adjust individual year amounts if partial payments made
Step 20: Press F6 or double-click "Update" key to save
Step 21: Confirm note saved with your user ID and current date

**Part 4: Mark Excel Sheet (WINS)**

Step 22: In Excel under WINS column, mark top row for bond
Step 23: If updated, type "Updated"
Step 24: If new note created, type "C New"
Step 25: Only top row for each bond requires notation

**Part 5: Update ARLink Note**

Step 26: Go to ROInet homepage and Portal Login
Step 27: Expand Sure Detail
Step 28: Click ARLink My Bond Set
Step 29: Paste bond number and hit Search
Step 30: Click folder icon to open bond
Step 31: Go to Notes Tab
Step 32: Ensure only ONE collections note exists (titled "Direct Collect")
Step 33: If duplicates exist, edit others to "Do Not Use"
Step 34: Remove any reminders from duplicate notes
Step 35: Save changes to duplicate notes
Step 36: Edit existing note (do NOT create new unless instructed)
Step 37: Update to match WINS format:
        Total Due in Collections: $[Total Amount]
        [Year1]: $[Amount1]
        [Year2]: $[Amount2]
        MM/DD/YYYY - Sent [Year(s)] term to direct collections team in [MM.DD.YYYY] collections report to place with external collections agency. -- [Initials]
Step 38: Use exact report date in note (e.g., 06.02.2025)
Step 39: Ensure subject is "Direct Collect"
Step 40: Set Owner to "Surety Operations"
Step 41: No reminders needed
Step 42: Save note

**Part 6: Mark Excel Sheet (ARLink)**

Step 43: Under ARLink column, mark completion
Step 44: If updated, type "Updated"
Step 45: If updated and consolidated multiple notes, type "UC"

**Part 7: Quality Check**

Step 46: Verify WINS and ARLink notes are synchronized
Step 47: Verify notes are properly formatted
Step 48: Verify notes include updated balances
Step 49: Verify year breakdowns are correct
Step 50: Move to next bond once both systems updated

**Special Cases:**

Step 51: If no existing note in WINS, create new one
Step 52: If no ARLink note exists, email Surety Accounting for guidance
Step 53: Use standardized formatting throughout for consistency
Step 54: Ensure Total Due matches sum of individual years

**Critical Rules:**
• Only ONE "Collections" note should exist in WINS
• Only ONE collections note in ARLink (titled "Direct Collect")
• Always use standardized format for consistency
• Total Due in Collections must equal sum of individual year amounts
• Always consolidate multiple notes into one
• Mark duplicates as "Do Not Use" before deleting
• Notes must be synchronized between WINS and ARLink
• Use exact report date in ARLink notes
• Set ARLink Owner to "Surety Operations"
• No reminders needed in ARLink notes
• Excel marking: "Updated" for updates, "C New" for new creation, "UC" for consolidated updates
• Only mark top row for each bond in Excel

**Standardized Note Format:**

WINS Format:
Collections
Total Due in Collections: $[Total]
[Year]: $[Amount]
[Year]: $[Amount]

ARLink Format:
Total Due in Collections: $[Total]
[Year]: $[Amount]
[Year]: $[Amount]
MM/DD/YYYY - Sent [Year(s)] term to direct collections team in MM.DD.YYYY collections report to place with external collections agency. -- [Initials]

**Keyboard Shortcuts:**
• 1 + Enter: Open address screen in WINS
• Shift + F1: Open Notes section in WINS
• 5 + Enter: View note in WINS
• 2 + Enter: Revise note in WINS
• F6: Save/Update note in WINS
• Page Up/Down: Navigate through notes

**File Path:** P:\\Surety\\Collections\\[Year]\\[Month]\\

**Contact:** Kelly or Surety Accounting Team for questions`,
  keywords: ['monthly collections', 'notes needed', 'wins', 'arlink', 'shift+f1', 'f6', 'direct collect', 'surety operations', 'total due', 'standardized format', 'consolidate', 'page up', 'page down']
};
