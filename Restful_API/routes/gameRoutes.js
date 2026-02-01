// Εισαγωγή middleware προστασίας
const authMiddleware = require('../middlewares/authMiddleware');

// Εισαγωγή της βιβλιοθήκης Express
const express = require('express');

// Εισαγωγή του game controller
const gameController = require('../controllers/gameController');
console.log('HANDLERS', {
    getTop5Games: typeof gameController.getTop5Games,
    getGamesByCategory: typeof gameController.getGamesByCategory,
    getAllGames: typeof gameController.getAllGames,
    createGame: typeof gameController.createGame,
    getGameById: typeof gameController.getGameById,
    updateGame: typeof gameController.updateGame,
    deleteGame: typeof gameController.deleteGame
  });

// Δημιουργία router
const router = express.Router();

// Aggregate route: Top 5 games
router.get('/top-5', gameController.getTop5Games);

// Aggregate route: Games by category
router.get('/category/:category', gameController.getGamesByCategory);

// Routes για το resource /games
router
  .route('/')
  .get(gameController.getAllGames)
  .post(authMiddleware.protect, gameController.createGame);

// Routes για συγκεκριμένο παιχνίδι (id)
router
  .route('/:id')
  .get(gameController.getGameById)
  .patch(authMiddleware.protect, gameController.updateGame)
  .delete(authMiddleware.protect, gameController.deleteGame);

// Εξαγωγή router
module.exports = router;