var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index'); // Load custom routes

var app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views')); // Define the directory for view files
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public

// Custom route handlers
app.use('/', routes); // Handles main routes

// Example API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Inject API URL for frontend, if necessary
app.get('/config.js', (req, res) => {
  const apiUrl = process.env.API_URL || 'http://localhost:4000';
  res.type('application/javascript');
  res.send(`window.API_URL = "${apiUrl}";`);
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler (with stacktrace)
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.error('Error occurred:', err.stack); // Log the error stack trace
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack, // Include stack trace for debugging
    });
  });
}

// Production error handler (without stacktrace)
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}, // Hide stack trace in production
  });
});

module.exports = app;
