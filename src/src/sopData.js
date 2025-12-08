// SOP Database - Now imports from modular sops/ folder
// This file is just a re-export for backward compatibility

export { sopData, default } from './sops';

// To add new SOPs:
// 1. Create: src/sops/your-sop-name.js
// 2. Update: src/sops/index.js (add import and entry)
// That's it! No need to touch this file.
