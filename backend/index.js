#!/usr/bin/env node

const app = require("./app.js");
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
