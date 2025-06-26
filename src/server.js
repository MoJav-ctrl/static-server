const app = require('./app');
const http = require('http');
const path = require('path');

// Get port from environment or use default (3000)
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from ${path.join(__dirname, './public')}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = server;
