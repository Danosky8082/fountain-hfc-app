// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const prisma = require('./src/prisma');
require('dotenv').config();

const app = express();

// ─── Environment Variables ──────────────────────────────
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL || 'https://fountain-hfc-app.vercel.app';
const railwayUrl = process.env.RAILWAY_PUBLIC_DOMAIN || '';

// ─── Allowed Origins ────────────────────────────────────
const allowedOrigins = [
  frontendUrl,
  'https://fountain-hfc-app.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  railwayUrl,
  'https://*.vercel.app',
  'https://*.railway.app',
  // Add your custom domains here
  'https://your-church-domain.com',
];

// ─── Security Middleware ──────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// ─── Rate Limiting ─────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use('/api', limiter);

// ─── CORS Configuration ─────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*');
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// ─── Logging Middleware ────────────────────────────────
if (isProduction) {
  app.use(morgan('combined')); // Detailed logs in production
} else {
  app.use(morgan('dev')); // Colorful logs in development
}

// Custom logging middleware (kept from your original)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url} from ${req.headers.origin || 'same-origin'}`);
  next();
});

// ─── Body Parsers ──────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Compression ──────────────────────────────────────
app.use(compression());

// ─── Static Files ──────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ─── Routes ────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const fellowshipRoutes = require('./routes/fellowshipRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const qrRoutes = require('./routes/qrRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/fellowship', fellowshipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/users', userRoutes);

// ─── Test Route ────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Fountain HFC API is running');
});

// ─── Health Check ──────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const fellowshipCount = await prisma.fellowship.count();
    const memberCount = await prisma.member.count();
    
    res.status(200).json({
      status: 'OK',
      message: 'Fountain HFC API is running!',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      database: 'Connected',
      stats: { 
        users: userCount, 
        fellowships: fellowshipCount, 
        members: memberCount 
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// ─── 404 Handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    path: req.path,
    method: req.method
  });
});

// ─── Global Error Handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  
  // Prisma specific errors
  if (err.code === 'P2003') {
    return res.status(400).json({
      success: false,
      message: 'Foreign key constraint failed',
      error: 'The referenced record does not exist',
      field: err.meta?.field_name
    });
  }
  
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry',
      error: 'A record with this value already exists',
      field: err.meta?.target
    });
  }
  
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Record not found',
      error: err.message
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: 'Please login again'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
      error: 'Please login again'
    });
  }
  
  // Default error
  const statusCode = err.status || 500;
  const message = isProduction 
    ? 'Internal server error' 
    : err.message || 'Something went wrong';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(isProduction ? {} : { stack: err.stack, details: err })
  });
});

module.exports = app;