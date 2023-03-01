// Import the Adaptive SDK.
const Adaptive = require('@ibm-verify/adaptive-proxy');

// Load contents of `.env` into `process.env`.
require('dotenv').config();

const config = {
  tenantUrl: process.env.TENANT_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};r

module.exports = new Adaptive(config);
