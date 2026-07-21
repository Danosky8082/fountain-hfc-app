const express = require('express');
const app = express();

// Test route - must work
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Health check - simplified
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

// Root
app.get('/', (req, res) => {
  res.send('Fountain HFC API is running');
});

module.exports = app;