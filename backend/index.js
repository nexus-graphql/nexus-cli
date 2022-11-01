#!/usr/bin/env node

const app = require("./app.js");
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
What data does frontend need from backend?
Deployment:
- if there is a deployment:
  - status
  - public api endpoint
  - destroy
    - follow what command line does
- else
  - Message: You don't have any deployed projects.
  - Would you like to build and deploy a project? <button>
*/
