const express = require('express');
const cors = require('cors');
const prisma = require('./prisma');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['https://fountain-hfc-app.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const fellowshipRoutes = require('./routes/fellowshipRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const qrRoutes = require('./routes/qrRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/fellowship', fellowshipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/qr', qrRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Fountain HFC API is running');
});

// Health check
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

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;