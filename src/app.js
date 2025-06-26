const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const security = require('./config/security');

// Initialize Express application
const app = express();

// Security middleware
app.use(security);

// Request logging
app.use(morgan('combined'));

// Gzip compression
app.use(compression());

// Serve static files from the public directory
const staticDir = path.join(__dirname, '../public');
app.use(express.static(staticDir, {
  // Enable efficient caching (1 year)
  maxAge: '1y',
  // Serve pre-compressed files if available
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.br')) {
      res.setHeader('Content-Encoding', 'br');
      // Remove .br extension for proper MIME type detection
      res.setHeader('Content-Type', express.static.mime.lookup(filePath.slice(0, -3)));
    } else if (filePath.endsWith('.gz')) {
      res.setHeader('Content-Encoding', 'gzip');
      // Remove .gz extension for proper MIME type detection
      res.setHeader('Content-Type', express.static.mime.lookup(filePath.slice(0, -3)));
    }
  }
}));

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404);
  
  // Respond with HTML, JSON, or plain text depending on Accept header
  if (req.accepts('html')) {
    res.sendFile(path.join(staticDir, '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  } else {
    res.type('txt').send('Not found');
  }
});

module.exports = app;
