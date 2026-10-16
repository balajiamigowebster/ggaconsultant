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

// Setup API router supporting all endpoints requested by frontend
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GGA MEP Backend API is running', timestamp: new Date() });
});

apiRouter.use('/contact', contactRoutes);

apiRouter.get('/settings', (req, res) => {
  res.json({
    contact_email: 'ggamepconsultant@gmail.com',
    contact_phone: '+91 8489274385',
    whatsapp_number: '918489274385',
    office_address: 'Flat No B, Vallabari Apartment, Vallal Pari Street, Ram Nagar, Madipakkam, Chennai 600091'
  });
});

const pageContentMap = {
  home: {
    title: 'GGA MEP Design Consultants',
    subtitle: 'Thoughtful MEP design for buildings that work better.',
    body: 'Coordinated plumbing, electrical, firefighting and building-services design support for projects across India and the Gulf.'
  },
  'about-us': {
    title: 'About GGA MEP Design Consultants',
    subtitle: 'Designing Smarter Buildings. Engineering Safer Futures.',
    body: 'GGA MEP Design Consultants provides specialized engineering consultancy services in Plumbing, Electrical, Firefighting, and Fire Alarm System Design.'
  },
  services: {
    title: 'MEP Design Services',
    subtitle: 'Integrated building-services design support.',
    body: 'Explore plumbing, electrical, firefighting, fire alarm and HVAC service areas.'
  },
  projects: {
    title: 'Selected Projects',
    subtitle: 'Experience across diverse building types.',
    body: 'The company profile lists residential, commercial, institutional, industrial and public-building projects across multiple locations.'
  },
  'contact-us': {
    title: 'Contact GGA',
    subtitle: 'Discuss your next MEP design requirement.',
    body: 'Contact us to discuss project scope, design coordination, technical support and documentation requirements.'
  }
};

apiRouter.get('/pages/:slug', (req, res) => {
  const content = pageContentMap[req.params.slug] || {
    title: 'GGA MEP Design Consultants',
    subtitle: 'Thoughtful MEP design for buildings that work better.',
    body: 'Coordinated plumbing, electrical, firefighting and building-services design support for projects across India and the Gulf.'
  };
  res.json({ status: 'ok', slug: req.params.slug, ...content });
});

apiRouter.get('/services', (req, res) => {
  res.json([]);
});

apiRouter.get('/projects', (req, res) => {
  res.json([]);
});

// Support both prefixes (/gga/api and /api)
app.use('/gga/api', apiRouter);
app.use('/api', apiRouter);

// Root route for sanity check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'GGA MEP Backend is live' });
});
app.get('/gga', (req, res) => {
  res.json({ status: 'ok', message: 'GGA MEP Backend (/gga) is live' });
});

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
