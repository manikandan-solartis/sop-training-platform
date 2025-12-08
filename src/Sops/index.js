// Master SOP Index - Import all individual SOPs here
import agencyCheckRequest from './agency-check-request';
import agentStatementRequests from './agent-statement-requests';
import collectionsRlinkWins from './collections-rlink-wins-notes';
import directBillCollectLetter from './direct-bill-collect-letter';
import duckCreekRefunds from './duck-creek-refunds';
import hawaiiRefundReport from './hawaii-refund-report';
import monthlyCollectionsNotes from './monthly-collections-notes';
import nsfProcessing from './nsf-processing';
import nkllRequest from './nkll-request';
import returnedMails from './returned-mails';

// To add a new SOP:
// 1. Create new file: src/sops/your-sop-name.js
// 2. Import it here: import yourSopName from './your-sop-name';
// 3. Add to sopData object below with appropriate key

export const sopData = {
  'agency-check-request': agencyCheckRequest,
  'agent-statement-requests': agentStatementRequests,
  'collections-rlink-wins-notes': collectionsRlinkWins,
  'direct-bill-collect-letter': directBillCollectLetter,
  'duck-creek-refunds': duckCreekRefunds,
  'hawaii-refund-report': hawaiiRefundReport,
  'monthly-collections-notes': monthlyCollectionsNotes,
  'nsf-processing': nsfProcessing,
  'nkll-request': nkllRequest,
  'returned-mails': returnedMails
  // Add more SOPs here as: 'sop-id': sopVariableName,
};

export default sopData;
