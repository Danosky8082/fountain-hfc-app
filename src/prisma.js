// src/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// Create the connection pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Instantiate PrismaClient with the adapter (THIS IS THE ONLY PLACE WE DO IT)
const prisma = new PrismaClient({ adapter });

module.exports = prisma;