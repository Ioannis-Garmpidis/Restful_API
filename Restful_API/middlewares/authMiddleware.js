// Εισαγωγή βιβλιοθήκης για έλεγχο JWT
const jwt = require('jsonwebtoken');

// Εισαγωγή του User model
const User = require('../models/userModel');

// Middleware προστασίας routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Έλεγχος αν υπάρχει token στο Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Αν δεν υπάρχει token, απαγορεύεται η πρόσβαση
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Δεν έχετε δικαίωμα πρόσβασης'
      });
    }

    // Αποκωδικοποίηση token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Έλεγχος αν ο χρήστης υπάρχει ακόμα
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'Ο χρήστης δεν υπάρχει'
      });
    }

    // Αποθήκευση χρήστη στο request
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Μη έγκυρο token'
    });
  }
};