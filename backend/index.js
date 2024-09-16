require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Import routes
const route = require('./routes/routes');
app.use('/api/route', route);

const safetyRoute = require('./routes/safety');
app.use('/api/safety', safetyRoute);

// Database connection (if needed)
const pool = require('./db/db'); // Ensure the path is correct

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
