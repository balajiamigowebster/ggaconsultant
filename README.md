# GGA MEP Design Consultants Website

A starter project for a five-page dynamic website:
- React + Vite frontend
- Node.js + Express backend
- MariaDB database
- Editable pages, services, projects, and contact settings
- Email enquiries through SMTP
- WhatsApp click-to-chat
- Animated pencil motif inspired by the GGA logo

## Requirements
- Node.js 20+
- MariaDB 10.5+
- npm

## 1. Database
Create a database and import `database/schema.sql`:
```sql
CREATE DATABASE gga_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Then:
```bash
mariadb -u root -p gga_website < database/schema.sql
```
The SQL includes sample page copy and services. Review all content before publishing.

## 2. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Edit `.env` with your MariaDB credentials, a strong `ADMIN_API_KEY`, and SMTP details.
For local development, API runs at http://localhost:5000.

## 3. Frontend
In another terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## 4. Update content
The public website reads page content from MariaDB through the API. To edit content, use the admin API:
```bash
curl -X PUT http://localhost:5000/api/admin/pages/home \
  -H "Content-Type: application/json" \
  -H "x-admin-key: replace-with-your-secret" \
  -d '{"title":"GGA MEP Design Consultants","subtitle":"Engineering dependable building systems.","body":"Updated home page content","image_url":""}'
```
For production, build a proper admin login UI and use hashed passwords + secure sessions/JWT, rate limiting, HTTPS, validation, and backups. The header-key admin API here is a development starter only; do not expose it publicly as-is.

## 5. Contact email and WhatsApp
- Set `CONTACT_EMAIL`, SMTP values and `WHATSAPP_NUMBER` in `server/.env`.
- WhatsApp number should include country code, digits only, e.g. `918489274385`.
- Email sending requires valid SMTP credentials. If SMTP is not configured, the API logs the enquiry in development instead of sending.

## SEO checklist
- Edit page titles/descriptions in `client/index.html` and page metadata.
- Use descriptive image alt text and compressed WebP images.
- Add a sitemap.xml and robots.txt before launch.
- Verify Google Search Console and Google Business Profile.
- Only publish claims, project details, client logos and photos that GGA has permission to use.
- The company profile lists 10+ years of India/Gulf MEP project experience. Verify before publishing.

## Deployment note
A typical shared cPanel host may not support a continuously running Node.js service unless its Node.js app feature is enabled. Confirm Node.js and MariaDB support with the hosting provider. Otherwise use a VPS/cloud host for the Node API and MariaDB, and deploy the React build to static hosting.
