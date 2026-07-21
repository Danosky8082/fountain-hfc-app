const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// In production, Render provides a URL, we don't need HTTPS locally – but we keep the option.
// For Render, we'll use HTTP because Render provides HTTPS at the load balancer level.
const useHttps = process.env.USE_HTTPS === 'true';

if (useHttps) {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_KEY || '172.16.3.218+1-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_CERT || '172.16.3.218+1.pem')),
  };
  https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HTTPS Server running on https://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
  });
}