require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/database');
const { Op } = require('sequelize');
const contactRoutes = require('./routes/contactRoutes');
const Service = require('./models/Service');
const defaultServices = require('./models/defaultServices');
const Project = require('./models/Project');
const defaultProjects = require('./models/defaultProjects');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware - allow live domains and dynamic origin reflection
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));

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

// Persistent storage fallback for services
const SERVICES_FILE = path.join(__dirname, 'services.json');

function loadStoredServices() {
  try {
    if (fs.existsSync(SERVICES_FILE)) {
      const content = fs.readFileSync(SERVICES_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('! Could not read services.json:', err.message);
  }
  return defaultServices;
}

function saveStoredServices(data) {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('! Could not save services.json:', err.message);
    return false;
  }
}

function formatServiceResponse(raw) {
  if (!raw) return raw;
  const s = raw.toJSON ? raw.toJSON() : { ...raw };

  // Parse coreScope if stored/returned as JSON string
  if (typeof s.coreScope === 'string') {
    try { s.coreScope = JSON.parse(s.coreScope); } catch (_) { s.coreScope = []; }
  }
  if (!Array.isArray(s.coreScope)) s.coreScope = [];

  // Parse standards if stored/returned as JSON string
  if (typeof s.standards === 'string') {
    try { s.standards = JSON.parse(s.standards); } catch (_) { s.standards = []; }
  }
  if (!Array.isArray(s.standards)) s.standards = [];

  // Parse deliverables if stored/returned as JSON string
  if (typeof s.deliverables === 'string') {
    try { s.deliverables = JSON.parse(s.deliverables); } catch (_) { s.deliverables = []; }
  }
  if (!Array.isArray(s.deliverables)) s.deliverables = [];

  // Parse statHighlight if stored/returned as JSON string
  if (typeof s.statHighlight === 'string') {
    try { s.statHighlight = JSON.parse(s.statHighlight); } catch (_) { s.statHighlight = null; }
  }
  if (s.statHighlight && typeof s.statHighlight !== 'object') {
    s.statHighlight = null;
  }

  return s;
}

let storedServices = loadStoredServices();

apiRouter.get('/services', async (req, res) => {
  try {
    const dbServices = await Service.findAll({
      order: [
        ['sortOrder', 'ASC'],
        ['createdAt', 'ASC']
      ]
    });
    if (dbServices && dbServices.length > 0) {
      return res.json(dbServices.map(formatServiceResponse));
    }
  } catch (err) {
    console.warn('! DB query for services failed, using cache:', err.message);
  }
  res.json((storedServices.length > 0 ? storedServices : defaultServices).map(formatServiceResponse));
});

apiRouter.post('/services', async (req, res) => {
  const payload = req.body;
  if (Array.isArray(payload)) {
    try {
      const incomingIds = payload.map((item) => item.id).filter(Boolean);
      if (incomingIds.length > 0) {
        await Service.destroy({
          where: {
            id: { [Op.notIn]: incomingIds }
          }
        });
      }
      for (const item of payload) {
        if (item && item.id) {
          await Service.upsert(item);
        }
      }
    } catch (err) {
      console.warn('! DB bulk upsert failed:', err.message);
    }
    storedServices = payload;
    saveStoredServices(storedServices);
    return res.json({ success: true, count: payload.length, message: 'Services updated successfully' });
  }

  if (payload && typeof payload === 'object') {
    const item = { id: payload.id || `service-${Date.now()}`, ...payload };
    try {
      await Service.upsert(item);
    } catch (err) {
      console.warn('! DB single upsert failed:', err.message);
    }
    const idx = storedServices.findIndex((s) => s.id === item.id);
    if (idx >= 0) storedServices[idx] = item;
    else storedServices.push(item);
    saveStoredServices(storedServices);
    return res.status(201).json({ success: true, service: formatServiceResponse(item) });
  }

  return res.status(400).json({ error: 'Invalid payload: Array or Service object expected' });
});

apiRouter.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body, id };
  try {
    await Service.upsert(updateData);
  } catch (err) {
    console.warn('! DB update failed:', err.message);
  }
  const idx = storedServices.findIndex((s) => s.id === id);
  if (idx === -1) {
    storedServices.push(updateData);
  } else {
    storedServices[idx] = updateData;
  }
  saveStoredServices(storedServices);
  return res.json({ success: true, message: 'Service updated', service: formatServiceResponse(updateData) });
});

apiRouter.delete('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Service.destroy({ where: { id } });
  } catch (err) {
    console.warn('! DB delete failed:', err.message);
  }
  storedServices = storedServices.filter((s) => s.id !== id);
  saveStoredServices(storedServices);
  return res.json({ success: true, message: 'Service deleted' });
});

function formatProjectResponse(raw) {
  if (!raw) return raw;
  const p = raw.toJSON ? raw.toJSON() : { ...raw };

  if (typeof p.scope === 'string') {
    try { p.scope = JSON.parse(p.scope); } catch (_) { p.scope = []; }
  }
  if (!Array.isArray(p.scope)) p.scope = [];

  return p;
}

const PROJECTS_FILE = path.join(__dirname, 'projects.json');

function loadStoredProjects() {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const content = fs.readFileSync(PROJECTS_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('! Could not read projects.json:', err.message);
  }
  return defaultProjects;
}

function saveStoredProjects(data) {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('! Could not save projects.json:', err.message);
    return false;
  }
}

let storedProjects = loadStoredProjects();

apiRouter.get('/projects', async (req, res) => {
  try {
    const dbProjects = await Project.findAll({
      order: [
        ['sortOrder', 'ASC'],
        ['slNo', 'ASC'],
        ['createdAt', 'ASC']
      ]
    });
    if (dbProjects && dbProjects.length > 0) {
      return res.json(dbProjects.map(formatProjectResponse));
    }
  } catch (err) {
    console.warn('! DB query for projects failed, using cache:', err.message);
  }
  res.json((storedProjects.length > 0 ? storedProjects : defaultProjects).map(formatProjectResponse));
});

apiRouter.post('/projects', async (req, res) => {
  const payload = req.body;
  if (Array.isArray(payload)) {
    try {
      const incomingIds = payload.map((item) => item.id).filter(Boolean);
      if (incomingIds.length > 0) {
        await Project.destroy({
          where: {
            id: { [Op.notIn]: incomingIds }
          }
        });
      }
      for (const item of payload) {
        if (item && item.id) {
          await Project.upsert(item);
        }
      }
    } catch (err) {
      console.warn('! DB bulk upsert projects failed:', err.message);
    }
    storedProjects = payload;
    saveStoredProjects(storedProjects);
    return res.json({ success: true, count: payload.length, message: 'Projects updated successfully' });
  }

  if (payload && typeof payload === 'object') {
    const item = { id: payload.id || `project-${Date.now()}`, ...payload };
    try {
      await Project.upsert(item);
    } catch (err) {
      console.warn('! DB single upsert project failed:', err.message);
    }
    const idx = storedProjects.findIndex((p) => p.id === item.id);
    if (idx >= 0) storedProjects[idx] = item;
    else storedProjects.push(item);
    saveStoredProjects(storedProjects);
    return res.status(201).json({ success: true, project: formatProjectResponse(item) });
  }

  return res.status(400).json({ error: 'Invalid payload: Array or Project object expected' });
});

apiRouter.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body, id };
  try {
    await Project.upsert(updateData);
  } catch (err) {
    console.warn('! DB update project failed:', err.message);
  }
  const idx = storedProjects.findIndex((p) => p.id === id);
  if (idx === -1) {
    storedProjects.push(updateData);
  } else {
    storedProjects[idx] = updateData;
  }
  saveStoredProjects(storedProjects);
  return res.json({ success: true, message: 'Project updated', project: formatProjectResponse(updateData) });
});

apiRouter.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Project.destroy({ where: { id } });
  } catch (err) {
    console.warn('! DB delete project failed:', err.message);
  }
  storedProjects = storedProjects.filter((p) => p.id !== id);
  saveStoredProjects(storedProjects);
  return res.json({ success: true, message: 'Project deleted' });
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

// Start server immediately so Passenger/cPanel captures the listener without startup timeout
const server = app.listen(PORT, () => {
  console.log(`✓ GGA MEP Backend Server running on http://localhost:${PORT}`);
  console.log(`✓ Endpoint ready: POST http://localhost:${PORT}/api/contact`);
  console.log(`✓ Endpoint ready: GET/POST/PUT/DELETE http://localhost:${PORT}/api/services`);
  console.log(`✓ Endpoint ready: GET/POST/PUT/DELETE http://localhost:${PORT}/api/projects`);
});

// Test Database Connection and Auto-Sync Tables in the background
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ MySQL database connected successfully via Sequelize.');

    // Automatically create or update the tables in 'gga-db' if they do not exist
    await sequelize.sync({ alter: true });
    console.log('✓ Sequelize models synchronized with database tables.');

    // Auto-seed default services if table is empty
    const serviceCount = await Service.count();
    if (serviceCount === 0) {
      await Service.bulkCreate(defaultServices);
      console.log(`✓ Seeded ${defaultServices.length} default services into MySQL "gga-db".`);
    } else {
      console.log(`✓ MySQL "services" table contains ${serviceCount} service records.`);
    }

    // Auto-seed default projects if table is empty
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate(defaultProjects);
      console.log(`✓ Seeded ${defaultProjects.length} default projects into MySQL "gga-db".`);
    } else {
      console.log(`✓ MySQL "projects" table contains ${projectCount} project records.`);
    }
  } catch (error) {
    console.warn('! Database connection / sync warning:', error.message);
    console.log('ℹ Please verify database credentials in .env.');
  }
})();

module.exports = app;