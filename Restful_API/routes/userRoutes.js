// Εισαγωγή της βιβλιοθήκης Express
const express = require('express');

// Εισαγωγή του user controller
const userController = require('../controllers/userController');

// Εισαγωγή middleware προστασίας
const authMiddleware = require('../middlewares/authMiddleware');

// Δημιουργία router
const router = express.Router();

// Route για δημιουργία νέου χρήστη
router.post('/register', userController.register);

// Route για login χρήστη
router.post('/login', userController.login);

// Route για στοιχεία συνδεδεμένου χρήστη
router.get('/me', authMiddleware.protect, userController.getMe);

// Εξαγωγή router
module.exports = router;