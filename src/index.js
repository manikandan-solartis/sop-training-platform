// Master SOP Index - Import all individual SOPs here
import agencyCheckRequest from './agency-check-request';
import agentStatementRequests from './agent-statement-requests';
import collectionsRlinkWins from './collections-rlink-wins-notes';

// To add a new SOP:
// 1. Create new file: src/sops/your-sop-name.js
// 2. Import it here: import yourSopName from './your-sop-name';
// 3. Add to sopData object below with appropriate key

export const sopData = {
  'agency-check-request': agencyCheckRequest,
  'agent-statement-requests': agentStatementRequests,
  'collections-rlink-wins-notes': collectionsRlinkWins
  // Add more SOPs here as: 'sop-id': sopVariableName,
};

export default sopData;
