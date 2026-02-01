// Εισαγωγή της βιβλιοθήκης Mongoose
const mongoose = require('mongoose');

// Ορισμός του schema για τα video games
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Action', 'RPG', 'Sports', 'Strategy']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be >= 0']
  },
  releaseDate: {
    type: Date,
    default: Date.now
  }
});

// Δημιουργία του μοντέλου Game
const Game = mongoose.model('Game', gameSchema);

// Εξαγωγή του μοντέλου
module.exports = Game;