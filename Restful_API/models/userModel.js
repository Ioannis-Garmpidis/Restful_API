// Εισαγωγή της βιβλιοθήκης Mongoose
const mongoose = require('mongoose');

// Εισαγωγή βιβλιοθήκης για hashing κωδικών
const bcrypt = require('bcryptjs');

// Ορισμός schema για τους χρήστες
const userSchema = new mongoose.Schema({
  // Όνομα χρήστη
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  // Email χρήστη (μοναδικό)
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },

  // Κωδικός χρήστη (δεν επιστρέφεται στα queries)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  }
});

// Hash κωδικού πριν την αποθήκευση
userSchema.pre('save', async function () {
    // Αν ο κωδικός δεν έχει αλλάξει, δεν γίνεται hash
    if (!this.isModified('password')) return;
  
    // Hash του κωδικού
    this.password = await bcrypt.hash(this.password, 12);
  });

// Έλεγχος αν ο δοθείς κωδικός ταιριάζει με τον αποθηκευμένο
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Δημιουργία και εξαγωγή User model
module.exports = mongoose.model('User', userSchema);