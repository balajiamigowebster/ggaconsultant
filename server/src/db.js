import mariadb from 'mariadb';
import 'dotenv/config';

export const pool = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gga_website',
  connectionLimit: 5,
  bigIntAsNumber: true
});
