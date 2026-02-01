// Φόρτωση μεταβλητών περιβάλλοντος
require('dotenv').config();

// Εισαγωγή βιβλιοθηκών
const express = require('express');
const mongoose = require('mongoose');

// Δημιουργία Express application
const app = express();
app.set('query parser', 'extended');

// Middleware για την επεξεργασία JSON requests
app.use(express.json());

// Εισαγωγή routes
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

// Σύνδεση routes
app.use('/api/v1/games', gameRoutes);
app.use('/api/v1/users', userRoutes);

// Βασικό endpoint ελέγχου λειτουργίας
app.get('/', (req, res) => {
  res.send('API is running');
});

// Σύνδεση με τη MongoDB Atlas
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Εκκίνηση server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});