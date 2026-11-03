const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me (verify current token)
router.get('/me', authController.verifySession);

module.exports = router;

