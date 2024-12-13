var express = require('express');
var app = express();
var { v4: uuidv4 } = require('uuid'); // Updated uuid import

var { Pool } = require('pg'); // Use Pool for PostgreSQL connection pooling

// Database connection string from environment variables
var conString = process.env.API_DB || 'postgres://user1:password1@172.235.1.190:5432/busbud_db'; // Use public IP for DB

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create a new Pool instance
const pool = new Pool({
  connectionString: conString,
});

// Root route
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the API!',
    available_routes: ['/api/status'],
  });
});

// Status route
app.get('/api/status', async function (req, res) {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    try {
      // Execute the query
      const result = await client.query('SELECT now() as time');

      // Return the result
      res.json({
        request_uuid: uuidv4(), // Generate a unique UUID for the request
        time: result.rows[0].time,
      });
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({
      message: 'Database query error',
      error: err.message,
    });
  }
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
