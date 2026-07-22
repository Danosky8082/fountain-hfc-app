const express = require('express');
const prisma = require('./prisma');
require('dotenv').config();

const app = express();

// --- Manual CORS Middleware (handles ALL requests, including OPTIONS) ---
app.use((req, res, next) => {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'https://fountain-hfc-app.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight (OPTIONS) requests immediately – no route needed
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// --- Logging middleware ---
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url} from ${req.headers.origin || 'same-origin'}`);
  next();
});

app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/authRoutes');
const fellowshipRoutes = require('./routes/fellowshipRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const qrRoutes = require('./routes/qrRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/fellowship', fellowshipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/admin', adminRoutes);

// --- Test route ---
app.get('/', (req, res) => {
  res.send('Fountain HFC API is running');
});

// --- Health check ---
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const fellowshipCount = await prisma.fellowship.count();
    const memberCount = await prisma.member.count();
    res.status(200).json({
      status: 'OK',
      message: 'Fountain HFC API is running!',
      database: 'Connected',
      stats: { 
        users: userCount, 
        fellowships: fellowshipCount, 
        members: memberCount 
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;