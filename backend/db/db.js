// db.js
const { Pool } = require('pg');

// Create a new pool using the connection string from the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Make sure .env contains DATABASE_URL
});

module.exports = pool;  // Export the pool for use in other files