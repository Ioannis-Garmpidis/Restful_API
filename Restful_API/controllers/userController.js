// Εισαγωγή του User model
const User = require('../models/userModel');

// Εισαγωγή βιβλιοθήκης για δημιουργία JWT
const jwt = require('jsonwebtoken');

// Δημιουργία JWT token για τον χρήστη
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

// Δημιουργία νέου χρήστη (register)
exports.register = async (req, res) => {
  try {
    // Ανάγνωση δεδομένων από το body
    const { name, email, password } = req.body;

    // Έλεγχος υποχρεωτικών πεδίων
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email και password είναι υποχρεωτικά'
      });
    }

    // Έλεγχος αν υπάρχει ήδη χρήστης με το ίδιο email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Υπάρχει ήδη χρήστης με αυτό το email'
      });
    }

    // Δημιουργία νέου χρήστη
    const newUser = await User.create({
      name,
      email,
      password
    });

    // Απάντηση χωρίς επιστροφή password
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Login χρήστη
exports.login = async (req, res) => {
  try {
    // Ανάγνωση credentials από το body
    const { email, password } = req.body;

    // Έλεγχος ύπαρξης email και password
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email και password είναι υποχρεωτικά'
      });
    }

    // Αναζήτηση χρήστη με βάση το email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Λάθος email ή password'
      });
    }

    // Έλεγχος αν ο κωδικός είναι σωστός
    const isValidPassword = await user.correctPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'fail',
        message: 'Λάθος email ή password'
      });
    }

    // Δημιουργία token για τον χρήστη
    const token = signToken(user._id);

    // Επιτυχές login με token
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Λήψη στοιχείων συνδεδεμένου χρήστη
exports.getMe = async (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
          }
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };