const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/admin/auth');
const publicRoutes = require('./routes/public');

app.use('/api/v1/admin/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/public', publicRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Global error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
