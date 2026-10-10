import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { pool } from './db.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const adminOnly = (req, res, next) => {
  if (!process.env.ADMIN_API_KEY || req.get('x-admin-key') !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized admin request' });
  }
  next();
};

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'GGA MEP API' }));

app.get('/api/pages/:slug', asyncRoute(async (req, res) => {
  const rows = await pool.query('SELECT slug,title,subtitle,body,image_url,seo_title,seo_description,updated_at FROM pages WHERE slug=? LIMIT 1', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Page not found' });
  res.json(rows[0]);
}));

app.get('/api/services', asyncRoute(async (_req, res) => {
  const rows = await pool.query('SELECT id,title,slug,summary,details,image_url FROM services WHERE is_active=1 ORDER BY sort_order,id');
  res.json(rows);
}));

app.get('/api/projects', asyncRoute(async (_req, res) => {
  const rows = await pool.query('SELECT id,title,location,area_sqft,description,image_url,is_featured FROM projects ORDER BY sort_order,id');
  res.json(rows);
}));

app.get('/api/settings', asyncRoute(async (_req, res) => {
  const rows = await pool.query('SELECT setting_key,setting_value FROM site_settings');
  res.json(Object.fromEntries(rows.map(r => [r.setting_key, r.setting_value])));
}));

app.put('/api/admin/pages/:slug', adminOnly, asyncRoute(async (req, res) => {
  const { title, subtitle = '', body = '', image_url = '', seo_title = '', seo_description = '' } = req.body;
  if (!title || typeof title !== 'string') return res.status(400).json({ error: 'A page title is required' });
  const result = await pool.query(
    'UPDATE pages SET title=?,subtitle=?,body=?,image_url=?,seo_title=?,seo_description=? WHERE slug=?',
    [title, subtitle, body, image_url, seo_title, seo_description, req.params.slug]
  );
  if (!result.affectedRows) return res.status(404).json({ error: 'Page not found' });
  res.json({ ok: true, message: 'Page updated' });
}));

app.post('/api/admin/services', adminOnly, asyncRoute(async (req, res) => {
  const { title, slug, summary = '', details = '', image_url = '', sort_order = 0 } = req.body;
  if (!title || !slug) return res.status(400).json({ error: 'Title and slug are required' });
  const result = await pool.query(
    'INSERT INTO services(title,slug,summary,details,image_url,sort_order) VALUES(?,?,?,?,?,?)',
    [title, slug, summary, details, image_url, Number(sort_order)]
  );
  res.status(201).json({ id: Number(result.insertId), ok: true });
}));

app.post('/api/admin/projects', adminOnly, asyncRoute(async (req, res) => {
  const { title, location = '', area_sqft = '', description = '', image_url = '', sort_order = 0 } = req.body;
  if (!title) return res.status(400).json({ error: 'Project title is required' });
  const result = await pool.query(
    'INSERT INTO projects(title,location,area_sqft,description,image_url,sort_order) VALUES(?,?,?,?,?,?)',
    [title, location, area_sqft, description, image_url, Number(sort_order)]
  );
  res.status(201).json({ id: Number(result.insertId), ok: true });
}));

app.post('/api/contact', asyncRoute(async (req, res) => {
  const { name, email, phone = '', message } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: 'Submitted values are too long' });
  }

  const to = process.env.CONTACT_EMAIL || 'ggamepconsultant@gmail.com';
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject: `GGA website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    });
  } else {
    console.log('Contact enquiry (SMTP not configured):', { name, email, phone, message });
  }
  res.status(201).json({ ok: true, message: 'Thank you. Your enquiry has been received.' });
}));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Check server logs.' });
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`GGA API listening on http://localhost:${port}`));
