require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed CORS origins including live Vercel frontend
const allowedOrigins = [
  'https://client-mocha-two-90.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin not allowed by backend policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GGA MEP Backend API is running', timestamp: new Date() });
});

// API Routes
app.use('/api/contact', contactRoutes);

// Test Database Connection, Auto-Sync Tables, and Start Server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✓ MySQL database connected successfully via Sequelize.');

    // Automatically create or update the table in 'gga-db' if it does not exist
    await sequelize.sync({ alter: true });
    console.log('✓ Sequelize models synchronized with database tables.');
  } catch (error) {
    console.warn('! Database connection / sync warning:', error.message);
    console.log('ℹ Please verify that MySQL (XAMPP/WAMP) is running and database "gga-db" exists.');
  }

  app.listen(PORT, () => {
    console.log(`✓ GGA MEP Backend Server running on http://localhost:${PORT}`);
    console.log(`✓ Endpoint ready: POST http://localhost:${PORT}/api/contact`);
  });
}

startServer();

module.exports = app;
