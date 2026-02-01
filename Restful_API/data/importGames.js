// Φόρτωση μεταβλητών περιβάλλοντος
require('dotenv').config();

// Εισαγωγή βιβλιοθηκών
const fs = require('fs');
const mongoose = require('mongoose');
const Game = require('../models/gameModel');

// Σύνδεση με MongoDB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connected for import'))
  .catch((err) => console.error(err.message));

// Ανάγνωση δεδομένων από JSON
const games = JSON.parse(
  fs.readFileSync(`${__dirname}/games.json`, 'utf-8')
);

// Εισαγωγή δεδομένων
const importData = async () => {
  try {
    await Game.create(games);
    console.log('Games successfully imported');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Εκτέλεση import
importData();